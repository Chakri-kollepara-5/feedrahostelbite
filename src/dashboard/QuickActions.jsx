import React from 'react';
import { Plus, MapPin, Users, ArrowRight } from "lucide-react";
import { Card } from '../ui/Card';
import { motion } from 'framer-motion';

const QuickActions = ({ onCreateDonation, onFindDonations, onJoinCommunity }) => {
    const container = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
                delayChildren: 0.6
            }
        }
    };

    const item = {
        hidden: { y: 20, opacity: 0 },
        show: { y: 0, opacity: 1, transition: { type: "spring", stiffness: 50 } }
    };

    return (
        <div className="mb-12">
            <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 }}
                className="flex items-center justify-between mb-6"
            >
                <h2 className="text-2xl font-black uppercase tracking-tighter text-[#0D2B1B]">Quick Actions</h2>
            </motion.div>

            <motion.div
                variants={container}
                initial="hidden"
                animate="show"
                className="grid grid-cols-1 gap-4"
            >

                {/* Create Donation */}
                <motion.div variants={item}>
                    <ActionCard
                        num="01"
                        title="Create Donation"
                        description="Share extra food instantly"
                        onClick={onCreateDonation}
                        ariaLabel="Create a new donation"
                    />
                </motion.div>

                {/* Find Donations */}
                <motion.div variants={item}>
                    <ActionCard
                        num="02"
                        title="Find Donations"
                        description="Search nearby food"
                        onClick={onFindDonations}
                        ariaLabel="Find nearby donations"
                    />
                </motion.div>

                {/* Join Community */}
                <motion.div variants={item}>
                    <ActionCard
                        num="03"
                        title="View Community"
                        description="See real-time impact"
                        onClick={onJoinCommunity}
                        ariaLabel="View community insights"
                    />
                </motion.div>

            </motion.div>
        </div>
    );
};

const ActionCard = ({ num, title, description, onClick, ariaLabel }) => (
    <button
        onClick={onClick}
        className="w-full text-left group focus:outline-none relative"
        aria-label={ariaLabel}
    >
        <Card className="relative h-full p-5 flex items-center space-x-4">
            <div className="w-10 h-10 rounded-xl bg-[#F4F7F5] border border-gray-200 flex items-center justify-center font-mono font-black text-[#0D2B1B] flex-shrink-0 group-hover:bg-[#9FE870] group-hover:border-[#84cf57]/40 transition-colors shadow-sm">
                {num}
            </div>
            <div className="flex-1 min-w-0">
                <div className="flex justify-between items-center mb-0.5">
                    <h3 className="font-extrabold uppercase text-xs tracking-wider text-[#0D2B1B] transition-colors truncate">{title}</h3>
                    <ArrowRight className="h-4 w-4 text-[#0D2B1B]/40 group-hover:text-[#0D2B1B] group-hover:translate-x-1 transition-all flex-shrink-0 stroke-[2.5]" />
                </div>
                <p className="text-xs font-semibold text-[#0D2B1B]/70 truncate">{description}</p>
            </div>
        </Card>
    </button>
);

export default QuickActions;
