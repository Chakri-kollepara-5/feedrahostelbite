import React, { useState } from 'react';
import { CreditCard, Utensils, ChevronRight, X, ChefHat, Maximize2, Minimize2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card } from './ui/Card';
import Button from './ui/Button';
import Badge from './ui/Badge';
import PaymentModal from './PaymentModal';
import { useNavigate } from 'react-router-dom';

const meals = [
  {
    id: '1',
    name: 'Power Breakfast',
    type: 'breakfast',
    price: 30,
    image: 'https://images.pexels.com/photos/376464/pexels-photo-376464.jpeg?auto=compress&cs=tinysrgb&w=600',
    description: 'Poha, Upma, Tea/Coffee, Fruits',
    rating: 4.8,
    available: true,
    time: '7:00 AM - 10:00 AM'
  },
  {
    id: '2',
    name: 'Royal Lunch Thali',
    type: 'lunch',
    price: 80,
    image: 'https://images.pexels.com/photos/1633578/pexels-photo-1633578.jpeg?auto=compress&cs=tinysrgb&w=600',
    description: 'Rice, Dal, Sabzi, Roti, Salad',
    rating: 4.9,
    available: true,
    time: '12:00 PM - 2:00 PM'
  },
  {
    id: '3',
    name: 'Comfort Dinner',
    type: 'dinner',
    price: 80,
    image: 'https://images.pexels.com/photos/1640772/pexels-photo-1640772.jpeg?auto=compress&cs=tinysrgb&w=600',
    description: 'Rice, Dal, Curry, Roti, Dessert',
    rating: 4.7,
    available: true,
    time: '7:00 PM - 9:00 PM'
  },
  {
    id: '4',
    name: 'Biryani Special',
    type: 'lunch',
    price: 120,
    image: 'https://images.pexels.com/photos/7394819/pexels-photo-7394819.jpeg?auto=compress&cs=tinysrgb&w=600',
    description: 'Hyderabadi Dum Biryani with Raita',
    rating: 4.9,
    available: true,
    time: '12:00 PM - 2:00 PM'
  }
];

// Reusable Content for consistency between Normal and Focused views (declared outside render)
const MealContent = ({ isExpanded, onBookMeal, isFocused, onToggleFocus }) => (
  <div className={`grid grid-cols-1 ${isExpanded ? 'lg:grid-cols-2 gap-12' : 'lg:grid-cols-2'} relative z-20 h-full`}>

    {/* Left Content */}
    <div className="p-6 sm:p-10 flex flex-col justify-center space-y-6 lg:space-y-8">

      <div className="space-y-3 relative z-30">
        <motion.div
          layoutId="hot-badge"
          className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-green-900/30 border border-green-800 text-green-400 text-[10px] font-bold uppercase tracking-wider w-fit"
        >
          Hot & Fresh
        </motion.div>

        <motion.h2
          layoutId="title"
          className={`${isExpanded ? 'text-4xl sm:text-5xl lg:text-6xl' : 'text-3xl sm:text-4xl lg:text-5xl'} font-extrabold tracking-tight leading-tight text-white`}
        >
          {isExpanded ? (
            <>
              HostelBite <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-500">Book Your Meals</span>
            </>
          ) : (
            <>
              Review <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-500">Delicious Meals</span> <br />
              Delivered to You.
            </>
          )}
        </motion.h2>

        <motion.p
          layoutId="desc"
          className="text-gray-400 text-base sm:text-lg max-w-md leading-relaxed"
        >
          Experience homely taste with our premium hostel meal service.
          Healthy, hygienic, and delivered right to your doorstep.
        </motion.p>
      </div>

      <div className={`grid grid-cols-1 gap-3 relative z-30 ${isExpanded ? 'max-h-[60vh] overflow-y-auto pr-2 custom-scrollbar' : ''}`}>
        {meals.map((meal, index) => (
          <motion.div
            key={meal.id}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ margin: "-50px" }}
            transition={{ delay: 0.1 * index }}
            className="group relative bg-white/5 hover:bg-white/10 border border-white/5 rounded-2xl p-3 sm:p-4 flex items-center gap-4 transition-all duration-300 hover:border-green-500/50 cursor-pointer overflow-hidden backdrop-blur-sm"
            onClick={() => onBookMeal(meal)}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-green-500/0 via-green-500/0 to-green-500/0 group-hover:from-green-500/5 group-hover:to-green-500/10 transition-all duration-500" />

            <div className="relative w-20 h-20 sm:w-24 sm:h-24 flex-shrink-0 rounded-xl overflow-hidden shadow-lg">
              <img
                src={meal.image}
                alt={meal.name}
                className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
              />
              {meal.rating >= 4.8 && (
                <div className="absolute top-0 right-0 bg-yellow-400 text-black text-[9px] font-bold px-1.5 py-0.5 rounded-bl-lg shadow-sm uppercase font-mono tracking-wider">
                  TOP RATED
                </div>
              )}
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex justify-between items-start mb-1">
                <h3 className="text-base sm:text-lg font-bold text-white group-hover:text-green-400 transition-colors truncate pr-2">{meal.name}</h3>
                <span className="text-green-400 font-bold ml-auto whitespace-nowrap">₹{meal.price}</span>
              </div>
              <p className="text-gray-400 text-xs sm:text-sm truncate opacity-80">{meal.description}</p>

              <div className="flex items-center gap-3 mt-2 text-[10px] font-mono text-gray-400">
                <span className="flex items-center gap-1 bg-white/5 px-2 py-0.5 rounded-md">Time: {meal.time}</span>
                <span className="flex items-center gap-1 bg-white/5 px-2 py-0.5 rounded-md">Rating: {meal.rating}</span>
              </div>
            </div>

            <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-green-500 group-hover:text-black transition-all flex-shrink-0 transform group-hover:rotate-[-45deg] group-hover:scale-110">
              <ChevronRight className="w-4 h-4" />
            </div>
          </motion.div>
        ))}
      </div>

      {/* Desktop Expand Icon (Top Right) */}
      {!isExpanded && (
        <div className="absolute top-6 right-6 z-40 hidden lg:block">
          <button
            onClick={onToggleFocus}
            className="p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-all hover:scale-110 shadow-lg group border border-white/5"
            title="Expand Full Menu"
          >
            <Maximize2 className="w-5 h-5 group-hover:text-green-400 translation-colors" />
          </button>
        </div>
      )}

      {/* Mobile View All Button (Only visible on small screens to ensure access) */}
      {!isExpanded && (
        <div className="lg:hidden mt-4 w-full">
          <Button
            variant="outline"
            className="w-full border-white/20 hover:bg-white/10 text-white"
            onClick={onToggleFocus}
          >
            View Full Menu
          </Button>
        </div>
      )}

    </div>

    {/* Right Animation - Moving Food Column */}
    <div className={`relative hidden lg:block ${isExpanded ? 'h-full' : 'h-[550px]'} overflow-hidden mask-gradient-b`}>
      <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-l from-green-900/10 to-transparent pointer-events-none z-0" />

      {/* Staggered Grid if Expanded, Column if Collapsed */}
      {isExpanded ? (
        <div className="grid grid-cols-2 gap-4 p-4 overflow-y-auto h-full custom-scrollbar">
          {[...meals, ...meals, ...meals].map((meal, i) => (
            <div key={`exp-${i}`} className="w-full aspect-square rounded-2xl overflow-hidden relative shadow-2xl border border-white/5 group hover:scale-105 transition-transform duration-300 cursor-pointer" onClick={() => onBookMeal(meal)}>
              <img src={meal.image} className="w-full h-full object-cover" alt="" />
              <div className="absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-black/90 to-transparent">
                <p className="text-white font-bold">{meal.name}</p>
                <p className="text-green-400 text-sm">₹{meal.price}</p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="absolute inset-y-0 right-0 w-full flex gap-4 justify-center opacity-70">
          {/* Column 1 - Moving Down */}
          <motion.div
            animate={{ y: [0, -1000] }}
            transition={{ y: { repeat: Infinity, repeatType: "loop", duration: 30, ease: "linear" } }}
            className="w-44 xl:w-48 flex flex-col gap-5 py-6"
          >
            {[...meals, ...meals, ...meals].map((meal, i) => (
              <div key={`${meal.id}-1-${i}`} className="w-full aspect-[3/4] rounded-2xl overflow-hidden relative shadow-2xl border border-white/5 group">
                <div className="absolute inset-0 bg-black/40 group-hover:bg-transparent transition-colors duration-500 z-10" />
                <img src={meal.image} className="w-full h-full object-cover transform scale-110 group-hover:scale-100 transition-transform duration-700" alt="" />
              </div>
            ))}
          </motion.div>

          {/* Column 2 - Moving Up */}
          <motion.div
            animate={{ y: [-1000, 0] }}
            transition={{ y: { repeat: Infinity, repeatType: "loop", duration: 35, ease: "linear" } }}
            className="w-44 xl:w-48 flex flex-col gap-5 py-6 mt-32"
          >
            {[...meals, ...meals, ...meals].reverse().map((meal, i) => (
              <div key={`${meal.id}-2-${i}`} className="w-full aspect-[3/4] rounded-2xl overflow-hidden relative shadow-2xl border border-white/5 group">
                <div className="absolute inset-0 bg-black/40 group-hover:bg-transparent transition-colors duration-500 z-10" />
                <img src={meal.image} className="w-full h-full object-cover transform scale-110 group-hover:scale-100 transition-transform duration-700" alt="" />
              </div>
            ))}
          </motion.div>
        </div>
      )}
    </div>

  </div>
);

const HostelMealBooking = () => {
  const [selectedMeal, setSelectedMeal] = useState(null);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [showBookingAnim, setShowBookingAnim] = useState(false);
  const [isFocused, setIsFocused] = useState(false); // New Focus State
  const navigate = useNavigate();

  const handleBookMeal = (meal) => {
    setSelectedMeal(meal);
    setShowBookingAnim(true);
    setTimeout(() => {
      setShowBookingAnim(false);
      setShowPaymentModal(true);
    }, 2000);
  };

  const toggleFocus = () => {
    const nextState = !isFocused;
    setIsFocused(nextState);
    document.body.style.overflow = nextState ? 'hidden' : 'unset';

    // Cleanup on unmount just in case
    return () => { document.body.style.overflow = 'unset'; };
  };

  return (
    <>
      {/* Normal Render */}
      <div className="relative overflow-hidden rounded-[2rem] bg-black text-white shadow-2xl my-8 border border-gray-800 transition-all duration-500">
        {/* Background Gradients */}
        <div className="absolute top-0 right-0 w-full md:w-2/3 h-full bg-gradient-to-l from-green-900/30 via-black to-black pointer-events-none z-10" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-green-900/20 via-black to-black pointer-events-none" />

        <MealContent isExpanded={false} onBookMeal={handleBookMeal} isFocused={isFocused} onToggleFocus={toggleFocus} />
      </div>

      {/* Focus Mode Overlay */}
      <AnimatePresence>
        {isFocused && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            // IMPORTANT: z-[9999] ensures it covers sticky navbar (usually z-40 or z-50)
            className="fixed inset-0 z-[9999] bg-black/80 backdrop-blur-2xl flex items-center justify-center p-4 sm:p-8 overflow-y-auto"
          >
            <div className="absolute inset-0" onClick={toggleFocus} /> {/* Backdrop click to close */}

            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="w-full max-w-6xl bg-black rounded-[2.5rem] border border-green-900/30 shadow-2xl relative overflow-hidden h-[90vh] flex flex-col z-10"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="absolute top-6 right-6 z-50">
                <button
                  onClick={toggleFocus}
                  className="p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
                >
                  <Minimize2 className="w-6 h-6" />
                </button>
              </div>

              <div className="absolute top-0 right-0 w-full md:w-2/3 h-full bg-gradient-to-l from-green-900/30 via-black to-black pointer-events-none z-10" />
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-green-900/20 via-black to-black pointer-events-none" />

              <div className="flex-1 overflow-hidden">
                <MealContent isExpanded={true} onBookMeal={handleBookMeal} isFocused={isFocused} onToggleFocus={toggleFocus} />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Booking Overlay Animation */}
      <AnimatePresence>
        {showBookingAnim && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[10000] bg-black/80 backdrop-blur-md flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, rotateX: 20 }}
              animate={{ scale: 1, opacity: 1, rotateX: 0 }}
              className="bg-gray-900 p-8 sm:p-10 rounded-3xl shadow-2xl text-center max-w-sm w-full mx-auto border border-gray-700"
            >
              <div className="relative w-20 h-20 mx-auto mb-6">
                <div className="absolute inset-0 border-4 border-green-500/30 rounded-full animate-ping"></div>
                <div className="absolute inset-0 border-4 border-t-green-500 rounded-full animate-spin"></div>
                <ChefHat className="absolute inset-0 m-auto text-green-500 h-8 w-8" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">Cooking it up...</h3>
              <p className="text-gray-400">Connecting you to the kitchen.</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Payment Modal */}
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
          description={`${selectedMeal.description}`}
        />
      )}
    </>
  );
};

export default HostelMealBooking;
