import React from 'react';
import { Link } from 'react-router-dom';
import bgvideo from "../../../assets/Video/error.mp4";

const ErrorPage = () => {
    return (
        <div className="relative min-h-screen flex items-center justify-center bg-gradient-to-t from-black via-transparent to-black">
            <video 
                autoPlay 
                loop 
                muted 
                className="absolute inset-0 w-full h-full object-cover z-0"
            >
                <source src={bgvideo} type="video/mp4" />
                Your browser does not support the video tag.
            </video>
            <div className="text-center relative z-10 text-white px-4 sm:px-6 md:px-8">
             
                <h1 className="text-9xl font-extrabold text-red-600 leading-tight drop-shadow-xl animate-bounce">404</h1>
                <p className="mt-6 text-4xl font-semibold text-red-600 opacity-90 drop-shadow-lg">Oops! The page you are looking for does not exist.</p>
                <Link
                    to="/"
                    className="mt-8 inline-block px-10 py-5 bg-blue-600 text-white text-lg font-semibold rounded-full shadow-xl transform transition duration-500 ease-in-out hover:scale-110 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                >
                    Back to Home
                </Link>
            </div>
        </div>
    );
};

export default ErrorPage;

