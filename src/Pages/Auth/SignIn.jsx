import React, { useState } from 'react';
import useAuth from '../../hooks/useAuth';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import GoogleSignIn from './GoogleSignIn';
import { TbFidgetSpinner } from 'react-icons/tb';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';
import toast from 'react-hot-toast';
import loginImage from '../../assets/Auth/loginimg.png';
import { Helmet } from 'react-helmet';

const SignIn = () => {
    const { signIn, loading, setLoading } = useAuth();
    const location = useLocation();
    const navigate = useNavigate();
    const from = location?.state?.from?.pathname || '/';
    const [showPassword, setShowPassword] = useState(false);
    const [credentials, setCredentials] = useState({ email: '', password: '' });

    const handleSignIn = async (e) => {
        e.preventDefault();
        const { email, password } = credentials;
        try {
            await signIn(email, password);
            toast.success('Welcome! Your login was successful.');
            navigate(from, { replace: true });
        } catch {
            toast.error('Please enter a valid email and password.');
            setLoading(false);
        }
    };


    const autofillCredentials = (role) => {
        const users = {
            delivery: {
                email: import.meta.env.VITE_DELIVERY_EMAIL,
                password: import.meta.env.VITE_DELIVERY_PASSWORD
            },
            user: {
                email: import.meta.env.VITE_USER_EMAIL,
                password: import.meta.env.VITE_USER_PASSWORD
            },
            admin: {
                email: import.meta.env.VITE_ADMIN_EMAIL,
                password: import.meta.env.VITE_ADMIN_PASSWORD
            },
        };
        setCredentials(users[role]);
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100 p-4">
                <Helmet>
                <title>Login | Droply</title>
                </Helmet>
            <div className="flex flex-col md:flex-row bg-white shadow-2xl rounded-lg overflow-hidden max-w-4xl w-full">
                {/* Left - Login Form */}
                <div className="w-full md:w-1/2 p-8">
                    <h1 className="text-4xl font-bold text-orange-600 text-center">Log In</h1>
                    <p className="text-sm text-gray-500 text-center mb-6">Sign in to access your account</p>
                    <form onSubmit={handleSignIn} className="space-y-4">
                        <div>
                            <label htmlFor="email" className="block text-sm text-gray-600">Email Address</label>
                            <input 
                                type="email" 
                                name="email" 
                                id="email" 
                                required 
                                placeholder="Enter your email" 
                                value={credentials.email}
                                onChange={(e) => setCredentials({ ...credentials, email: e.target.value })}
                                className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-orange-500 bg-gray-100 text-gray-900"
                            />
                        </div>
                        <div className="relative">
                            <label htmlFor="password" className="block text-sm text-gray-600">Password</label>
                            <div className="relative">
                                <input 
                                    type={showPassword ? "text" : "password"} 
                                    name="password" 
                                    id="password" 
                                    required 
                                    placeholder="*******" 
                                    value={credentials.password}
                                    onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
                                    className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-orange-500 bg-gray-100 text-gray-900 pr-10"
                                />
                                <button 
                                    type="button" 
                                    className="absolute inset-y-0 right-3 flex items-center text-gray-500 focus:outline-none"
                                    onClick={() => setShowPassword(!showPassword)}
                                >
                                    {showPassword ? <AiOutlineEyeInvisible className="text-xl"/> : <AiOutlineEye className="text-xl"/>}
                                </button>
                            </div>
                        </div>
                        <button 
                            type="submit" 
                            className="w-full py-3 bg-orange-600 hover:bg-orange-700 text-white rounded-md flex justify-center items-center transition duration-200"
                        >
                            {loading ? <TbFidgetSpinner className="animate-spin text-xl" /> : 'Continue'}
                        </button>
                    </form>
                    
                    

                 {/* Autofill Login Buttons */}
                    <div className="mt-2 flex gap-2">

                    <button onClick={() => autofillCredentials('user')} className="w-full py-2 bg-green-500 hover:bg-green-600 text-white rounded-md">Login as User</button>
                    <button onClick={() => autofillCredentials('delivery')} className="w-full  bg-blue-500 hover:bg-blue-600 text-white rounded-md">Delivery Man</button>
                    <button onClick={() => autofillCredentials('admin')} className="w-full py-2 bg-red-500 hover:bg-red-600 text-white rounded-md">Admin</button>
                    </div>

                    <GoogleSignIn />
                    <p className="text-sm text-center text-gray-400 mt-4">
                        Don&apos;t have an account? <Link to="/signup" className="text-orange-600 hover:underline">Sign up</Link>
                    </p>
                   
                    <div className="mt-6 flex justify-center">
                        <Link 
                            to="/" 
                            className="px-6 py-2 bg-orange-500 hover:bg-orange-600 text-white text-sm font-semibold rounded-md transition duration-200 shadow-md"
                        >
                            Back Home
                        </Link>
                    </div>
                </div>

                {/* Right - Image (Hidden on Small Screens) */}
                <div className="hidden md:block w-1/2">
                    <img src={loginImage} alt="Login" className="w-full h-full object-cover" />
                </div>
            </div>
        </div>
    );
};

export default SignIn;


