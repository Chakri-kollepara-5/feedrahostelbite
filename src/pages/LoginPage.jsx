import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword, getAuth } from "firebase/auth";
import { auth } from "../config/firebase";
import { Mail, Lock, Eye, EyeOff } from "lucide-react";
import toast from "react-hot-toast";
import FlipText from "../components/FlipText";
import "../components/PartnerSection.css";
import partnerLogo from "../assets/patner.jpeg";
import { motion } from "framer-motion";



export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      toast.error("Please fill in all fields");
      return;
    }

    setLoading(true);
    try {
     const userCredential = await signInWithEmailAndPassword(
  auth,
  email,
  password
);

const user = userCredential.user;

// 🔴 TEMPORARY: get ID token for backend testing
const token = await user.getIdToken();
console.log("FIREBASE_ID_TOKEN:", token);

toast.success("Welcome back!");
navigate("/dashboard");

    } catch (error) {
      toast.error("Invalid credentials");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen w-full flex overflow-hidden">

      {/* 🎥 Background Video */}
      <video
        src="/mydemo.mp4"
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
      />

      {/* Dark Glass Overlay */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />

      {/* Main Layout */}
      <div className="relative z-10 flex w-full">

        {/* LEFT — BRAND / ABOUT */}
        <div className="hidden lg:flex w-1/2 flex-col justify-center items-center px-20 text-white">

          <div className="flip-container mb-6">
            Make
            <span className="mx-3">
              <div className="flip inline-block">
                <div><div>Work</div></div>
                <div><div>LifeStyle</div></div>
                <div><div>Impact</div></div>
              </div>
            </span>
            Powerful
          </div>

          <p className="text-white/80 max-w-lg text-center text-lg leading-relaxed">
            FeedraBite is an AI-powered platform that minimizes food wastage by
            intelligently connecting surplus food with NGOs and communities.
            Smart logistics. Real impact. Zero waste.
          </p>

          <div className="mt-10 flex gap-4 text-sm text-white/70">
            <span>🚀 Fast</span>
            <span>🌱 Sustainable</span>
            <span>🔐 Secure</span>
          </div>
        </div>

        {/* RIGHT — LOGIN */}
        <div className="w-full lg:w-1/2 flex items-center justify-center px-4">

          <div className="w-full max-w-md p-8 rounded-2xl
                          bg-white/15 backdrop-blur-xl
                          border border-white/20
                          shadow-[0_0_50px_rgba(0,0,0,0.4)]">

            {/* Header */}
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-white">
                Welcome Back 👋
              </h1>
              <p className="text-white/80 text-sm mt-1">
                Login to continue to FeedraBite
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-6">

              {/* Email */}
              <div>
                <label className="text-sm text-white/90">Email</label>
                <div className="relative mt-1">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-white/60" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    className="w-full pl-10 pr-4 py-3 rounded-lg
                               bg-white/10 border border-white/20
                               text-white placeholder-white/50
                               focus:ring-2 focus:ring-green-400 outline-none"
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <label className="text-sm text-white/90">Password</label>
                <div className="relative mt-1">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-white/60" />
                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full pl-10 pr-12 py-3 rounded-lg
                               bg-white/10 border border-white/20
                               text-white placeholder-white/50
                               focus:ring-2 focus:ring-green-400 outline-none"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-white/60 hover:text-white"
                  >
                    {showPassword ? <EyeOff /> : <Eye />}
                  </button>
                </div>
              </div>

              {/* Forgot */}
              <div className="text-right">
                <Link to="/reset-password" className="text-sm text-green-300 hover:text-white">
                  Forgot password?
                </Link>
              </div>

              {/* Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 rounded-lg font-semibold text-white
                           bg-gradient-to-r from-green-500 to-emerald-600
                           hover:from-green-600 hover:to-emerald-700
                           transition active:scale-[0.98]"
              >
                {loading ? "Signing in..." : "Sign In"}
              </button>
            </form>

            {/* Footer */}
            <p className="text-center text-white/80 text-sm mt-6">
              Don’t have an account?{" "}
              <Link to="/register" className="text-green-300 font-semibold hover:text-white">
                Sign up
              </Link>
            </p>

            <div className="mt-6 text-xs text-white/60 text-center bg-white/10 p-3 rounded-lg border border-white/20">
              Verified by Government of India — UDYAM-AP-10-0116772
            </div>
          </div>
        </div>
      </div>
     
    </div>
  );
}
