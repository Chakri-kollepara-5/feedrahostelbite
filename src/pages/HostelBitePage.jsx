import React, { useState } from 'react';
import { ArrowLeft, Utensils, Maximize2, Minimize2, X } from 'lucide-react';
import { Link } from 'react-router-dom';
import Button from '../ui/Button';
import Badge from '../ui/Badge';

import TruckAnimation from '../TruckAnimation';
import HostelBiteSection from '../HostelBiteSection';
import HostelMealBooking from '../HostelMealBooking';
import DonationPaymentSection from '../DonationPaymentSection';

export default function HostelBitePage() {
  const [showEmbedded, setShowEmbedded] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);


  const closeEmbedded = () => {
    setShowEmbedded(false);
    setIsFullscreen(false);
  };

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };

  return (
    <>
      {/* 🚚 TOP HERO TRUCK ANIMATION */}
      <div className="bg-[#0D2B1B] py-8 border-b border-white/5">
        <div className="max-w-6xl mx-auto h-[220px] rounded-[32px] border border-white/10 bg-white flex items-center justify-center shadow-lg shadow-black/10 overflow-hidden">
          <TruckAnimation />
        </div>
      </div>

      {/* MAIN PAGE */}
      <div className="min-h-screen bg-[#F4F7F5] pb-24 font-sans text-[#0D2B1B]">
        <div className="max-w-6xl mx-auto p-6 md:p-8">

          {/* Header */}
          <div className="bg-gradient-to-r from-[#9FE870] to-[#b3f08c] border border-[#0D2B1B]/10 rounded-3xl p-6 md:p-8 shadow-lg shadow-[#0D2B1B]/5 flex items-center justify-between gap-6 mb-8">
            <div className="flex items-center space-x-4">
              <Link
                to="/dashboard"
                className="p-2 bg-white hover:bg-[#F4F7F5] rounded-xl transition-all border border-[#0D2B1B]/10 shadow-sm hover:-translate-y-0.5 hover:shadow-md"
              >
                <ArrowLeft className="h-5 w-5 text-[#0D2B1B] stroke-[2.5]" />
              </Link>

              <div>
                <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#0D2B1B]">
                  HostelBite Integration 🏠
                </h1>
                <p className="text-xs font-medium text-[#0D2B1B]/75 mt-0.5">
                  Book fresh hostel meals through Feedra
                </p>
              </div>
            </div>
          </div>

          {/* Integration Section */}
          <div className="mb-12">
            <HostelBiteSection />
          </div>

          {/* Meal Booking */}
          <div className="mb-12">
            <div className="flex items-center space-x-3 mb-6">
              <h2 className="text-xl font-bold tracking-tight text-[#0D2B1B]">
                Book Your Meals
              </h2>
              <Badge variant="warning">
                PAYMENT READY 💳
              </Badge>
            </div>
            <HostelMealBooking />
          </div>

          {/* Donation Support */}
          <div className="mb-12">
            <div className="flex items-center space-x-3 mb-6">
              <h2 className="text-xl font-bold tracking-tight text-[#0D2B1B]">
                Support Our Platform
              </h2>
              <Badge variant="success">
                HELP US GROW 🌱
              </Badge>
            </div>
            <DonationPaymentSection />
          </div>

          {/* Quick Launch */}
          <div className="bg-white/80 backdrop-blur-xl border border-gray-100/80 shadow-[0_10px_25px_-5px_rgba(13,43,27,0.05),0_4px_10px_-2px_rgba(0,0,0,0.02)] rounded-3xl p-8 mb-12 hover:-translate-y-1 hover:shadow-xl hover:shadow-[#0D2B1B]/5 transition-all duration-300">
            <div className="text-center">
              <div className="bg-gradient-to-br from-[#9FE870] to-[#b3f08c] border border-[#0D2B1B]/15 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 shadow-md shadow-[#0D2B1B]/5">
                <span className="text-3xl">🍽️</span>
              </div>

              <h2 className="text-2xl font-bold tracking-tight text-[#0D2B1B] mb-2">
                Launch HostelBite Instantly
              </h2>

              <p className="text-sm font-medium text-[#0D2B1B]/70 mb-6">
                Access the full HostelBite experience directly within Feedra
              </p>
            </div>
          </div>

          {/* How It Works */}
          <div className="bg-white border border-gray-100 shadow-[0_10px_25px_-5px_rgba(13,43,27,0.05)] rounded-3xl p-8 mb-12">
            <h2 className="text-2xl font-bold tracking-tight text-[#0D2B1B] mb-8 flex items-center">
              <span className="text-2xl mr-3">🔄</span>
              How HostelBite Works with Feedra
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                {
                  step: '1',
                  icon: '🔍',
                  title: 'Browse Meals',
                  description:
                    'Check available meals and timings from your hostel kitchen',
                },
                {
                  step: '2',
                  icon: '📱',
                  title: 'Book Instantly',
                  description:
                    'Select your meals and book with just a few taps',
                },
                {
                  step: '3',
                  icon: '🍽️',
                  title: 'Enjoy Fresh Food',
                  description:
                    'Pick up your pre-booked meals at the designated time',
                },
              ].map((item, index) => (
                <div
                  key={index}
                  className="bg-[#F4F7F5]/40 border border-[#0D2B1B]/10 rounded-2xl p-6 hover:-translate-y-1 hover:shadow-lg hover:shadow-[#0D2B1B]/5 transition-all duration-300 text-center"
                >
                  <div className="bg-white border border-gray-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 shadow-sm">
                    <span className="text-2xl">{item.icon}</span>
                  </div>
                  <div className="bg-gradient-to-br from-[#9FE870] to-[#b3f08c] border border-[#0D2B1B]/10 text-[#0D2B1B] w-8 h-8 rounded-full flex items-center justify-center mx-auto mb-3 text-xs font-bold shadow-sm">
                    {item.step}
                  </div>
                  <h3 className="font-bold text-sm tracking-wide text-[#0D2B1B] mb-2">
                    {item.title}
                  </h3>
                  <p className="text-xs font-medium text-[#0D2B1B]/70">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Embedded HostelBite */}
          {showEmbedded && (
            <div
              className={`fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 ${
                isFullscreen ? 'p-0' : ''
              }`}
            >
              <div
                className={`bg-white border border-gray-200 shadow-2xl overflow-hidden transition-all duration-300 ${
                  isFullscreen
                    ? 'w-full h-full rounded-none border-0'
                    : 'w-full max-w-6xl h-[90vh] rounded-[32px]'
                }`}
              >
                {/* Embedded Header */}
                <div className="bg-gradient-to-r from-[#9FE870] to-[#b3f08c] p-4 text-[#0D2B1B] border-b border-[#0D2B1B]/10 flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="bg-white border border-gray-100 p-2 rounded-xl shadow-sm">
                      <Utensils className="h-5 w-5 stroke-[2.5]" />
                    </div>
                    <div>
                      <h3 className="font-bold tracking-tight text-lg">
                        HostelBite – Book Your Meals
                      </h3>
                      <p className="text-xs font-medium text-[#0D2B1B]/75">
                        Fresh meals delivered to your hostel
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2">
                    <button
                      onClick={toggleFullscreen}
                      className="bg-white border border-gray-200 p-2 rounded-xl shadow-sm hover:-translate-y-0.5 active:translate-y-0 active:shadow-sm transition-all"
                    >
                      {isFullscreen ? (
                        <Minimize2 className="h-5 w-5 stroke-[2.5]" />
                      ) : (
                        <Maximize2 className="h-5 w-5 stroke-[2.5]" />
                      )}
                    </button>

                    <button
                      onClick={closeEmbedded}
                      className="bg-[#0D2B1B] text-[#9FE870] border border-[#0D2B1B] p-2 rounded-xl shadow-sm hover:bg-[#0D2B1B]/90 hover:-translate-y-0.5 active:translate-y-0 transition-all"
                    >
                      <X className="h-5 w-5 stroke-[2.5]" />
                    </button>
                  </div>
                </div>

                {/* Embedded Content */}
                <iframe
                  src="https://en.wikipedia.org/wiki/Main_Page"
                  className="w-full h-full border-0"
                  title="HostelBite Demo"
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
