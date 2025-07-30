import React from "react";
import { FaUndo, FaMoneyBillWave, FaEnvelope, FaInfoCircle } from "react-icons/fa";

const ReturnRefundPolicies = () => {
  const policies = [
    {
      icon: <FaUndo className="text-orange-600 text-3xl" />,
      title: "Return",
      content: (
        <ul className="list-disc pl-5 text-gray-600 space-y-1 text-sm">
          <li>Late delivery returns accepted.</li>
          <li>Return damaged or lost items.</li>
        </ul>
      ),
    },
    {
      icon: <FaMoneyBillWave className="text-orange-600 text-3xl" />,
      title: "Refund",
      content: (
        <ul className="list-disc pl-5 text-gray-600 space-y-1 text-sm">
          <li>Refund for faulty parcels.</li>
          <li>Refund if delayed beyond time.</li>
        </ul>
      ),
    },
    {
      icon: <FaEnvelope className="text-orange-600 text-3xl" />,
      title: "Contact",
      content: (
        <div className="text-gray-600 text-sm text-center space-y-1">
          <p>📞 01789711089</p>
          <p>📩 support@droply.com</p>
        </div>
      ),
    },
    {
      icon: <FaInfoCircle className="text-orange-600 text-3xl" />,
      title: "Conditions",
      content: (
        <ul className="list-disc pl-5 text-gray-600 space-y-1 text-sm">
          <li>Must be unused & packed.</li>
          <li>Proof of delivery needed.</li>
        </ul>
      ),
    },
  ];

  return (
    <section className="bg-gradient-to-br from-orange-50 to-white py-16 px-4 md:px-10 rounded-xl shadow-inner max-w-7xl mx-auto">
      <h1 className="text-3xl md:text-4xl font-bold text-center text-orange-600 mb-12">
        Easy Returns & Fast Refunds
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {policies.map((policy, idx) => (
          <div
            key={idx}
            className="bg-white p-6 rounded-2xl border border-orange-100 hover:border-orange-400 shadow-sm hover:shadow-lg transition-all duration-300"
          >
            <div className="flex flex-col items-center mb-4">
              <div className="bg-orange-100 p-4 rounded-full shadow mb-3">
                {policy.icon}
              </div>
              <h2 className="text-lg font-semibold text-gray-800 text-center">{policy.title}</h2>
            </div>
            <div>{policy.content}</div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ReturnRefundPolicies;


