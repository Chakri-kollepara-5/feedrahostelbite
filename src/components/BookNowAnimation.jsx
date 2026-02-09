import React, { useEffect } from 'react';

const BookNowAnimation = ({ onDone }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onDone();
    }, 2000);

    return () => clearTimeout(timer);
  }, [onDone]);

  return (
    <div className="fixed inset-0 z-[9999] bg-black/80 flex items-center justify-center">
      <div className="text-white text-3xl font-bold animate-pulse">
        Booking...
      </div>
    </div>
  );
};

export default BookNowAnimation;
