import React, { useState, useMemo } from "react";
import { Zap, RefreshCw, UploadCloud } from "lucide-react";
import "../components/impactAnimation.css";
import "../components/PartnerSection.css";
import partnerLogo from "../assets/patner.jpeg";
import { motion } from "framer-motion";

import { useAuth } from "../context/AuthContext";
import { useRealTimeDonations } from "../hooks/useRealTimeData";
import { claimDonation } from "../services/donationService";

import CreateDonationModal from "../components/CreateDonationModal";
import LiveStats from "../components/LiveStats";
import HostelBiteSection from "../components/HostelBiteSection";
import DonationPaymentSection from "../components/DonationPaymentSection";
import HostelMealBooking from "../components/HostelMealBooking";
import FoodWastageAIStatus from "../components/FoodWastageAIStatus";
import toast from "react-hot-toast";

// New Premium Components
import HeroSection from "../components/dashboard/HeroSection";
import QuickActions from "../components/dashboard/QuickActions";
import ImpactStats from "../components/dashboard/ImpactStats";
import DonationList from "../components/dashboard/DonationList";
import Button from "../components/ui/Button";
import Badge from "../components/ui/Badge";

const DashboardPage = () => {
  const { user } = useAuth();
  const [showCreateModal, setShowCreateModal] = useState(false);

  const {
    donations: allDonations,
    loading: allLoading,
    error: allError,
  } = useRealTimeDonations({ limit: 6 });

  const {
    donations: userDonations,
    loading: userLoading,
    error: userError,
  } = useRealTimeDonations({ userId: user?.uid, limit: 3 });

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

  const handleCreateSuccess = () => {
    setShowCreateModal(false);
    toast.success("Donation created successfully!");
  };

  const handleRefresh = () => {
    window.location.reload();
  };

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const safeUserDonations = useMemo(() => Array.isArray(userDonations) ? userDonations : [], [userDonations]);
  const safeAllDonations = useMemo(() => Array.isArray(allDonations) ? allDonations : [], [allDonations]);
  const totalKg = useMemo(() => safeUserDonations.reduce((sum, d) => sum + (d.quantity || 0), 0), [safeUserDonations]);

  return (
    <div className="relative min-h-screen bg-gray-50 selection:bg-primary-100 selection:text-primary-900 font-sans">

      {/* Background decoration */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-0 inset-x-0 h-96 bg-gradient-to-b from-white to-gray-50"></div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 pb-24"
      >

        {/* Header Section */}
        <header className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-gray-200/60 transition-all duration-300">
          <div className="space-y-1">
            <div className="flex items-center gap-3">
              <h1 className="text-3xl font-bold tracking-tight text-gray-900">
                Dashboard
              </h1>
              <Badge variant="success" className="animate-pulse shadow-sm">
                <Zap className="h-3 w-3 mr-1 fill-current" />
                LIVE
              </Badge>
            </div>
            <p className="text-gray-500 font-medium text-sm">
              Welcome back, <span className="text-gray-900 font-semibold">{user?.displayName || "Food Saver"}</span>
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Button variant="outline" onClick={handleRefresh} size="sm" className="hidden sm:flex bg-white hover:bg-gray-50">
              <RefreshCw className="h-4 w-4 mr-2" />
              Sync Data
            </Button>
            <Button variant="primary" onClick={() => setShowCreateModal(true)} size="sm" className="shadow-lg shadow-primary-500/20">
              <UploadCloud className="h-4 w-4 mr-2" />
              New Donation
            </Button>
          </div>
        </header>

        {/* Hero Section - Full Width */}
        <HeroSection />

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

          {/* Left Column: Feed & Content (8 cols) */}
          <div className="lg:col-span-8 space-y-10">

            {/* Left Col Content */}
            {user?.userType === "donor" && (
              <DonationList
                title="My Recent Donations"
                donations={safeUserDonations}
                loading={userLoading}
                error={userError}
                onRetry={handleRefresh}
                canClaim={false}
                emptyMessage="You haven’t created any donations yet."
                showCreateButton={true}
                onCreate={() => setShowCreateModal(true)}
              />
            )}

            <div id="community-feed" className="scroll-mt-24">
              <DonationList
                title="Community Feed"
                donations={safeAllDonations}
                loading={allLoading}
                error={allError}
                onRetry={handleRefresh}
                canClaim={user?.userType !== "donor"}
                onClaim={handleClaim}
                emptyMessage="No donations available right now."
              />
            </div>

            <div className="space-y-10">
              <div id="community-insights" className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm scroll-mt-24">
                <h2 className="text-lg font-bold mb-4">Community Insights</h2>
                <LiveStats />
              </div>

              <HostelBiteSection />
              <FoodWastageAIStatus />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <HostelMealBooking />
                <DonationPaymentSection />
              </div>
            </div>

            <section className="pt-8 border-t border-gray-200">
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="bg-gradient-to-br from-white to-gray-50 rounded-2xl p-6 border border-gray-100 shadow-sm flex flex-col sm:flex-row items-center gap-6"
              >
                <img
                  src={partnerLogo}
                  alt="Partner Logo"
                  className="w-20 h-20 rounded-full object-cover shadow-md ring-4 ring-white"
                />
                <div className="text-center sm:text-left">
                  <div className="flex items-center justify-center sm:justify-start gap-2 mb-1">
                    <h3 className="font-bold text-gray-900">Collaboration Partner</h3>
                    <Badge variant="info">Verified</Badge>
                  </div>

                  <p className="text-gray-600 text-sm mb-3 max-w-lg">
                    Feedra is collaborating with <b>Jani Basha Seva Samithi</b> (Regd No: 114 of 2024) to support
                    community-focused initiatives.
                  </p>

                  <a
                    href="https://youtube.com/@kbchannel786?si=DnaGWs-_Z4IjAs5k"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary-600 hover:text-primary-700 font-medium text-sm inline-flex items-center"
                  >
                    Visit Partner Channel
                    <span className="ml-1" aria-hidden="true">&rarr;</span>
                  </a>
                </div>
              </motion.div>
            </section>

          </div>

          {/* Right Column: Sidebar (4 cols) - Sticky */}
          <div className="lg:col-span-4 space-y-8 sticky top-24">
            <ImpactStats />
            <QuickActions
              onCreateDonation={() => setShowCreateModal(true)}
              onFindDonations={() => scrollToSection('community-feed')}
              onJoinCommunity={() => scrollToSection('community-insights')}
            />

            <div className="bg-primary-900 rounded-2xl p-6 text-white text-center shadow-lg relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-tr from-primary-800 to-transparent opacity-50"></div>
              <div className="relative z-10">
                <h3 className="font-bold text-lg mb-2">Did you know?</h3>
                <p className="text-primary-100 text-sm mb-4">
                  1kg of food waste generates 2.5kg of CO2 emissions. Your donations matter!
                </p>
                <a
                  href="https://en.wikipedia.org/wiki/Food_waste#Environmental_impact"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block w-full"
                >
                  <Button variant="outline" size="sm" className="w-full text-white border-white/20 hover:bg-white/10 hover:text-white">
                    Learn More on Wikipedia
                  </Button>
                </a>
              </div>
            </div>
          </div>

        </div>

      </motion.div>

      {/* Modal Backdrop Blur */}
      {showCreateModal && (
        <CreateDonationModal onClose={() => setShowCreateModal(false)} onSuccess={handleCreateSuccess} />
      )}
    </div>
  );
};

export default DashboardPage;
