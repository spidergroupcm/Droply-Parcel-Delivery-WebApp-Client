import React from 'react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet';
import { Star } from 'lucide-react'; // Requires Lucide (or use HeroIcons if preferred)

// Updated blog data with dummy date & rating
const blogs = [
  {
    id: 1,
    name: "John Doe",
    gender: "male",
    date: "2025-07-01",
    rating: 5,
    story: "Fast and reliable service! My parcel arrived on time and in perfect condition. I’ve used several delivery services before, but none have matched this level of consistency and professionalism."
  },
  {
    id: 2,
    name: "Sarah Wilson",
    gender: "female",
    date: "2025-06-28",
    rating: 4,
    story: "I was nervous about sending fragile items, but everything arrived perfectly intact. The customer service team kept me updated throughout the process. Truly exceeded my expectations."
  },
  {
    id: 3,
    name: "Michael Smith",
    gender: "male",
    date: "2025-06-25",
    rating: 5,
    story: "The tracking system is absolutely top-notch. I was able to monitor every step of the delivery, which gave me great peace of mind. Highly recommend this service to others."
  },
  {
    id: 4,
    name: "Emma Johnson",
    gender: "female",
    date: "2025-06-20",
    rating: 5,
    story: "Superb customer support! They responded to my queries almost instantly and made the entire experience seamless. I’ll definitely continue using Droply for my business shipments."
  },
  {
    id: 5,
    name: "Liam Brown",
    gender: "male",
    date: "2025-06-18",
    rating: 4,
    story: "Droply offers affordable prices without compromising on quality. The delivery was faster than expected and the package was handled with care. Will use again."
  },
  {
    id: 6,
    name: "Olivia Martin",
    gender: "female",
    date: "2025-06-15",
    rating: 5,
    story: "The delivery process was smooth from start to finish. The app is user-friendly and their drivers are courteous and efficient. Loved every bit of the service."
  },
  {
    id: 7,
    name: "Noah Davis",
    gender: "male",
    date: "2025-06-12",
    rating: 4,
    story: "What I liked the most was how much they care about your items. They really go the extra mile to ensure safety and timely delivery. That level of commitment is rare."
  },
  {
    id: 8,
    name: "Ava Garcia",
    gender: "female",
    date: "2025-06-10",
    rating: 5,
    story: "There were no hidden charges, and everything was clearly explained upfront. The transparency and professionalism made me feel like a valued customer."
  },
  {
    id: 9,
    name: "Elijah White",
    gender: "male",
    date: "2025-06-08",
    rating: 5,
    story: "The delivery was fast and the package arrived in excellent condition. Their team was responsive and courteous at every step. Fantastic experience overall."
  },
  {
    id: 10,
    name: "Sophia Harris",
    gender: "female",
    date: "2025-06-05",
    rating: 5,
    story: "They made international shipping surprisingly easy. The process was clearly outlined and their support helped me handle customs with no issues."
  },
  {
    id: 11,
    name: "James Clark",
    gender: "male",
    date: "2025-06-02",
    rating: 5,
    story: "I’ve tried many parcel services in the city, and Droply stands out with their exceptional delivery time and customer care. Worth every penny."
  },
  {
    id: 12,
    name: "Isabella Lewis",
    gender: "female",
    date: "2025-05-30",
    rating: 5,
    story: "Packaging was top-tier and the delivery was faster than expected. The entire process felt effortless and well-managed. Thank you for the great service!"
  }
];

const formatDate = (dateStr) => {
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  return new Date(dateStr).toLocaleDateString(undefined, options);
};

const renderStars = (rating) => {
  return (
    <div className="flex justify-center gap-0.5 mt-2">
      {[...Array(5)].map((_, i) => (
        <Star
          key={i}
          className={`w-4 h-4 ${i < rating ? 'text-yellow-400' : 'text-gray-300'}`}
          fill={i < rating ? 'currentColor' : 'none'}
        />
      ))}
    </div>
  );
};

const Blog = () => {
  return (
    <section className="max-w-7xl mx-auto px-4 py-16">
      <Helmet>
        <title>Blog | Droply</title>
      </Helmet>

      <motion.h2
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-4xl font-extrabold text-center text-orange-600 mb-2"
      >
        Customer Stories
      </motion.h2>

      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.6 }}
        className="text-center text-gray-600 text-lg mb-10 max-w-2xl mx-auto"
      >
        Real feedback from our valued Droply customers.
      </motion.p>

      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
        {blogs.map((blog, index) => {
          const bgColor = blog.gender === "female" ? "F472B6" : "F97316"; // pink or orange
          return (
            <motion.div
              key={blog.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.05, duration: 0.4 }}
              whileHover={{ scale: 1.04 }}
              className="group bg-white/80 backdrop-blur-md border border-orange-200 hover:border-orange-600 shadow-md hover:shadow-orange-200 rounded-2xl p-6 transition duration-300"
            >
              <img
                src={`https://ui-avatars.com/api/?name=${encodeURIComponent(blog.name)}&background=${bgColor}&color=ffffff&size=128`}
                alt={blog.name}
                className="w-20 h-20 rounded-full mx-auto mb-4 shadow-lg border-4 border-white"
              />
              <h3 className="text-lg font-semibold text-center text-gray-800">{blog.name}</h3>
              <p className="text-sm text-center text-gray-500 mt-1">{formatDate(blog.date)}</p>
              {renderStars(blog.rating)}
              <p className="text-sm text-center mt-3 text-gray-600 italic leading-relaxed">
                "{blog.story}"
              </p>
              <div className="h-1 w-10 bg-orange-600 mx-auto mt-4 rounded-full opacity-0 group-hover:opacity-100 transition duration-300"></div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
};

export default Blog;
