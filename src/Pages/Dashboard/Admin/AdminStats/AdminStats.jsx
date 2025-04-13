import React from 'react';
import useRole from '../../../../hooks/useRole';
import { Navigate } from 'react-router-dom';
import BarChart from './AdminDashboard';
import LineChart from './LIneChart';
import AdminDashboard from './AdminDashboard';
import { Helmet } from 'react-helmet-async';

const AdminStats = () => {
    const [role, isLoading] = useRole()
    if (isLoading) {
        return <span className="loading loading-bars loading-lg"></span>
    }
    if (role === 'User') return <Navigate to='/dashboard/my-profile' />
    if (role === 'DeliveryMen') return <Navigate to='/dashboard/my-delivery-list' />

    if (role === 'Admin')
        return (
            <>
                <Helmet>
                    <title>Statistics | Dashboard</title>
                </Helmet>
                <div className='max-w-7xl mx-auto'>
                    <h3 className='text-3xl uppercase  font-medium border-b-4 py-3'>Statistics Of Transport Services</h3>
                    <AdminDashboard></AdminDashboard>
                    <LineChart></LineChart>
                </div>
            </>
        );
};

export default AdminStats;