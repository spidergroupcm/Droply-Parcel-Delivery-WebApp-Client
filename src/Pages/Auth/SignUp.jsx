import React, { useState } from 'react';
import useAxiosPublic from '../../hooks/useAxiosPublic';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import GoogleSignIn from './GoogleSignIn';
import { TbFidgetSpinner } from 'react-icons/tb';
import { imageUpload } from '../../api/utils';
import toast from 'react-hot-toast';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';
import { Helmet } from 'react-helmet';

const SignUp = () => {
    const { loading, createUser, updateProfileData } = useAuth();
    const axiosPublic = useAxiosPublic();
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || '/';
    const [showPassword, setShowPassword] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const form = e.target;
        const name = form.name.value;
        const number = form.number.value;
        const role = form.role.value;
        const image = form.image.files[0];
        const email = form.email.value;
        const password = form.password.value;

        if (!/[A-Z]/.test(password)) return toast.error('Password must contain at least one uppercase letter!');
        if (!/[a-z]/.test(password)) return toast.error('Password must contain at least one lowercase letter!');
        if (password.length < 6) return toast.error('Password must be at least 6 characters long!');

        try {
            const photoURL = await imageUpload(image);
            const result = await createUser(email, password);
            const user = result.user;

            await updateProfileData(name, photoURL);
            
            const userInfo = { name: user?.displayName, email: user?.email, photo: photoURL, role, number };
            await axiosPublic.post('/users', userInfo);
            
            toast.success('Welcome! Your registration was successful.');
            navigate(from, { replace: true });
        } catch (error) {
            toast.error('Something went wrong. Please try signing up with another email.');
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
                <Helmet>
                <title>Register | Droply</title>
                </Helmet>
            <div className="max-w-4xl p-6 sm:p-10 bg-white rounded-md shadow-lg w-full">
                <div className="text-center mb-6">
                    <h1 className="text-3xl font-bold">Sign Up</h1>
                    <p className="text-gray-500">Welcome to Droply</p>
                </div>
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label htmlFor="name" className="block text-sm">Name</label>
                            <input type="text" name="name" id="name" required placeholder="Enter Your Name" className="w-full px-3 py-2 border rounded-md bg-gray-100" />
                        </div>
                        <div>
                            <label htmlFor="phone" className="block text-sm">Phone Number</label>
                            <input type="number" name="number" id="phone" required placeholder="Enter Your Phone Number" className="w-full px-3 py-2 border rounded-md bg-gray-100" />
                        </div>
                        <div>
                            <label htmlFor="role" className="block text-sm">User Type</label>
                            <select name="role" required className="w-full px-3 py-2 border rounded-md bg-gray-100">
                                <option value="User">Normal User</option>
                                <option value="DeliveryMen">Delivery Men</option>
                            </select>
                        </div>
                        <div>
                            <label htmlFor="image" className="block text-sm">Select Image</label>
                            <input type="file" name="image" id="image" required accept="image/*" className="w-full px-3 py-2 border rounded-md bg-gray-100" />
                        </div>
                        <div>
                            <label htmlFor="email" className="block text-sm">Email Address</label>
                            <input type="email" name="email" id="email" required placeholder="Enter Your Email" className="w-full px-3 py-2 border rounded-md bg-gray-100" />
                        </div>
                        <div className="relative">
                            <label htmlFor="password" className="block text-sm">Password</label>
                            <div className="relative w-full">
                                <input type={showPassword ? 'text' : 'password'} name="password" id="password" required placeholder="*******" className="w-full px-3 py-2 border rounded-md bg-gray-100 pr-10" />
                                <button type="button" className="absolute inset-y-0 right-3 flex items-center text-gray-500" onClick={() => setShowPassword(!showPassword)}>
                                    {showPassword ? <AiOutlineEyeInvisible className="text-xl" /> : <AiOutlineEye className="text-xl" />}
                                </button>
                            </div>
                        </div>
                    </div>
                    <button type="submit" className="w-full md:w-1/2 mx-auto block bg-purple-500 hover:bg-purple-600 text-white py-3 rounded-md">
                        {loading ? (
                            <span className="flex items-center justify-center gap-2">
                                <TbFidgetSpinner className="animate-spin" /> Processing
                            </span>
                        ) : 'Continue'}
                    </button>
                </form>
                <div className="flex items-center pt-4">
                    <div className="flex-1 h-px bg-gray-300"></div>
                    <p className="px-3 text-sm text-gray-500">or signup with</p>
                    <div className="flex-1 h-px bg-gray-300"></div>
                </div>
                <GoogleSignIn />
                <p className="text-center text-gray-500 mt-4">
                    Already have an account? <Link to="/signIn" className="text-purple-600 hover:underline">Login</Link>.
                </p>
            </div>
        </div>
    );
};

export default SignUp;

