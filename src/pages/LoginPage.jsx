import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../config/firebase";
import { Mail, Lock, Eye, EyeOff } from "lucide-react";
import toast from "react-hot-toast";

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
      await signInWithEmailAndPassword(auth, email, password);
      toast.success("Welcome back!");
      navigate("/dashboard");
    } catch (error) {
      toast.error(error?.message || "Failed to login");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative w-full min-h-screen flex items-center justify-center overflow-hidden">
<video
  src="/mydemo.mp4"
  autoPlay
  loop
  muted
  playsInline
  className="absolute inset-0 w-full h-full object-cover z-0"
/>


      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/50 backdrop-blur-[2px] z-0" />

      {/* Login Card */}
      <div className="relative z-10 w-full max-w-md mx-4 p-8 rounded-2xl bg-white/15 backdrop-blur-xl border border-white/20 shadow-[0_0_40px_rgba(0,0,0,0.3)]">

        {/* Heading */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-white drop-shadow-lg">
            Welcome Back 👋
          </h1>
          <p className="text-white/80 text-sm mt-1">
            Sign in to continue your journey on FeedraBite
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6 text-white">
          
          {/* Email */}
          <div>
            <label className="text-sm mb-1 block text-white/90">Email</label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-white/70 h-5 w-5" />
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full pl-10 pr-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/60 focus:ring-2 focus:ring-green-300 outline-none"
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <label className="text-sm mb-1 block text-white/90">Password</label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-white/70 h-5 w-5" />
              
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full pl-10 pr-12 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/60 focus:ring-2 focus:ring-green-300 outline-none"
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-white/70 hover:text-white"
              >
                {showPassword ? <EyeOff /> : <Eye />}
              </button>
            </div>
          </div>

          {/* Forgot Password */}
          <div className="text-right">
            <Link
              to="/reset-password"
              className="text-sm text-green-300 hover:text-white transition"
            >
              Forgot password?
            </Link>
          </div>

          {/* Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-green-600 hover:bg-green-700 rounded-lg text-white font-semibold shadow-lg transition active:scale-[0.98]"
          >
            {loading ? "Signing in..." : "Sign In"}
          </button>
        </form>

        {/* Signup Link */}
        <p className="text-center text-white/90 text-sm mt-6">
          Don’t have an account?{" "}
          <Link to="/register" className="font-semibold text-green-300 hover:text-white">
            Sign up
          </Link>
        </p>

        {/* Govt Verification */}
        <div className="mt-6 p-3 text-center text-white/80 text-xs bg-white/10 rounded-lg border border-white/20">
          Verified by Government of India — Udyam No: UDYAM-AP-10-0116772
        </div>

      </div>
    </div>
  );
}
