import React, { useState } from "react";
import useAuth from "../../../../hooks/useAuth";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";

const BookParcel = () => {
  const { user } = useAuth();
  const [price, setPrice] = useState(0);
  const [parcelWeight, setParcelWeight] = useState(0);
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    reset,
  } = useForm();

  // Fetch user's current location
  const getCurrentLocation = () => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const lat = position.coords.latitude;
          const lon = position.coords.longitude;
          setValue("latitude", lat);
          setValue("longitude", lon);
          toast.success("Location fetched successfully!");
        },
        (error) => {
          toast.error("Error fetching location: " + error.message);
        }
      );
    } else {
      toast.error("Geolocation is not supported by this browser.");
    }
  };

  // Handle weight change and price calculation
  const handleWeightChange = (e) => {
    const weight = parseFloat(e.target.value);

    // if (isNaN(weight) {
    //   toast.error("Please enter a valid number for weight");
    //   setPrice(0);
    //   setParcelWeight(0);
    //   return;
    // }

    if (isNaN(weight)) {
        toast.error("Please enter a valid number for weight");
        setPrice(0);
        setParcelWeight(0);
        return;
      }
      

    if (weight <= 0) {
      toast.error("Weight must be greater than 0");
      setPrice(0);
      setParcelWeight(0);
      return;
    }

    const calculatedPrice = weight * 50; // 50 TK per kg
    setParcelWeight(weight);
    setPrice(calculatedPrice);
    setValue("price", calculatedPrice);
  };

  // Check if the requested delivery date is in the future
  const isFutureDate = (date) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return new Date(date) > today;
  };

  // Handle form submission
  const onSubmit = async (data) => {
    const {
      phoneNumber,
      parcelType,
      receiverName,
      receiverPhoneNumber,
      deliveryAddress,
      requestedDeliveryDate,
      latitude,
      longitude,
    } = data;

    if (price <= 0) {
      return toast.error("Please enter a valid weight.");
    }

    const formData = {
      name: user?.displayName,
      email: user?.email,
      phoneNumber,
      parcelType,
      parcelWeight,
      receiverName,
      receiverPhoneNumber,
      deliveryAddress,
      requestedDeliveryDate: new Date(requestedDeliveryDate).toISOString(),
      latitude: parseFloat(latitude),
      longitude: parseFloat(longitude),
      price,
      bookingDate: new Date().toISOString(),
      status: "pending",
    };

    try {
      const res = await axiosSecure.post("/parcels", formData);
      if (res.data.insertedId) {
        Swal.fire({
          title: "Success!",
          text: "Your Parcel has been successfully booked!",
          icon: "success",
          confirmButtonText: "OK",
        });
        reset();
        setPrice(0);
        setParcelWeight(0);
        navigate("/dashboard/my-parcels");
      }
    } catch (error) {
      toast.error("Error booking parcel: " + error.message);
    }
  };

  return (
    <div className="max-w-3xl mx-auto mt-10 p-6 border rounded-lg shadow-lg bg-white">
      <Helmet>
        <title>Book Parcel | Droply</title>
      </Helmet>

      <h2 className="text-3xl font-bold text-center text-purple-700 mb-6">
        Book a Parcel
      </h2>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* User Name */}
          <div className="mb-4">
            <label className="font-medium block mb-2">Name</label>
            <input
              type="text"
              value={user?.displayName || ""}
              readOnly
              className="w-full p-2 border rounded bg-gray-100 focus:outline-none"
            />
          </div>

          {/* User Email */}
          <div className="mb-4">
            <label className="font-medium block mb-2">Email</label>
            <input
              type="email"
              value={user?.email || ""}
              readOnly
              className="w-full p-2 border rounded bg-gray-100 focus:outline-none"
            />
          </div>

          {/* Phone Number */}
          <div className="mb-4">
            <label className="font-medium block mb-2">Your Phone Number</label>
            <input
              type="text"
              placeholder="Your phone number"
              className="w-full p-2 border rounded focus:outline-none"
              {...register("phoneNumber", { 
                required: "Phone number is required",
                pattern: {
                  value: /^[0-9]{10,15}$/,
                  message: "Please enter a valid phone number"
                }
              })}
            />
            {errors.phoneNumber && (
              <p className="text-red-500 text-sm mt-1">{errors.phoneNumber.message}</p>
            )}
          </div>

          {/* Parcel Type */}
          <div className="mb-4">
            <label className="font-medium block mb-2">Parcel Type</label>
            <select
              className="w-full p-2 border rounded focus:outline-none"
              {...register("parcelType", { required: "Parcel type is required" })}
            >
              <option value="">Select parcel type</option>
              <option value="Document">Document</option>
              <option value="Electronics">Electronics</option>
              <option value="Clothing">Clothing</option>
              <option value="Food">Food</option>
              <option value="Fragile">Fragile</option>
              <option value="Other">Other</option>
            </select>
            {errors.parcelType && (
              <p className="text-red-500 text-sm mt-1">{errors.parcelType.message}</p>
            )}
          </div>

          {/* Parcel Weight */}
          <div className="mb-4">
            <label className="font-medium block mb-2">Parcel Weight (kg)</label>
            <input
              type="number"
              step="0.1"
              min="0.1"
              placeholder="Enter parcel weight"
              className="w-full p-2 border rounded focus:outline-none"
              onChange={handleWeightChange}
              required
            />
          </div>

          {/* Price */}
          <div className="mb-4">
            <label className="font-medium block mb-2">Price (Tk)</label>
            <input
              type="text"
              value={`${price.toFixed(2)} Tk`}
              readOnly
              className="w-full p-2 border rounded bg-gray-100 focus:outline-none"
            />
          </div>

          {/* Receiver's Name */}
          <div className="mb-4">
            <label className="font-medium block mb-2">Receiver's Name</label>
            <input
              type="text"
              placeholder="Receiver's name"
              className="w-full p-2 border rounded focus:outline-none"
              {...register("receiverName", { 
                required: "Receiver's name is required",
                minLength: {
                  value: 2,
                  message: "Name must be at least 2 characters"
                }
              })}
            />
            {errors.receiverName && (
              <p className="text-red-500 text-sm mt-1">{errors.receiverName.message}</p>
            )}
          </div>

          {/* Receiver's Phone Number */}
          <div className="mb-4">
            <label className="font-medium block mb-2">Receiver's Phone Number</label>
            <input
              type="text"
              placeholder="Receiver's phone number"
              className="w-full p-2 border rounded focus:outline-none"
              {...register("receiverPhoneNumber", { 
                required: "Receiver's phone number is required",
                pattern: {
                  value: /^[0-9]{10,15}$/,
                  message: "Please enter a valid phone number"
                }
              })}
            />
            {errors.receiverPhoneNumber && (
              <p className="text-red-500 text-sm mt-1">{errors.receiverPhoneNumber.message}</p>
            )}
          </div>

          
  
{/* <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full"> */}
{/* Delivery Address */}
<div className="bg-gray-100  p-4 rounded ">
<label className="font-medium block mb-2">Delivery Address</label>
<textarea
placeholder="Enter delivery address"
rows="3"
className="w-full p-2 border rounded focus:outline-none"
{...register("deliveryAddress", { 
  required: "Delivery address is required",
  minLength: {
    value: 10,
    message: "Address must be at least 10 characters"
  }
})}
/>
{errors.deliveryAddress && (
<p className="text-red-500 text-sm mt-1">{errors.deliveryAddress.message}</p>
)}
</div>

{/* Requested Delivery Date */}
<div className="bg-gray-100 p-4 rounded">
<label className="font-medium block mb-2">Requested Delivery Date</label>
<input
type="date"
className="w-full p-2 border rounded focus:outline-none"
{...register("requestedDeliveryDate", {
  required: "Requested delivery date is required",
  validate: (date) => 
    isFutureDate(date) || "Date must be in the future",
})}
/>
{errors.requestedDeliveryDate && (
<p className="text-red-500 text-sm mt-1">{errors.requestedDeliveryDate.message}</p>
)}
</div>

{/* Latitude & Longitude */}
<div className="grid grid-cols-1 md:grid-cols-2 gap-4 col-span-2">
{/* Latitude */}
<div>
<label className="font-medium block mb-2">Latitude</label>
<input 
  type="number" 
  step="any" 
  placeholder="Latitude" 
  className="w-full p-2 border rounded focus:outline-none" 
  {...register("latitude", { 
    required: "Latitude is required", 
    min: {
      value: -90,
      message: "Latitude must be between -90 and 90"
    },
    max: {
      value: 90,
      message: "Latitude must be between -90 and 90"
    }
  })} 
/>
{errors.latitude && (
  <p className="text-red-500 text-sm mt-1">{errors.latitude.message}</p>
)}
</div>

{/* Longitude */}
<div>
<label className="font-medium block mb-2">Longitude</label>
<input 
  type="number" 
  step="any" 
  placeholder="Longitude" 
  className="w-full p-2 border rounded focus:outline-none" 
  {...register("longitude", { 
    required: "Longitude is required", 
    min: {
      value: -180,
      message: "Longitude must be between -180 and 180"
    },
    max: {
      value: 180,
      message: "Longitude must be between -180 and 180"
    }
  })} 
/>
{errors.longitude && (
  <p className="text-red-500 text-sm mt-1">{errors.longitude.message}</p>
)}
</div>
</div>
{/* </div> */}




          {/* Current Location Button */}
          <div className="col-span-2 mb-4">
            <button
              type="button"
              onClick={getCurrentLocation}
              className="w-full px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
            >
              Use My Current Location
            </button>
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full mt-6 px-4 py-2 bg-purple-500 text-white rounded hover:bg-purple-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={price <= 0}
        >
          Book Parcel
        </button>
      </form>
    </div>
  );
};

export default BookParcel;

