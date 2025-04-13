import React from 'react';
import bg from '../../../assets/map.png';
import { FaHeadset, FaShieldAlt, FaStopwatch } from 'react-icons/fa';
import { motion } from 'framer-motion';

const features = [
    {
        icon: <FaStopwatch className="text-orange-500 text-6xl mx-auto mb-4" />, 
        title: "Fast Service",
        description: "Our team ensures quick and efficient deliveries while reducing risks and costs through careful planning."
    },
    {
        icon: <FaShieldAlt className="text-orange-500 text-6xl mx-auto mb-4" />, 
        title: "Safe Delivery",
        description: "We provide insurance coverage along with our services to make your transport safe and secure."
    },
    {
        icon: <FaHeadset className="text-orange-500 text-6xl mx-auto mb-4" />, 
        title: "24/7 Support",
        description: "Our team is available around the clock to assist customers with any inquiries or issues."
    }
];

const Features = () => {
    return (
        <div
            className="relative  bg-cover bg-center py-16 px-4 md:px-8 text-gray-900"
            style={{ backgroundImage: `url(${bg})` }}
        >
            {/* Background Overlay */}
            <div className="absolute inset-0 bg-black bg-opacity-50"></div>

            {/* Content Section */}
            <div className="relative max-w-7xl mx-auto text-center z-10">
                <h2 className="text-3xl sm:text-4xl font-bold text-white mb-12">
                    Why Choose Us?
                </h2>

                {/* Features Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                    {features.map((feature, index) => (
                        <motion.div 
                            key={index} 
                            className="bg-white rounded-2xl shadow-xl p-8 hover:scale-105 hover:shadow-2xl transition-all duration-300"
                            initial={{ opacity: 0, y: 50 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: index * 0.3 }}
                        >
                            {feature.icon}
                            <h3 className="text-xl font-semibold text-gray-800 mt-4">{feature.title}</h3>
                            <p className="text-gray-600 mt-2">{feature.description}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Features;

