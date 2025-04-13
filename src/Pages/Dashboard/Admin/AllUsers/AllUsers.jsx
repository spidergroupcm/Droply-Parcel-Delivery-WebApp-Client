import { useQuery } from '@tanstack/react-query';
import React, { useEffect, useState } from 'react';
import useAxiosSecure from '../../../../hooks/useAxiosSecure';
import Swal from 'sweetalert2';
import usePagination from '../../../../hooks/usePagination';
import axios from 'axios';
import { Helmet } from 'react-helmet-async';

const AllUsers = () => {
    const axiosSecure = useAxiosSecure()
    const [usersCount, setUsersCount] = useState(0);
    const {
        count,
        pages,
        currentPage,
        numberOfPages,
        setCurrentPage,
        handelPrevBtn,
        handelNextBtn,
    } = usePagination();

    // console.log(count)


    // users table data
    const { data: users = [], refetch } = useQuery({
        queryKey: ['users', currentPage],
        queryFn: async () => {
            const { data } = await axiosSecure.get(`/users?page=${currentPage}&size=5`)
            return data;
        }
    })

    useEffect(() => {
        // usersCount API call using axios
        axios.get('https://parcel-transport-server.vercel.app/userCount')
            .then(response => setUsersCount(response.data.userCount))
            .catch(error => console.error('Error fetching users count:', error));
    }, [])


    // console.log(users)

    // handle role change
    const handleRoleChange = async (userId, newRole) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to undo the previous role!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, change it!"
        }).then((result) => {
            if (result.isConfirmed) {

                axiosSecure.patch(`/users/${userId}`, { newRole })
                    .then(res => {
                        // console.log(res.data)
                        if (res.data.modifiedCount > 0) {
                            refetch()
                            Swal.fire({
                                title: "Role Updating!",
                                text: `User Role Update to ${newRole}`,
                                icon: "success"
                            });
                        }
                    })

            }
        });
    }


    return (
        <div>
            <Helmet>
                <title>All Users | Dashboard</title>
            </Helmet>
            {/* Heading */}
            <div className="mb-4">
                <h2 className="font-semibold text-purple-600">Total Users: {usersCount}</h2>
            </div>
            {/* Table */}
            <div className="overflow-x-auto">
                <table className="table-auto w-full border-collapse border border-purple-300">
                    <thead>
                        <tr className="bg-purple-100">
                            <th className="px-4 py-2 border border-purple-300 text-purple-600">Name</th>
                            <th className="px-4 py-2 border border-purple-300 text-purple-600">
                                Phone Number
                            </th>
                            <th className="px-4 py-2 border border-purple-300 text-purple-600">
                                Parcels Booked
                            </th>
                            <th className="px-4 py-2 border border-purple-300 text-purple-600">
                                Total Spent
                            </th>
                            <th className="px-4 py-2 border border-purple-300 text-purple-600">
                                Actions
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user) => (
                            <tr key={user._id} className="text-center hover:bg-purple-50">
                                <td className="px-4 py-2 border border-purple-300">{user.name}</td>
                                <td className="px-4 py-2 border border-purple-300">
                                    {user.number !== "Not Available" ? user.number : "Pending"}
                                </td>
                                <td className="px-4 py-2 border border-purple-300">
                                    {user.parcelBookedCount || 0}
                                </td>
                                <td className="px-4 py-2 border border-purple-300">
                                    {user.parcelCostSum || "0"}
                                </td>
                                <td className="px-4 py-2 border border-purple-300">
                                    {user.role === "User" && (
                                        <>
                                            <button
                                                onClick={() => handleRoleChange(user._id, "DeliveryMen")}
                                                className="bg-purple-500 text-white px-4 py-1 rounded hover:bg-purple-800 mx-1"
                                            >
                                                Make Delivery Man
                                            </button>
                                            <button
                                                onClick={() => handleRoleChange(user._id, "Admin")}
                                                className="bg-green-300 text-black font-semibold px-4 py-1 rounded hover:bg-green-600 mx-1"
                                            >
                                                Make Admin
                                            </button>
                                        </>
                                    )}
                                    {user.role === "DeliveryMen" && (
                                        <button
                                            onClick={() => handleRoleChange(user._id, "Admin")}
                                            className="bg-purple-600 text-white px-4 py-1 rounded hover:bg-purple-900 mx-1"
                                        >
                                            Make Admin
                                        </button>
                                    )}
                                    {user.role === "Admin" && (
                                        <span
                                            className="border py-1 px-2 rounded-sm bg-orange-600 text-white  font-medium cursor-not-allowed"
                                        >
                                            Already Admin
                                        </span>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                {/* for pagination page */}
                <div className="md:flex justify-around items-center">
                    <div className="text-center my-4 md:my-0">
                        Showing 1-10 of {count}
                    </div>
                    <div className="my-12">
                        <div className="text-center pagination-div">
                            <button
                                className="btn bg-purple-600 text-white"
                                onClick={handelPrevBtn}
                                disabled={currentPage === 0}
                            >
                                Prev
                            </button>
                            {pages.map((page) => (
                                <button
                                    className={`btn ${currentPage === page ? "bg-purple-500 text-white" : ""
                                        }`}
                                    onClick={() => page !== "..." && setCurrentPage(page)}
                                    disabled={page === "..."}
                                    key={page}
                                >
                                    {page === "..." ? "..." : page + 1}
                                </button>
                            ))}
                            <button
                                className="btn bg-purple-800 text-white"
                                onClick={handelNextBtn}
                                disabled={currentPage === numberOfPages}
                            >
                                Next
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <div>

            </div>
        </div>

    );
};

export default AllUsers;