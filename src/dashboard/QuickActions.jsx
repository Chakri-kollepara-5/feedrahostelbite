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
                <h2 className="text-xl font-bold text-gray-900 tracking-tight">Quick Actions</h2>
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
                        icon={<Plus className="h-5 w-5 text-white" />}
                        iconBg="bg-primary-600 shadow-lg shadow-primary-500/30"
                        title="Create Donation"
                        description="Share extra food instantly"
                        onClick={onCreateDonation}
                        ariaLabel="Create a new donation"
                    />
                </motion.div>

                {/* Find Donations */}
                <motion.div variants={item}>
                    <ActionCard
                        icon={<MapPin className="h-5 w-5 text-white" />}
                        iconBg="bg-blue-600 shadow-lg shadow-blue-500/30"
                        title="Find Donations"
                        description="Search nearby food"
                        onClick={onFindDonations} // Wired up
                        ariaLabel="Find nearby donations"
                    />
                </motion.div>

                {/* Join Community */}
                <motion.div variants={item}>
                    <ActionCard
                        icon={<Users className="h-5 w-5 text-white" />}
                        iconBg="bg-purple-600 shadow-lg shadow-purple-500/30"
                        title="View Community"
                        description="See real-time impact"
                        onClick={onJoinCommunity} // Wired up
                        ariaLabel="View community insights"
                    />
                </motion.div>

            </motion.div>
        </div>
    );
};

const ActionCard = ({ icon, iconBg, title, description, onClick, ariaLabel }) => (
    <button
        onClick={onClick}
        className="w-full text-left group focus:outline-none relative"
        aria-label={ariaLabel}
    >
        <div className="absolute inset-0 bg-gradient-to-r from-primary-50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl" />
        <Card className="relative h-full p-5 flex items-center space-x-4 transition-all duration-300 group-hover:shadow-premium-hover group-hover:-translate-y-1 group-focus:ring-2 group-focus:ring-primary-500 ring-offset-2 border-transparent group-hover:border-primary-100">
            <div className={`${iconBg} p-3 rounded-xl transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3`}>
                {icon}
            </div>
            <div className="flex-1 min-w-0">
                <div className="flex justify-between items-center mb-0.5">
                    <h3 className="font-semibold text-gray-900 group-hover:text-primary-700 transition-colors truncate">{title}</h3>
                    <ArrowRight className="h-4 w-4 text-gray-300 group-hover:text-primary-600 group-hover:translate-x-1 transition-all flex-shrink-0" />
                </div>
                <p className="text-xs sm:text-sm text-gray-500 truncate group-hover:text-gray-600 transition-colors">{description}</p>
            </div>
        </Card>
    </button>
);

export default QuickActions;
