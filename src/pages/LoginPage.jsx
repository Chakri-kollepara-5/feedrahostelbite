import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../config/firebase";
import { Eye, EyeOff, ArrowRight, CheckCircle2, Star, Globe, Shield } from "lucide-react";
import toast from "react-hot-toast";
import { motion, AnimatePresence } from "framer-motion";

const features = [
  {
    title: "Zero Waste Mission",
    desc: "Join a community dedicated to eliminating food waste through smart redistribution.",
    icon: Globe,
    color: "text-green-400"
  },
  {
    title: "Real-Time Impact",
    desc: "Track every meal saved and CO₂ prevented with our live dashboard.",
    icon: Star,
    color: "text-yellow-400"
  },
  {
    title: "Verified & Secure",
    desc: "Government recognized platform ensuring safe and transparent donations.",
    icon: Shield,
    color: "text-blue-400"
  }
];

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [currentFeature, setCurrentFeature] = useState(0);
  const navigate = useNavigate();

  // Rotate features
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentFeature((prev) => (prev + 1) % features.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      toast.error("Please fill in all fields");
      return;
    }
    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      toast.success("Welcome back!");
      navigate("/dashboard");
    } catch (error) {
      toast.error("Invalid credentials");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen w-full flex items-center justify-center p-4 overflow-hidden font-sans">

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
        {/* Gradient Overlay for readability while keeping bg visible */}
        <div className="absolute inset-0 bg-gradient-to-br from-black/80 via-black/50 to-green-900/40 backdrop-blur-[2px]" />
      </div>

      {/* 🌟 Main Glass Card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="relative z-10 w-full max-w-5xl bg-black/40 backdrop-blur-xl border border-white/10 rounded-3xl shadow-2xl overflow-hidden flex flex-col lg:flex-row min-h-[600px]"
      >

        {/* LEFT SIDE - INFO & FEATURES (Visible on large screens) */}
        <div className="hidden lg:flex lg:w-1/2 p-12 flex-col justify-between bg-gradient-to-br from-white/5 to-transparent border-r border-white/5 relative overflow-hidden">

          {/* Brand */}
          <div className="relative z-10">
            <div className="flex items-center gap-2 mb-6">
              <div className="w-8 h-8 rounded-lg bg-green-500 flex items-center justify-center">
                <span className="font-bold text-white text-lg">F</span>
              </div>
              <span className="text-2xl font-bold text-white tracking-wide">FeedraBite</span>
            </div>

            <h2 className="text-4xl font-extrabold text-white leading-tight mb-4">
              Empowering <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-300">Sustainable Communities</span>
            </h2>
            <p className="text-gray-300 text-lg max-w-sm">
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
                className="bg-white/10 border border-white/10 rounded-xl p-4 backdrop-blur-md"
              >
                <div className="flex items-start gap-4">
                  <div className={`p-2 rounded-lg bg-white/10 ${features[currentFeature].color}`}>
                    {React.createElement(features[currentFeature].icon, { className: "w-6 h-6" })}
                  </div>
                  <div>
                    <h3 className="font-bold text-white mb-1">{features[currentFeature].title}</h3>
                    <p className="text-sm text-gray-300">{features[currentFeature].desc}</p>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Indicators */}
            <div className="flex gap-2 mt-4 ml-1">
              {features.map((_, idx) => (
                <div
                  key={idx}
                  className={`h-1.5 rounded-full transition-all duration-300 ${idx === currentFeature ? 'w-6 bg-green-500' : 'w-1.5 bg-white/30'}`}
                />
              ))}
            </div>
          </div>

          <div className="mt-8 flex items-center gap-2 text-xs text-gray-400">
            <CheckCircle2 className="w-3 h-3 text-green-500" />
            <span>UDYAM-AP-10-0116772 Verified</span>
          </div>
        </div>

        {/* RIGHT SIDE - LOGIN FORM */}
        <div className="w-full lg:w-1/2 p-8 sm:p-12 flex flex-col justify-center bg-white/95 backdrop-blur-none lg:bg-white text-left">

          <div className="max-w-md mx-auto w-full">
            <div className="text-center lg:text-left mb-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Welcome Back</h3>
              <p className="text-gray-500">Enter your credentials to access your dashboard.</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">

              <div className="space-y-6">
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-700 ml-1">Email Address</label>
                  <div className="relative group">
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="name@company.com"
                      className="w-full px-5 py-4 bg-gray-50 border-2 border-transparent rounded-2xl text-gray-900 placeholder-gray-400 focus:outline-none focus:bg-white focus:border-green-500/50 hover:bg-white transition-all duration-300 font-medium shadow-sm group-hover:shadow-md"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-700 ml-1">Password</label>
                  <div className="relative group">
                    <input
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••"
                      className="w-full px-5 py-4 bg-gray-50 border-2 border-transparent rounded-2xl text-gray-900 placeholder-gray-400 focus:outline-none focus:bg-white focus:border-green-500/50 hover:bg-white transition-all duration-300 font-medium shadow-sm group-hover:shadow-md"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-green-600 transition-colors focus:outline-none p-1"
                    >
                      {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                    </button>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" className="w-4 h-4 rounded border-gray-300 text-green-600 focus:ring-green-500" />
                  <span className="text-sm text-gray-600">Remember me</span>
                </label>
                <Link to="/reset-password" className="text-sm font-medium text-green-600 hover:text-green-700">
                  Forgot password?
                </Link>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3.5 bg-gradient-to-r from-gray-900 to-black hover:from-black hover:to-gray-900 text-white rounded-xl font-bold shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-2 active:scale-95"
              >
                {loading ? "Signing in..." : <>Sign In <ArrowRight className="h-4 w-4" /></>}
              </button>

            </form>

            <div className="mt-8 text-center text-sm text-gray-600">
              Don’t have an account?{" "}
              <Link to="/register" className="font-bold text-green-600 hover:text-green-700">
                Sign up for free
              </Link>
            </div>

            <div className="lg:hidden mt-8 pt-6 border-t border-gray-100">
              <div className="flex items-center justify-center gap-2 text-xs text-gray-400">
                <Shield className="w-3 h-3" />
                <span>Trusted by 500+ NGOs</span>
              </div>
            </div>

          </div>
        </div>

      </motion.div>
    </div>
  );
}
