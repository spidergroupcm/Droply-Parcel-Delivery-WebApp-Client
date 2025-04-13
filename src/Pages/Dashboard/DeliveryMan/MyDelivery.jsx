import React from 'react';
import useAuth from '../../../hooks/useAuth';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import MyDeliveryRow from './MyDeliveryRow';
import { Helmet } from 'react-helmet-async';
// import { FaLocationArrow, FaLocationPin, FaMagnifyingGlassLocation} from 'react-icons/fa6';

const MyDelivery = () => {
    const { user, loading } = useAuth();
    const axiosSecure = useAxiosSecure();

    const { data: myDeliveries = [], isLoading, isError, refetch } = useQuery({
        queryKey: ['myDeliveries', user?.email],
        enabled: !!user && !loading,
        queryFn: async () => {
            const { data } = await axiosSecure.get(`/myDelivery/${user?.email}`);
            return data;
        }
    });

    if (isLoading) {
        return <span className="loading loading-bars loading-lg"></span>
    }

    if (isError) {
        return <div className='text-red-500'>Error fetching data</div>;
    }



    return (
        <div className="overflow-x-auto">
            <Helmet>
                <title>My Delivery | Delivery Men </title>
            </Helmet>
            <h2 className='text-2xl text-center font-bold mb-4'>My Deliveries</h2>

            <table className='min-w-full bg-white border border-gray-300'>
                <thead>
                    <tr className='bg-gray-100'>
                        <th className='px-4 py-2 border-b text-left'>Booked User's Name</th>
                        <th className='px-4 py-2 border-b text-left'>Receiver's Name</th>
                        <th className='px-4 py-2 border-b text-left'>Booked User's Phone</th>
                        <th className='px-4 py-2 border-b text-left'>Requested Delivery Date</th>
                        <th className='px-4 py-2 border-b text-left'>Approximate Delivery Date</th>
                        <th className='px-4 py-2 border-b text-left'>Receiver's Phone</th>
                        <th className='px-4 py-2 border-b text-left'>Receiver's Address</th>
                        <th className='px-4 py-2 border-b text-left'>latitude & longitude</th>
                    </tr>
                </thead>
                <tbody>
                    {myDeliveries.map((parcel) => (
                        <MyDeliveryRow
                            key={parcel._id}
                            parcel={parcel}
                            refetch={refetch}
                        ></MyDeliveryRow>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default MyDelivery;
