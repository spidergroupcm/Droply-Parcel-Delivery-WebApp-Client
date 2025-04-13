import React from 'react';
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
        return <div className="flex justify-center py-20"><span className="loading loading-bars loading-lg"></span></div>;
    }

    return (
        <div className="bg-gradient-to-r from-purple-500 to-orange-500 py-10">
            <div className="container mx-auto px-6 text-center">
                <h2 className="text-3xl md:text-4xl font-extrabold text-white drop-shadow-lg">Top Delivery Heroes</h2>
            </div>

            <div className="flex justify-center mt-12 px-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-10 max-w-5xl">
                    {topDelivery.slice(0, 3).map((man) => (
                        <div
                            key={man.id}
                            className="bg-white w-64 h-64 rounded-full shadow-xl overflow-hidden flex flex-col items-center justify-center transform transition duration-500 hover:scale-105 hover:shadow-2xl"
                        >
                            <div className="w-28 h-28 rounded-full overflow-hidden border-4 border-purple-500">
                                <img
                                    src={man.image}
                                    alt={man.name}
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            <h3 className="text-xl font-semibold text-purple-700 uppercase mt-4">{man?.name}</h3>
                            <p className="text-gray-600 mt-1 text-sm font-medium">
                                Parcels Delivered: <span className="font-bold text-gray-900">{man?.deliveryCount}</span>
                            </p>
                            <div className="flex mt-2">
                                {Array.from({ length: 5 }, (_, index) => (
                                    <span
                                        key={index}
                                        className={`text-xl ${index < Math.round(man?.reviewAverage) ? 'text-yellow-400' : 'text-gray-300'}`}
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

