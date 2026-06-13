import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import Button from "./ui/Button";

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

/* ---------------- TEXT ANIMATION ---------------- */

const titleContainer = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.2,
    },
  },
};

const titleWord = {
  hidden: {
    opacity: 0,
    y: 70,
    scale: 0.9,
    filter: "blur(10px)",
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    filter: "blur(0px)",
    transition: {
      type: "spring",
      stiffness: 80,
      damping: 16,
    },
  },
};

const subtitleVariant = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { delay: 0.6, duration: 0.8 },
  },
};

/* ---------------- COMPONENT ---------------- */

const HeroSlider = () => {
  const [index, setIndex] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % slides.length);
    }, 6500);
    return () => clearInterval(timer);
  }, []);

  const words = slides[index].title.split(" ");

  return (
    <section className="relative h-[92vh] overflow-hidden">

      <AnimatePresence mode="wait">
        <motion.div
          key={index}
          initial={{ opacity: 0, scale: 1.06 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 1.02 }}
          transition={{ duration: 1.1, ease: "easeInOut" }}
          className="absolute inset-0"
          style={{
            backgroundImage: `url(${slides[index].bg})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          {/* DARK PREMIUM OVERLAY */}
          <div className="absolute inset-0 bg-black/65 backdrop-blur-[1px]" />

          {/* CONTENT */}
          <div className="relative z-10 h-full flex flex-col justify-center items-center text-center px-6 pb-20 md:pb-32">

            {/* 🔗 TOP ACCOUNT LINKS */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1, duration: 0.8 }}
              className="
                mb-10
                px-6 py-2.5
                rounded-full 
                bg-[#0D2B1B]/80
                backdrop-blur-md 
                border border-[#9FE870]/30
                text-xs md:text-sm 
                font-semibold tracking-wider
                text-[#F4F7F5]
                shadow-lg shadow-[#9FE870]/10
                flex items-center gap-2
              "
            >
              <span>Already have an account?</span>
              <button
                onClick={() => navigate("/login")}
                className="text-[#9FE870] font-semibold hover:text-white transition-colors tracking-wider"
              >
                Login
              </button>
              <span className="opacity-40">•</span>
              <span>New here?</span>
              <button
                onClick={() => navigate("/register")}
                className="text-[#9FE870] font-semibold hover:text-white transition-colors tracking-wider"
              >
                Create Account
              </button>
            </motion.div>

            {/* 🔥 BIG PREMIUM HERO TITLE */}
            <motion.h1
              key={`title-${index}`}
              variants={titleContainer}
              initial="hidden"
              animate="visible"
              className="
                text-5xl 
                sm:text-6xl 
                md:text-7xl 
                lg:text-8xl 
                xl:text-[80px]
                font-bold 
                tracking-tight 
                mb-6 
                max-w-6xl 
                leading-[1.1]
                text-[#9FE870]
                drop-shadow-[0_4px_10px_rgba(159,232,112,0.2)]
              "
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
              className="
                text-xl
                sm:text-2xl
                md:text-3xl
                lg:text-4xl

                font-semibold
                tracking-tight
                leading-[1.1]

                text-white

                drop-shadow-[0_8px_25px_rgba(0,0,0,0.7)]

                mb-6
                max-w-5xl
              "
            >
              {slides[index].subtitle}
            </motion.p>

            {/* CTA BUTTONS */}
            <div className="mt-12 flex flex-col sm:flex-row gap-6">
              <Button
                variant="secondary"
                onClick={() => navigate("/login")}
                className="px-10 py-4 text-sm"
              >
                Login
              </Button>

              <Button
                variant="outline"
                onClick={() => navigate("/register")}
                className="px-10 py-4 text-sm bg-white/10 text-white border-white/20 hover:bg-white hover:text-[#0D2B1B] shadow-lg shadow-black/10"
              >
                Create Account
              </Button>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* DOT NAVIGATION */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-3 z-20">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setIndex(i)}
            className={`h-3 rounded-full transition-all duration-300 ${index === i
              ? "bg-emerald-400 w-8 shadow-lg shadow-emerald-500/40"
              : "bg-white/50 hover:bg-white/80 w-3"
              }`}
          />
        ))}
      </div>

    </section>
  );
};

export default HeroSlider;