import React, { useState } from 'react';
import { Plus, Search, Filter, MapPin, Clock, Zap, RefreshCw, AlertCircle, Brain } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useRealTimeDonations } from '../hooks/useRealTimeData';
import { claimDonation } from '../services/donationService';
import DonationCard from '../DonationCard';
import LiveStats from '../LiveStats';
import CreateDonationModal from '../CreateDonationModal';
import SmartRadar from '../components/SmartRadar';
import toast from 'react-hot-toast';
import Button from '../ui/Button';
import Badge from '../ui/Badge';

const LoadingCard = () => (
  <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 animate-pulse">
    <div className="flex items-center justify-between mb-4">
      <div className="h-6 bg-gray-200 rounded w-32"></div>
      <div className="h-6 bg-gray-200 rounded w-20"></div>
    </div>
    <div className="space-y-3">
      <div className="h-4 bg-gray-200 rounded w-full"></div>
      <div className="h-4 bg-gray-200 rounded w-3/4"></div>
      <div className="h-4 bg-gray-200 rounded w-1/2"></div>
    </div>
    <div className="mt-4 h-10 bg-gray-200 rounded"></div>
  </div>
);

const ErrorDisplay = ({ error, onRetry }) => (
  <div className="bg-red-50 border border-red-200 rounded-xl p-8 text-center">
    <AlertCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
    <h3 className="text-lg font-semibold text-red-900 mb-2">Connection Issue</h3>
    <p className="text-red-700 mb-4">{error}</p>
    <button
      onClick={onRetry}
      className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors flex items-center mx-auto"
    >
      <RefreshCw className="h-4 w-4 mr-2" />
      Retry
    </button>
  </div>
);

export default function DonationsPage() {
  const { user } = useAuth();
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showSmartRadar, setShowSmartRadar] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [typeFilter, setTypeFilter] = useState('all');
  const [sortBy, setSortBy] = useState('newest');

  const { donations, loading, error } = useRealTimeDonations({
    status: statusFilter === 'all' ? undefined : statusFilter
  });

  let filteredDonations = donations.filter(donation => {
    const matchesSearch =
      searchTerm === '' ||
      (donation.foodType?.toLowerCase() || '').includes(searchTerm.toLowerCase()) ||
      (donation.description?.toLowerCase() || '').includes(searchTerm.toLowerCase()) ||
      (typeof donation.location === 'string' ? donation.location.toLowerCase() : '').includes(searchTerm.toLowerCase());

    const matchesType =
      typeFilter === 'all' ||
      donation.foodType?.toLowerCase() === typeFilter.toLowerCase();

    return matchesSearch && matchesType;
  });

  if (sortBy === 'highest_freshness') {
    filteredDonations.sort((a, b) => (b.freshnessScore || 0) - (a.freshnessScore || 0));
  } else if (sortBy === 'urgent') {
    const urgencyWeight = { high: 3, medium: 2, low: 1 };
    filteredDonations.sort((a, b) => (urgencyWeight[b.urgency] || 0) - (urgencyWeight[a.urgency] || 0));
  } else {
    // newest
    filteredDonations.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  }

  const handleClaim = async (donationId) => {
    if (!user) {
      toast.error('Please login to claim donations');
      return;
    }

    try {
      await claimDonation(donationId, user.uid);
      toast.success('Donation claimed successfully! 🎉');
    } catch (err) {
      console.error('Error claiming donation:', err);
      toast.error('Failed to claim donation');
    }
  };

  const handleCreateSuccess = () => {
    setShowCreateModal(false);
    toast.success('Donation created successfully! 🌟');
  };

  const handleRefresh = () => {
    window.location.reload();
  };

  return (
    <div className="min-h-screen bg-[#F4F7F5] pb-24 font-sans text-[#0D2B1B]">
      <div className="max-w-6xl mx-auto p-6 md:p-8">

        {/* HEADER */}
        <div className="bg-gradient-to-br from-[#b7f58b] via-[#9FE870] to-[#86db59] border border-[#84cf57]/40 rounded-3xl p-6 md:p-8 shadow-[0_20px_40px_-10px_rgba(13,43,27,0.12)] flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8 text-[#0D2B1B] relative overflow-hidden">
          <div className="space-y-1">
            <div className="flex items-center gap-3">
              <h1 className="text-3xl md:text-4xl font-black uppercase tracking-tighter text-[#0D2B1B]">
                Food Donations
              </h1>
              <Badge variant="success" className="animate-pulse">
                <Zap className="h-3 w-3 mr-1 fill-current" />
                LIVE
              </Badge>
            </div>
            <p className="text-[#0D2B1B]/80 font-bold text-sm">
              Discover available food donations in your area
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Button 
              variant={showSmartRadar ? "primary" : "outline"} 
              onClick={() => setShowSmartRadar(!showSmartRadar)} 
              size="sm"
              className={!showSmartRadar ? "animate-pulse shadow-[0_0_15px_rgba(159,232,112,0.4)] border-[#84cf57] text-[#0D2B1B] hover:shadow-[0_0_20px_rgba(159,232,112,0.6)]" : ""}
            >
              <Brain className="h-4 w-4 mr-2 stroke-[2.5]" />
              {showSmartRadar ? "Hide AI Radar" : "AI Smart Radar"}
            </Button>

            <Button variant="outline" onClick={handleRefresh} size="sm">
              <RefreshCw className="h-4 w-4 mr-2 stroke-[2.5]" />
              Refresh
            </Button>

            {user?.userType === 'donor' && (
              <Button
                variant="primary"
                onClick={() => setShowCreateModal(true)}
                size="sm"
              >
                <Plus className="h-4 w-4 mr-2 stroke-[2.5]" />
                Create Donation
              </Button>
            )}
          </div>
        </div>

        {/* LIVE STATS */}
        <div className="mb-8">
          <LiveStats />
        </div>

        {/* AI SMART RADAR */}
        {showSmartRadar && (
          <div className="mb-8">
            <SmartRadar donations={donations} />
          </div>
        )}

        {/* FILTERS */}
        <div className="bg-white/95 backdrop-blur-sm rounded-3xl p-6 border border-[#0D2B1B]/10 shadow-[0_15px_35px_-5px_rgba(13,43,27,0.08),0_5px_15px_rgba(0,0,0,0.02)] mb-8">

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">

            {/* Search */}
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-[#0D2B1B]/40 h-5 w-5 stroke-[2.5]" />
              <input
                type="text"
                placeholder="Search donations..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full h-12 pl-12 pr-4 bg-white border border-gray-200 rounded-full text-[#0D2B1B] placeholder-[#0D2B1B]/40 focus:outline-none focus:ring-4 focus:ring-[#9FE870]/30 focus:border-[#9FE870] focus:shadow-[0_0_20px_rgba(159,232,112,0.25)] font-semibold transition-all duration-200 text-sm"
              />
            </div>

            {/* Status Filter */}
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full h-12 px-5 bg-white border border-gray-200 rounded-full text-[#0D2B1B] focus:outline-none focus:ring-4 focus:ring-[#9FE870]/30 focus:border-[#9FE870] focus:shadow-[0_0_20px_rgba(159,232,112,0.25)] font-semibold transition-all duration-200 text-sm appearance-none cursor-pointer"
            >
              <option value="all">All Status</option>
              <option value="available">Available</option>
              <option value="claimed">Claimed</option>
              <option value="completed">Completed</option>
            </select>

            {/* Type Filter */}
            <select
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
              className="w-full h-12 px-5 bg-white border border-gray-200 rounded-full text-[#0D2B1B] focus:outline-none focus:ring-4 focus:ring-[#9FE870]/30 focus:border-[#9FE870] focus:shadow-[0_0_20px_rgba(159,232,112,0.25)] font-semibold transition-all duration-200 text-sm appearance-none cursor-pointer"
            >
              <option value="all">All Types</option>
              <option value="vegetables">Vegetables</option>
              <option value="fruits">Fruits</option>
              <option value="grains">Grains</option>
              <option value="dairy">Dairy</option>
              <option value="prepared meals">Prepared Meals</option>
              <option value="baked goods">Baked Goods</option>
            </select>

            {/* Sort By */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="w-full h-12 px-5 bg-white border border-gray-200 rounded-full text-[#0D2B1B] focus:outline-none focus:ring-4 focus:ring-[#9FE870]/30 focus:border-[#9FE870] focus:shadow-[0_0_20px_rgba(159,232,112,0.25)] font-semibold transition-all duration-200 text-sm appearance-none cursor-pointer"
            >
              <option value="newest">Sort by Newest</option>
              <option value="highest_freshness">Sort by Highest Freshness</option>
              <option value="urgent">Sort by Urgent</option>
            </select>

          </div>

          {/* FILTER SUMMARY */}
          <div className="mt-6 flex flex-wrap items-center gap-3 text-xs font-black uppercase tracking-wider text-[#0D2B1B]/80">
            <span>Showing:</span>
            <span className="bg-gradient-to-r from-[#b7f58b] to-[#9FE870] text-[#0D2B1B] border border-[#84cf57]/40 px-3 py-1 rounded-full shadow-sm">
              {filteredDonations.length} donations
            </span>

            {statusFilter !== 'all' && (
              <span className="bg-white/90 text-[#0D2B1B] border border-gray-200 px-3 py-1 rounded-full shadow-sm">
                Status: {statusFilter}
              </span>
            )}

            {typeFilter !== 'all' && (
              <span className="bg-white/90 text-[#0D2B1B] border border-gray-200 px-3 py-1 rounded-full shadow-sm">
                Type: {typeFilter}
              </span>
            )}

            {searchTerm && (
              <span className="bg-white/90 text-[#0D2B1B] border border-gray-200 px-3 py-1 rounded-full shadow-sm">
                Search: "{searchTerm}"
              </span>
            )}
          </div>
        </div>

        {/* CONTENT */}
        {error ? (
          <ErrorDisplay error={error} onRetry={handleRefresh} />
        ) : loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((i) => <LoadingCard key={i} />)}
          </div>
        ) : filteredDonations.length === 0 ? (
          <div className="text-center py-16 bg-white/95 border border-dashed border-[#0D2B1B]/15 shadow-sm rounded-3xl">
            <div className="text-7xl mb-4">🥘</div>
            <h3 className="text-xl font-black uppercase tracking-tighter text-[#0D2B1B] mb-2">
              No donations found
            </h3>

            <p className="text-sm font-semibold text-[#0D2B1B]/70 mb-6 max-w-sm mx-auto">
              {searchTerm || statusFilter !== 'all' || typeFilter !== 'all'
                ? 'Try adjusting your filters or search terms'
                : 'Be the first to create a donation!'}
            </p>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              {(searchTerm || statusFilter !== 'all' || typeFilter !== 'all') && (
                <Button
                  onClick={() => {
                    setSearchTerm('');
                    setStatusFilter('all');
                    setTypeFilter('all');
                  }}
                  variant="secondary"
                  size="sm"
                  className="py-2 px-6"
                >
                  Clear Filters
                </Button>
              )}

              {user?.userType === 'donor' && (
                <Button
                  onClick={() => setShowCreateModal(true)}
                  variant="primary"
                  size="sm"
                  className="py-2 px-6 bg-[#0D2B1B] text-[#9FE870]"
                >
                  Create Donation
                </Button>
              )}
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredDonations.map((donation) => (
              <DonationCard
                key={donation.id}
                donation={donation}
                onClaim={handleClaim}
                canClaim={
                  user?.userType !== 'donor' &&
                  donation.status === 'available' &&
                  donation.donorId !== user?.uid
                }
              />
            ))}
          </div>
        )}
      </div>

      {/* CREATE DONATION MODAL */}
      {showCreateModal && (
        <CreateDonationModal
          onClose={() => setShowCreateModal(false)}
          onSuccess={handleCreateSuccess}
        />
      )}
    </div>
  );
}
