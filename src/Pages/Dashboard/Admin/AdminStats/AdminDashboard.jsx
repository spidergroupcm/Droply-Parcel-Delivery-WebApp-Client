import React from 'react';
import { BarChart, Bar, XAxis, ResponsiveContainer, YAxis } from 'recharts';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../../../hooks/useAxiosSecure';

const AdminDashboard = () => {
    const axiosSecure = useAxiosSecure();

    // Fetch data using react-query
    const { data: parcels = [] } = useQuery({
        queryKey: ['parcels'],
        queryFn: async () => {
            const { data } = await axiosSecure.get('/parcels');
            return data;
        },
    });

    // Process the fetched data using reduce to group by date
    const chartData = Object.values(
        parcels.reduce((acc, parcel) => {
            const date = parcel?.bookingDate?.split('T')[0];
            if (acc[date]) {
                acc[date].value += 1;
            } else {
                acc[date] = { date: date, value: 1 };
            }
            return acc;
        }, {})
    );

    const testing = parcels.reduce((acc, parcel) => {
        const date = parcel?.bookingDate?.split('T')[0];
        if (acc[date]) {
            acc[date].value += 1;
        } else {
            acc[date] = { date: date, value: 1 };
        }
        return acc;
    }, {})

    console.log(testing)
    
    return (
        <div className="p-4">
            <div className="flex flex-col items-center">
                <h3 className="text-2xl font-bold text-purple-500 mb-4">
                    Booking Chart (total: {parcels?.length})
                </h3>
                <div className="w-full max-w-4xl">
                    <ResponsiveContainer width="100%" height={300}>
                        <BarChart
                            data={chartData}
                            margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
                        >
                            <YAxis
                                dataKey="value"
                                label={{
                                    value: 'Booking Count',
                                    angle: -90,
                                    position: 'insideLeft',
                                    style: { fontSize: '14px', fontWeight: 'bold' },
                                }}
                            />
                            <XAxis dataKey="date" />
                            <Bar dataKey="value" fill="#8884d8" />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;
