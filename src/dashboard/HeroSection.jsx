import React from 'react';
import { motion } from 'framer-motion';

const HeroSection = () => {
    return (
        <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="relative w-full h-[450px] rounded-3xl overflow-hidden shadow-2xl mb-12 group"
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
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent flex flex-col justify-center items-center text-center px-6">
                <div className="max-w-4xl space-y-6">
                    <motion.h1
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.3, duration: 0.8 }}
                        className="text-white text-4xl sm:text-5xl md:text-7xl font-bold tracking-tight drop-shadow-lg leading-tight"
                    >
                        Together We Save Food. <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-300 to-primary-100">
                            Together We Save Lives.
                        </span>
                    </motion.h1>

                    <motion.p
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.5, duration: 0.8 }}
                        className="text-gray-200 mt-4 text-lg sm:text-2xl font-light max-w-2xl mx-auto leading-relaxed text-balance opacity-90"
                    >
                        Real-time donations, trusted community support, and AI-powered food management.
                    </motion.p>
                </div>
            </div>
        </motion.div>
    );
};

export default HeroSection;
