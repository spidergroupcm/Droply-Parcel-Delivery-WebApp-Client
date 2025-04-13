import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../../hooks/useAuth";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import MyParcelRow from "./MyParcelRow";
import { useState } from "react";
import { Helmet } from "react-helmet-async";

const MyParcels = () => {
  const { user, loading } = useAuth();
  const [filter, setFilter] = useState('')
  const axiosSecure = useAxiosSecure();

  const { data: myParcels = [], isLoading: myParcelLoading, refetch } = useQuery({
    queryKey: ['myParcels', user?.email, filter],
    enabled: !loading || !!user,
    queryFn: async () => {
      const { data } = await axiosSecure.get(`/parcels/${user?.email}`, {
        params: { bookingStatus: filter }
      })
      return data;
    }
  })

  // console.log(myParcels)

  if (myParcelLoading) {
    return <span className="loading loading-bars loading-lg"></span>
  }
  return (
    <div className="p-1 md:p-4 lg:p-6  ">
      <Helmet>
        <title>My Parcels | Dashboard</title>
      </Helmet>
      <div className="flex justify-between md:items-center flex-col md:flex-row">
        <h1 className="text-2xl font-bold mb-4 text-center">Total Parcel: {myParcels?.length}</h1>
        <div className="text-base md:text-xl font-bold mb-4 text-center">
          <h2 className="mb-2">Filter by Status:</h2>
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className='w-full px-2 py-3 border border-lime-300 focus:outline-orange-500 rounded-md bg-white'>
            <option value=''>All</option>
            <option value='pending'>Pending</option>
            <option value='On the way'>On the way</option>
            <option value='delivered'>Delivered</option>
            <option value='returned'>returned</option>
            <option value='cancelled'>cancelled </option>
          </select>
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="table-auto w-full border-collapse border border-gray-300 dark:border-gray-600">
          <thead className="bg-gray-200 ">
            <tr>
              <th className="border border-gray-300 dark:border-gray-600 px-1 sm:px-2 md:px-4 py-2 text-sm md:text-base">#</th>
              <th className="border border-gray-300 dark:border-gray-600 px-1 sm:px-2 md:px-4 py-2 text-sm md:text-base">Parcel Type</th>
              <th className="border border-gray-300 dark:border-gray-600 px-1 sm:px-2 md:px-4 py-2 text-sm md:text-base">Req. Delivery </th>
              <th className="border border-gray-300 dark:border-gray-600 px-1 sm:px-2 md:px-4 py-2 text-sm md:text-base">Approx Delivery Date</th>
              <th className="border border-gray-300 dark:border-gray-600 px-1 sm:px-2 md:px-4 py-2 text-sm md:text-base">Booking Date</th>
              <th className="border border-gray-300 dark:border-gray-600 px-1 sm:px-2 md:px-4 py-2 text-sm md:text-base">Delivery Men ID</th>
              <th className="border border-gray-300 dark:border-gray-600 px-1 sm:px-2 md:px-4 py-2 text-sm md:text-base">Booking Status</th>
              <th className="border border-gray-300 dark:border-gray-600 px-1 sm:px-2 md:px-4 py-2 text-sm md:text-base">Action</th>
            </tr>
          </thead>
          <tbody>
            {
              myParcels.map((parcel, inx) => (<MyParcelRow inx={inx} parcel={parcel} key={parcel._id} refetch={refetch}></MyParcelRow>))
            }
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyParcels;