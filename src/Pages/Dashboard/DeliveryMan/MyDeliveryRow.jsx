import { FaMapLocationDot } from "react-icons/fa6";
import React, { useState } from 'react';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import Swal from 'sweetalert2';
import toast from "react-hot-toast";
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import Modal from 'react-modal';
import './map.css'

const MyDeliveryRow = ({ parcel, refetch }) => {
    const axiosSecure = useAxiosSecure()
    const [selectedLocation, setSelectedLocation] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleCancel = (parcelId) => {
        // console.log(parcelId)
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able undo this Cancelled",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, Cancel it!"
        }).then((result) => {
            if (result.isConfirmed) {

                axiosSecure.patch(`/parcels/bookingStatus/${parcelId}`, { bookingStatus: 'cancelled' })
                    .then(res => {
                        if (res.data.modifiedCount > 0) {
                            refetch()
                            Swal.fire({
                                title: "Cancelled!",
                                text: "Your have cancelled this parcel.",
                                icon: "success"
                            });
                        }

                    }).catch(error => {
                        // console.log(error)
                    })
            }
        });
    };

    const handleDeliver = (parcelId) => {

        axiosSecure.patch(`/parcels/bookingStatus/${parcelId}`, { bookingStatus: 'delivered' })
            .then(res => {
                if (res.data.modifiedCount > 0) {
                    refetch()
                    Swal.fire({
                        title: "Delivered!",
                        text: "This Parcel is now delivered",
                        icon: "success"
                    });
                }

            }).catch(error => {
                // console.log(error)
            })
    };

    const handleDelete = async (parcelId) => {
        try {
            const { data } = await axiosSecure.patch(`/parcels/removeAssign/${parcelId}`)
            // console.log(data);
            if (data.modifiedCount > 0) {
                toast.success('successfully deleted from the list')
                refetch()
            }
        }
        catch (error) {
            // console.log('Remove from assign error', error)
        }
    }


    // for map

    const handleShowMap = (latitude, longitude) => {
        setSelectedLocation({ latitude, longitude });
        // console.log(latitude, longitude)
        setIsModalOpen(true);
    }

    // console.log(isModalOpen)

    const closeModal = () => {
        setIsModalOpen(false);
    };

    return (
        <>
            <tr key={parcel._id} className='hover:bg-gray-50'>
                <td className='px-4 py-2 border-b'>{parcel.name}</td>
                <td className='px-4 py-2 border-b'>{parcel.receiverName}</td>
                <td className='px-4 py-2 border-b'>{parcel.phoneNumber}</td>
                <td className='px-4 py-2 border-b'>{parcel?.requestedDeliveryDate?.split("T")[0]}</td>
                <td className='px-4 py-2 border-b'>{parcel.approximateDeliveryDate}</td>
                <td className='px-4 py-2 border-b'>{parcel.receiverPhoneNumber}</td>
                <td className='px-4 py-2 border-b'>{parcel.deliveryAddress}</td>
                <td className='px-4 py-2 border-b flex gap-2'>

                    {/* on the way => cancel, cancelled=> delete button, then if delete=> go again pending list and remove from myDelivery */}
                    {
                        parcel?.bookingStatus === 'on the way' ?
                            <>
                                <button
                                    onClick={() => handleCancel(parcel._id)}
                                    className='bg-red-500 text-white py-1 px-3 rounded mr-2'
                                >
                                    Cancel
                                </button>
                            </> :
                            <>
                                {parcel?.bookingStatus === 'cancelled' ?
                                    <>
                                        {/* if click delete:  TO Do: parcel collection to remove DeliveryManId 
                                OR: status patch tto again pending set
                                */}
                                        <button
                                            onClick={() => handleDelete(parcel._id)}
                                            className='bg-red-500 text-white py-1 px-3 rounded mr-2'
                                        >
                                            delete
                                        </button>



                                        <button
                                            className='bg-gray-700 bg-opacity-35 text-white cursor-not-allowed py-1 px-3 rounded mr-2'
                                        >
                                            cancelled
                                        </button>


                                    </> :
                                    <>
                                        {
                                            parcel?.bookingStatus === 'delivered' &&
                                            <>
                                                <button
                                                    className='bg-gray-700 bg-opacity-35 text-white cursor-not-allowed py-1 px-3 rounded mr-2'
                                                >
                                                    Cancel
                                                </button>
                                            </>

                                        }

                                    </>
                                }
                            </>
                    }
                    {/* delivery Button */}
                    {
                        parcel?.bookingStatus === 'on the way' ?
                            <>
                                <button
                                    onClick={() => handleDeliver(parcel._id)}
                                    className='bg-green-500 text-white py-1 px-3 rounded'
                                >
                                    Deliver
                                </button>
                            </> :
                            <>
                                {parcel?.bookingStatus === 'delivered' &&
                                    <>
                                        <button
                                            className='bg-gray-800 opacity-45 cursor-not-allowed text-white py-1 px-3 rounded'
                                        >
                                            Delivered
                                        </button>
                                    </>}
                            </>
                    }
                    {/* show map */}
                    {/* TODO- in challenge part */}
                    <button
                        onClick={() => handleShowMap(parcel.latitude, parcel.longitude)}
                        className="bg-gradient-to-r from-blue-500 to-green-500 text-white py-2 px-4 rounded-full flex items-center justify-center hover:from-blue-600 hover:to-green-600 transition duration-300"
                    >
                        <FaMapLocationDot className="text-white text-xl" />
                    </button>

                </td>
            </tr>
            {/* Modal to show Map */}
            <Modal
                isOpen={isModalOpen} // Modal visibility based on state
                onRequestClose={closeModal} // Close modal on background click
                contentLabel="Map Modal"
                ariaHideApp={false} // This disables accessibility warning for this modal (required for react-modal)
                className="modal-content w-full md:w-1/2" // Add custom class for modal styling
                overlayClassName="modal-overlay" // Add custom class for overlay styling
            >
                <button onClick={closeModal} className="close-modal-btn">Close</button> {/* Close button */}

                {/* Map will appear inside the modal */}
                {selectedLocation && (
                    <div className="mt-4">
                        <MapContainer
                            center={[selectedLocation.latitude, selectedLocation.longitude]} // Position map based on latitude and longitude
                            zoom={13}
                            className=""
                            style={{ height: "400px", width: "100%" }}
                        >
                            <TileLayer
                                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                            />
                            <Marker position={[selectedLocation.latitude, selectedLocation.longitude]}>
                                <Popup>
                                    Delivery Location for {parcel.name}
                                </Popup>
                            </Marker>
                        </MapContainer>
                    </div>
                )}
            </Modal>
        </>
    );
};

export default MyDeliveryRow;