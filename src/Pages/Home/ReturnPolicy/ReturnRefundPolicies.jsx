import React from "react";
import { FaUndo, FaMoneyBillWave, FaEnvelope } from "react-icons/fa";

const ReturnRefundPolicies = () => {
  return (
    <div className="mx-auto px-8 py-8 bg-white rounded-xl border shadow">
      <h1 className="text-orange-600 font-bold md:text-4xl text-3xl text-center mb-6">
        Return & Refund Policies
      </h1>

      <div className="flex flex-col lg:flex-row justify-between gap-6">
        {/* Return Policy */}
        <div className="flex-1 bg-orange-50 p-4 rounded-lg shadow-sm">
          <h2 className="text-3xl font-semibold flex items-center gap-2 text-gray-800 mb-4">
            <FaUndo className="text-orange-500" />
            Return Policy
          </h2>
          <ul className="list-disc pl-5 text-lg text-gray-700 space-y-1">
            <li>Parcel not delivered on time.</li>
            <li>Parcel damaged or lost.</li>
            <li>Return within 7 days.</li>
          </ul>
        </div>

        {/* Refund Policy */}
        <div className="flex-1 bg-orange-50 p-4 rounded-lg shadow-sm">
          <h2 className="text-3xl font-semibold flex items-center gap-2 text-gray-800 mb-4">
            <FaMoneyBillWave className="text-orange-500" />
            Refund Policy
          </h2>
          <ul className="list-disc pl-5 text-lg text-gray-700 space-y-1">
            <li>Lost/unusable parcel.</li>
            <li>Delayed beyond guarantee.</li>
            <li>Meets return terms.</li>
          </ul>
          <p className="text-sm text-gray-700 mt-2">
           
          </p>
        </div>

        {/* How to Request */}
        <div className="flex-1 bg-orange-50 p-4 rounded-lg shadow-sm">
          <h2 className="text-3xl font-semibold flex items-center gap-2 text-gray-800 mb-4">
            <FaEnvelope className="text-orange-500" />
            How to Request
          </h2>
          <p className="text-lg text-gray-700">
            📞 01789711089 <br/>
            📩 support@droply.com <br/>
           
            with your tracking number and reason.  <br />
            Refunds processed within 5–7 business days.
          </p>
        </div>
      </div>

     
    </div>
  );
};

export default ReturnRefundPolicies;
