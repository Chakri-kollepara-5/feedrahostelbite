import React, { useState } from 'react';
import { X, CreditCard } from 'lucide-react';

const PaymentModal = ({
  isOpen,
  onClose,
  paymentType,
  amount,
  title,
  description
}) => {
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  // Razorpay payment links based on amount and type
  const getPaymentLink = () => {
    if (amount === 30) return 'https://rzp.io/rzp/5T4xEeUQ';
    if (amount === 50) return 'https://rzp.io/rzp/1lW7jjan';
    if (amount === 80) return 'https://rzp.io/rzp/zFTcubE';
    if (amount === 100) return 'https://rzp.io/rzp/PvkJaDnm';
    if (amount === 150) return 'https://rzp.io/rzp/2Beb8oM';

    switch (paymentType) {
      case 'breakfast':
        return 'https://rzp.io/rzp/5T4xEeUQ'; // ₹30
      case 'lunch':
      case 'dinner':
        return 'https://rzp.io/rzp/zFTcubE'; // ₹80
      case 'donation':
      default:
        if (amount === 50) return 'https://rzp.io/rzp/1lW7jjan';
        if (amount === 100) return 'https://rzp.io/rzp/PvkJaDnm';
        if (amount === 150) return 'https://rzp.io/rzp/2Beb8oM';
        return 'https://rzp.io/rzp/1lW7jjan'; // fallback default
    }
  };

  const handlePayment = () => {
    setLoading(true);
    const paymentLink = getPaymentLink();
    window.open(paymentLink, '_blank');

    setTimeout(() => {
      setLoading(false);
      onClose();
    }, 1000);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-md w-full shadow-2xl overflow-hidden">

        {/* Header */}
        <div className="bg-gradient-to-r from-green-500 to-emerald-600 p-6 text-white relative">
          <div className="absolute inset-0 bg-white/10 backdrop-blur-sm"></div>
          <div className="relative z-10">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="bg-white/20 px-3 py-1 rounded-lg backdrop-blur-sm font-mono text-xs font-bold uppercase tracking-wider">
                  {paymentType}
                </div>
                <div>
                  <h3 className="text-xl font-bold">{title}</h3>
                  <p className="text-green-100 text-sm">Secure Payment via Razorpay</p>
                </div>
              </div>

              <button
                onClick={onClose}
                className="bg-white/20 hover:bg-white/30 p-2 rounded-lg transition-colors backdrop-blur-sm"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          {description && (
            <p className="text-gray-600 mb-6 text-center">{description}</p>
          )}

          {/* Amount Box */}
          <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-6 mb-6 text-center border border-green-200">
            <div className="text-3xl font-bold text-green-600 mb-2">₹{amount}</div>
            <div className="text-sm text-green-700">
              {paymentType === 'donation' ? 'Donation Amount' : 'Meal Price'}
            </div>
          </div>

          {/* Features */}
          <div className="space-y-3 mb-6 text-sm text-gray-600 border-y border-gray-100 py-4 font-mono">
            <div>• Secure payment powered by Razorpay</div>
            <div>• UPI, Cards, Net Banking supported</div>
            <div>• Instant confirmation & receipt</div>
          </div>

          {/* Payment Button */}
          <button
            onClick={handlePayment}
            disabled={loading}
            className="w-full bg-gradient-to-r from-green-500 to-emerald-600 text-white py-4 px-6 rounded-xl font-semibold hover:from-green-600 hover:to-emerald-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-lg hover:shadow-xl flex items-center justify-center space-x-2 transform hover:scale-105 cursor-default"
          >
            {loading ? (
              <>
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                <span>Processing...</span>
              </>
            ) : (
              <>
                <CreditCard className="h-5 w-5" />
                <span>Pay ₹{amount} Now</span>
              </>
            )}
          </button>

          {/* Security */}
          <div className="mt-4 p-3 bg-blue-50 rounded-lg border border-blue-200">
            <p className="text-xs text-blue-700 text-center font-medium">
              Your payment is processed securely by Razorpay. We do not store your payment details.
            </p>
          </div>

          {/* GOV Verification */}
          <div className="mt-3 p-3 bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg border border-green-200">
            <div className="text-center">
              <div className="text-xs font-bold text-green-900 uppercase tracking-wide">Government Verified Platform</div>
              <div className="text-[10px] text-green-700 font-mono mt-0.5">UDYAM-AP-10-0116772</div>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};

export default PaymentModal;
