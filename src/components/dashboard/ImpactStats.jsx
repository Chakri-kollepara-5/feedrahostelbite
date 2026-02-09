import React, { useMemo, useEffect } from 'react';
import { motion, useSpring, useTransform } from 'framer-motion';
import { Utensils, Leaf, Scale } from 'lucide-react';
import { useRealTimeStats } from '../../hooks/useRealTimeData';

const ImpactStats = () => {
    const { stats } = useRealTimeStats();
    const totalKg = stats?.totalFoodSaved || 0;

    const derivedStats = useMemo(() => ({
        meals: Math.round(totalKg * 3),
        co2: Math.round(totalKg * 2.3)
    }), [totalKg]);

    return (
        <div className="w-full bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
            <div className="text-center mb-6">
                <h2 className="text-xl font-bold text-gray-900 mb-1">
                    Community Impact
                </h2>
                <p className="text-sm text-gray-500">
                    Live updates of our collective impact.
                </p>
            </div>

            <div className="space-y-4">
                <SimpleStat
                    value={totalKg}
                    label="Food Donated"
                    unit="kg"
                    icon={Scale}
                    color="text-orange-500"
                    bg="bg-orange-50"
                    delay={0.1}
                />
                <SimpleStat
                    value={derivedStats.meals}
                    label="Meals Provided"
                    unit=""
                    icon={Utensils}
                    color="text-emerald-500"
                    bg="bg-emerald-50"
                    delay={0.2}
                />
                <SimpleStat
                    value={derivedStats.co2}
                    label="CO₂ Saved"
                    unit="kg"
                    icon={Leaf}
                    color="text-blue-500"
                    bg="bg-blue-50"
                    delay={0.3}
                />
            </div>
        </div>
    );
};

const SimpleStat = ({ value, label, unit, icon: Icon, color, bg, delay }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay, duration: 0.5 }}
            className="flex flex-col items-center p-6 rounded-2xl bg-white border border-gray-100 shadow-sm hover:shadow-md transition-shadow"
        >
            <div className={`p-3 rounded-full ${bg} mb-4`}>
                <Icon className={`w-6 h-6 ${color}`} />
            </div>

            <div className="text-4xl font-extrabold text-gray-900 mb-1 flex items-baseline">
                <Counter value={value} />
                {unit && <span className="text-lg text-gray-400 font-medium ml-1">{unit}</span>}
            </div>

            <div className="text-sm font-medium text-gray-500 uppercase tracking-wide">
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
