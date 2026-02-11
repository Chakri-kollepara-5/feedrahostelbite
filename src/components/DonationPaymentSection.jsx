import React, { useState } from "react";
import { Heart, CheckCircle2, ShieldCheck, Globe, TrendingUp } from "lucide-react";
import { Card } from "./ui/Card";
import Badge from "./ui/Badge";
import PaymentModal from "./PaymentModal";

const DonationPaymentSection = () => {
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [selectedAmount, setSelectedAmount] = useState(100);

  const donationTiers = [
    {
      amount: 50,
      label: "Support",
      impact: "Feed 5 families",
      color: "from-emerald-400 to-teal-400",
      bg: "bg-emerald-500/10 border-emerald-500/30",
      glow: "shadow-[0_0_15px_rgba(52,211,153,0.3)]",
    },
    {
      amount: 100,
      label: "Hero",
      impact: "10 meals provided",
      color: "from-cyan-400 to-blue-400",
      bg: "bg-cyan-500/10 border-cyan-500/30",
      glow: "shadow-[0_0_20px_rgba(34,211,238,0.4)]",
      popular: true
    },
    {
      amount: 200,
      label: "Champion",
      impact: "Reduce 50kg waste",
      color: "from-blue-400 to-indigo-400",
      bg: "bg-blue-500/10 border-blue-500/30",
      glow: "shadow-[0_0_25px_rgba(96,165,250,0.4)]",
    },
  ];

  const impactImages = [
    "https://images.pexels.com/photos/6646917/pexels-photo-6646917.jpeg?auto=compress&cs=tinysrgb&w=600",
    "https://images.pexels.com/photos/6994963/pexels-photo-6994963.jpeg?auto=compress&cs=tinysrgb&w=600",
    "https://images.pexels.com/photos/6995244/pexels-photo-6995244.jpeg?auto=compress&cs=tinysrgb&w=600",
    "https://images.pexels.com/photos/6646904/pexels-photo-6646904.jpeg?auto=compress&cs=tinysrgb&w=600",
    "https://images.pexels.com/photos/6646918/pexels-photo-6646918.jpeg?auto=compress&cs=tinysrgb&w=600",
    "https://images.pexels.com/photos/376464/pexels-photo-376464.jpeg?auto=compress&cs=tinysrgb&w=600"
  ];

  const handleDonate = (amount) => {
    setSelectedAmount(amount);
    setShowPaymentModal(true);
  };

  return (
    <>
      <Card className="relative overflow-hidden border border-emerald-100 shadow-sm flex flex-col h-full bg-gradient-to-b from-white to-emerald-50/30 rounded-[2rem] min-h-[600px] group">

        {/* 1. Header Section */}
        <div className="p-6 sm:p-8 flex flex-col z-10 relative">
          <div className="flex items-center justify-between mb-6">
            <Badge variant="success" className="bg-emerald-100 text-emerald-800 border-emerald-200">
              <Heart className="w-3 h-3 mr-1 fill-current" /> Support Mission
            </Badge>
            <div className="flex items-center text-xs text-blue-600 font-medium bg-blue-50 px-3 py-1.5 rounded-full">
              <Globe className="w-3 h-3 mr-1" /> Global Impact
            </div>
          </div>

          <h3 className="text-3xl sm:text-4xl font-bold text-gray-900 leading-tight">
            Make a <span className="text-emerald-600">Real Impact</span> <br />
            With One Click.
          </h3>
        </div>

        {/* 2. Middle - Image Stream */}
        <div className="flex-grow relative overflow-hidden flex flex-col justify-center py-6 gap-4 z-10">
          {/* Row 1 */}
          <div className="flex gap-4 animate-scroll-x-fast w-max">
            {[...impactImages, ...impactImages].map((src, idx) => (
              <div key={`r1-${idx}`} className="w-32 h-20 flex-shrink-0 rounded-lg overflow-hidden shadow-sm border border-gray-100 relative group/img">
                <img src={src} className="w-full h-full object-cover opacity-90 group-hover/img:opacity-100 transition-opacity" alt="impact" />
              </div>
            ))}
          </div>

          {/* Row 2 */}
          <div className="flex gap-4 animate-scroll-x-reverse w-max">
            {[...impactImages, ...impactImages].reverse().map((src, idx) => (
              <div key={`r2-${idx}`} className="w-32 h-20 flex-shrink-0 rounded-lg overflow-hidden shadow-sm border border-gray-100 relative group/img">
                <img src={src} className="w-full h-full object-cover opacity-90 group-hover/img:opacity-100 transition-opacity" alt="impact" />
              </div>
            ))}
          </div>
        </div>

        {/* 3. Bottom Content - Tiers */}
        <div className="p-6 sm:p-8 pt-6 bg-white border-t border-gray-100 z-20">
          <div className="space-y-3 mb-5">
            {donationTiers.map((tier) => (
              <button
                key={tier.amount}
                onClick={() => handleDonate(tier.amount)}
                className={`w-full relative flex items-center p-3 rounded-xl border-2 text-left group transition-all duration-200
                  ${tier.popular
                    ? 'border-emerald-500 bg-emerald-50/50'
                    : 'border-transparent bg-gray-50 hover:bg-white hover:border-emerald-200 hover:shadow-sm'
                  }`}
              >
                {tier.popular && (
                  <div className="absolute -top-2.5 right-4 bg-emerald-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wide shadow-sm flex items-center gap-1 z-20">
                    Most Impact
                  </div>
                )}

                <div className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center 
                  ${tier.popular ? 'bg-emerald-100 text-emerald-700' : 'bg-white text-gray-500 group-hover:bg-emerald-100 group-hover:text-emerald-700'} 
                  mr-4 transition-colors duration-200`}>
                  <span className="font-bold text-base">₹</span>
                </div>

                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <h4 className="font-bold text-gray-900 text-lg">₹{tier.amount}</h4>
                    <span className={`text-[11px] font-bold uppercase tracking-wider ${tier.popular ? 'text-emerald-700' : 'text-gray-500 group-hover:text-emerald-600'}`}>
                      {tier.label}
                    </span>
                  </div>
                  <p className="text-xs text-gray-500 mt-0.5 flex items-center">
                    <CheckCircle2 className="w-3 h-3 mr-1 text-emerald-500" />
                    {tier.impact}
                  </p>
                </div>
              </button>
            ))}
          </div>

          <div className="flex items-center justify-center gap-1.5 text-center">
            <ShieldCheck className="w-3.5 h-3.5 text-gray-400" />
            <p className="text-[10px] font-medium text-gray-400">
              Secure • Verified • Tax Deductible
            </p>
          </div>
        </div>

      </Card>

      <PaymentModal
        isOpen={showPaymentModal}
        onClose={() => setShowPaymentModal(false)}
        paymentType="donation"
        amount={selectedAmount}
        title="Fuel the Mission"
        description="Your contribution propels our mission forward. Thank you."
      />
      <style>{`
        @keyframes scroll-x {
           0% { transform: translateX(0); }
           100% { transform: translateX(-50%); }
        }
        .animate-scroll-x-fast {
           animation: scroll-x 40s linear infinite;
        }
        .animate-scroll-x-reverse {
           animation: scroll-x 45s linear infinite reverse;
        }
      `}</style>
    </>
  );
};

export default DonationPaymentSection;
