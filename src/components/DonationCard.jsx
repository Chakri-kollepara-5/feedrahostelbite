import React from 'react';
import {
  MapPin,
  Clock,
  Package,
  User,
  AlertTriangle,
  Zap,
} from 'lucide-react';
import { Card, CardHeader, CardContent, CardFooter } from './ui/Card';
import Badge from './ui/Badge';
import Button from './ui/Button';

const DonationCard = ({ donation, onClaim, canClaim }) => {
  /* ------------------ HELPERS ------------------ */
  const getStatusVariant = (status) => {
    switch (status) {
      case 'available': return 'success';
      case 'claimed': return 'warning';
      case 'completed': return 'info';
      default: return 'secondary';
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
    <Card className="h-full flex flex-col hover:border-primary-200 group">
      <CardContent className="flex-grow p-5 space-y-4">
        {/* Header with Badges */}
        <div className="flex justify-between items-start">
          <div className="space-y-1">
            <h3 className="text-lg font-bold text-gray-900 group-hover:text-primary-700 transition-colors line-clamp-1 capitalize">
              {donation.foodType}
            </h3>
            <div className="flex gap-2">
              {isNew && (
                <Badge variant="success" className="bg-green-50 text-green-700">
                  <Zap className="h-3 w-3 mr-1" /> NEW
                </Badge>
              )}
              {donation.urgency && (
                <Badge variant={getUrgencyVariant(donation.urgency)}>
                  {donation.urgency}
                </Badge>
              )}
            </div>
          </div>
          <Badge variant={getStatusVariant(donation.status)} className="capitalize">
            {donation.status}
          </Badge>
        </div>

        {/* Description */}
        <p className="text-sm text-gray-600 line-clamp-2 leading-relaxed">
          {donation.description}
        </p>

        {/* Meta Grid */}
        <div className="grid grid-cols-1 gap-2 pt-2 text-sm text-gray-500">
          <div className="flex items-center">
            <Package className="h-4 w-4 mr-2 text-gray-400" />
            <span className="font-medium text-gray-700">{donation.quantity} kg</span>
          </div>
          <div className="flex items-center">
            <MapPin className="h-4 w-4 mr-2 text-gray-400" />
            <span className="truncate">{donation.location}</span>
          </div>
          <div className="flex items-center">
            <Clock className="h-4 w-4 mr-2 text-gray-400" />
            <span className={`font-medium ${expiryStatus.color}`}>
              {expiryStatus.text}
            </span>
          </div>
          <div className="flex items-center">
            <User className="h-4 w-4 mr-2 text-gray-400" />
            <span>{donation.donorName}</span>
          </div>
        </div>
      </CardContent>

      {/* Footer Actions */}
      <CardFooter className="bg-gray-50/50 border-t border-gray-100 p-4 flex justify-between items-center">
        <span className="text-xs text-gray-400 font-medium">
          {formatDate(createdAtDate)}
        </span>

        {canClaim && donation.status === 'available' && (
          <Button
            variant="primary"
            size="sm"
            onClick={() => onClaim(donation.id)}
            className="shadow-none"
          >
            Claim
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};

export default DonationCard;
