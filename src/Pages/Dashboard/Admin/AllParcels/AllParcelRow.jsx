import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../../../hooks/useAxiosSecure';
import toast from 'react-hot-toast';
import Swal from 'sweetalert2';
import axios from 'axios';

const AllParcelRow = ({ parcel, index, deliveryMans, refetch }) => {
    const axiosSecure = useAxiosSecure();
    const [modalOpen, setModalOpen] = useState(false);

    const [selectedDeliveryMan, setSelectedDeliveryMan] = useState("");
    const [deliveryDate, setDeliveryDate] = useState("");


    const handleAssignDelivery = async () => {
        if (!selectedDeliveryMan || !deliveryDate) {
            toast.error("Please select both delivery man and delivery date!");
            return;
        }

        // Check if the date is in the future
        const currentDate = new Date();

        const selectedDate = new Date(deliveryDate);

        if (selectedDate <= currentDate) {
            toast.error("Please select a future date.");
            return;
        }
        const assignInfo = {
            approximateDeliveryDate: deliveryDate,
            deliveryManId: selectedDeliveryMan
        }

        // console.log(assignInfo)
        try {
            const { data } = await axiosSecure.patch(`/parcels/assign/${parcel._id}`, assignInfo)
            // console.log(data);
            if (data.modifiedCount > 0) {
                refetch()
                Swal.fire({
                    title: "Assign the parcel to delivery man successfully!",
                    icon: "success",
                    draggable: true
                });
            }
        }
        catch (error) {
            // console.log('assign error', error)
        }
        finally {
            setModalOpen(false)
        }
    };
  
    

    // axios.get(`/singleParcel/`) 

    return (
        <tr key={parcel._id} className="hover:bg-purple-100">
            <td className="border text-xs md:text-base border-gray-300 dark:border-gray-600 px-2 md:px-4 py-2 text-center">
                {index + 1}
            </td>
            <td className="border text-xs md:text-base border-gray-300 px-2 md:px-4 py-2">{parcel.name}</td>
            <td className="border text-xs md:text-base border-gray-300 px-2 md:px-4 py-2">{parcel.phoneNumber}</td>
            <td className="border text-xs md:text-base border-gray-300 px-2 md:px-4 py-2 text-center">
                {parcel.bookingDate?.split('T')[0]}</td>
            <td className="border text-xs md:text-base border-gray-300 px-2 md:px-4 py-2 text-center">
                {parcel.requestedDeliveryDate?.split('T')[0]}</td>
            <td className="border text-xs md:text-base border-gray-300 px-1 sm:px-2 md:px-4 py-2 text-center">{parcel.price}</td>

            {/* booking status  */}
            <td
                className={`border capitalize  text-xs font-semibold md:text-base border-gray-300 px-2 md:px-4 py-2 ${parcel.bookingStatus === 'pending'
                    ? 'text-yellow-500'
                    : parcel.bookingStatus === 'on the way'
                        ? 'text-blue-500'
                        : parcel.bookingStatus === 'delivered'
                            ? 'text-green-500'
                            : 'text-red-500'
                    }`}
            >
                {parcel.bookingStatus}
            </td>

            <td className="border text-xs md:text-base border-gray-300 px-2 md:px-4 py-2 text-center">

                {/* conditional managed button */}

                {
                    parcel?.bookingStatus === 'pending' ?
                        <>
                            <button
                                className="btn btn-sm text-xs bg-yellow-400 hover:bg-yellow-500"
                                onClick={() => setModalOpen(true)} // Open modal on Manage button click
                            >
                                Manage
                            </button>
                        </> :
                        <>
                            {parcel.bookingStatus === 'on the way' || parcel.bookingStatus === 'cancelled' ?
                                <>
                                    <button
                                        className="btn btn-sm text-xs bg-yellow-600 hover:bg-yellow-700 text-white"
                                        onClick={() => setModalOpen(true)} // Open modal on Manage button click
                                    >
                                        re-assign
                                    </button>
                                </>
                                :
                                <>
                                    {
                                        parcel.bookingStatus === 'returned' || parcel.bookingStatus === 'delivered' ?
                                            <>
                                                <button
                                                    className="btn text-xs btn-sm cursor-not-allowed bg-gray-600 text-white hover:bg-gray-700"
                                                >
                                                    not available
                                                </button>
                                            </>
                                            :
                                            <>
                                            </>
                                    }
                                </>
                            }
                        </>
                }


                {/* <button
                    className="btn"
                    onClick={() => setModalOpen(true)} // Open modal on Manage button click
                >
                    Manage
                </button> */}

                {/* Modal */}
                {modalOpen && (
                    <dialog className="modal modal-bottom sm:modal-middle" open>
                        <div className="modal-box border bg-gray-100">
                            <h3 className="font-bold text-lg font-mono">Assign Delivery</h3>

                            <div className="mb-4">
                                <label htmlFor="deliveryMan" className="block mb-2 py-1 bg-purple-300 font-thin">Select Delivery Man</label>
                                <select
                                    id="deliveryMan"
                                    className="select select-bordered w-full"
                                    onChange={(e) => setSelectedDeliveryMan(e.target.value)}
                                >
                                    <option value="">Select Delivery Man</option>
                                    {deliveryMans.map((man) => (
                                        <option key={man?._id} value={man?._id}>
                                            {man?.name}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div className="mb-4">
                                <label htmlFor="deliveryDate" className="block mb-2">Delivery Date</label>
                                <input
                                    id="deliveryDate"
                                    type="date"
                                    className="input input-bordered w-full"
                                    min={new Date().toISOString().split('T')[0]} // Make sure date is in the future
                                    onChange={(e) => setDeliveryDate(e.target.value)}
                                />
                            </div>

                            <div className="modal-action">
                                <button className="btn bg-gray-700 hover:bg-slate-800 hover:text-gray-50  text-white" onClick={() => setModalOpen(false)}>Close</button>
                                <button className="btn bg-purple-600 hover:bg-purple-800  text-white" onClick={handleAssignDelivery}>Assign</button>
                            </div>
                        </div>
                    </dialog>
                )}
            </td>
        </tr>
    );
};

export default AllParcelRow;
