import React, { useState } from 'react';
import useAuth from '../hooks/useAuth';
import useRole from '../hooks/useRole';
import { NavLink, Outlet } from 'react-router-dom';
import { FaBars, FaBox, FaChartBar, FaHome, FaListAlt, FaTimes, FaUser, FaUsers } from 'react-icons/fa';
import './activeClass.css'
import { FaPersonRifle } from 'react-icons/fa6';
import { CgProfile } from 'react-icons/cg';
const Dashboard = () => {
    const { user } = useAuth();
    const [role, isLoading] = useRole();
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    if (isLoading) {
        // console.log(isLoading)
        return <span className="loading loading-bars loading-lg"></span>
    }

    return (
        <div className='min-h-screen flex bg-light-background dark:bg-dark-background text-light-text dark:text-dark-text'>
            {/* Sidebar */}
            <div
                className={`fixed top-0 left-0 z-40 w-64 h-screen bg-purple-100 text-black p-6 transform ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
                    } transition-transform duration-300 lg:translate-x-0 shadow-lg lg:shadow-none`}
            >
                <div className='flex justify-between items-center mb-6'>
                    <h1 className='text-2xl font-bold'>Dashboard</h1>
                    <button className='text-white text-2xl lg:hidden' onClick={toggleSidebar}>
                        <FaTimes />
                    </button>
                </div>
                <ul className='space-y-4'>
                    {role === 'User' && (
                        <>
                            <li>
                                <NavLink
                                    to='/dashboard/my-profile'
                                    className='flex items-center space-x-2 gap-2 hover:bg-purple-200 rounded-md p-2'
                                >
                                    <FaUsers /> My Profile
                                </NavLink>
                            </li>
                            <li>
                                <NavLink
                                    to='/dashboard/book-parcel'
                                    className='flex items-center space-x-2 gap-2 hover:bg-purple-200 rounded-md p-2'
                                >
                                    <FaBox /> Book a Parcel
                                </NavLink>
                            </li>
                            <li>
                                <NavLink
                                    to='/dashboard/my-parcels'
                                    className='flex items-center space-x-2 gap-2 hover:bg-purple-200 rounded-md p-2'
                                >
                                    <FaListAlt /> My Parcels
                                </NavLink>
                            </li>
                        </>
                    )}
                    {role === 'DeliveryMen' && (
                        <>
                            <li>
                                <NavLink
                                    to='/dashboard/my-delivery-list'
                                    className='flex items-center space-x-2 gap-2 hover:bg-purple-200 rounded-md p-2'
                                >
                                    <FaListAlt /> My Delivery List
                                </NavLink>
                            </li>
                            <li>
                                <NavLink
                                    to='/dashboard/my-reviews'
                                    className='flex items-center space-x-2 gap-2 hover:bg-purple-200 rounded-md p-2'
                                >
                                    <FaUsers /> My Reviews
                                </NavLink>
                            </li>
                        </>
                    )}
                    {role === 'Admin' && (
                        <>
                            <li>
                                <NavLink
                                    to='/dashboard'
                                    className='flex items-center space-x-2 gap-2 hover:bg-purple-200 rounded-md p-2'
                                    end
                                >
                                    <FaChartBar /> Statistics
                                </NavLink>
                            </li>
                            <li>
                                <NavLink
                                    to='/dashboard/all-parcels'
                                    className='flex items-center space-x-2 gap-2 hover:bg-purple-200 rounded-md p-2'
                                    end
                                >
                                    <FaBox /> All Parcels
                                </NavLink>
                            </li>
                            <li>
                                <NavLink
                                    to='/dashboard/all-users'
                                    className='flex items-center space-x-2 gap-2 hover:bg-purple-200 rounded-md p-2'
                                    end
                                >
                                    <FaUsers /> All Users
                                </NavLink>
                            </li>
                            <li>
                                <NavLink
                                    to='/dashboard/all-delivery-men'
                                    className='flex items-center space-x-2 gap-2 hover:bg-purple-200 rounded-md p-2'
                                    end
                                >
                                    <FaUser /> All Delivery Men
                                </NavLink>
                            </li>
                        </>
                    )}
                    <div className="divider"></div>
                    {
                        role !== 'User' &&
                        <li>
                            <NavLink
                                to='/dashboard/my-profile'
                                className='flex items-center space-x-2 gap-2 hover:bg-purple-200 rounded-md p-2'
                            >
                                <CgProfile /> Profile
                            </NavLink>
                        </li>
                    }
                    <li>
                        <NavLink
                            to='/'
                            className='flex items-center space-x-2 gap-2 hover:bg-purple-200 rounded-md p-2'
                        >
                            <FaHome /> Home
                        </NavLink>
                    </li>
                </ul>
            </div>

            {/* Hamburger Menu for Small Screens */}
            <button
                className='fixed top-4 left-4 z-50 text-primary text-2xl lg:hidden'
                onClick={toggleSidebar}
            >
                <FaBars />
            </button>

            {/* Main Content */}
            <div className='flex-grow p-4 md:p-6 lg:ml-64'>
                <h2 className='text-3xl font-bold mt-6 md:mt-0 mb-6'>
                    Welcome, {user?.displayName}{' '}
                    <span className='text-purple-600'>{(role) || 'N/A'}</span>
                </h2>
                <div className='py-4'>
                    <Outlet />
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
