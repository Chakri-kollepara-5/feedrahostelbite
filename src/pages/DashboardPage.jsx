import React, { useState } from "react";
import { Plus, MapPin, Users, AlertCircle, Zap, RefreshCw } from "lucide-react";

import { useAuth } from "../context/AuthContext";
import { useRealTimeDonations } from "../hooks/useRealTimeData";
import { claimDonation } from "../services/donationService";

import DonationCard from "../components/DonationCard";
import LiveStats from "../components/LiveStats";
import CreateDonationModal from "../components/CreateDonationModal";
import HostelBiteSection from "../components/HostelBiteSection";
import DonationPaymentSection from "../components/DonationPaymentSection";
import HostelMealBooking from "../components/HostelMealBooking";
import FoodWastagePrediction from "../components/FoodWastagePrediction";

import toast from "react-hot-toast";

const DashboardPage = () => {
  const { user } = useAuth();
  const [showCreateModal, setShowCreateModal] = useState(false);

  // Fetch global donations (limit 6)
  const {
    donations: allDonations,
    loading: allLoading,
    error: allError,
  } = useRealTimeDonations({ limit: 6 });

  // Fetch user donations (limit 3)
  const {
    donations: userDonations,
    loading: userLoading,
    error: userError,
  } = useRealTimeDonations({ userId: user?.uid, limit: 3 });

  // Claim donation
  const handleClaim = async (donationId) => {
    if (!user) {
      toast.error("Please login to claim donations");
      return;
    }

    try {
      await claimDonation(donationId, user.uid);
      toast.success("Donation claimed successfully!");
    } catch (err) {
      toast.error("Failed to claim donation");
    }
  };

  // After successful donation creation
  const handleCreateSuccess = () => {
    setShowCreateModal(false);
    toast.success("Donation created successfully!");
  };

  // Reload dashboard
  const handleRefresh = () => window.location.reload();

  // Error UI
  const ErrorDisplay = ({ error, onRetry }) => (
    <div className="bg-red-50 border border-red-200 rounded-xl p-6 text-center">
      <AlertCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
      <h3 className="text-lg font-semibold text-red-900 mb-2">Connection Issue</h3>
      <p className="text-red-700 mb-4">{error}</p>
      <button
        onClick={onRetry}
        className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700"
      >
        <RefreshCw className="h-4 w-4 inline-block mr-2" />
        Retry
      </button>
    </div>
  );

  // Loading skeleton card
  const LoadingCard = () => (
    <div className="bg-white rounded-2xl shadow-sm border p-6 animate-pulse">
      <div className="h-6 bg-gray-200 rounded w-32 mb-4" />
      <div className="h-4 bg-gray-200 rounded w-full mb-3" />
      <div className="h-4 bg-gray-200 rounded w-3/4 mb-3" />
      <div className="h-4 bg-gray-200 rounded w-1/2 mb-4" />
      <div className="h-10 bg-gray-200 rounded" />
    </div>
  );

  // safe arrays to avoid runtime errors
  const safeUserDonations = Array.isArray(userDonations) ? userDonations : [];
  const safeAllDonations = Array.isArray(allDonations) ? allDonations : [];

  const totalKg = safeUserDonations.reduce((sum, d) => sum + (d.quantity || 0), 0);

  return (
    <div className="relative min-h-screen">

      {/* Fullscreen Background Video (ensure public/mydemo.mp4 exists) */}
   {/* Hero Video Section */}
<div className="relative w-full h-[350px] rounded-2xl overflow-hidden shadow-xl mb-10">
  <video
    src="/mydemo.mp4"
    autoPlay
    loop
    muted
    playsInline
    className="w-full h-full object-cover"
  />

  {/* Overlay */}
  <div className="absolute inset-0 bg-black/40 flex flex-col justify-center items-center text-center px-6">
    <h1 className="text-white text-3xl sm:text-4xl font-extrabold drop-shadow-lg">
      Together We Save Food. Together We Save Lives.
    </h1>
    <p className="text-white/90 mt-2 text-lg max-w-2xl">
      Real-time donations, community support, and AI-powered food management.
    </p>
  </div>
</div>

      {/* Page content wrapper with slight overlay for readability */}
      <div className="min-h-screen bg-gradient-to-br from-gray-50/70 to-gray-100/70 backdrop-blur-sm pb-20">
        <div className="max-w-6xl mx-auto p-4 sm:p-6">

          {/* Welcome Header */}
          <div className="mb-6 sm:mb-8">
            <div className="flex flex-col sm:flex-row justify-between">
              <div>
                <div className="flex items-center space-x-2 mb-2">
                  <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
                    Welcome back, {user?.displayName || "Food Saver"}!
                  </h1>
                  <Zap className="h-6 w-6 text-yellow-500" />
                  <span className="text-xs sm:text-sm text-green-600 bg-green-100 px-2 py-1 rounded-full">
                    LIVE
                  </span>
                </div>

                <p className="text-gray-600">
                  {user?.userType === "donor"
                    ? "Ready to share food? Your impact updates in real-time!"
                    : "Looking for food donations? Live updates are enabled!"}
                </p>
              </div>

              <button
                onClick={handleRefresh}
                className="flex items-center bg-white border px-4 py-2 rounded-lg"
              >
                <RefreshCw className="h-4 w-4 mr-2" />
                Refresh
              </button>
            </div>
          </div>

          {/* Live Stats */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-2">
              Live Community Impact
            </h2>
            <LiveStats />
          </div>

          {/* Quick Actions */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Quick Actions</h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">

              {/* Create Donation */}
              <button
                onClick={() => setShowCreateModal(true)}
                className="flex items-center p-4 bg-green-50 border border-green-200 rounded-xl"
              >
                <div className="bg-green-500 p-2 rounded-lg text-white mr-3">
                  <Plus className="h-6 w-6" />
                </div>
                <div>
                  <div className="font-medium text-gray-900">Create Donation</div>
                  <div className="text-xs text-gray-600">Share extra food instantly</div>
                </div>
              </button>

              {/* Find Donations */}
              <button className="flex items-center p-4 bg-blue-50 border border-blue-200 rounded-xl">
                <div className="bg-blue-500 p-2 rounded-lg text-white mr-3">
                  <MapPin className="h-6 w-6" />
                </div>
                <div>
                  <div className="font-medium text-gray-900">Find Donations</div>
                  <div className="text-xs text-gray-600">Search nearby food</div>
                </div>
              </button>

              {/* Join Community */}
              <button className="flex items-center p-4 bg-purple-50 border border-purple-200 rounded-xl">
                <div className="bg-purple-500 p-2 rounded-lg text-white mr-3">
                  <Users className="h-6 w-6" />
                </div>
                <div>
                  <div className="font-medium text-gray-900">Join Community</div>
                  <div className="text-xs text-gray-600">Connect with people</div>
                </div>
              </button>

            </div>
          </div>

          {/* HostelBite Section */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">HostelBite Integration</h2>
            <HostelBiteSection />
          </div>

          {/* AI Prediction */}
          <div className="mb-8">
            <FoodWastagePrediction />
          </div>

          {/* Hostel Booking */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Book Hostel Meals</h2>
            <HostelMealBooking />
          </div>

          {/* Donate Money */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Support Our Mission</h2>
            <DonationPaymentSection />
          </div>

          {/* User's Recent Donations (donor only) */}
          {user?.userType === "donor" && (
            <div className="mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">My Recent Donations</h2>

              {userError ? (
                <ErrorDisplay error={userError} onRetry={handleRefresh} />
              ) : userLoading ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {[1, 2, 3].map((i) => <LoadingCard key={i} />)}
                </div>
              ) : safeUserDonations.length === 0 ? (
                <div className="text-center bg-white rounded-xl p-6 border">
                  <p className="text-gray-700 mb-4">You haven’t created any donations yet.</p>
                  <button
                    onClick={() => setShowCreateModal(true)}
                    className="bg-green-600 text-white px-4 py-2 rounded-lg"
                  >
                    Create First Donation
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {safeUserDonations.map((donation) => (
                    <DonationCard
                      key={donation.id}
                      donation={donation}
                      canClaim={false}
                      onClaim={() => {}}
                    />
                  ))}
                </div>
              )}
            </div>
          )}

          {/* All Live Donations */}
          <div className="mb-10">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Live Donations Feed</h2>

            {allError ? (
              <ErrorDisplay error={allError} onRetry={handleRefresh} />
            ) : allLoading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {[1, 2, 3, 4, 5, 6].map((i) => <LoadingCard key={i} />)}
              </div>
            ) : safeAllDonations.length === 0 ? (
              <div className="text-center bg-white rounded-xl p-6 border">No donations available right now.</div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {safeAllDonations.map((donation) => (
                  <DonationCard
                    key={donation.id}
                    donation={donation}
                    canClaim={user?.userType !== "donor"}
                    onClaim={() => handleClaim(donation.id)}
                  />
                ))}
              </div>
            )}
          </div>

          {/* Impact Section */}
          <div className="bg-gradient-to-r from-green-500 to-emerald-600 rounded-2xl p-8 text-white">
            <h2 className="text-2xl font-bold mb-6">Your Real-Time Impact</h2>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              <div className="text-center bg-white/10 rounded-xl p-4">
                <div className="text-3xl font-bold mb-2">{totalKg} kg</div>
                <div>Food Donated</div>
              </div>

              <div className="text-center bg-white/10 rounded-xl p-4">
                <div className="text-3xl font-bold mb-2">{Math.round(totalKg * 3)}</div>
                <div>Meals Provided</div>
              </div>

              <div className="text-center bg-white/10 rounded-xl p-4">
                <div className="text-3xl font-bold mb-2">{Math.round(totalKg * 2.3)} kg</div>
                <div>CO₂ Saved</div>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Modal */}
      {showCreateModal && (
        <CreateDonationModal onClose={() => setShowCreateModal(false)} onSuccess={handleCreateSuccess} />
      )}
    </div>
  );
};

export default DashboardPage;
