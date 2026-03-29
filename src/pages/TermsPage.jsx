import React from 'react';
import { motion } from 'framer-motion';
import { FileText, ShieldCheck, HelpCircle } from 'lucide-react';

const TermsPage = () => {
    return (
        <div className="min-h-screen bg-[#fcfdfc] pt-24 pb-20 px-6">
            <div className="max-w-4xl mx-auto space-y-12">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center"
                >
                    <h1 className="text-4xl font-extrabold text-blue-900 mb-6 tracking-tight">Legal & Privacy</h1>
                    <p className="text-lg text-gray-600">
                        At Feedra, transparency and accountability are our top priorities. Here you'll find everything about our policies and terms.
                    </p>
                </motion.div>

                <div className="grid md:grid-cols-3 gap-8 text-center sm:text-left">
                    <div className="space-y-4">
                        <div className="text-green-600 mx-auto sm:mx-0"><FileText size={32} /></div>
                        <h2 className="text-xl font-bold text-gray-900">Terms of Use</h2>
                        <p className="text-sm text-gray-600 leading-relaxed">By using Feedra, you agree to our community standards, safety protocols for food handling, and platform usage policies.</p>
                    </div>

                    <div className="space-y-4">
                        <div className="text-blue-600 mx-auto sm:mx-0"><ShieldCheck size={32} /></div>
                        <h2 className="text-xl font-bold text-gray-900">Privacy Policy</h2>
                        <p className="text-sm text-gray-600 leading-relaxed">Your data is safe with us. We use your information strictly for order verification, donation matching, and service improvement.</p>
                    </div>

                    <div className="space-y-4">
                        <div className="text-red-600 mx-auto sm:mx-0"><HelpCircle size={32} /></div>
                        <h2 className="text-xl font-bold text-gray-900">Refunds & Help</h2>
                        <p className="text-sm text-gray-600 leading-relaxed">For any disputes or issues with hostel meal bookings or donations, our helpdesk is available 24/7.</p>
                    </div>
                </div>

                <div className="bg-white p-10 rounded-3xl border border-gray-100 shadow-sm space-y-10">
                    <section className="space-y-4">
                        <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-3">
                           📜 <span className="border-b-2 border-green-500 pb-1">Community Guidelines</span>
                        </h2>
                        <p className="text-gray-600">
                            Donors must ensure food is fresh and safe for consumption. NGOs must report back on impact within 24 hours of successful pickup.
                        </p>
                    </section>
                    
                    <section className="space-y-4">
                        <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-3">
                           🏦 <span className="border-b-2 border-blue-500 pb-1">Tax Exemption</span>
                        </h2>
                        <p className="text-gray-600">
                           Donations to Feedra and its partner NGOs are eligible for tax exemption under Indian Law (Section 80G). Please provide your PAN card details for certificate generation.
                        </p>
                    </section>
                </div>
            </div>
        </div>
    );
};

export default TermsPage;
