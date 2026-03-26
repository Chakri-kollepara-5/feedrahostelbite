import React, { useEffect } from "react";
import { motion } from "framer-motion";

const IntroSplash = ({ onFinish }) => {
  useEffect(() => {
    // Total duration matches animation sequence
    const timer = setTimeout(() => {
      onFinish();
    }, 4500);

    return () => clearTimeout(timer);
  }, [onFinish]);

  return (
    <motion.div
      className="fixed inset-0 bg-black flex items-center justify-center z-[100] overflow-hidden"
      exit={{ opacity: 0, transition: { duration: 0.8, ease: "easeInOut" } }}
    >
      {/* 1. Cinematic Void Background */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(20,20,20,1)_0%,_rgba(0,0,0,1)_100%)]" />

      {/* 2. The "Netflix" Style Giant Zoom Text */}
      <motion.div
        className="relative z-10 flex flex-col items-center"
        initial={{ scale: 3, opacity: 0, filter: "blur(20px)" }}
        animate={{
          scale: 1,
          opacity: 1,
          filter: "blur(0px)"
        }}
        transition={{
          duration: 1.2,
          ease: [0.22, 1, 0.36, 1], // Custom cubic bezier for "punchy" feel
          delay: 0.2
        }}
      >
        <motion.h1
          className="text-[15vw] sm:text-[12vw] font-[900] tracking-tighter leading-none text-transparent bg-clip-text bg-gradient-to-b from-white via-gray-200 to-gray-500 drop-shadow-2xl select-none"
          initial={{ letterSpacing: "-0.1em" }}
          animate={{ letterSpacing: "-0.05em" }}
          transition={{ duration: 3, ease: "linear" }}
        >
          FEEDRA
        </motion.h1>
      </motion.div>

      {/* 3. The "Ribbon" / Energy Flash Effect */}
      <motion.div
        className="absolute inset-0 z-0 bg-emerald-500/10 mix-blend-overlay"
        initial={{ opacity: 0, scale: 1.5 }}
        animate={{ opacity: [0, 1, 0], scale: 1 }}
        transition={{ duration: 0.4, delay: 1.0, ease: "easeOut" }}
      />

      {/* 4. Subtitle Fade In */}
      <motion.p
        className="absolute bottom-[20%] text-emerald-500 text-xs sm:text-sm md:text-base font-bold tracking-[0.4em] uppercase"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.8, duration: 0.8 }}
      >
        Future of Food
      </motion.p>
    </motion.div>
  );
};

export default IntroSplash;
