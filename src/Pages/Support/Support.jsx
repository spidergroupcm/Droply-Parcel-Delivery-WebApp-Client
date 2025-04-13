import React from 'react';
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet';

const Support = () => {
    return (
        <section className="bg-gray-100 py-10">
                <Helmet>
                <title>Contact | Droply</title>
                </Helmet>
            <div className="max-w-7xl mx-auto text-center px-5">
                <h2 className="text-3xl font-bold bg-orange-500 text-white py-3 rounded-lg">
                    We Are Here To Help You
                </h2>
                
                <div className="grid md:grid-cols-3 gap-8 mt-5">
                    <motion.div 
                        whileHover={{ scale: 1.05 }}
                        className="bg-white p-20 rounded-lg shadow-xl flex flex-col items-center text-center transition-all"
                    >
                        <FaPhoneAlt className="text-orange-600 text-4xl mb-4" />
                        <h3 className="text-2xl font-semibold text-gray-800">Call Us</h3>
                        <p className="text-gray-600 mt-3">
                            Speak to our support team directly for urgent issues. We’re available 24/7.
                        </p>
                        <p className="text-orange-600 font-bold mt-4 text-lg">+88 01789711089</p>
                    </motion.div>

                    <motion.div 
                        whileHover={{ scale: 1.05 }}
                        className="bg-white p-20 rounded-lg shadow-xl flex flex-col items-center text-center transition-all"
                    >
                        <FaEnvelope className="text-orange-600 text-4xl mb-4" />
                        <h3 className="text-2xl font-semibold text-gray-800">Email Support</h3>
                        <p className="text-gray-600 mt-3">
                            If you prefer email, send us your query, and we’ll get back to you ASAP.
                        </p>
                        <p className="text-orange-600 font-bold mt-4 text-lg">asmmohebullah@gmail.com</p>
                    </motion.div>

                    <motion.div 
                        whileHover={{ scale: 1.05 }}
                        className="bg-white p-20 rounded-lg shadow-xl flex flex-col items-center text-center transition-all"
                    >
                        <FaMapMarkerAlt className="text-orange-600 text-4xl mb-4" />
                        <h3 className="text-2xl font-semibold text-gray-800">Visit Our Office</h3>
                        <p className="text-gray-600 mt-3">
                            Come meet us in person! Our office is open for any support or inquiries.
                        </p>
                        <p className="text-orange-600 font-bold mt-4 text-lg">Banani, Dhaka, Bangladesh</p>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default Support;


