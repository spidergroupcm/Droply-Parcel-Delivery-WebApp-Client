import React from 'react';
import { Link } from 'react-router-dom';

const ErrorPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-100 via-white to-orange-200 px-6">
      <div className="text-center max-w-xl">
        <h1 className="text-[120px] md:text-[160px] font-extrabold text-orange-600 drop-shadow-xl leading-none">
          404
        </h1>
        <p className="text-2xl md:text-3xl font-semibold text-gray-800 mb-6">
          Oops! Page not found.
        </p>
        <p className="text-gray-600 mb-8 text-sm md:text-base">
          The page you’re looking for doesn’t exist or was moved.
        </p>
        <Link
          to="/"
          className="inline-block px-8 py-3 rounded-full bg-orange-600 text-white text-sm md:text-base font-semibold shadow-md hover:bg-orange-700 transition duration-300 ease-in-out"
        >
          ⬅ Back to Home
        </Link>
      </div>
    </div>
  );
};

export default ErrorPage;
