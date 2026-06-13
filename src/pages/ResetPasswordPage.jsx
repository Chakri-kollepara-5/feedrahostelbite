import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { sendPasswordResetEmail } from 'firebase/auth';
import { auth } from '../config/firebase';
import { Mail, ArrowLeft } from 'lucide-react';
import toast from 'react-hot-toast';
import Button from '../ui/Button';

export default function ResetPasswordPage() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [emailSent, setEmailSent] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email) {
      toast.error('Please enter your email address');
      return;
    }

    setLoading(true);

    try {
      await sendPasswordResetEmail(auth, email);
      setEmailSent(true);
      toast.success('Password reset email sent!');
    } catch (error) {
      console.error('Password reset error:', error);
      toast.error(error.message || 'Failed to send reset email');
    } finally {
      setLoading(false);
    }
  };

  if (emailSent) {
    return (
      <div className="min-h-screen bg-transparent flex items-center justify-center p-4 font-sans text-[#0D2B1B]">
        <div className="max-w-md w-full bg-white/95 backdrop-blur-md border border-[#0D2B1B]/10 shadow-[0_20px_50px_rgba(13,43,27,0.12)] rounded-3xl p-8 text-center space-y-6 hover:shadow-[0_25px_60px_rgba(13,43,27,0.18)] transition-all duration-300">
          
          <div className="flex items-center justify-center">
            <div className="bg-gradient-to-br from-[#b7f58b] to-[#9FE870] border border-[#84cf57]/30 p-4 rounded-2xl shadow-[0_4px_12px_rgba(159,232,112,0.3)]">
              <Mail className="h-8 w-8 text-[#0D2B1B]" />
            </div>
          </div>

          <h1 className="text-3xl font-black uppercase tracking-tighter">Check Your Email</h1>

          <p className="text-sm font-semibold text-[#0D2B1B]/80 leading-relaxed">
            We've sent a password reset link to <strong className="text-[#0D2B1B] underline">{email}</strong>
          </p>

          <div className="space-y-4 pt-2">
            <p className="text-xs font-semibold text-[#0D2B1B]/60 uppercase tracking-wide">
              Didn't receive the email? Check spam folder or try again.
            </p>

            <Button
              variant="primary"
              onClick={() => setEmailSent(false)}
              className="w-full h-12 uppercase tracking-wider text-xs font-black"
            >
              Try Again
            </Button>

            <Link
              to="/login"
              className="flex items-center justify-center text-xs font-black uppercase tracking-wider text-[#0D2B1B] hover:underline"
            >
              <ArrowLeft className="h-4 w-4 mr-2 stroke-[2.5]" />
              Back to Login
            </Link>
          </div>

        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-transparent flex items-center justify-center p-4 font-sans text-[#0D2B1B]">
      <div className="max-w-md w-full bg-white/95 backdrop-blur-md border border-[#0D2B1B]/10 shadow-[0_20px_50px_rgba(13,43,27,0.12)] rounded-3xl p-8 hover:shadow-[0_25px_60px_rgba(13,43,27,0.18)] transition-all duration-300">

        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <div className="bg-gradient-to-br from-[#b7f58b] to-[#9FE870] border border-[#84cf57]/30 p-4 rounded-2xl shadow-[0_4px_12px_rgba(159,232,112,0.3)] text-2xl">
              🔑
            </div>
          </div>
          <h1 className="text-3xl font-black uppercase tracking-tighter mb-2">Reset Password</h1>
          <p className="text-sm font-semibold text-[#0D2B1B]/75">Enter your email to receive a reset link</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">

          {/* Email */}
          <div className="space-y-2">
            <label className="block text-xs font-black uppercase tracking-wider text-[#0D2B1B] ml-1">
              Email Address
            </label>

            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-[#0D2B1B]/40 h-5 w-5 stroke-[2.5]" />

              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full h-12 pl-12 pr-4 bg-white border border-gray-200 rounded-full text-[#0D2B1B] placeholder-[#0D2B1B]/40 focus:outline-none focus:ring-4 focus:ring-[#9FE870]/30 focus:border-[#9FE870] focus:shadow-[0_0_20px_rgba(159,232,112,0.25)] font-semibold transition-all duration-200"
                placeholder="Enter your email"
                required
              />
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full h-12 bg-gradient-to-b from-[#16462d] to-[#0D2B1B] text-[#9FE870] border border-[#0A2215] rounded-full font-black uppercase tracking-wider text-xs shadow-[0_4px_0_0_#05120b,0_8px_16px_rgba(13,43,27,0.15)] hover:from-[#1d5c3b] hover:to-[#123e25] hover:translate-y-[-1px] hover:shadow-[0_5px_0_0_#05120b,0_12px_20px_rgba(13,43,27,0.22)] active:translate-y-[3px] active:shadow-[0_1px_0_0_#05120b,0_4px_8px_rgba(13,43,27,0.1)] transition-all duration-150 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
          >
            {loading ? (
              <div className="flex items-center justify-center">
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-[#9FE870] mr-2"></div>
                Sending...
              </div>
            ) : (
              'Send Reset Link'
            )}
          </button>
        </form>

        {/* Back to Login */}
        <div className="mt-8 text-center">
          <Link
            to="/login"
            className="flex items-center justify-center text-xs font-black uppercase tracking-wider text-[#0D2B1B] hover:underline"
          >
            <ArrowLeft className="h-4 w-4 mr-2 stroke-[2.5]" />
            Back to Login
          </Link>
        </div>

      </div>
    </div>
  );
}
