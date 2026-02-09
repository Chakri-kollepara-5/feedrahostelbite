import React, { useState } from "react";
import { motion } from "framer-motion";
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
      <Card className="relative overflow-hidden border-0 shadow-2xl flex flex-col h-full bg-[#051c14] rounded-[2rem] min-h-[700px] group">

        {/* COMET BACKGROUND ANIMATION */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          {/* Stars */}
          <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20" />

          {/* Shooting Stars */}
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute h-0.5 w-[100px] bg-gradient-to-r from-transparent via-emerald-200 to-transparent opacity-0"
              animate={{
                x: ['-100%', '200%'],
                y: [Math.random() * 100, Math.random() * 800],
                opacity: [0, 1, 0],
              }}
              transition={{
                duration: Math.random() * 2 + 1,
                repeat: Infinity,
                delay: Math.random() * 5,
                ease: "easeInOut"
              }}
              style={{
                top: `${Math.random() * 100}%`,
                left: `-${Math.random() * 20}%`,
                transform: 'rotate(45deg)'
              }}
            />
          ))}

          <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-emerald-600/20 rounded-full blur-[100px] animate-pulse" />
          <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-cyan-600/20 rounded-full blur-[100px] animate-pulse delay-1000" />
        </div>

        {/* 1. Header Section */}
        <div className="p-6 sm:p-8 flex flex-col z-10 relative">
          <div className="flex items-center justify-between mb-4">
            <Badge variant="outline" className="text-emerald-100 border-emerald-500/30 bg-emerald-900/30 backdrop-blur-md shadow-glow-green">
              <Heart className="w-3 h-3 mr-1 fill-current text-emerald-400" /> Support Mission
            </Badge>
            <div className="flex items-center text-xs text-cyan-300 font-medium bg-cyan-950/30 px-2 py-1 rounded-md border border-cyan-500/30 shadow-[0_0_10px_rgba(34,211,238,0.2)]">
              <Globe className="w-3 h-3 mr-1" /> Global Impact
            </div>
          </div>

          <h3 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight drop-shadow-lg">
            Make a <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-green-400 to-teal-400 animate-gradient-x">Real Impact</span> <br />
            With One Click.
          </h3>
        </div>

        {/* 2. Middle - Cosmic Impact Wall */}
        <div className="flex-grow relative overflow-hidden flex flex-col justify-center py-6 gap-4 z-10">
          {/* Row 1 - Fast Comet Stream */}
          <div className="flex gap-4 animate-scroll-x-fast w-max opacity-80 hover:opacity-100 transition-opacity">
            {[...impactImages, ...impactImages].map((src, idx) => (
              <div key={`r1-${idx}`} className="w-36 h-24 flex-shrink-0 rounded-xl overflow-hidden relative border border-emerald-500/20 shadow-[0_0_15px_rgba(16,185,129,0.05)] hover:shadow-[0_0_25px_rgba(16,185,129,0.2)] transition-all duration-300 group/img">
                <div className="absolute inset-0 bg-gradient-to-t from-emerald-950/60 to-transparent z-10" />
                <img src={src} className="w-full h-full object-cover transform group-hover/img:scale-110 transition-transform duration-700" alt="impact" />
              </div>
            ))}
          </div>

          {/* Row 2 - Reverse Stream */}
          <div className="flex gap-4 animate-scroll-x-reverse w-max opacity-80 hover:opacity-100 transition-opacity">
            {[...impactImages, ...impactImages].reverse().map((src, idx) => (
              <div key={`r2-${idx}`} className="w-36 h-24 flex-shrink-0 rounded-xl overflow-hidden relative border border-cyan-500/20 shadow-[0_0_15px_rgba(34,211,238,0.05)] hover:shadow-[0_0_25px_rgba(34,211,238,0.2)] transition-all duration-300 group/img">
                <div className="absolute inset-0 bg-gradient-to-t from-cyan-950/60 to-transparent z-10" />
                <img src={src} className="w-full h-full object-cover transform group-hover/img:scale-110 transition-transform duration-700" alt="impact" />
              </div>
            ))}
          </div>
        </div>

        {/* 3. Bottom Content - Tiers */}
        <div className="p-6 sm:p-8 pt-6 bg-black/40 backdrop-blur-xl border-t border-emerald-500/20 z-20">
          <div className="space-y-4 mb-5">
            {donationTiers.map((tier) => (
              <motion.button
                key={tier.amount}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => handleDonate(tier.amount)}
                className={`w-full relative flex items-center p-4 rounded-2xl border transition-all duration-300 text-left group overflow-hidden ${tier.popular ? 'border-cyan-500/50 bg-gradient-to-r from-emerald-900/20 to-cyan-900/20' : 'border-white/5 bg-white/5 hover:bg-white/10 hover:border-emerald-500/30'}`}
              >
                {tier.popular && (
                  <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/10 to-cyan-500/10 animate-pulse pointer-events-none" />
                )}

                {tier.popular && (
                  <div className="absolute -top-3 right-4 bg-gradient-to-r from-emerald-600 to-cyan-600 text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wide shadow-lg flex items-center gap-1 z-20">
                    <TrendingUp className="w-3 h-3" /> Most Impact
                  </div>
                )}

                <div className={`flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center bg-gradient-to-br ${tier.color} mr-4 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                  <span className="font-bold text-white text-lg">₹</span>
                </div>

                <div className="flex-1 relative z-10">
                  <div className="flex items-center justify-between">
                    <h4 className="font-bold text-white text-lg tracking-tight">₹{tier.amount}</h4>
                    <span className={`text-[10px] font-bold uppercase tracking-wider bg-clip-text text-transparent bg-gradient-to-r ${tier.color}`}>{tier.label}</span>
                  </div>
                  <p className="text-xs text-gray-400 mt-1 flex items-center font-medium group-hover:text-white transition-colors">
                    <CheckCircle2 className={`w-3 h-3 mr-1.5 text-emerald-400`} />
                    {tier.impact}
                  </p>
                </div>

                {/* Hover Glow Effect */}
                <div className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl ${tier.glow}`} />
              </motion.button>
            ))}
          </div>

          <div className="rounded-xl p-3 flex items-center justify-center gap-2 border border-emerald-500/10 bg-emerald-900/10 text-center backdrop-blur-sm">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <p className="text-[10px] font-medium text-emerald-200/70">
              Trusted by 10k+ Donors • 100% Tax Deductible
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
        description="Your contribution propels our mission forward at light speed. Thank you for being a star."
      />
      <style>{`
        @keyframes scroll-x {
           0% { transform: translateX(0); }
           100% { transform: translateX(-50%); }
        }
        .animate-scroll-x-fast {
           animation: scroll-x 30s linear infinite;
        }
        .animate-scroll-x-reverse {
           animation: scroll-x 35s linear infinite reverse;
        }
         .animate-gradient-x {
            background-size: 200% 200%;
            animation: gradient-x 3s ease infinite;
        }
        @keyframes gradient-x {
            0% { background-position: 0% 50% }
            50% { background-position: 100% 50% }
            100% { background-position: 0% 50% }
        }
      `}</style>
    </>
  );
};

export default DonationPaymentSection;
