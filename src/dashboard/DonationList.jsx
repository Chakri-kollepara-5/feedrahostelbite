import React from 'react';
import DonationCard from '../DonationCard';
import LoadingCard from '../common/LoadingCard';
import ErrorDisplay from '../common/ErrorDisplay';
import Button from '../ui/Button';
import { motion } from 'framer-motion';

const DonationList = ({
    title,
    donations,
    loading,
    error,
    onRetry,
    onClaim,
    userId,
    emptyMessage,
    showCreateButton = false,
    onCreate,
    canClaim
}) => {

    if (!donations && !loading && !error) return null;

    const safeDonations = Array.isArray(donations) ? donations : [];

    const container = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: {
                staggerChildren: 0.08
            }
        }
    };

    const item = {
        hidden: { y: 20, opacity: 0 },
        show: { y: 0, opacity: 1, transition: { type: "spring", stiffness: 50, damping: 20 } }
    };

    return (
        <div className="mb-12">
            <motion.div
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="flex items-center justify-between mb-6"
            >
                <h2 className="text-xl font-bold text-gray-900 tracking-tight flex items-center gap-2">
                    {title}
                    {safeDonations.length > 0 && (
                        <motion.span
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            className="bg-gray-100 text-gray-600 text-xs font-medium px-2.5 py-0.5 rounded-full"
                        >
                            {safeDonations.length}
                        </motion.span>
                    )}
                </h2>
            </motion.div>

            {error ? (
                <ErrorDisplay error={error} onRetry={onRetry} />
            ) : loading ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                    {[1, 2, 3].map((i) => <LoadingCard key={i} />)}
                </div>
            ) : safeDonations.length === 0 ? (
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center bg-white/5 rounded-2xl p-10 border border-white/10 border-dashed"
                >
                    <p className="text-gray-400 mb-4 text-sm">{emptyMessage || "No donations found."}</p>
                    {showCreateButton && (
                        <Button onClick={onCreate} variant="primary" size="md">
                            Create First Donation
                        </Button>
                    )}
                </motion.div>
            ) : (
                <motion.div
                    variants={container}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, margin: "-50px" }}
                    className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6"
                >
                    {safeDonations.map((donation) => {
                        const finalCanClaim = canClaim !== undefined
                            ? canClaim
                            : (userId && userId !== donation.donorId);

                        return (
                            <motion.div key={donation.id} variants={item}>
                                <DonationCard
                                    donation={donation}
                                    canClaim={finalCanClaim}
                                    onClaim={() => onClaim && onClaim(donation.id)}
                                />
                            </motion.div>
                        );
                    })}
                </motion.div>
            )}
        </div>
    );
};

export default DonationList;
