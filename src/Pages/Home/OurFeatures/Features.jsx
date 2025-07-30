import React from 'react';
import { FaHeadset, FaShieldAlt, FaStopwatch, FaThumbsUp } from 'react-icons/fa';
import { motion } from 'framer-motion';

const features = [
    {
        icon: <FaStopwatch className="text-orange-600 text-5xl mx-auto mb-4" />,
        title: "Fast Service",
        description: "We deliver your goods swiftly and safely, reducing time and cost with efficient planning."
    },
    {
        icon: <FaShieldAlt className="text-orange-600 text-5xl mx-auto mb-4" />,
        title: "Safe Delivery",
        description: "Your package is our priority. We provide insured and secure delivery every step of the way."
    },
    {
        icon: <FaHeadset className="text-orange-600 text-5xl mx-auto mb-4" />,
        title: "24/7 Support",
        description: "Our support team is always available to help with your questions or issues, day or night."
    },
    {
        icon: <FaThumbsUp className="text-orange-600 text-5xl mx-auto mb-4" />,
        title: "Trusted by Thousands",
        description: "With thousands of happy customers, we’ve built a reputation for reliability and care."
    }
];

const Features = () => {
    return (
        <section className="bg-white py-16 px-4 md:px-8 text-gray-900">
            <div className="max-w-7xl mx-auto text-center">
                <h2 className="text-3xl sm:text-4xl font-bold mb-12 text-orange-600">
                    Why Choose Us?
                </h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    {features.map((feature, index) => (
                        <motion.div
                            key={index}
                            className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl border border-gray-200 transition-transform hover:-translate-y-2"
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.2 }}
                        >
                            {feature.icon}
                            <h3 className="text-xl font-semibold text-gray-800 mt-4">{feature.title}</h3>
                            <p className="text-gray-600 mt-2 text-sm">{feature.description}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Features;



