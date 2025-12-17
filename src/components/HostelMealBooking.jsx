import React, { useState } from 'react';
import { Clock, Star, CreditCard, Users } from 'lucide-react';
import PaymentModal from './PaymentModal';

const HostelMealBooking = () => {
  const [selectedMeal, setSelectedMeal] = useState(null);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [showBookingAnim, setShowBookingAnim] = useState(false);

  const meals = [
    {
      id: '1',
      name: 'Healthy Breakfast Combo',
      type: 'breakfast',
      price: 30,
      image: 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=400',
      description: 'Poha, Upma, Tea/Coffee, Fruits',
      rating: 4.5,
      available: true,
      time: '7:00 AM - 10:00 AM'
    },
    {
      id: '2',
      name: 'Complete Lunch Thali',
      type: 'lunch',
      price: 80,
      image: 'https://images.pexels.com/photos/1633578/pexels-photo-1633578.jpeg?auto=compress&cs=tinysrgb&w=400',
      description: 'Rice, Dal, Sabzi, Roti, Salad, Pickle',
      rating: 4.7,
      available: true,
      time: '12:00 PM - 2:00 PM'
    },
    {
      id: '3',
      name: 'Delicious Dinner',
      type: 'dinner',
      price: 80,
      image: 'https://images.pexels.com/photos/1640772/pexels-photo-1640772.jpeg?auto=compress&cs=tinysrgb&w=400',
      description: 'Rice, Dal, Curry, Roti, Dessert',
      rating: 4.6,
      available: true,
      time: '7:00 PM - 9:00 PM'
    }
  ];

  // ✅ FIXED BOOK FLOW (THIS WAS MISSING EARLIER)
  const handleBookMeal = (meal) => {
    setSelectedMeal(meal);
    setShowBookingAnim(true);

    setTimeout(() => {
      setShowBookingAnim(false);
      setShowPaymentModal(true);
    }, 2500);
  };

  const getMealGradient = (type) => {
    switch (type) {
      case 'breakfast': return 'from-orange-500 to-yellow-500';
      case 'lunch': return 'from-blue-500 to-cyan-500';
      case 'dinner': return 'from-purple-500 to-indigo-500';
      default: return 'from-green-500 to-emerald-500';
    }
  };

  return (
    <>
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-lg transition-all duration-300">

        {/* Header */}
        <div className="bg-gradient-to-r from-green-500 to-emerald-600 p-6 text-white">
          <h3 className="text-xl font-bold">Book Your Hostel Meals 🏠</h3>
          <p className="text-green-100 text-sm">
            Fresh, homely meals delivered to your hostel
          </p>
        </div>

        {/* Meals Grid */}
        <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-6">
          {meals.map((meal) => (
            <div
              key={meal.id}
              className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl overflow-hidden hover:shadow-lg transition-all duration-300 hover:scale-105"
            >
              <div className="relative h-48">
                <img
                  src={meal.image}
                  alt={meal.name}
                  className="w-full h-full object-cover"
                />

                <span
                  className={`absolute top-3 left-3 px-3 py-1 text-xs text-white rounded-full bg-gradient-to-r ${getMealGradient(meal.type)}`}
                >
                  {meal.type.toUpperCase()}
                </span>
              </div>

              <div className="p-4">
                <h4 className="font-semibold text-gray-900 mb-1">
                  {meal.name}
                </h4>
                <p className="text-gray-600 text-sm mb-3">
                  {meal.description}
                </p>

                <div className="flex justify-between items-center text-sm mb-3">
                  <span className="flex items-center gap-1">
                    <Star className="h-4 w-4 text-yellow-500 fill-current" />
                    {meal.rating}
                  </span>
                  <span className="flex items-center gap-1 text-gray-600">
                    <Clock className="h-4 w-4" />
                    {meal.time}
                  </span>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-xl font-bold text-green-600">
                    ₹{meal.price}
                  </span>

                  <button
                    onClick={() => handleBookMeal(meal)}
                    disabled={!meal.available}
                    className={`px-4 py-2 rounded-lg font-medium flex items-center gap-1 transition ${
                      meal.available
                        ? 'bg-gradient-to-r from-green-500 to-emerald-600 text-white hover:scale-105'
                        : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    }`}
                  >
                    <CreditCard className="h-4 w-4" />
                    {meal.available ? 'Book Now' : 'Sold Out'}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Stats */}
        <div className="px-6 pb-6 grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center p-4 bg-green-50 rounded-xl">
            <div className="text-2xl font-bold text-green-600">500+</div>
            <div className="text-sm text-green-700">Daily Bookings</div>
          </div>
          <div className="text-center p-4 bg-blue-50 rounded-xl">
            <div className="text-2xl font-bold text-blue-600">4.6⭐</div>
            <div className="text-sm text-blue-700">Average Rating</div>
          </div>
          <div className="text-center p-4 bg-purple-50 rounded-xl">
            <div className="text-2xl font-bold text-purple-600">50+</div>
            <div className="text-sm text-purple-700">Partner Hostels</div>
          </div>
          <div className="text-center p-4 bg-orange-50 rounded-xl">
            <div className="text-2xl font-bold text-orange-600">24/7</div>
            <div className="text-sm text-orange-700">Support</div>
          </div>
        </div>
      </div>

      {/* BOOKING ANIMATION */}
      {showBookingAnim && (
        <div className="fixed inset-0 z-[9999] bg-black/70 flex items-center justify-center">
          <div className="bg-white px-10 py-8 rounded-2xl text-center">
            <div className="w-12 h-12 border-4 border-green-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-lg font-semibold">Booking your meal...</p>
            <p className="text-sm text-gray-500">Please wait</p>
          </div>
        </div>
      )}

      {/* PAYMENT MODAL */}
      {selectedMeal && showPaymentModal && (
        <PaymentModal
          isOpen={showPaymentModal}
          onClose={() => {
            setShowPaymentModal(false);
            setSelectedMeal(null);
          }}
          paymentType={selectedMeal.type}
          amount={selectedMeal.price}
          title={`Book ${selectedMeal.name}`}
          description={`${selectedMeal.description} - ${selectedMeal.time}`}
        />
      )}
    </>
  );
};

export default HostelMealBooking;
