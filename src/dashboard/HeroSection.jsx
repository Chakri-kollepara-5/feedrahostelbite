import React from 'react';
import { motion } from 'framer-motion';

const HeroSection = () => {
    return (
        <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="relative w-full h-[450px] rounded-[32px] overflow-hidden border border-white/20 shadow-[0_25px_60px_-15px_rgba(13,43,27,0.35)] mb-12 group hover:shadow-[0_35px_80px_-10px_rgba(13,43,27,0.45)] hover:scale-[1.005] transition-all duration-500"
        >
            <video
                src="/mydemo.mp4"
                autoPlay
                loop
                muted
                playsInline
                className="w-full h-full object-cover transform scale-110 group-hover:scale-100 transition-transform duration-[2s] ease-in-out"
                aria-hidden="true"
            />

            {/* Premium Overlay with Animated Gradients */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/60 to-transparent flex flex-col justify-center items-center text-center px-6">
                <div className="max-w-4xl space-y-6">
                    <motion.h1
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.3, duration: 0.8 }}
                        className="text-white text-4xl sm:text-5xl md:text-6xl font-black uppercase tracking-tighter drop-shadow-lg leading-tight"
                    >
                        Together We Save Food. <br />
                        <span className="text-[#9FE870]">
                            Together We Save Lives.
                        </span>
                    </motion.h1>

                    <motion.p
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.5, duration: 0.8 }}
                        className="text-[#F4F7F5]/90 mt-4 text-base sm:text-xl font-bold max-w-2xl mx-auto leading-relaxed text-balance"
                    >
                        Real-time donations, trusted community support, and AI-powered food management.
                    </motion.p>
                </div>
            </div>
        </motion.div>
    );
};

export default HeroSection;
