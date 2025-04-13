import React from 'react';
import Slider from 'react-slick';
import bannerImg1 from '../../../assets/Banner/hero-bg1.png';
import bannerImg2 from '../../../assets/Banner/hero-bg2.png';
import bannerImg3 from '../../../assets/Banner/hero-bg3.png';
import bannerImg4 from '../../../assets/Banner/hero-bg4.png';
import { motion } from 'framer-motion';
import 'slick-carousel/slick/slick.css'; 
import 'slick-carousel/slick/slick-theme.css';

const banners = [bannerImg1, bannerImg2, bannerImg3, bannerImg4];

const Banner = () => {
    const settings = {
        dots: true,
        infinite: true,
        speed: 1000,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
        fade: true,
        arrows: false,
    };

    return (
        <Slider {...settings} className="w-full h-[500px]">
            {banners.map((image, index) => (
                <div key={index} className="relative h-[500px] w-full">
                    <div className="absolute inset-0 bg-black bg-opacity-50"></div>
                    <img src={image} alt={`Slide ${index + 1}`} className="w-full h-full object-cover" />
                    <div className="absolute inset-0 flex flex-col items-center justify-center text-white text-center p-4">
                        <motion.h1 
                            initial={{ opacity: 0, y: -50 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 1 }}
                            className="text-3xl md:text-4xl xl:text-7xl font-extrabold drop-shadow-lg leading-tight"
                        >
                            Swift <span className="text-orange-500">&</span> Reliable <span className='text-orange-500'> Transport!</span>
                        </motion.h1>
                        <motion.p 
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.5, duration: 1 }}
                            className="text-lg md:text-xl text-gray-300 mt-4 max-w-2xl"
                        >
                            Dependable, Secure, and Timely Transport for Your Business.
                        </motion.p>
                        <motion.div 
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 1, duration: 0.5 }}
                            className="mt-6"
                        >
                            <a href="#feature">
                                <button className="bg-orange-500 text-white font-semibold px-6 py-3 rounded-full shadow-lg hover:bg-orange-600 transition duration-300">
                                    Explore More
                                </button>
                            </a>
                        </motion.div>
                    </div>
                </div>
            ))}
        </Slider>
    );
};

export default Banner;


