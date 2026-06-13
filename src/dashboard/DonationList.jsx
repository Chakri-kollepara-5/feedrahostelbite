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
                <h2 className="text-2xl font-black uppercase tracking-tighter text-[#0D2B1B] flex items-center gap-3">
                    {title}
                    {safeDonations.length > 0 && (
                        <motion.span
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            className="bg-gradient-to-r from-[#b7f58b] to-[#9FE870] text-[#0D2B1B] border border-[#84cf57]/40 text-[10px] font-black px-2.5 py-0.5 rounded-full shadow-sm"
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
                    className="text-center bg-white/95 rounded-3xl p-10 border border-dashed border-[#0D2B1B]/15 shadow-sm"
                >
                    <p className="text-[#0D2B1B]/70 font-semibold mb-6 text-sm">{emptyMessage || "No donations found."}</p>
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
