import React, { useState } from 'react';
import {
  RefreshCw,
  X,
  Maximize2,
  Minimize2,
  Utensils
} from 'lucide-react';

const HostelBiteSection = () => {
  const [mealStatus, setMealStatus] = useState({
    breakfast: { available: true, time: '7:00 AM - 10:00 AM', count: 45 },
    lunch: { available: true, time: '12:00 PM - 2:00 PM', count: 32 },
    dinner: { available: false, time: '7:00 PM - 9:00 PM', count: 0 },
  });

  const [loading, setLoading] = useState(false);
  const [showEmbedded, setShowEmbedded] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const refreshStatus = () => {
    setLoading(true);

    setTimeout(() => {
      setMealStatus(prev => ({
        ...prev,
        breakfast: { ...prev.breakfast, count: Math.floor(Math.random() * 50) + 20 },
        lunch: { ...prev.lunch, count: Math.floor(Math.random() * 40) + 15 },
        dinner: { ...prev.dinner, available: Math.random() > 0.3, count: Math.floor(Math.random() * 35) + 10 }
      }));
      setLoading(false);
    }, 1000);
  };

  const getMealEmoji = (meal) => {
    switch (meal) {
      case 'breakfast': return '';
      case 'lunch': return '';
      case 'dinner': return '';
      default: return '';
    }
  };

  const openHostelBite = () => {
    setShowEmbedded(true);
    document.body.style.overflow = 'hidden';
  };

  const closeEmbedded = () => {
    setShowEmbedded(false);
    setIsFullscreen(false);
    document.body.style.overflow = 'unset';
  };

  const toggleFullscreen = () => setIsFullscreen(!isFullscreen);

  return (
    <>
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-lg transition-all duration-300">

        {/* Header */}
        <div className="bg-gradient-to-r from-green-500 to-emerald-600 p-6 text-white relative overflow-hidden">
          <div className="absolute inset-0 bg-white/10 backdrop-blur-sm"></div>

          <div className="relative z-10">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="bg-white/20 p-3 rounded-xl backdrop-blur-sm hover:bg-white/30 transition-colors">
                  <div className="text-2xl"></div>
                </div>
                <div>
                  <h3 className="text-xl font-bold">HostelBite Integration</h3>
                  <p className="text-green-100 text-sm">Book fresh hostel meals instantly</p>
                </div>
              </div>

              <button
                onClick={refreshStatus}
                disabled={loading}
                className="bg-white/20 hover:bg-white/30 p-2 rounded-lg transition-colors backdrop-blur-sm hover:scale-110 transform duration-200"
              >
                <RefreshCw className={`h-5 w-5 ${loading ? 'animate-spin' : ''}`} />
              </button>
            </div>
          </div>
        </div>

        {/* Meal Status Cards */}
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">

            {Object.entries(mealStatus).map(([meal, status]) => (
              <div
                key={meal}
                className={`p-4 rounded-xl border-2 transition-all duration-300 hover:scale-105 transform ${status.available
                  ? 'border-green-200 bg-gradient-to-br from-green-50 to-emerald-50 hover:border-green-300 hover:shadow-md'
                  : 'border-gray-200 bg-gray-50 hover:border-gray-300'
                  }`}
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-2">
                    <span className="text-2xl animate-pulse">{getMealEmoji(meal)}</span>
                    <h4 className="font-semibold text-gray-900 capitalize">{meal}</h4>
                  </div>

                  {status.available ? (
                    <div className="flex items-center space-x-1">
                      <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                      <span className="text-xs font-medium text-green-600 bg-green-100 px-2 py-1 rounded-full">
                        Available
                      </span>
                    </div>
                  ) : (
                    <span className="text-xs font-medium text-gray-500 bg-gray-200 px-2 py-1 rounded-full">
                      Unavailable
                    </span>
                  )}
                </div>

                <div className="space-y-2 text-xs font-mono">
                  <div className="flex items-center text-gray-600">
                    <span className="w-12 text-gray-400 uppercase font-semibold">Time:</span>
                    <span className="text-gray-850 font-sans font-medium">{status.time}</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <span className="w-12 text-gray-400 uppercase font-semibold">Qty:</span>
                    <span className="text-gray-850 font-sans font-medium">{status.count} meals available</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Features */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            {[
              { title: 'Instant Booking', desc: 'Book in seconds' },
              { title: 'Fresh Meals', desc: 'Daily prepared' },
              { title: 'Affordable', desc: 'Student prices' },
              { title: 'Easy Access', desc: 'Mobile friendly' }
            ].map((f, i) => (
              <div
                key={i}
                onClick={openHostelBite}
                className="text-center p-4 bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg hover:from-green-50 hover:to-emerald-50 transition-all duration-300 hover:scale-105 transform cursor-pointer group"
              >
                <h5 className="font-semibold text-gray-900 text-sm">{f.title}</h5>
                <p className="text-xs text-gray-600 mt-1">{f.desc}</p>
              </div>
            ))}
          </div>

          {/* Action Buttons */}
          {/* Action Buttons Removed */}

          {/* Location Info */}
          <div className="mt-4 p-4 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-xl border border-blue-200 hover:from-blue-100 hover:to-cyan-100 transition-all duration-300">
            <div className="flex items-center space-x-2 text-blue-800">
              <span className="text-sm font-medium">Available at participating hostels across India</span>
            </div>
          </div>
        </div>
      </div>

      {/* Embedded iframe modal */}
      {showEmbedded && (
        <div className={`fixed inset-0 bg-black/80 backdrop-blur-xl z-[99999] flex items-center justify-center p-4 transition-all duration-300 ${isFullscreen ? 'p-0' : ''
          }`}>
          <div className={`bg-white rounded-2xl shadow-2xl overflow-hidden transition-all duration-300 border border-white/10 ${isFullscreen ? 'w-full h-full rounded-none' : 'w-full max-w-6xl h-[90vh] max-h-[800px]'
            }`}>

            {/* Header */}
            <div className="bg-gradient-to-r from-green-500 to-emerald-600 p-4 text-white flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="bg-white/20 p-2 rounded-lg backdrop-blur-sm">
                  <Utensils className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-bold text-lg">HostelBite - Book Your Meals</h3>
                  <p className="text-green-100 text-sm">Fresh meals delivered to your hostel</p>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <button
                  onClick={toggleFullscreen}
                  className="bg-white/20 hover:bg-white/30 p-2 rounded-lg transition-colors backdrop-blur-sm"
                >
                  {isFullscreen ? <Minimize2 className="h-5 w-5" /> : <Maximize2 className="h-5 w-5" />}
                </button>

                <button
                  onClick={closeEmbedded}
                  className="bg-white/20 hover:bg-white/30 p-2 rounded-lg transition-colors backdrop-blur-sm"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
            </div>

            {/* iframe */}
            <div className="relative w-full h-full bg-gray-50">
              <iframe
                src="https://68f36394857123d0001955ea.heyboss.live/"
                className="w-full h-full border-0"
                title="HostelBite - Book Your Meals"
                loading="lazy"
                sandbox="allow-scripts allow-same-origin allow-forms allow-popups allow-popups-to-escape-sandbox"
                style={{ minHeight: isFullscreen ? '100vh' : '600px' }}
              />
            </div>

          </div>
        </div>
      )}
    </>
  );
};

export default HostelBiteSection;
