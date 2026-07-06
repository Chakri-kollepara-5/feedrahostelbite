import React, { useState } from 'react';
import {
  AlertTriangle,
} from 'lucide-react';
import { Card, CardHeader, CardContent, CardFooter } from './ui/Card';
import Badge from './ui/Badge';
import Button from './ui/Button';
import DonationDetailModal from './components/DonationDetailModal';

const DonationCard = ({ donation, onClaim, canClaim }) => {
  const [showDetailModal, setShowDetailModal] = useState(false);

  /* ------------------ HELPERS ------------------ */
  const getStatusVariant = (status) => {
    const norm = (status || '').toLowerCase();
    switch (norm) {
      case 'available':
      case 'posted':
        return 'success';
      case 'claimed':
      case 'accepted':
        return 'warning';
      case 'completed':
      case 'delivered':
        return 'info';
      case 'picked_up':
        return 'secondary';
      case 'cancelled':
      case 'expired':
        return 'error';
      default:
        return 'secondary';
    }
  };

  const getUrgencyVariant = (urgency) => {
    switch (urgency) {
      case 'high': return 'error';
      case 'medium': return 'warning';
      case 'low': return 'success';
      default: return 'secondary';
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

    if (diff < 0) return { text: 'Expired', color: 'text-red-600', urgent: true };
    const hours = diff / (1000 * 60 * 60);

    if (hours < 6) return { text: `${Math.round(hours)}h left`, color: 'text-red-600', urgent: true };
    if (hours < 24) return { text: `${Math.round(hours)}h left`, color: 'text-orange-600', urgent: true };

    return { text: `${Math.round(hours / 24)}d left`, color: 'text-green-600', urgent: false };
  };

  const expiryStatus = getExpiryStatus();
  const createdAtDate = parseDate(donation.createdAt);
  const isNew = new Date() - createdAtDate < 3600000;

  return (
    <>
      <Card 
        className="h-full flex flex-col group cursor-pointer"
        onClick={() => setShowDetailModal(true)}
      >
        <CardContent className="flex-grow p-5 space-y-4">
          {/* Header with Badges */}
          <div className="relative mb-3">
            <img
              src={donation.image || (donation.images && donation.images[0]) || "https://images.unsplash.com/photo-1542838132-92c53300491e?q=80&w=2574&auto=format&fit=crop"}
              alt={donation.foodType}
              className="w-full h-40 object-cover rounded-2xl border border-[#0D2B1B]/15 shadow-sm"
            />
            <div className="absolute top-2 right-2 flex gap-1">
              <Badge variant={getStatusVariant(donation.status)} className="capitalize backdrop-blur-sm">
                {donation.status}
              </Badge>
            </div>
          </div>

          <div className="flex justify-between items-start">
            <div className="space-y-1">
              <h3 className="text-lg font-black text-[#0D2B1B] uppercase tracking-wide group-hover:underline line-clamp-1 capitalize">
                {donation.foodType}
              </h3>
              <div className="flex gap-2">
                {isNew && (
                  <Badge variant="success">
                    NEW
                  </Badge>
                )}
                {donation.urgency && (
                  <Badge variant={getUrgencyVariant(donation.urgency)}>
                    {donation.urgency}
                  </Badge>
                )}
              </div>
            </div>
          </div>

          {/* Description */}
          <p className="text-xs font-semibold text-[#0D2B1B]/75 line-clamp-2 leading-relaxed">
            {donation.description}
          </p>

          {/* Meta Grid */}
          <div className="grid grid-cols-1 gap-2 pt-2 text-xs text-[#0D2B1B]/80 font-bold">
            <div className="flex items-center">
              <span className="w-12 text-[#0D2B1B]/55 uppercase font-mono tracking-wider text-[10px]">Qty:</span>
              <span>{donation.quantity} kg</span>
            </div>
            <div className="flex items-center">
              <span className="w-12 text-[#0D2B1B]/55 uppercase font-mono tracking-wider text-[10px]">Loc:</span>
              <span className="truncate">
                {typeof donation.location === 'object'
                  ? donation.location?.formattedAddress || 'Unknown Location'
                  : donation.location}
              </span>
            </div>
            <div className="flex items-center">
              <span className="w-12 text-[#0D2B1B]/55 uppercase font-mono tracking-wider text-[10px]">Exp:</span>
              <span className={`font-black ${expiryStatus.color}`}>
                {expiryStatus.text}
              </span>
            </div>
            <div className="flex items-center">
              <span className="w-12 text-[#0D2B1B]/55 uppercase font-mono tracking-wider text-[10px]">Donor:</span>
              <span>{donation.donorName}</span>
            </div>
            {donation.freshnessScore && (
              <div className="flex items-center text-xs mt-1 bg-[#F4F7F5] p-2 rounded-xl border border-gray-200/60 shadow-sm">
                <span className="flex-1 font-black text-[#0D2B1B] uppercase tracking-wide text-[10px]">
                  AI Score: {donation.freshnessScore}/100
                </span>
                <span className={`px-2 py-0.5 rounded-full text-[9px] font-black uppercase border border-current/20 shadow-sm ${
                  donation.foodCondition === 'Excellent' ? 'bg-[#9FE870] text-[#0D2B1B]' :
                  donation.foodCondition === 'Good' ? 'bg-sky-200 text-[#0D2B1B]' :
                  donation.foodCondition === 'High Risk' ? 'bg-amber-300 text-[#0D2B1B]' :
                  donation.foodCondition === 'Unsafe' ? 'bg-rose-400 text-[#0D2B1B]' :
                  'bg-yellow-200 text-[#0D2B1B]'
                }`}>
                  {donation.foodCondition}
                </span>
              </div>
            )}
          </div>
        </CardContent>

        {/* Footer Actions */}
        <CardFooter className="bg-[#F4F7F5]/80 border-t border-gray-100 p-4 flex justify-between items-center rounded-b-3xl">
          <span className="text-[10px] text-[#0D2B1B]/60 font-black uppercase tracking-wider">
            {formatDate(createdAtDate)}
          </span>

          {canClaim && (donation.status === 'available' || donation.status === 'POSTED') && (
            <Button
              variant="primary"
              size="sm"
              onClick={(e) => {
                e.stopPropagation();
                onClaim(donation.id);
              }}
              className="py-1"
            >
              Claim
            </Button>
          )}
        </CardFooter>
      </Card>

      {showDetailModal && (
        <DonationDetailModal
          donation={donation}
          onClose={() => setShowDetailModal(false)}
          onClaim={onClaim}
          canClaim={canClaim}
        />
      )}
    </>
  );
};

export default DonationCard;
