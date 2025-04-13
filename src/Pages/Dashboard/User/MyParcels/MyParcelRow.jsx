import { FaEdit } from "react-icons/fa";
import { MdCancel } from "react-icons/md";
import { MdOutlinePayment } from "react-icons/md";
import React, { useState } from 'react';
import { Link } from "react-router-dom";
import axios from "axios";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import toast from "react-hot-toast";
import useAuth from "../../../../hooks/useAuth";
import Swal from "sweetalert2";

const MyParcelRow = ({ parcel, inx, refetch }) => {
    const axiosSecure = useAxiosSecure()
    const { user } = useAuth()
    const [modalOpen, setModalOpen] = useState(false);

    const [star, setStar] = useState('')
    const [feedback, setFeedback] = useState("");

    const {
        _id,
        name,
        email,
        phoneNumber,
        parcelType,
        parcelWeight,
        receiverName,
        receiverPhoneNumber,
        deliveryAddress,
        requestedDeliveryDate,
        latitude,
        longitude,
        price,
        bookingDate,
        approximateDeliveryDate,
        deliveryManId,
        bookingStatus
    } = parcel;

    const handleCancel = (id) => {


        Swal.fire({
            title: "Are you sure for return this parcel?",
            text: "You can't undo it.!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, Return"
        }).then((result) => {
            if (result.isConfirmed) {

                axiosSecure.patch(`/parcels/returned/${id}`)
                    .then(res => {
                        if (res.data.modifiedCount > 0) {
                            refetch()
                            Swal.fire({
                                title: "Returned!",
                                text: "Your Returning Action Success",
                                icon: "success"
                            });
                            // console.log(res.data)
                        }
                    })
                    .catch(error => {
                        // console.log('status update error', error)
                    })

            }
        });
















    }

    // const paymentStatus = 'pai'

    const handleSubmitReview = () => {
        if (!star) {
            return toast.error('please write your feedback in the box')
        }
        const reviewData = {
            name: user?.displayName,
            image: user.photoURL,
            email: email,
            parcelId: _id,
            rating: star,
            feedback,
            deliveryManId
        };

        axiosSecure.post('/reviews', reviewData)
            .then(res => {
                // console.log(res.data);
                if (res.data.result.insertedId) {
                    refetch()
                    Swal.fire({
                        title: 'Review Submitted!',
                        text: 'Your review has been successfully submitted.',
                        icon: 'success',
                        confirmButtonText: 'OK',
                        customClass: {
                            confirmButton: 'bg-green-500 text-white'
                        }
                    });
                    setModalOpen(false);
                }
            }).catch(err => {
                // console.log('review error', err);
                toast.error('Failed to submit review. Please try again.', {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "dark"
                });
                setModalOpen(false);
            });

    };




    return (
        <>
            <tr className="hover:bg-purple-100">
                <td className="border text-xs md:text-base border-gray-300 px-2 md:px-4 py-2">{inx + 1}</td>
                <td className="border text-xs md:text-base border-gray-300 px-2 md:px-4 py-2 whitespace-nowrap">{parcelType}</td>
                <td className="border text-xs md:text-base border-gray-300 px-2 md:px-4 py-2 whitespace-nowrap">
                    {requestedDeliveryDate.split('T')[0]}</td>
                <td className="border text-xs md:text-base border-gray-300 px-2 md:px-4 py-2 whitespace-nowrap">
                    {approximateDeliveryDate.split('T')[0] || 'N/A'}</td>
                <td className="border text-xs md:text-base border-gray-300 px-2 md:px-4 py-2 whitespace-nowrap">
                    {bookingDate.split('T')[0]}</td>
                <td className="border text-xs md:text-base border-gray-300 px-2 md:px-4 py-2">{deliveryManId || 'N/A'}</td>


                {/* status */}
                <td
                    className={`border text-xs capitalize font-semibold md:text-base border-gray-300 px-2 md:px-4 py-2 ${parcel.bookingStatus === 'pending'
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


                {/* Action */}
                <td className="border text-xs md:text-base border-gray-300 space-x-3 px-2 md:px-4 py-2 flex justify-between items-center">
                    {/* Update Button */}
                    {bookingStatus === 'pending' ? (
                        <Link to={`/dashboard/update-parcel/${_id}`}>
                            <button title="Update">
                                <FaEdit />
                            </button>
                        </Link>
                    ) : bookingStatus === 'delivered' ? (
                        <button
                            disabled={parcel?.reviewStatus === 'done'}
                            className={`bg-orange-500 hover:bg-orange-800 text-xs p-1 text-white rounded-sm ${parcel?.reviewStatus === 'done' && 'bg-orange-800 cursor-not-allowed'}  `}
                            onClick={() => setModalOpen(true)}
                        >
                            {parcel?.reviewStatus === 'done' ? "Reviewed" : "review"}
                        </button>
                    ) : (
                        <button disabled={true} title="Update Not Allow" className="cursor-not-allowed opacity-50">
                            <FaEdit />
                        </button>
                    )}

                    {/* Cancel Button */}
                    {bookingStatus === 'delivered' ? null : (
                        <button
                            onClick={() => handleCancel(_id)}
                            title={`${bookingStatus !== 'pending' ? "Not allow" : ""}`}
                            disabled={bookingStatus !== 'pending'}
                            className={`text-red-500 ${bookingStatus !== 'pending' ? 'cursor-not-allowed opacity-50' : ''}`}
                        >
                            <MdCancel />
                        </button>
                    )}

                    {/* Payment Button */}
                    {bookingStatus === 'cancelled' || bookingStatus === 'returned' || parcel?.paymentStatus === 'paid' ? (
                        <div className="relative group cursor-not-allowed">
                            <button
                                className={`p-2 rounded-md bg-gray-400 font-medium text-[8px] border space-x-0 flex flex-col items-center ${parcel?.paymentStatus === 'paid' && "bg-green-800 cursor-not-allowed"}`}
                                disabled
                            >
                                <MdOutlinePayment
                                    className={`text-base ${parcel?.paymentStatus === 'paid' && "text-white"} `} />
                            </button>
                            <span className="absolute bottom-full left-1/2 transform -translate-x-1/2 -translate-y-1 bg-black text-white text-xs font-semibold rounded-md px-2 py-1 opacity-0 group-hover:opacity-100 transition-opacity duration-150 whitespace-nowrap">
                                {parcel?.paymentStatus === 'paid' ? `Paid $ ${price}` : `Pay ${price}`}
                            </span>
                        </div>
                    ) : (
                        <Link to={`/dashboard/payment/${_id}`}>
                            <div className="relative group">
                                <button className="p-2 rounded-md bg-gradient-to-r from-green-400 to-green-600 font-medium text-[8px] border space-x-0 flex flex-col items-center">
                                    <MdOutlinePayment className="text-base" />
                                </button>
                                <span className="absolute bottom-full left-1/2 transform -translate-x-1/2 -translate-y-1 bg-black text-white text-xs font-semibold rounded-md px-2 py-1 opacity-0 group-hover:opacity-100 transition-opacity duration-150 whitespace-nowrap">
                                    Pay ${price}
                                </span>
                            </div>
                        </Link>
                    )}
                    {/* modal for delivery man by customer/user review  */}
                    {modalOpen && (
                        <dialog className="modal" open>
                            <div className="modal-box border bg-purple-50">
                                <h3 className="font-bold flex items-center justify-center py-2  text-center text-2xl border-b">Give Review</h3>

                                <div className="mb-2 flex items-center gap-2 mt-3">
                                    {
                                        user && <img
                                            src={user.photoURL}
                                            alt="User"
                                            className="w-16 h-16 rounded-full object-cover border"
                                        />
                                    }
                                    <h2 className="text-black font-bold text-xl">{user?.displayName}</h2>
                                </div>

                                <div className="mb-2 font-medium">
                                    <label>Rating (Out of 5)</label>
                                    <div className="flex space-x-1 text-3xl">
                                        {[1, 2, 3, 4, 5].map((num) => (
                                            <span
                                                key={num}
                                                className={`cursor-pointer ${star >= num ? 'text-yellow-400' : 'text-gray-300'
                                                    }`}
                                                onClick={() => setStar(num)}
                                            >
                                                ★
                                            </span>
                                        ))}
                                    </div>
                                </div>

                                <div className="mb-2">
                                    <label className="font-medium text-gray-700 pb-2">Feedback</label>
                                    <textarea
                                        className="textarea textarea-bordered w-full mt-1"
                                        rows="3"
                                        value={feedback}
                                        onChange={(e) => setFeedback(e.target.value)}
                                        placeholder="Write your feedback..."
                                    ></textarea>
                                </div>

                                <div className="mb-2">
                                    <label>Delivery Man's ID</label>
                                    <input
                                        type="text"
                                        className="input input-bordered w-full bg-gray-200"
                                        value={deliveryManId || 'N/A'}
                                        readOnly
                                    />
                                </div>

                                <div className="modal-action">
                                    <button
                                        onClick={() => setModalOpen(false)}
                                        className="btn btn-sm bg-gray-500 text-white"
                                    >
                                        Close
                                    </button>
                                    <button
                                        disabled={!star || !feedback}
                                        onClick={handleSubmitReview}
                                        className="btn btn-sm bg-purple-600 text-white"
                                    >
                                        Submit
                                    </button>
                                </div>
                            </div>
                        </dialog>
                    )}
                </td>
            </tr>
        </>
    );
};

export default MyParcelRow;