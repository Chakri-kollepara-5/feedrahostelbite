import React from 'react';
import {
  X, Calendar, MapPin, Clock, User, Info,
  AlertTriangle, CheckCircle, Sparkles, ShieldAlert,
  Navigation, Heart, Thermometer, ShieldCheck
} from 'lucide-react';
import Button from '../ui/Button';
import Badge from '../ui/Badge';

const ScoreRing = ({ score }) => {
  const radius = 60;
  const stroke = 8;
  const normalizedRadius = radius - stroke * 2;
  const circumference = normalizedRadius * 2 * Math.PI;
  const strokeDashoffset = circumference - (score / 100) * circumference;

  let colorClass = 'stroke-green-500';
  if (score < 50) colorClass = 'stroke-red-500';
  else if (score < 70) colorClass = 'stroke-amber-500';
  else if (score < 85) colorClass = 'stroke-blue-500';

  return (
    <div className="relative flex flex-col items-center justify-center">
      <div className="relative flex items-center justify-center">
        <svg height={radius * 2} width={radius * 2} className="transform -rotate-90">
          <circle
            className="stroke-gray-100"
            fill="transparent"
            strokeWidth={stroke}
            r={normalizedRadius}
            cx={radius}
            cy={radius}
          />
          <circle
            className={`${colorClass} transition-all duration-1000 ease-out`}
            fill="transparent"
            strokeWidth={stroke}
            strokeDasharray={circumference + ' ' + circumference}
            style={{ strokeDashoffset }}
            r={normalizedRadius}
            cx={radius}
            cy={radius}
            strokeLinecap="round"
          />
        </svg>
        <span className="absolute text-2xl font-black text-gray-800">{score}<span className="text-xs font-normal text-gray-400">/100</span></span>
      </div>
    </div>
  );
};

const DonationDetailModal = ({ donation, onClose, onClaim, canClaim }) => {
  if (!donation) return null;

  const parseDate = (dateInput) => {
    if (!dateInput) return new Date();
    if (typeof dateInput.toDate === 'function') return dateInput.toDate();
    const parsed = new Date(dateInput);
    return isNaN(parsed.getTime()) ? new Date() : parsed;
  };

  const formatDate = (dateInput) => {
    const date = parseDate(dateInput);
    return new Intl.DateTimeFormat('en-US', {
      weekday: 'long',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }).format(date);
  };

  const getConditionColor = (condition) => {
    switch (condition) {
      case 'Excellent': return 'bg-green-50 text-green-700 border-green-200';
      case 'Good': return 'bg-blue-50 text-blue-700 border-blue-200';
      case 'Needs Immediate Pickup': return 'bg-yellow-50 text-yellow-700 border-yellow-200';
      case 'High Risk': return 'bg-orange-50 text-orange-700 border-orange-200';
      case 'Unsafe': return 'bg-red-50 text-red-700 border-red-200';
      default: return 'bg-gray-50 text-gray-700 border-gray-200';
    }
  };

  const getStatusLabel = (status) => {
    const norm = (status || '').toLowerCase();
    if (norm === 'available' || norm === 'posted') return { text: 'Available', color: 'success' };
    if (norm === 'claimed' || norm === 'accepted') return { text: 'Claimed / Reserved', color: 'warning' };
    if (norm === 'picked_up') return { text: 'Picked Up', color: 'info' };
    if (norm === 'delivered' || norm === 'completed') return { text: 'Delivered Successfully', color: 'success' };
    if (norm === 'cancelled') return { text: 'Cancelled', color: 'error' };
    return { text: status, color: 'secondary' };
  };

  const statusInfo = getStatusLabel(donation.status);
  const expiryDate = parseDate(donation.expiryDate || donation.expiryTime);
  const now = new Date();
  const diffTime = expiryDate.getTime() - now.getTime();
  const hoursLeft = Math.max(0, Math.round(diffTime / (1000 * 60 * 60)));

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-fade-in" onClick={onClose}>
      <div 
        className="bg-white rounded-3xl max-w-4xl w-full max-h-[92vh] overflow-y-auto shadow-2xl border border-gray-100 flex flex-col md:flex-row overflow-hidden transform scale-100 transition-all duration-300"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* LEFT COLUMN: Image & Core Details */}
        <div className="w-full md:w-5/12 bg-gray-50 relative flex flex-col border-r border-gray-100">
          <div className="relative h-64 md:h-full min-h-[260px] overflow-hidden">
            <img
              src={donation.image || (donation.images && donation.images[0]) || "https://images.unsplash.com/photo-1542838132-92c53300491e?q=80&w=2574&auto=format&fit=crop"}
              alt={donation.foodType}
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
            
            {/* Badges on Image */}
            <div className="absolute top-4 left-4 flex flex-col gap-2">
              <Badge variant={statusInfo.color} className="shadow-lg backdrop-blur-md bg-white/90 font-bold uppercase text-[10px] tracking-wider px-3 py-1">
                {statusInfo.text}
              </Badge>
              {donation.urgency && (
                <Badge variant={donation.urgency === 'high' ? 'error' : donation.urgency === 'medium' ? 'warning' : 'success'} className="shadow-md font-bold uppercase text-[10px] px-2.5">
                  {donation.urgency} Urgency
                </Badge>
              )}
            </div>

            {/* Title & Quantity Overlay */}
            <div className="absolute bottom-4 left-4 right-4 text-white">
              <h2 className="text-2xl font-black tracking-tight leading-tight capitalize mb-1">
                {donation.foodType}
              </h2>
              <p className="text-white/90 font-semibold text-sm flex items-center gap-1.5">
                <span className="bg-white/20 px-2 py-0.5 rounded-lg text-xs font-mono">{donation.quantity} kg</span>
                available
              </p>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: Description, AI Analysis & Actions */}
        <div className="w-full md:w-7/12 p-6 md:p-8 flex flex-col justify-between max-h-[92vh] overflow-y-auto">
          {/* Close Button */}
          <div className="flex justify-end mb-2">
            <button
              onClick={onClose}
              className="p-2 bg-gray-100 hover:bg-gray-200 text-gray-500 hover:text-gray-900 rounded-full transition-all duration-200 focus:outline-none"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          <div className="space-y-6">
            
            {/* Description */}
            <div className="space-y-2">
              <h4 className="text-xs font-mono uppercase tracking-wider text-gray-400">Description</h4>
              <p className="text-gray-700 text-sm md:text-base leading-relaxed">
                {donation.description || "No description provided."}
              </p>
            </div>

            {/* Meta Grid */}
            <div className="grid grid-cols-2 gap-4 bg-gray-50 p-4 rounded-2xl border border-gray-100">
              <div className="space-y-1">
                <span className="text-[10px] font-mono uppercase text-gray-400 block">Location</span>
                <span className="text-sm font-semibold text-gray-800 flex items-center gap-1">
                  <MapPin className="h-4 w-4 text-primary-500 flex-shrink-0" />
                  <span className="truncate">{donation.location}</span>
                </span>
              </div>
              <div className="space-y-1">
                <span className="text-[10px] font-mono uppercase text-gray-400 block">Expires In</span>
                <span className={`text-sm font-semibold flex items-center gap-1 ${hoursLeft <= 6 ? 'text-red-600 font-bold' : 'text-gray-800'}`}>
                  <Clock className="h-4 w-4 flex-shrink-0" />
                  <span>{hoursLeft > 0 ? `${hoursLeft} hours remaining` : 'Expired'}</span>
                </span>
              </div>
              <div className="space-y-1 border-t border-gray-200/50 pt-2">
                <span className="text-[10px] font-mono uppercase text-gray-400 block">Donor Name</span>
                <span className="text-sm font-semibold text-gray-800 flex items-center gap-1">
                  <User className="h-4 w-4 text-indigo-500 flex-shrink-0" />
                  <span>{donation.donorName || 'Anonymous Donor'}</span>
                </span>
              </div>
              <div className="space-y-1 border-t border-gray-200/50 pt-2">
                <span className="text-[10px] font-mono uppercase text-gray-400 block">Contact Info</span>
                <span className="text-sm font-semibold text-gray-800 truncate block">
                  {donation.contactInfo || 'N/A'}
                </span>
              </div>
            </div>

            {/* AI Freshness Analysis Box */}
            {donation.freshnessScore !== undefined && donation.freshnessScore !== null ? (
              <div className="bg-gradient-to-br from-indigo-50/50 via-white to-gray-50 border border-indigo-100 rounded-3xl p-5 shadow-sm space-y-4 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-24 h-24 bg-indigo-500/5 rounded-full blur-2xl pointer-events-none"></div>
                
                <h3 className="text-indigo-900 font-bold flex items-center gap-2 border-b border-indigo-100/50 pb-2.5 text-sm md:text-base">
                  <Sparkles className="h-5 w-5 text-indigo-600" />
                  🤖 AI Food Freshness Breakdown
                </h3>

                <div className="flex flex-col sm:flex-row items-center gap-6">
                  {/* Gauge */}
                  <ScoreRing score={donation.freshnessScore} />
                  
                  {/* Stats Columns */}
                  <div className="flex-1 w-full grid grid-cols-2 gap-3 text-xs md:text-sm">
                    <div className={`p-2.5 rounded-xl border flex flex-col justify-center ${getConditionColor(donation.foodCondition)}`}>
                      <span className="text-[10px] uppercase font-bold tracking-wider opacity-75 mb-0.5">Condition</span>
                      <span className="font-extrabold">{donation.foodCondition}</span>
                    </div>

                    <div className="p-2.5 bg-white border border-gray-100 rounded-xl flex flex-col justify-center">
                      <span className="text-[10px] uppercase font-bold tracking-wider text-gray-400 mb-0.5">Safe Remaining</span>
                      <span className="font-bold text-gray-800">{donation.safeConsumptionHours || 'N/A'} hrs</span>
                    </div>

                    <div className="p-2.5 bg-white border border-gray-100 rounded-xl flex flex-col justify-center">
                      <span className="text-[10px] uppercase font-bold tracking-wider text-gray-400 mb-0.5">Delivery Radius</span>
                      <span className="font-bold text-gray-800">{donation.recommendedRadius || 'N/A'} km</span>
                    </div>

                    <div className="p-2.5 bg-white border border-gray-100 rounded-xl flex flex-col justify-center">
                      <span className="text-[10px] uppercase font-bold tracking-wider text-gray-400 mb-0.5">AI Confidence</span>
                      <span className="font-bold text-gray-800">{donation.confidenceScore || 'N/A'}%</span>
                    </div>
                  </div>
                </div>

                {/* Prep and Storage Info */}
                <div className="grid grid-cols-2 gap-3 pt-2 border-t border-gray-100 text-xs text-gray-600">
                  <div className="flex items-center gap-1.5">
                    <Clock className="h-3.5 w-3.5 text-gray-400" />
                    <span>Prepared: <strong>{donation.preparationTime || 0} hrs ago</strong></span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Thermometer className="h-3.5 w-3.5 text-gray-400" />
                    <span>Storage: <strong>{donation.storageMethod || 'Room Temp'}</strong></span>
                  </div>
                </div>

                {/* AI Notes */}
                {donation.aiNotes && (
                  <div className="text-xs text-gray-600 bg-gray-50/80 p-3 rounded-xl border border-gray-100/50 leading-relaxed italic">
                    {donation.aiNotes}
                  </div>
                )}

                {/* High Risk warning banner */}
                {donation.foodCondition === 'High Risk' && (
                  <div className="p-3 bg-orange-50 border border-orange-200 text-orange-800 rounded-xl text-xs flex items-start gap-2">
                    <AlertTriangle className="h-4 w-4 text-orange-600 flex-shrink-0 mt-0.5" />
                    <p><strong>Urgent:</strong> This food is marked as high-risk. Please redistribute within the recommended radius immediately.</p>
                  </div>
                )}
              </div>
            ) : (
              <div className="bg-gray-50 border border-gray-200 rounded-2xl p-4 text-center text-gray-500 text-xs md:text-sm flex items-center gap-2 justify-center">
                <Info className="h-4 w-4 text-gray-400" />
                This donation was posted before the AI freshness system was activated.
              </div>
            )}
            
          </div>

          {/* FOOTER ACTIONS */}
          <div className="flex gap-3 pt-6 mt-6 border-t border-gray-100">
            <button
              onClick={onClose}
              className="flex-1 py-3.5 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold rounded-2xl transition-all duration-200 focus:outline-none"
            >
              Close Details
            </button>

            {canClaim && donation.status === 'available' && (
              <button
                onClick={() => {
                  onClaim(donation.id);
                  onClose();
                }}
                className="flex-1 py-3.5 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-semibold rounded-2xl shadow-lg shadow-green-500/20 transition-all duration-200 focus:outline-none flex items-center justify-center gap-2"
              >
                <Heart className="h-4 w-4 fill-current" />
                Claim Food Donation
              </button>
            )}
          </div>

        </div>

      </div>
    </div>
  );
};

export default DonationDetailModal;
