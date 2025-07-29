import React from 'react';
import { Phone, Mail, MapPin, Clock } from 'lucide-react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet';

const Card = ({ Icon, title, description, contact }) => (
  <motion.div
    whileHover={{ scale: 1.05 }}
    className="bg-white p-8 rounded-2xl shadow-md border border-orange-100 hover:shadow-orange-200 flex flex-col items-center text-center transition-all"
  >
    <Icon className="text-orange-600 w-10 h-10 mb-4" />
    <h3 className="text-xl font-semibold text-gray-800">{title}</h3>
    <p className="text-gray-600 mt-2">{description}</p>
    <p className="text-orange-600 font-bold mt-4 text-md">{contact}</p>
  </motion.div>
);

const Support = () => {
  return (
    <section className="bg-gray-50 py-14 px-4 md:px-10">
      <Helmet>
        <title>Contact | Droply</title>
      </Helmet>

      <div className="max-w-7xl mx-auto text-center">
        <h2 className="text-3xl font-bold text-white bg-orange-600 inline-block px-6 py-3 rounded-xl shadow">
          We Are Here To Help You
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-10">
          <Card
            Icon={Phone}
            title="Call Us"
            description="Reach out to our support line anytime. We're available 24/7."
            contact="+88 01789711089"
          />
          <Card
            Icon={Mail}
            title="Email Us"
            description="Send us an email with your query. We respond within 24 hours."
            contact="asmmohebullah@gmail.com"
          />
          <Card
            Icon={MapPin}
            title="Visit Us"
            description="Drop by our office to talk to us in person."
            contact="Banani, Dhaka"
          />
          <Card
            Icon={Clock}
            title="Working Hours"
            description="We are open Sunday to Thursday from 9 AM to 6 PM."
            contact="Fri-Sat: Closed"
          />
        </div>
      </div>
    </section>
  );
};

export default Support;


