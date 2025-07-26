// import React from 'react';
import useAxiosPublic from '../../../hooks/useAxiosPublic';
import { useQuery } from '@tanstack/react-query';

const TopDeliveryMen = () => {
  const axiosPublic = useAxiosPublic();
  const { data: topDelivery = [], isLoading } = useQuery({
    queryKey: ['topDelivery'],
    queryFn: async () => {
      const { data } = await axiosPublic.get('/topDeliveryMen');
      return data;
    }
  });

  if (isLoading) {
    return (
      <div className="flex justify-center py-20">
        <span className="loading loading-bars loading-lg"></span>
      </div>
    );
  }

  return (
    <div className="bg-white py-14">
      <div className="text-center mb-12 px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-orange-600 drop-shadow-xl">
          🚚 Top Delivery Heroes
        </h2>
        <p className="text-gray-600 mt-2 text-sm md:text-base">
          Recognizing our most trusted and efficient delivery champions!
        </p>
      </div>

      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 justify-items-center">
          {topDelivery.slice(0, 3).map((man) => (
            <div
              key={man.id}
              className="w-72 h-auto bg-white border-2 border-orange-400 rounded-xl shadow-md hover:shadow-xl transition-transform transform hover:-translate-y-2 p-6 flex flex-col items-center"
            >
              <div className="w-32 h-32 overflow-hidden border-4 border-orange-500 rounded-md shadow-sm">
                <img
                  src={man.image}
                  alt={man.name}
                  className="w-full h-full object-cover"
                />
              </div>

              <h3 className="text-lg font-bold text-orange-600 mt-4 uppercase tracking-wide text-center">
                {man?.name}
              </h3>

              <p className="text-gray-700 text-sm mt-1 text-center">
                Parcels Delivered: <span className="font-semibold text-gray-900">{man?.deliveryCount}</span>
              </p>

              <div className="flex mt-2">
                {Array.from({ length: 5 }, (_, index) => (
                  <span
                    key={index}
                    className={`text-lg ${index < Math.round(man?.reviewAverage) ? 'text-yellow-400' : 'text-gray-300'}`}
                  >
                    ★
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TopDeliveryMen;
