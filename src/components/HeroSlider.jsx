import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";

const slides = [
  {
    title: "Surplus food, ready to serve.",
    subtitle: "Packed and verified food available near you.",
    bg: "/slider/1-food-packed.jpg",
  },
  {
    title: "Donations happening live.",
    subtitle: "NGOs and donors connected in real time.",
    bg: "/slider/2-donation-ongoing.jpg",
  },
  {
    title: "Food reaches real people.",
    subtitle: "Every donation becomes a meaningful meal.",
    bg: "/slider/3-giving-food.jpg",
  },
  {
    title: "Small actions. Real impact.",
    subtitle: "Moments of hope made possible through sharing.",
    bg: "/slider/4-emotional-impact.jpg",
  },
  {
    title: "A system built on trust.",
    subtitle: "Secure payments • Verified NGOs • Govt registered",
    bg: "/slider/5-donation-kit.jpg",
  },
];

const HeroSlider = () => {
  const [index, setIndex] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative h-[85vh] overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.div
          key={index}
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 1.02 }}
          transition={{ duration: 1, ease: "easeInOut" }}
          className="absolute inset-0"
          style={{
            backgroundImage: `url(${slides[index].bg})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          {/* Overlay */}
          <div className="absolute inset-0 bg-black/60" />

          {/* Content */}
          <div className="relative z-10 h-full flex flex-col justify-center items-center text-center px-6 text-white">
            <motion.h1
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6 }}
              className="text-4xl md:text-6xl font-extrabold mb-4 max-w-4xl"
            >
              {slides[index].title}
            </motion.h1>

            <motion.p
              initial={{ y: 10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.15, duration: 0.6 }}
              className="text-lg md:text-xl text-white/90 max-w-2xl"
            >
              {slides[index].subtitle}
            </motion.p>

            {/* CTA BUTTONS */}
            <div className="mt-10 flex flex-col sm:flex-row gap-4">
              <button
                onClick={() => navigate("/login")}
                className="px-8 py-3 rounded-lg bg-green-600 text-white font-semibold hover:bg-green-700 transition"
              >
                Login
              </button>

              <button
                onClick={() => navigate("/register")}
                className="px-8 py-3 rounded-lg bg-white text-green-700 font-semibold hover:bg-gray-100 transition"
              >
                Create Free Account
              </button>
            </div>

            <p className="mt-4 text-sm text-white/80">
              Already have an account? Login • New here? Create an account
            </p>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Dots */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-3 z-20">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setIndex(i)}
            className={`w-3 h-3 rounded-full ${
              index === i ? "bg-green-400" : "bg-white/40"
            }`}
          />
        ))}
      </div>
    </section>
  );
};

export default HeroSlider;