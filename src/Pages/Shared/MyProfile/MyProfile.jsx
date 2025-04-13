import React from "react";
import useAuth from "../../../hooks/useAuth";
import useRole from "../../../hooks/useRole";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";

const MyProfile = () => {
    const { user, loading } = useAuth();
    const [role, isLoading] = useRole();
    const axiosSecure = useAxiosSecure();

    const { data: profileInformation } = useQuery({
        queryKey: ["profile-info", user?.email],
        queryFn: async () => {
            const { data } = await axiosSecure.get(`/profileInfo/${user?.email}`);
            return data;
        },
    });

    if (loading || isLoading) {
        return <span className="loading loading-bars loading-lg text-orange-500"></span>
    }

    const getDescription = () => {
        switch (role) {
            case "User":
                return "You are a valued customer. Enjoy exploring our platform!";
            case "DeliveryMen":
                return "You play a crucial role in our delivery team, ensuring fast service.";
            case "Admin":
                return "You have administrative access to manage the platform.";
            default:
                return "Welcome to your profile! Let's enhance your experience.";
        }
    };

    return (
        <div className="max-w-2xl mx-auto p-6 bg-gradient-to-br from-gray-50 via-orange-50 to-gray-100 shadow-2xl rounded-xl mt-2">
            <Helmet>
                <title>Profile | Droply</title>
            </Helmet>
            
            <div className="flex flex-col md:flex-row items-center gap-6 p-5 bg-gradient-to-r from-orange-100 to-gray-100 rounded-lg shadow-md">
                <img
                    src={user?.photoURL || "https://via.placeholder.com/150"}
                    alt="Profile"
                    className="w-28 h-28 rounded-full object-cover border-4 border-orange-400 shadow-lg"
                />
                <div className="text-center md:text-left">
                    <h1 className="text-3xl font-bold text-gray-800 uppercase">{user?.displayName || 'Not Available'}</h1>
                    <p className="text-sm text-orange-600 font-semibold">Role: {role || "Role not assigned"}</p>
                    <p className="text-xs text-gray-600 mt-1 font-medium">First login: {user?.metadata?.creationTime || "Not available"}</p>
                </div>
            </div>

            <div className="mt-8 space-y-6">
                <div className="p-4 bg-white rounded-lg shadow-md border-l-4 border-orange-400">
                    <label className="block text-gray-500 text-sm font-medium">Email</label>
                    <p className="text-lg text-gray-800 font-semibold">{user?.email || "Not available"}</p>
                </div>
                <div className="p-4 bg-white rounded-lg shadow-md border-l-4 border-orange-400">
                    <label className="block text-gray-500 text-sm font-medium">Phone</label>
                    <p className="text-lg text-gray-800 font-semibold">{profileInformation?.number || "Not available"}</p>
                </div>

                <div className="p-4 bg-white rounded-lg shadow-md border-l-4 border-orange-400">
                    <label className="block text-gray-500 text-sm font-medium">About You</label>
                    <p className="text-gray-700">{getDescription()}</p>
                </div>
            </div>

            <div className="mt-6">
                <Link to='/dashboard/edit-profile'>
                    <button className="w-full bg-gradient-to-r from-orange-500 to-orange-700 text-white py-3 px-4 rounded-lg font-semibold shadow-md hover:from-orange-600 hover:to-orange-800 transition-transform transform hover:scale-105">
                        Update Profile
                    </button>
                </Link>
            </div>
        </div>
    );
};

export default MyProfile;


