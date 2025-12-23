import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";

/* ---------------- SLIDES DATA ---------------- */

const slides = [
  {
    title: "Surplus food, ready to serve.",
    subtitle: "Packed and verified food available near you.",
    bg: "/slider/5-donation-kit.jpg",
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
    bg: "/slider/1-food-packed.jpg",

   
  },
];

/* ---------------- TEXT ANIMATION VARIANTS ---------------- */

const titleContainer = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.14,
      delayChildren: 0.25,
    },
  },
};

const titleWord = {
  hidden: {
    opacity: 0,
    y: 90,
    scale: 0.85,
    filter: "blur(14px)",
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    filter: "blur(0px)",
    transition: {
      type: "spring",
      stiffness: 70,
      damping: 18,
      mass: 0.9,
    },
  },
};

const subtitleVariant = {
  hidden: {
    opacity: 0,
    y: 50,
    filter: "blur(8px)",
  },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      delay: 0.7,
      duration: 0.9,
      ease: "easeOut",
    },
  },
};

/* ---------------- COMPONENT ---------------- */

const HeroSlider = () => {
  const [index, setIndex] = useState(0);
  const navigate = useNavigate();

  // Auto slide
  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % slides.length);
    }, 6500);
    return () => clearInterval(timer);
  }, []);

  const words = slides[index].title.split(" ");

  return (
    <section className="relative h-[90vh] overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.div
          key={index} // 🔥 forces re-animation ALWAYS
          initial={{ opacity: 0, scale: 1.08 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 1.03 }}
          transition={{ duration: 1.1, ease: "easeInOut" }}
          className="absolute inset-0"
          style={{
            backgroundImage: `url(${slides[index].bg})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          {/* DARK OVERLAY */}
          <div className="absolute inset-0 bg-black/65" />

          {/* CONTENT */}
          <div className="relative z-10 h-full flex flex-col justify-center items-center text-center px-6 text-white">

            {/* TITLE */}
            <motion.h1
              key={`title-${index}`}
              variants={titleContainer}
              initial="hidden"
              animate="visible"
              className="text-4xl md:text-6xl font-extrabold mb-6 max-w-4xl leading-tight"
            >
              {words.map((word, i) => (
                <motion.span
                  key={i}
                  variants={titleWord}
                  className="inline-block mr-3"
                >
                  {word}
                </motion.span>
              ))}
            </motion.h1>

            {/* SUBTITLE */}
            <motion.p
              key={`subtitle-${index}`}
              variants={subtitleVariant}
              initial="hidden"
              animate="visible"
              className="text-lg md:text-xl text-white/90 max-w-2xl"
            >
              {slides[index].subtitle}
            </motion.p>

            {/* CTA */}
            <div className="mt-12 flex flex-col sm:flex-row gap-4">
              <button
                onClick={() => navigate("/login")}
                className="px-9 py-3 rounded-lg bg-green-600 text-white font-semibold hover:bg-green-700 transition"
              >
                Login
              </button>

              <button
                onClick={() => navigate("/register")}
                className="px-9 py-3 rounded-lg bg-white text-green-700 font-semibold hover:bg-gray-100 transition"
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

      {/* DOT NAVIGATION */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-3 z-20">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setIndex(i)}
            className={`w-3.5 h-3.5 rounded-full transition ${
              index === i ? "bg-green-400" : "bg-white/40"
            }`}
          />
        ))}
      </div>
    </section>
  );
};

export default HeroSlider;