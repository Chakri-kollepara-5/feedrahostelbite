import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext"; // Use Auth Context
import { Eye, EyeOff, ArrowRight } from "lucide-react";
import toast from "react-hot-toast";
import { motion, AnimatePresence } from "framer-motion";

const features = [
  {
    title: "Zero Waste Mission",
    desc: "Join a community dedicated to eliminating food waste through smart redistribution.",
    num: "01"
  },
  {
    title: "Real-Time Impact",
    desc: "Track every meal saved and CO₂ prevented with our live dashboard.",
    num: "02"
  },
  {
    title: "Verified & Secure",
    desc: "Government recognized platform ensuring safe and transparent donations.",
    num: "03"
  }
];

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false); // Local loading state
  const [currentFeature, setCurrentFeature] = useState(0);
  const navigate = useNavigate();
  const { login, googleLogin, user } = useAuth(); // Hook

  // Rotate features
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentFeature((prev) => (prev + 1) % features.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  // Redirect when user is authenticated
  useEffect(() => {
    if (user) {
      navigate("/dashboard");
    }
  }, [user, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      toast.error("Please fill in all fields");
      return;
    }
    setIsSubmitting(true);
    try {
      await login(email.trim(), password);
      toast.success("Welcome back!");
      // Navigation is handled by useEffect
    } catch (error) {
      console.error("🔑 Login Error:", error);
      
      let message = "Invalid credentials";
      if (error.code === 'auth/wrong-password' || error.code === 'auth/invalid-credential') {
        message = "Incorrect password. If you registered via Google, please use the 'Continue with Google' button.";
      } else if (error.code === 'auth/user-not-found') {
        message = "No account found with this email.";
      } else if (error.code === 'auth/too-many-requests') {
        message = "Too many failed attempts. Please try again later.";
      }
      
      toast.error(message);
      setIsSubmitting(false);
    }
  };

  return (
    <div className="relative min-h-screen w-full flex items-center justify-center p-4 overflow-hidden font-sans bg-[#F4F7F5]">

      {/* 🎥 Full Screen Background */}
      <div className="absolute inset-0 z-0">
        <video
          src="/mydemo.mp4"
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover"
        />
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-black/85 via-black/60 to-[#0D2B1B]/60 backdrop-blur-[2px]" />
      </div>

      {/* 🌟 Main Neo-Brutalist Card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="relative z-10 w-full max-w-5xl bg-white/95 backdrop-blur-md border border-white/20 rounded-[32px] shadow-[0_25px_60px_-15px_rgba(0,0,0,0.4)] overflow-hidden flex flex-col lg:flex-row min-h-[600px] hover:shadow-[0_35px_80px_-10px_rgba(0,0,0,0.5)] transition-all duration-500"
      >

        {/* LEFT SIDE - INFO & FEATURES (Visible on large screens) */}
        <div className="hidden lg:flex lg:w-1/2 p-12 flex-col justify-between bg-gradient-to-br from-[#0D2B1B] to-[#081a10] border-r border-white/10 text-white relative overflow-hidden">

          {/* Brand */}
          <div className="relative z-10">
            <div className="flex items-center gap-2 mb-6">
              <div className="w-8 h-8 rounded-lg bg-[#9FE870] flex items-center justify-center border border-[#0A2215]/20 shadow-sm">
                <span className="font-black text-[#0D2B1B] text-base">F</span>
              </div>
              <span className="text-2xl font-black text-white tracking-tighter uppercase">FeedraBite.</span>
            </div>

            <h2 className="text-4xl font-black text-white leading-none mb-4 uppercase tracking-tighter">
              Empowering <br />
              <span className="text-[#9FE870]">Sustainable <br />Communities</span>
            </h2>
            <p className="text-[#F4F7F5]/85 text-sm font-semibold max-w-sm mt-6 leading-relaxed">
              Connecting surplus food with those in need. Simple, fast, and impactful.
            </p>
          </div>

          {/* Feature Carousel */}
          <div className="relative z-10 mt-auto h-32">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentFeature}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="bg-white/5 backdrop-blur-md border border-white/15 rounded-2xl p-4 shadow-[0_8px_32px_0_rgba(0,0,0,0.2)]"
              >
                <div className="flex items-start gap-4">
                  <div className="p-2 rounded-xl bg-[#9FE870] font-mono text-xs font-black text-[#0D2B1B] flex items-center justify-center min-w-8 h-8">
                    {features[currentFeature].num}
                  </div>
                  <div>
                    <h3 className="font-black text-[#9FE870] text-sm uppercase tracking-wide mb-0.5">{features[currentFeature].title}</h3>
                    <p className="text-xs text-[#F4F7F5]/90 font-semibold">{features[currentFeature].desc}</p>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Indicators */}
            <div className="flex gap-2 mt-4 ml-1">
              {features.map((_, idx) => (
                <div
                  key={idx}
                  className={`h-1.5 rounded-full transition-all duration-300 ${idx === currentFeature ? 'w-6 bg-[#9FE870]' : 'w-1.5 bg-white/30'}`}
                />
              ))}
            </div>
          </div>

          <div className="mt-8 flex items-center gap-2 text-xs font-mono text-[#F4F7F5]/50">
            <span>UDYAM-AP-10-0116772 Verified</span>
          </div>
        </div>

        {/* RIGHT SIDE - LOGIN FORM */}
        <div className="w-full lg:w-1/2 p-8 sm:p-12 flex flex-col justify-center bg-white text-left">

          <div className="max-w-md mx-auto w-full">
            <div className="text-center lg:text-left mb-8">
              <h3 className="text-3xl font-black text-[#0D2B1B] mb-2 uppercase tracking-tighter">Welcome Back</h3>
              <p className="text-sm font-semibold text-[#0D2B1B]/75">Enter your credentials to access your dashboard.</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">

              <div className="space-y-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-black uppercase tracking-wider text-[#0D2B1B] ml-1">Email Address</label>
                  <div className="relative">
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="name@company.com"
                      autoComplete="username"
                      className="w-full h-12 px-5 bg-white border border-gray-200 rounded-full text-[#0D2B1B] placeholder-[#0D2B1B]/40 focus:outline-none focus:ring-4 focus:ring-[#9FE870]/30 focus:border-[#9FE870] focus:shadow-[0_0_20px_rgba(159,232,112,0.25)] font-semibold transition-all duration-200"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-black uppercase tracking-wider text-[#0D2B1B] ml-1">Password</label>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••"
                      autoComplete="current-password"
                      className="w-full h-12 pl-5 pr-12 bg-white border border-gray-200 rounded-full text-[#0D2B1B] placeholder-[#0D2B1B]/40 focus:outline-none focus:ring-4 focus:ring-[#9FE870]/30 focus:border-[#9FE870] focus:shadow-[0_0_20px_rgba(159,232,112,0.25)] font-semibold transition-all duration-200"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-[#0D2B1B] hover:text-[#0D2B1B]/75 transition-colors focus:outline-none p-1"
                    >
                      {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                    </button>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <label className="flex items-center gap-2 cursor-pointer select-none">
                  <input type="checkbox" className="w-4 h-4 rounded border border-gray-300 text-[#0D2B1B] focus:ring-[#9FE870]/30 focus:ring-offset-0" />
                  <span className="text-xs font-bold text-[#0D2B1B]/85">Remember me</span>
                </label>
                <Link to="/reset-password" className="text-xs font-black uppercase tracking-wider text-[#0D2B1B] hover:underline">
                  Forgot password?
                </Link>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full h-12 bg-gradient-to-b from-[#16462d] to-[#0D2B1B] text-[#9FE870] border border-[#0A2215] rounded-full font-black uppercase tracking-wider text-xs shadow-[0_4px_0_0_#05120b,0_8px_16px_rgba(13,43,27,0.15)] hover:from-[#1d5c3b] hover:to-[#123e25] hover:translate-y-[-1px] hover:shadow-[0_5px_0_0_#05120b,0_12px_20px_rgba(13,43,27,0.22)] active:translate-y-[3px] active:shadow-[0_1px_0_0_#05120b,0_4px_8px_rgba(13,43,27,0.1)] transition-all duration-150 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {isSubmitting ? "Signing in..." : <>Sign In <ArrowRight className="h-4 w-4 stroke-[2.5]" /></>}
              </button>

              <div className="relative my-6">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t border-[#0D2B1B]/5" />
                </div>
                <div className="relative flex justify-center text-xs font-black uppercase tracking-wider">
                  <span className="bg-white px-3 text-[#0D2B1B]/40">Or continue with</span>
                </div>
              </div>

              <button
                type="button"
                onClick={async () => {
                  try {
                    await googleLogin();
                    toast.success("Welcome back!");
                  } catch (error) {
                    console.error(error);
                    toast.error("Google sign in failed");
                  }
                }}
                className="w-full h-12 bg-gradient-to-b from-white to-[#f1f5f9] text-[#0D2B1B] border border-[#cbd5e1] rounded-full font-black uppercase tracking-wider text-xs shadow-[0_4px_0_0_#cbd5e1,0_8px_16px_rgba(0,0,0,0.06)] hover:from-[#f8fafc] hover:to-[#e2e8f0] hover:translate-y-[-1px] hover:shadow-[0_5px_0_0_#cbd5e1,0_12px_20px_rgba(0,0,0,0.08)] active:translate-y-[3px] active:shadow-[0_1px_0_0_#cbd5e1,0_4px_8px_rgba(0,0,0,0.04)] transition-all duration-150 flex items-center justify-center gap-3"
              >
                <img src="https://www.svgrepo.com/show/475656/google-color.svg" className="h-5 w-5" alt="Google" />
                Continue with Google
              </button>

            </form>

            <div className="mt-8 text-center text-xs font-bold text-[#0D2B1B]/75 uppercase tracking-wide">
              Don’t have an account?{" "}
              <Link to="/register" className="font-black text-[#0D2B1B] hover:underline">
                Sign up for free
              </Link>
            </div>

            <div className="lg:hidden mt-8 pt-6 border-t border-[#0D2B1B]/10">
              <div className="flex items-center justify-center gap-2 text-xs font-mono text-[#0D2B1B]/40">
                <span>Trusted by 500+ NGOs</span>
              </div>
            </div>

          </div>
        </div>

      </motion.div>
    </div>
  );
}
