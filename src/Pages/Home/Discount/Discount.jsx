import React from 'react';
import DiscountBg from '../../../assets/Video/Discount-bg.mp4';

const Discount = () => {
    return (
        <div className="relative w-full h-[400px] flex items-center justify-center overflow-hidden">
            {/* Background Video */}
            <video 
                autoPlay 
                loop 
                muted 
                className="absolute top-0 left-0 w-full h-full object-cover"
            >
                <source src={DiscountBg} type="video/mp4" />
            </video>

            {/* Overlay */}
            <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-50"></div>

            {/* Discount Content */}
            <div className="relative z-10 text-center text-white p-6">
                <h2 className="text-4xl font-bold mb-4">New User Special Offer!</h2>
                <p className="text-lg">Deliver above 5KG and get <span className="text-yellow-400 font-semibold">30% OFF</span></p>
              
            </div>
        </div>
    );
};

export default Discount;
