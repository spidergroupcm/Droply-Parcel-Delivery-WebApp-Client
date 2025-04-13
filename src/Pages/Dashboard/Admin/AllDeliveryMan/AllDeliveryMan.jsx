import React from 'react';
import useAxiosSecure from '../../../../hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import { Helmet } from 'react-helmet-async';

const AllDeliveryMan = () => {
   const axiosSecure = useAxiosSecure();

   const { data: allDeliveryMans, isLoading, isError } = useQuery({
      queryKey: ['allDeliveryMans'],
      queryFn: async () => {
         const { data } = await axiosSecure.get('/deliveryPage');
         return data;
      }
   });

   if (isLoading) {
      return <span className="loading loading-bars loading-lg"></span>
   }

   if (isError) {
      return <div>Error fetching data</div>;
   }

   return (
      <div className="overflow-x-auto">
         <Helmet>
            <title>All Delivery Men | Dashboard</title>
         </Helmet>
         <h2 className='text-2xl border-b-2 font-semibold uppercase py-4 md:py-6 text-center mb-4'>All Delivery Men</h2>

         <table className='min-w-full bg-white border border-gray-300'>
            <thead>
               <tr className='bg-gray-100'>
                  <th className='px-4 py-2 border-b text-left'>Delivery Man's Name</th>
                  <th className='px-4 py-2 border-b text-left'>Phone Number</th>
                  <th className='px-4 py-2 border-b text-left'>Parcels Delivered</th>
                  <th className='px-4 py-2 border-b text-left'>Average Review</th>
               </tr>
            </thead>
            <tbody>
               {allDeliveryMans.map((man) => (
                  <tr key={man.id} className='hover:bg-purple-100'>
                     <td className='px-4 py-2 border-b'>{man.name}</td>
                     <td className='px-4 py-2 border-b'>{man.phone}</td>
                     <td className='px-4 py-2 border-b'>{man.deliveryCount}</td>
                     <td className="px-4 py-2 border-b">
                        {`${man?.reviewAverage?.toFixed(1)} `} 
                        {Array.from({ length: 5 }, (_, index) => (
                           <span key={index}>
                              {index < Math.round(man?.reviewAverage) ? '⭐' : '☆'}
                           </span>
                        ))}
                     </td>
                  </tr>
               ))}
            </tbody>
         </table>
      </div>
   );
};

export default AllDeliveryMan;
