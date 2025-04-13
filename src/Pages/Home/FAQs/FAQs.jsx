import React, { useState } from 'react';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';

const FAQs = () => {
    const [activeIndex, setActiveIndex] = useState(null);

    const faqs = [
        {
            "question": "What is the purpose of the Parcel Delivery System?",
            "answer": "The Parcel Delivery System allows users to send and receive parcels efficiently. Customers can book deliveries, and delivery personnel manage their assigned orders."
        },
        {
            "question": "How do I sign up for an account?",
            "answer": "Click on the 'Sign Up' button on the homepage, fill in the required details, and submit the form to create an account."
        },
        {
            "question": "Who can register on the platform?",
            "answer": "The platform supports three user types: Customers, Delivery Personnel, and Admins. Admins are manually added by the system owner."
        },
        {
            "question": "How do I schedule a parcel pickup?",
            "answer": "Log in as a customer, go to the 'Schedule Pickup' section, enter the parcel details, and confirm your booking."
        },
        {
            "question": "Which payment options are available?",
            "answer": "We support multiple payment methods, including credit/debit cards, digital wallets, and online banking."
        },
        {
            "question": "Is parcel tracking available?",
            "answer": "Yes, customers can track their shipments in real-time through the 'Track Parcel' section in their dashboard."
        },
        {
            "question": "How do I get in touch with customer support?",
            "answer": "You can reach our support team via the 'Help & Support' section or by emailing us at the provided contact address."
        }
    ];

    const toggleAnswer = (index) => {
        setActiveIndex(activeIndex === index ? null : index);
    };

    return (
        <div className="container mx-auto py-10">
            <h2 className="text-center text-orange-600 font-bold md:text-4xl text-3xl mb-4">Frequently Asked Questions</h2>
            <div className="space-y-4 mx-auto">
                {faqs.map((faq, index) => (
                    <div key={index} className="border rounded-lg shadow-md">
                        <button onClick={() => toggleAnswer(index)} className="flex justify-between items-center w-full p-4 text-left text-lg font-medium text-gray-800 bg-gray-100 hover:bg-gray-200 focus:outline-none">
                            <span>{faq.question}</span>
                            {activeIndex === index ? (
                                <AiOutlineEyeInvisible className="text-orange-500 w-6 h-6" />
                            ) : (
                                <AiOutlineEye className="text-orange-500 w-6 h-6" />
                            )}
                        </button>
                        {activeIndex === index && (
                            <div className="p-4 text-gray-600">
                                <p>{faq.answer}</p>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default FAQs;

