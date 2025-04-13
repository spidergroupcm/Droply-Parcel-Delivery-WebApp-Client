import React from "react";
import Confetti from "react-confetti";

const PaymentSuccess = () => {
  // উইন্ডো সাইজ নির্ধারণ
  const width = window.innerWidth;
  const height = window.innerHeight;

  return (
    <div className="flex flex-col items-center justify-center md:h-[vh-80] bg-green-50">
      <Confetti width={width} height={height} />
      <h3 className="text-4xl font-bold text-green-700 mb-4">
        🎉 Payment Successful! 🎉
      </h3>
      <p className="text-lg text-gray-700">
        Thank you for your payment. Your transaction has been successfully completed!
      </p>
      <button
        className="mt-6 px-6 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition"
        onClick={() => window.location.href = "/dashboard"} // Redirect করার জন্য
      >
        Go to Dashboard
      </button>
    </div>
  );
};

export default PaymentSuccess;
