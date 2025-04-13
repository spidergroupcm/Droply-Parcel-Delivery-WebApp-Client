import React from 'react';
import img1 from "../../assets/Blogs/blog1.png";
import img2 from "../../assets/Blogs/blog2.png";
import img3 from "../../assets/Blogs/blog3.png";
import img4 from "../../assets/Blogs/blog4.png";
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet';

const blogs = [
    {
        id: 1,
        image: img1,
        name: "John Doe",
        story: "Fast and reliable service! My parcel arrived on time without any damage. Highly recommended!"
    },
    {
        id: 2,
        image: img2,
        name: "Sarah Wilson",
        story: "I was worried about sending fragile items, but they handled it with care. Very satisfied!"
    },
    {
        id: 3,
        image: img3,
        name: "Michael Smith",
        story: "Their tracking system is excellent! I always knew where my package was. Great experience!"
    },
    {
        id: 4,
        image: img4,
        name: "Emma Johnson",
        story: "Superb customer support and timely delivery. I’ll definitely use this service again!"
    }
];

const Blog = () => {
    return (
        <section className="max-w-6xl mx-auto py-10 px-6">
                <Helmet>
                <title>Blog | Droply</title>
                </Helmet>
            <h2 className="text-3xl  text-center font-bold text-orange-500 mb-2">Customer Stories</h2>
            <p className="text-center text-gray-600 mb-5 text-lg">Read what our happy customers have to say about our parcel delivery service.</p>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                {blogs.map(blog => (
                    <motion.div 
                        key={blog.id}
                        whileHover={{ scale: 1.05 }}
                        className="bg-white shadow-lg rounded-xl p-6 text-center border-t-4 border-orange-500 transition-transform"
                    >
                        <img src={blog.image} alt={blog.name} className="w-20 h-20 rounded-full mx-auto mb-4 border-4 border-gray-200" />
                        <h3 className="text-xl font-semibold text-gray-800">{blog.name}</h3>
                        <p className="text-gray-600 mt-3 italic">"{blog.story}"</p>
                    </motion.div>
                ))}
            </div>
        </section>
    );
};

export default Blog;

