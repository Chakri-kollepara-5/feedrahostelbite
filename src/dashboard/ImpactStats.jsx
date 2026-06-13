import React, { useEffect } from 'react';
import { motion, useSpring, useTransform } from 'framer-motion';
import { useRealTimeStats } from '../hooks/useRealTimeData';


const ImpactStats = () => {
    const { stats } = useRealTimeStats();
    const totalKg = stats?.totalFoodSaved || 0;
    const meals = stats?.mealsProvided || 0;
    const co2 = stats?.co2Saved || 0;


    return (
        <div className="w-full bg-white/95 border border-[#0D2B1B]/10 rounded-3xl p-6 shadow-[0_15px_35px_-5px_rgba(13,43,27,0.08),0_5px_15px_rgba(0,0,0,0.02)] transition-all duration-300">
            <div className="text-center mb-6">
                <h2 className="text-2xl font-black text-[#0D2B1B] uppercase tracking-tighter mb-1">
                    Community Impact
                </h2>
                <p className="text-xs font-semibold text-[#0D2B1B]/75">
                    Live updates of our collective impact.
                </p>
            </div>

            <div className="space-y-6">
                <SimpleStat
                    value={totalKg}
                    label="Food Donated"
                    unit="kg"
                    num="01"
                    delay={0.1}
                />
                <SimpleStat
                    value={meals}
                    label="Meals Provided"
                    unit=""
                    num="02"
                    delay={0.2}
                />
                <SimpleStat
                    value={co2}
                    label="CO₂ Saved"
                    unit="kg"
                    num="03"
                    delay={0.3}
                />
            </div>
        </div>
    );
};

const SimpleStat = ({ value, label, unit, num, delay }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay, duration: 0.5 }}
            className="flex flex-col items-center p-6 rounded-2xl bg-white/90 border border-gray-100 shadow-sm hover:scale-[1.02] hover:-translate-y-1 hover:shadow-md transition-all duration-300 relative overflow-hidden"
        >
            <div className="absolute top-4 left-4 font-mono text-xs font-black text-[#0D2B1B]/35">
                {num}
            </div>

            <div className="text-4xl font-black text-[#0D2B1B] mb-1 flex items-baseline mt-4">
                <Counter value={value} />
                {unit && <span className="text-sm text-[#0D2B1B]/60 font-black ml-1">{unit}</span>}
            </div>

            <div className="text-[10px] font-black tracking-wider text-[#0D2B1B]/60 uppercase mt-1">
                {label}
            </div>
        </motion.div>
    );
};

// Simple Animated Counter
const Counter = ({ value }) => {
    const spring = useSpring(0, { mass: 0.8, stiffness: 75, damping: 15 });
    const display = useTransform(spring, (current) => Math.round(current));

    useEffect(() => {
        spring.set(value);
    }, [value, spring]);

    return <motion.span>{display}</motion.span>;
};

export default ImpactStats;
