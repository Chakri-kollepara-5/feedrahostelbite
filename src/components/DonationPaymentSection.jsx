import React, { useState } from "react";
import { motion } from "framer-motion";
import PaymentModal from "./PaymentModal";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.15,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 20, scale: 0.96 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.45,
      ease: "easeOut",
    },
  },
};

const DonationPaymentSection = () => {
  const [showPaymentModal, setShowPaymentModal] = useState(false);

  const donationImpacts = [
    {
      amount: 50,
      impact: "Feed 5 families for a day",
      bgColor: "from-blue-50 to-blue-100",
    },
    {
      amount: 100,
      impact: "Support 10 meals distribution",
      bgColor: "from-red-50 to-red-100",
    },
    {
      amount: 200,
      impact: "Help reduce 50kg food waste",
      bgColor: "from-green-50 to-green-100",
    },
  ];

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden"
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-green-500 to-emerald-600 p-6 text-white">
          <h3 className="text-xl font-bold">Support Our Mission</h3>
          <p className="text-green-100 text-sm">
            Help us reduce food waste across India
          </p>
        </div>

        {/* Content */}
        <div className="p-6">
          <div className="text-center mb-6">
            <h4 className="text-lg font-semibold text-gray-900">
              Make a Difference Today
            </h4>
            <p className="text-gray-600 text-sm mt-1">
              Your donation connects surplus food with those in need.
            </p>
          </div>

          {/* Impact Cards */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6"
          >
            {donationImpacts.map((item, index) => (
              <motion.div
                key={index}
                variants={cardVariants}
                whileHover={{
                  y: -6,
                  boxShadow: "0 12px 30px rgba(0,0,0,0.08)",
                }}
                className={`p-4 rounded-xl bg-gradient-to-br ${item.bgColor} border cursor-pointer`}
              >
                <div className="text-center">
                  <div className="text-2xl font-semibold text-gray-900">
                    ₹{item.amount}
                  </div>
                  <div className="text-sm text-gray-600 mt-1">
                    {item.impact}
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Donate Button */}
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.96 }}
            onClick={() => setShowPaymentModal(true)}
            className="w-full bg-gradient-to-r from-green-500 to-emerald-600 text-white py-4 rounded-xl font-semibold shadow-md"
          >
            Donate Now
          </motion.button>

          {/* Verification */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="mt-4 p-3 bg-blue-50 rounded-lg border border-blue-200 text-center"
          >
            <div className="text-xs font-semibold text-blue-900">
              Verified by Government of India
            </div>
            <div className="text-xs text-blue-700">
              Udyam Registration: UDYAM-AP-10-0116772
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* Payment Modal */}
      <PaymentModal
        isOpen={showPaymentModal}
        onClose={() => setShowPaymentModal(false)}
        paymentType="donation"
        amount={100}
        title="Support Feedra Mission"
        description="Your donation helps reduce food waste and feed families in need across India."
      />
    </>
  );
};

export default DonationPaymentSection;
