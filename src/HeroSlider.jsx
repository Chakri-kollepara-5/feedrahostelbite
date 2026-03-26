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
                px-6 py-2
                rounded-full 
                bg-white/10 
                backdrop-blur-md 
                border border-white/20 
                text-sm md:text-base 
                text-white/95
                shadow-2xl
                flex items-center gap-2
              "
            >
              <span>Already have an account?</span>
              <button
                onClick={() => navigate("/login")}
                className="text-emerald-300 font-bold hover:text-emerald-200 transition-colors"
              >
                Login
              </button>
              <span className="opacity-50">•</span>
              <span>New here?</span>
              <button
                onClick={() => navigate("/register")}
                className="text-emerald-300 font-bold hover:text-emerald-200 transition-colors"
              >
                Create an account
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
                xl:text-[92px]
                font-black 
                tracking-tight 
                mb-6 
                max-w-6xl 
                leading-[1.05]

                bg-gradient-to-r 
                from-emerald-300 
                via-green-300 
                to-emerald-200 

                bg-clip-text 
                text-transparent 

                drop-shadow-[0_6px_30px_rgba(16,185,129,0.35)]
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
                text-2xl
                sm:text-3xl
                md:text-4xl
                lg:text-5xl

                font-extrabold
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
            <div className="mt-12 flex flex-col sm:flex-row gap-4">

              <button
                onClick={() => navigate("/login")}
                className="
                  px-10 py-4 
                  rounded-2xl 
                  bg-gradient-to-r from-green-600 to-emerald-600 
                  text-white 
                  font-semibold 
                  hover:scale-[1.04] 
                  hover:shadow-2xl 
                  transition-all duration-300 
                  shadow-lg shadow-green-900/30
                "
              >
                Login
              </button>

              <button
                onClick={() => navigate("/register")}
                className="
                  px-10 py-4 
                  rounded-2xl 
                  bg-white/95 
                  backdrop-blur 
                  text-green-700 
                  font-semibold 
                  hover:bg-white 
                  transition 
                  shadow-lg 
                  hover:scale-[1.04]
                "
              >
                Create Free Account
              </button>

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