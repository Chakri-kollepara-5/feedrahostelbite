import React from 'react';
import {
  MapPin,
  Clock,
  Package,
  User,
  AlertTriangle,
  Zap,
} from 'lucide-react';

const DonationCard = ({ donation, onClaim, canClaim, loading = false }) => {
  /* ------------------ SKELETON LOADER ------------------ */
  if (loading) {
    return (
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden animate-pulse">
        <div className="p-6 pb-4 space-y-4">
          {/* Header */}
          <div className="flex justify-between">
            <div className="space-y-2">
              <div className="h-5 w-32 bg-gray-200 rounded" />
              <div className="h-4 w-20 bg-gray-200 rounded" />
            </div>
            <div className="space-y-2">
              <div className="h-5 w-24 bg-gray-200 rounded-full" />
              <div className="h-5 w-28 bg-gray-200 rounded-full" />
            </div>
          </div>

          {/* Description */}
          <div className="space-y-2">
            <div className="h-4 w-full bg-gray-200 rounded" />
            <div className="h-4 w-3/4 bg-gray-200 rounded" />
          </div>

          {/* Meta rows */}
          <div className="space-y-3">
            <div className="h-4 w-1/2 bg-gray-200 rounded" />
            <div className="h-4 w-3/4 bg-gray-200 rounded" />
            <div className="h-4 w-2/3 bg-gray-200 rounded" />
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 bg-gray-100 flex justify-between">
          <div className="h-3 w-32 bg-gray-200 rounded" />
          <div className="h-8 w-24 bg-gray-300 rounded-lg" />
        </div>
      </div>
    );
  }

  /* ------------------ HELPERS ------------------ */
  const getStatusColor = (status) => {
    switch (status) {
      case 'available':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'claimed':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'completed':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getUrgencyColor = (urgency) => {
    switch (urgency) {
      case 'high':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'medium':
        return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'low':
        return 'bg-green-100 text-green-800 border-green-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const parseDate = (dateInput) => {
    if (!dateInput) return new Date();
    if (typeof dateInput.toDate === 'function') return dateInput.toDate();
    const parsed = new Date(dateInput);
    return isNaN(parsed.getTime()) ? new Date() : parsed;
  };

  const formatDate = (dateInput) => {
    const date = parseDate(dateInput);
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }).format(date);
  };

  const getExpiryStatus = () => {
    const now = new Date();
    const expiry = parseDate(donation.expiryDate);
    const diff = expiry.getTime() - now.getTime();

    if (diff < 0)
      return { text: 'Expired', color: 'text-red-600', urgent: true };

    const hours = diff / (1000 * 60 * 60);

    if (hours < 6)
      return { text: `${Math.round(hours)}h left`, color: 'text-red-600', urgent: true };

    if (hours < 24)
      return { text: `${Math.round(hours)}h left`, color: 'text-orange-600', urgent: true };

    return {
      text: `${Math.round(hours / 24)}d left`,
      color: 'text-green-600',
      urgent: false,
    };
  };

  const expiryStatus = getExpiryStatus();
  const createdAtDate = parseDate(donation.createdAt);
  const isNew = new Date() - createdAtDate < 3600000;

  /* ------------------ UI ------------------ */
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-lg transition-all duration-300">
      <div className="p-6 pb-4">
        {/* Header */}
        <div className="flex justify-between mb-3">
          <div>
            <h3 className="text-lg font-semibold text-gray-900 capitalize">
              {donation.foodType}
            </h3>
            {isNew && (
              <div className="flex items-center space-x-1 bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-medium mt-1">
                <Zap className="h-3 w-3" />
                <span>NEW</span>
              </div>
            )}
          </div>

          <div className="flex flex-col space-y-1">
            <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(donation.status)}`}>
              {donation.status}
            </span>
            {donation.urgency && (
              <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getUrgencyColor(donation.urgency)}`}>
                {donation.urgency} priority
              </span>
            )}
          </div>
        </div>

        {/* Description */}
        <p className="text-gray-600 text-sm mb-4 line-clamp-2">
          {donation.description}
        </p>

        {/* Details */}
        <div className="space-y-3">
          <div className="flex items-center text-sm text-gray-500">
            <Package className="h-4 w-4 mr-2 text-green-600" />
            <span className="font-medium">{donation.quantity} kg available</span>
          </div>

          <div className="flex items-center text-sm text-gray-500">
            <MapPin className="h-4 w-4 mr-2 text-blue-600" />
            <span className="truncate">{donation.location}</span>
          </div>

          <div className="flex items-center text-sm text-gray-500">
            <Clock className="h-4 w-4 mr-2 text-orange-600" />
            <span className={`ml-1 font-medium ${expiryStatus.color}`}>
              {expiryStatus.text}
            </span>
            {expiryStatus.urgent && (
              <AlertTriangle className="h-4 w-4 ml-1 text-red-500" />
            )}
          </div>

          <div className="flex items-center text-sm text-gray-500">
            <User className="h-4 w-4 mr-2 text-purple-600" />
            <span>By {donation.donorName}</span>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="px-6 py-4 bg-gradient-to-r from-gray-50 to-gray-100 border-t border-gray-100 flex justify-between items-center">
        <span className="text-xs text-gray-500">
          Posted {formatDate(createdAtDate)}
        </span>

        {canClaim && donation.status === 'available' && (
          <button
            onClick={() => onClaim(donation.id)}
            className="bg-gradient-to-r from-green-500 to-emerald-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:from-green-600 hover:to-emerald-700 transition-all shadow-md"
          >
            Claim Food
          </button>
        )}
      </div>
    </div>
  );
};

export default DonationCard;
