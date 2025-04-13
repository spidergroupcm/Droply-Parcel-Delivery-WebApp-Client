import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import useAxiosSecure from '../../../../hooks/useAxiosSecure';
import AllParcelRow from './AllParcelRow';
import { Helmet } from 'react-helmet-async';
import useAxiosPublic from '../../../../hooks/useAxiosPublic';
import toast from 'react-hot-toast';

const AllParcels = () => {
    const axiosSecure = useAxiosSecure()
    const [toDate, setToDate] = useState('')
    const [fromDate, setFromDate] = useState('')
    const [filterDate, setFilterDate] = useState({})
    const [clear, setClear] = useState(false)


    const { data: allParcels = [], isLoading, refetch } = useQuery({
        queryKey: ['allParcels', filterDate],
        queryFn: async () => {
            const { data } = await axiosSecure.get('/parcels', { params: filterDate });
            return data;
        },
    });

    const { data: deliveryMans } = useQuery({
        queryKey: ['deliveryMans'],
        queryFn: async () => {
            const { data } = await axiosSecure.get('/assignDeliveryMan')
            return data;
        }
    })


    const handleSubmit = (e) => {
        e.preventDefault();
        if (fromDate && toDate) {
            if (toDate < fromDate) {
                alert("To Date must be later than or equal to Delivery Date.");
                return;
            }
            setFilterDate({
                fromDate,
                toDate,
            });
            setClear(true)
        } else {
            setFilterDate({});
        }
        refetch();
    };


    const handleAll = () => {
        setFilterDate({})
        setClear(false)
    }

    return (
        <div className="p-1 md:p-4 lg:p-6  text-black">
            <Helmet>
                <title>All Parcels | Dashboard</title>
            </Helmet>
            <div>
                <h1 className="text-2xl font-bold mb-4 text-center">All Parcels: ({allParcels.length})</h1>
                <div className="p-4 w-full lg:w-2/3 xl:w-2/5 grid grid-cols-1 md:grid-cols-3 
                gap-4 mx-auto items-center justify-center content-center ">
                    <div className="">
                        <label htmlFor="fromDate" className="block mb-2 font-medium">
                            From Date:
                        </label>
                        <input
                            type="date"
                            id="fromDate"
                            name="fromDate"
                            onChange={(e) => setFromDate(new Date(e.target.value).toISOString())}
                            className="border rounded-lg p-2 w-full md:max-w-32 text-sm"
                        />
                    </div>
                    <div className="">
                        <label htmlFor="toDate" className="block mb-2 font-medium">
                            To Date:
                        </label>
                        <input
                            type="date"
                            id="toDate"
                            name="toDate"
                            onChange={(e) => setToDate(new Date(e.target.value).toISOString())}
                            className="border rounded-lg p-2 w-full md:max-w-32 text-sm"
                        />
                    </div>
                    <div className="flex md:mt-7 gap-2 items-center">
                        <button
                            onClick={handleSubmit}
                            className="bg-purple-500 hover:bg-purple-600 text-white btn btn-sm w-full "
                        >
                            Filter by Req. date
                        </button>
                        {clear && <button
                            onClick={handleAll}
                            className="bg-gray-300 hover:bg-gray-400 btn btn-sm "
                        >
                            Alls
                        </button>}
                    </div>
                </div>
            </div>

            <div className="overflow-x-auto">
                <table className="table-auto w-full border-collapse border">
                    <thead className="bg-gray-200">
                        <tr>
                            <th className="border border-gray-300 px-1 sm:px-2 md:px-4 py-2 text-sm md:text-base">#</th>
                            <th className="border border-gray-300 px-1 sm:px-2 md:px-4 py-2 text-sm md:text-base">Name</th>
                            <th className="border border-gray-300 px-1 sm:px-2 md:px-4 py-2 text-sm md:text-base">Number</th>
                            <th className="border border-gray-300 px-1 sm:px-2 md:px-4 py-2 text-sm md:text-base">Booking Date</th>
                            <th className="border border-gray-300 px-1 sm:px-2 md:px-4 py-2 text-sm">Req. Delivery Date</th>
                            <th className="border border-gray-300 px-1 sm:px-2 md:px-4 py-2 text-sm md:text-base">Cost</th>
                            <th className="border border-gray-300 px-1 sm:px-2 md:px-4 py-2 text-sm md:text-base">Status</th>
                            <th className="border border-gray-300 px-1 sm:px-2 md:px-4 py-2 text-sm md:text-base">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            allParcels.map((parcel, index) => (
                                <AllParcelRow
                                    key={parcel._id}
                                    parcel={parcel}
                                    index={index}
                                    deliveryMans={deliveryMans}
                                    refetch={refetch}
                                ></AllParcelRow>
                            ))
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AllParcels; 