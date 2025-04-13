import React, { useEffect, useState } from 'react';
import {
    LineChart as RechartsLineChart,
    Line,
    XAxis,
    YAxis,
    Tooltip,
    Legend,
    ResponsiveContainer,
    CartesianGrid,
} from 'recharts';
import axios from 'axios';

const LineChart = () => {
    const [chartData, setChartData] = useState([]);

    useEffect(() => {
        const fetchCounts = async () => {
            try {
                const { data: deliveredData } = await axios.get('https://parcel-transport-server.vercel.app/deliveredCount');
                const { data: bookedData } = await axios.get('https://parcel-transport-server.vercel.app/bookedCount');

                const combinedData = [
                    { name: 'Delivered', count: deliveredData.deliveredCount },
                    { name: 'Booked', count: bookedData.bookedCount },
                ];

                setChartData(combinedData);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchCounts();
    }, []);

    return (
        <div className="p-4 sm:p-6 bg-gradient-to-r from-cyan-500 to-blue-700 rounded-xl shadow-2xl">
            <h2 className="text-center text-lg sm:text-xl md:text-3xl font-extrabold text-white mb-4 sm:mb-6">
                Parcel Statistics (Booked vs Delivered)
            </h2>
            <div className="w-full max-w-full md:max-w-5xl mx-auto">
                <ResponsiveContainer width="100%" height={350}>
                    <RechartsLineChart
                        data={chartData}
                        margin={{ top: 40, right: 30, left: 20, bottom: 30 }}
                    >
                        <CartesianGrid strokeDasharray="3 3" stroke="#ddd" />
                        <XAxis dataKey="name" stroke="#fff" />
                        <YAxis stroke="#fff" />
                        <Tooltip
                            contentStyle={{
                                backgroundColor: '#1e3a8a',
                                borderRadius: '10px',
                                border: 'none',
                                color: '#fff',
                            }}
                            labelStyle={{
                                color: '#fff',
                            }}
                        />
                        <Legend
                            wrapperStyle={{
                                paddingTop: '20px',
                                textAlign: 'center',
                                color: '#fff',
                            }}
                        />
                        <Line
                            type="natural"
                            dataKey="count"
                            stroke="#ff7f50"
                            strokeWidth={4}
                            dot={{ fill: '#ff7f50', r: 8 }}
                            activeDot={{ r: 12 }}
                            strokeLinejoin="round"
                            strokeLinecap="round"
                        />
                    </RechartsLineChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};

export default LineChart;
