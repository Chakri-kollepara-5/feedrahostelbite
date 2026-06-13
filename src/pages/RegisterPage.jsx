import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { auth, db } from '../config/firebase';
import { useAuth } from '../context/AuthContext';
import { Mail, Lock, User, Eye, EyeOff, Building, Heart } from 'lucide-react';
import toast from 'react-hot-toast';

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    userType: 'donor',
    organization: '',
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const { syncUser, setRegistrationMetadata } = useAuth();
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.password) {
      toast.error('Please fill in all required fields');
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }

    if (formData.password.length < 6) {
      toast.error('Password must be at least 6 characters');
      return;
    }

    setLoading(true);

    try {
      // Set metadata in context before Firebase triggers the onAuthStateChanged listener
      setRegistrationMetadata({
        userType: formData.userType,
        organization: formData.organization,
        name: formData.name
      });

      const userCredential = await createUserWithEmailAndPassword(
        auth,
        formData.email.trim(),
        formData.password
      );

      const user = userCredential.user;

      await updateProfile(user, {
        displayName: formData.name,
      });

      // 1. Sync with backend through AuthContext
      // This ensures the global 'user' state is updated and metadata is saved
      syncUser(user, {
        userType: formData.userType,
        organization: formData.organization,
        name: formData.name
      }).catch(err => console.error('⚠️ Registration sync failure:', err));

      // 2. Set Firestore record in background (fire and forget)
      setDoc(doc(db, 'users', user.uid), {
        name: formData.name,
        displayName: formData.name,
        email: formData.email,
        userType: formData.userType,
        organization: formData.organization || '',
        createdAt: new Date(),
        emailVerified: false,
      }).catch(fsError => console.error('⚠️ Firestore sync warning:', fsError));

      toast.success('Account created! Logging in...');
      navigate('/dashboard');

    } catch (error) {
      console.error('Registration error:', error);
      toast.error(error.message || 'Failed to create account');
    } finally {
      setLoading(false);
    }
  };

  const userTypes = [
    {
      value: 'donor',
      label: 'Food Donor',
      description: 'Restaurants, stores, individuals',
      icon: Building,
    },
    {
      value: 'ngo',
      label: 'NGO/Charity',
      description: 'Non-profit organizations',
      icon: Heart,
    },
    {
      value: 'volunteer',
      label: 'Volunteer',
      description: 'Individual helpers',
      icon: User,
    },
  ];

  return (
    <div className="min-h-screen bg-transparent flex items-center justify-center p-4 font-sans text-[#0D2B1B]">
      <div className="max-w-md w-full bg-white/95 backdrop-blur-md border border-[#0D2B1B]/10 shadow-[0_20px_50px_rgba(13,43,27,0.12)] rounded-3xl p-8 my-8 hover:shadow-[0_25px_60px_rgba(13,43,27,0.18)] transition-all duration-300">

        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <div className="bg-gradient-to-br from-[#b7f58b] to-[#9FE870] border border-[#84cf57]/30 p-4 rounded-2xl shadow-[0_4px_12px_rgba(159,232,112,0.3)] text-2xl">
              🌱
            </div>
          </div>
          <h1 className="text-3xl font-black uppercase tracking-tighter mb-2">Join Feedra!</h1>
          <p className="text-sm font-semibold text-[#0D2B1B]/75">Help reduce food waste in India</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">

          {/* Name */}
          <div className="space-y-2">
            <label className="block text-xs font-black uppercase tracking-wider text-[#0D2B1B] ml-1">Full Name</label>
            <div className="relative">
              <User className="absolute left-4 top-1/2 -translate-y-1/2 text-[#0D2B1B]/40 h-5 w-5 stroke-[2.5]" />
              <input
                name="name"
                type="text"
                value={formData.name}
                onChange={handleInputChange}
                className="w-full h-12 pl-12 pr-4 bg-white border border-gray-200 rounded-full text-[#0D2B1B] placeholder-[#0D2B1B]/40 focus:outline-none focus:ring-4 focus:ring-[#9FE870]/30 focus:border-[#9FE870] focus:shadow-[0_0_20px_rgba(159,232,112,0.25)] font-semibold transition-all duration-200"
                placeholder="Enter your full name"
                autoComplete="name"
                required
              />
            </div>
          </div>

          {/* Email */}
          <div className="space-y-2">
            <label className="block text-xs font-black uppercase tracking-wider text-[#0D2B1B] ml-1">Email Address</label>
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-[#0D2B1B]/40 h-5 w-5 stroke-[2.5]" />
              <input
                name="email"
                type="email"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full h-12 pl-12 pr-4 bg-white border border-gray-200 rounded-full text-[#0D2B1B] placeholder-[#0D2B1B]/40 focus:outline-none focus:ring-4 focus:ring-[#9FE870]/30 focus:border-[#9FE870] focus:shadow-[0_0_20px_rgba(159,232,112,0.25)] font-semibold transition-all duration-200"
                placeholder="Enter your email"
                autoComplete="email"
                required
              />
            </div>
          </div>

          {/* User Type */}
          <div className="space-y-3">
            <label className="block text-xs font-black uppercase tracking-wider text-[#0D2B1B] ml-1">I am a...</label>
            <div className="grid grid-cols-1 gap-3">
              {userTypes.map((type) => {
                const Icon = type.icon;
                const isSelected = formData.userType === type.value;
                return (
                  <label
                    key={type.value}
                    className={`flex items-center p-4 border rounded-2xl cursor-pointer 
                    transition-all duration-200 ${isSelected
                        ? 'border-[#84cf57] bg-gradient-to-r from-[#9FE870]/20 to-[#b7f58b]/10 shadow-[0_4px_12px_rgba(159,232,112,0.25)]'
                        : 'border-[#0D2B1B]/10 hover:border-[#0D2B1B]/20 hover:bg-[#F4F7F5]/50'
                      }`}
                  >
                    <input
                      type="radio"
                      name="userType"
                      value={type.value}
                      checked={formData.userType === type.value}
                      onChange={handleInputChange}
                      className="sr-only"
                    />
                    <Icon className="h-6 w-6 text-[#0D2B1B] mr-4 stroke-[2.5] flex-shrink-0" />
                    <div>
                      <div className="font-extrabold text-sm text-[#0D2B1B] uppercase tracking-wide">{type.label}</div>
                      <div className="text-xs font-semibold text-[#0D2B1B]/70 mt-0.5">{type.description}</div>
                    </div>
                  </label>
                );
              })}
            </div>
          </div>

          {/* Organization (NGO only) */}
          {formData.userType === 'ngo' && (
            <div className="space-y-2">
              <label className="block text-xs font-black uppercase tracking-wider text-[#0D2B1B] ml-1">Organization Name</label>
              <div className="relative">
                <Building className="absolute left-4 top-1/2 -translate-y-1/2 text-[#0D2B1B]/40 h-5 w-5 stroke-[2.5]" />
                <input
                  name="organization"
                  type="text"
                  value={formData.organization}
                  onChange={handleInputChange}
                  className="w-full h-12 pl-12 pr-4 bg-white border border-gray-200 rounded-full text-[#0D2B1B] placeholder-[#0D2B1B]/40 focus:outline-none focus:ring-4 focus:ring-[#9FE870]/30 focus:border-[#9FE870] focus:shadow-[0_0_20px_rgba(159,232,112,0.25)] font-semibold transition-all duration-200"
                  placeholder="Enter organization name"
                  autoComplete="organization"
                />
              </div>
            </div>
          )}

          {/* Password */}
          <div className="space-y-2">
            <label className="block text-xs font-black uppercase tracking-wider text-[#0D2B1B] ml-1">Password</label>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-[#0D2B1B]/40 h-5 w-5 stroke-[2.5]" />
              <input
                name="password"
                type={showPassword ? 'text' : 'password'}
                value={formData.password}
                onChange={handleInputChange}
                className="w-full h-12 pl-12 pr-12 bg-white border border-gray-200 rounded-full text-[#0D2B1B] placeholder-[#0D2B1B]/40 focus:outline-none focus:ring-4 focus:ring-[#9FE870]/30 focus:border-[#9FE870] focus:shadow-[0_0_20px_rgba(159,232,112,0.25)] font-semibold transition-all duration-200"
                placeholder="Create a password"
                autoComplete="new-password"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-[#0D2B1B]/40 hover:text-[#0D2B1B]"
              >
                {showPassword ? <EyeOff className="h-5 w-5 stroke-[2]" /> : <Eye className="h-5 w-5 stroke-[2]" />}
              </button>
            </div>
          </div>

          {/* Confirm Password */}
          <div className="space-y-2">
            <label className="block text-xs font-black uppercase tracking-wider text-[#0D2B1B] ml-1">Confirm Password</label>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-[#0D2B1B]/40 h-5 w-5 stroke-[2.5]" />
              <input
                name="confirmPassword"
                type={showConfirmPassword ? 'text' : 'password'}
                value={formData.confirmPassword}
                onChange={handleInputChange}
                className="w-full h-12 pl-12 pr-12 bg-white border border-gray-200 rounded-full text-[#0D2B1B] placeholder-[#0D2B1B]/40 focus:outline-none focus:ring-4 focus:ring-[#9FE870]/30 focus:border-[#9FE870] focus:shadow-[0_0_20px_rgba(159,232,112,0.25)] font-semibold transition-all duration-200"
                placeholder="Confirm your password"
                autoComplete="new-password"
                required
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-[#0D2B1B]/40 hover:text-[#0D2B1B]"
              >
                {showConfirmPassword ? <EyeOff className="h-5 w-5 stroke-[2]" /> : <Eye className="h-5 w-5 stroke-[2]" />}
              </button>
            </div>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="w-full h-12 bg-gradient-to-b from-[#16462d] to-[#0D2B1B] text-[#9FE870] border border-[#0A2215] rounded-full font-black uppercase tracking-wider text-xs shadow-[0_4px_0_0_#05120b,0_8px_16px_rgba(13,43,27,0.15)] hover:from-[#1d5c3b] hover:to-[#123e25] hover:translate-y-[-1px] hover:shadow-[0_5px_0_0_#05120b,0_12px_20px_rgba(13,43,27,0.22)] active:translate-y-[3px] active:shadow-[0_1px_0_0_#05120b,0_4px_8px_rgba(13,43,27,0.1)] transition-all duration-150 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
          >
            {loading ? (
              <div className="flex items-center justify-center">
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-[#9FE870] mr-2"></div>
                Creating account...
              </div>
            ) : (
              'Create Account'
            )}
          </button>
        </form>

        {/* Login Link */}
        <div className="mt-8 text-center text-xs font-bold text-[#0D2B1B]/75 uppercase tracking-wide">
          <p>
            Already have an account?{' '}
            <Link to="/login" className="font-black text-[#0D2B1B] hover:underline">
              Sign in
            </Link>
          </p>
        </div>

        {/* Email Notice */}
        <div className="mt-6 p-4 bg-sky-100/50 border border-sky-200/50 rounded-2xl shadow-sm">
          <p className="text-[10px] font-bold text-[#0D2B1B] text-center uppercase tracking-wide">
            A welcome email will be sent after registration
          </p>
        </div>

        {/* Verification */}
        <div className="mt-6 p-4 bg-gradient-to-br from-[#b7f58b]/20 to-[#9FE870]/10 border border-[#84cf57]/20 rounded-2xl shadow-sm">
          <div className="flex items-center justify-center space-x-3">
            <div className="text-center">
              <div className="text-[11px] font-black uppercase tracking-wider text-[#0D2B1B]">
                Verified by Government of India
              </div>
              <div className="text-[9px] font-bold font-mono text-[#0D2B1B]/70 mt-0.5">
                Udyam No: UDYAM-AP-10-0116772
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
