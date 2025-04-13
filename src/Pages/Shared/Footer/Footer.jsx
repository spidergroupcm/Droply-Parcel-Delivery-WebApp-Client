import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaTwitter, FaYoutube, FaFacebookF, FaArrowUp } from "react-icons/fa";
import { motion } from "framer-motion";
import img from "../../../assets/logo.png";

const Footer = () => {
    const [showScroll, setShowScroll] = useState(false);

    useEffect(() => {
        const checkScroll = () => setShowScroll(window.scrollY > 300);
        window.addEventListener("scroll", checkScroll);
        return () => window.removeEventListener("scroll", checkScroll);
    }, []);

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    return (
        <footer className="bg-gray-900 text-gray-300 py-12 relative">
            <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 text-center sm:text-left">
                {/* Brand Section */}
                <div>
                    <motion.div 
                        className="flex items-center justify-center sm:justify-start mb-4"
                        whileHover={{ scale: 1.1 }}
                    >
                        <img className="w-14 h-14" src={img} alt="Movely Logo" />
                        <h1 className="text-3xl font-extrabold text-orange-500 ml-3">Droply</h1>
                    </motion.div>
                    <p className="text-lg font-semibold text-orange-400">Your Reliable Transport Partner</p>
                    <p className="mt-5 text-gray-500">&copy; {new Date().getFullYear()} - All rights reserved</p>
                </div>

                {/* Quick Links */}
                <div>
                    <h2 className="text-lg font-bold text-orange-400 mb-4">Quick Links</h2>
                    <ul className="space-y-3 text-sm">
                        {["Support", "Blog"].map((item, index) => (
                            <li key={index}>
                                <Link to={`/${item.toLowerCase()}`} className="hover:text-orange-400 transition duration-300">
                                    {item}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Social Media */}
                <div>
                    <h2 className="text-lg font-bold text-orange-400 mb-4">Follow Us</h2>
                    <div className="flex space-x-5 justify-center sm:justify-start">
                        {[{ icon: <FaTwitter size={26} />, link: "https://x.com/asm_mohebullah" },
                          { icon: <FaYoutube size={26} />, link: "https://www.youtube.com/@asm_mohebullah" },
                          { icon: <FaFacebookF size={26} />, link: "https://facebook.com/spidergroupgm" }
                        ].map((social, index) => (
                            <motion.a 
                                key={index}
                                href={social.link}
                                target="_blank" 
                                rel="noopener noreferrer"
                                whileHover={{ scale: 1.2 }}
                                className="text-orange-500 hover:text-orange-400 transition-colors duration-300"
                            >
                                {social.icon}
                            </motion.a>
                        ))}
                    </div>
                </div>

                {/* Subscription Form */}
                <div>
                    <h2 className="text-lg font-bold text-orange-400 mb-4">Subscribe</h2>
                    <form onSubmit={(e) => e.preventDefault()} className="flex flex-col space-y-4">
                        <input
                            type="email"
                            placeholder="Enter your email"
                            className="p-3 rounded-lg bg-gray-800 text-gray-300 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-400"
                        />
                        <motion.button 
                            whileHover={{ scale: 1.05 }}
                            className="py-2 bg-orange-500 hover:bg-orange-600 transition duration-300 rounded-lg font-semibold"
                        >
                            Subscribe
                        </motion.button>
                    </form>
                </div>
            </div>

            {/* Scroll to Top Button */}
            {showScroll && (
                <motion.button 
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={scrollToTop}
                    className="fixed bottom-8 right-8 bg-orange-500 text-white p-4 rounded-full shadow-lg hover:bg-orange-600 transition-all"
                >
                    <FaArrowUp size={24} />
                </motion.button>
            )}
        </footer>
    );
};

export default Footer;


