import React, { useEffect, useState } from 'react';
import { useLoaderData, useNavigate, useParams } from 'react-router-dom';
import useAuth from '../../../../hooks/useAuth';
import useAxiosSecure from '../../../../hooks/useAxiosSecure';
import { useForm } from 'react-hook-form';
import Swal from 'sweetalert2';
import toast from 'react-hot-toast';

const UpdateParcel = () => {
   const singleParcel = useLoaderData()
   console.log(singleParcel)

   const { id } = useParams()
   // console.log('from url id is', id)


   const { user } = useAuth();
   const [price, setPrice] = useState(singleParcel?.price);
   const [parcelWeight, setParcelWeight] = useState(singleParcel?.parcelWeight)
   const axiosSecure = useAxiosSecure()
   const navigate = useNavigate()

   const {
      _id,
      phoneNumber,
      parcelType,
      parcelWeight: oldParcelWeight,
      receiverName,
      receiverPhoneNumber,
      deliveryAddress,
      requestedDeliveryDate:oldReqDate,
      latitude,
      longitude,
      price: oldPrice,
   } = singleParcel;


   // now update data by react hook form

   const { register, handleSubmit, formState: { errors }, setValue } = useForm();

   const onSubmit = (data) => {
      const {
         phoneNumber,
         parcelType,
         receiverName,
         receiverPhoneNumber,
         deliveryAddress,
         requestedDeliveryDate,
         latitude,
         longitude
      } = data;


      const updateFormData = {
         phoneNumber, parcelType, parcelWeight, receiverName, receiverPhoneNumber, deliveryAddress, requestedDeliveryDate: new Date(requestedDeliveryDate).toISOString(), latitude, longitude, price
      };

      axiosSecure.patch(`/parcels/update/${id}`, updateFormData)
         .then(res => {
            // console.log(res.data)
            if (res.data.modifiedCount) {
               Swal.fire("Your parcel updated successfully");
               // console.log(res.data)
               navigate('/dashboard/my-parcels')
            }
         })
   };

   const handleWeightChange = (e) => {
      const weight = parseInt(e.target.value);

      if (weight < 0) {
         return toast.error("Weight must be a positive number");
      }

      if (!isNaN(weight)) {
         let calculatedPrice = 0;

         if (weight > 0 && weight <= 1) calculatedPrice = 50;
         else if (weight > 1 && weight <= 2) calculatedPrice = 100;
         else if (weight > 2) calculatedPrice = 150;

         setParcelWeight(weight)
         setPrice(calculatedPrice);
         setValue("price", `${calculatedPrice} Tk`);
      }
   };

   // Function to check if the date is in the future
   const isFutureDate = (date) => {
      return new Date(date) > new Date();
   };




   return (
      <div className=" mx-auto mt-10 p-5 border rounded shadow-lg">
         <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center">
            Update Specific Parcel
         </h2>
         <form onSubmit={handleSubmit(onSubmit)}
         >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
               {/* User Name */}
               <div>
                  <label className=" font-medium text-sm sm:text-base">Name</label>
                  <input
                     type="text"
                     value={user?.displayName || ""}
                     readOnly
                     className="w-full p-2 border rounded bg-gray-100 focus:ring-2 focus:ring-blue-500 focus:outline-none"

                  />
               </div>

               {/* User Email */}
               <div>
                  <label className=" font-medium text-sm sm:text-base">Email</label>
                  <input
                     type="email"
                     value={user?.email || ""}
                     readOnly
                     className="w-full p-2 border rounded bg-gray-100 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  />

               </div>

               {/* Phone Number */}
               <div>
                  <label className=" font-medium text-sm sm:text-base">Your Phone Number</label>
                  <input
                     type="number"
                     defaultValue={phoneNumber}
                     placeholder="Enter your phone number"
                     className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:outline-none"
                     {...register("phoneNumber", {
                        required: "Your phone number is required",
                        pattern: {
                           value: /^[0-9+\-()\s]*$/,
                           message: "Enter a valid number."
                        }
                     })}
                  />
                  {errors.phoneNumber && (
                     <p className="text-red-500 text-sm">{errors.phoneNumber.message}</p>
                  )}
               </div>

               {/* Parcel Type */}
               <div>
                  <label className=" font-medium text-sm sm:text-base">Parcel Type</label>
                  <input
                     defaultValue={parcelType}
                     type="text"
                     placeholder="Enter parcel type"
                     className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:outline-none"
                     {...register("parcelType", { required: "Parcel type is required" })}
                  />
                  {errors.parcelType && <p className="text-red-500 text-sm">{errors.parcelType.message}</p>}
               </div>

               {/* Parcel Weight */}
               <div>
                  <label className=" font-medium text-sm sm:text-base">Parcel Weight (kg)</label>
                  <input
                     defaultValue={oldParcelWeight}
                     step="any"
                     type="number"
                     placeholder="Enter parcel weight"
                     className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:outline-none"
                     onChange={handleWeightChange}
                     required
                  />
               </div>

               {/* Price (Readonly) */}
               <div>
                  <label className=" font-medium text-sm sm:text-base">Price (Tk)</label>
                  <input
                     type="text"
                     value={price || oldPrice}
                     readOnly
                     className="w-full p-2 border rounded bg-gray-100 focus:outline-none"
                  />
               </div>

               {/* Receiver's Name */}
               <div>
                  <label className=" font-medium text-sm sm:text-base">Receiver's Name</label>
                  <input
                     defaultValue={receiverName}
                     type="text"
                     placeholder="Enter receiver's name"
                     className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:outline-none"
                     {...register("receiverName", { required: "Receiver's name is required" })}
                  />
                  {errors.receiverName && (
                     <p className="text-red-500 text-sm">{errors.receiverName.message}</p>
                  )}
               </div>

               {/* Receiver's Phone Number */}
               <div>
                  <label className=" font-medium text-sm sm:text-base">Receiver's Phone Number</label>
                  <input
                     defaultValue={receiverPhoneNumber}
                     type="number"
                     placeholder="Enter receiver's phone number"
                     className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:outline-none"
                     {...register("receiverPhoneNumber", {
                        required: "Receiver's phone number is required",
                        pattern: {
                           value: /^[0-9+\-]+$/,
                           message: "Number is not valid"
                        }
                     })}
                  />
                  {errors.receiverPhoneNumber && (
                     <p className="text-red-500 text-sm">{errors.receiverPhoneNumber.message}</p>
                  )}
               </div>

               {/* Delivery Address */}
               <div>
                  <label className=" font-medium text-sm sm:text-base">Delivery Address</label>
                  <textarea
                     defaultValue={deliveryAddress}
                     placeholder="Enter delivery address"
                     className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:outline-none"
                     {...register("deliveryAddress", { required: "Delivery address is required" })}
                  />
                  {errors.deliveryAddress && (
                     <p className="text-red-500 text-sm">{errors.deliveryAddress.message}</p>
                  )}
               </div>

               {/* Requested Delivery Date */}
               <div>
                  <label className=" font-medium text-sm sm:text-base">Requested Delivery Date</label>
                  <input
                     defaultValue={oldReqDate.split('T')[0]}
                     type="date"
                     className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:outline-none"
                     {...register("requestedDeliveryDate", {
                        required: "Requested delivery date is required",
                        validate: {
                           isFuture: (date) =>
                              isFutureDate(date) || "Requested delivery date must be in the future"
                        }
                     })}
                  />
                  {errors.requestedDeliveryDate && (
                     <p className="text-red-500 text-sm">{errors.requestedDeliveryDate.message}</p>
                  )}
               </div>

               {/* Latitude */}
               <div>
                  <label className=" font-medium text-sm sm:text-base">Latitude</label>
                  <input
                     defaultValue={latitude}
                     type="number"
                     step="any"
                     placeholder="Enter latitude"
                     className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:outline-none"
                     {...register("latitude", {
                        required: "Latitude is required",
                        min: {
                           value: -90,
                           message: "Latitude must be at least -90"
                        },
                        max: {
                           value: 90,
                           message: "Latitude cannot be greater than 90"
                        }
                     })}
                  />
                  {errors.latitude && <p className="text-red-500 text-sm">{errors.latitude.message}</p>}
               </div>

               {/* Longitude */}
               <div>
                  <label className=" font-medium text-sm sm:text-base">Longitude</label>
                  <input
                     defaultValue={longitude}
                     type="number"
                     step="any"
                     placeholder="Enter longitude"
                     className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:outline-none"
                     {...register("longitude", {
                        required: "Longitude is required",
                        min: {
                           value: -180,
                           message: "Longitude must be at least -180"
                        },
                        max: {
                           value: 180,
                           message: "Longitude cannot be greater than 180"
                        }
                     })}
                  />
                  {errors.longitude && <p className="text-red-500 text-sm">{errors.longitude.message}</p>}
               </div>

            </div>
            {/* Submit Button */}
            <button
               type="submit"
               className="mt-6 px-4 py-2 col-span-2 w-full bg-blue-600 text-white rounded hover:bg-blue-700 transition"
            >
               Update parcel
            </button>
         </form>
      </div>
   );
};

export default UpdateParcel;