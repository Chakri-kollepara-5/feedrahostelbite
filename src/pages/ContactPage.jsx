import React from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Send } from 'lucide-react';

const ContactPage = () => {
    return (
        <div className="min-h-screen bg-[#fcfdfc] pt-24 pb-20 px-6">
            <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12">
                
                {/* Left: Contact Info */}
                <motion.div
                    initial={{ opacity: 0, x: -25 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6 }}
                    className="space-y-10"
                >
                    <div className="space-y-4">
                        <h1 className="text-4xl font-extrabold text-blue-900 leading-tight">Get in Touch</h1>
                        <p className="text-lg text-gray-600">Have a question? We'd love to hear from you. Send us a message and we'll respond as soon as possible.</p>
                    </div>

                    <div className="space-y-6">
                        <div className="flex items-center gap-5 text-gray-700">
                            <div className="p-4 bg-green-50 text-green-600 rounded-2xl"><Phone size={24} /></div>
                            <div>
                                <p className="text-sm font-bold uppercase tracking-widest text-gray-400">Phone</p>
                                <p className="text-xl font-bold">+91 88856 28836</p>
                            </div>
                        </div>

                        <div className="flex items-center gap-5 text-gray-700">
                            <div className="p-4 bg-blue-50 text-blue-600 rounded-2xl"><Mail size={24} /></div>
                            <div>
                                <p className="text-sm font-bold uppercase tracking-widest text-gray-400">Email</p>
                                <p className="text-xl font-bold">feedra985@gmail.com</p>
                            </div>
                        </div>

                        <div className="flex items-center gap-5 text-gray-700">
                            <div className="p-4 bg-red-50 text-red-600 rounded-2xl"><MapPin size={24} /></div>
                            <div>
                                <p className="text-sm font-bold uppercase tracking-widest text-gray-400">Location</p>
                                <p className="text-xl font-bold">Visakhapatnam, Andhra Pradesh</p>
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* Right: Contact Form */}
                <motion.div
                    initial={{ opacity: 0, x: 25 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6 }}
                    className="bg-white p-8 md:p-10 rounded-3xl border border-gray-100 shadow-sm"
                >
                    <form className="space-y-6">
                        <div className="grid grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="text-sm font-bold text-gray-700">Name</label>
                                <input type="text" className="w-full px-4 py-3 rounded-xl bg-gray-50 border-transparent focus:bg-white focus:border-green-500 transition-all font-medium text-gray-900" placeholder="Your name" />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-bold text-gray-700">Email</label>
                                <input type="email" className="w-full px-4 py-3 rounded-xl bg-gray-50 border-transparent focus:bg-white focus:border-green-500 transition-all font-medium text-gray-900" placeholder="Your email" />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-bold text-gray-700">Subject</label>
                            <input type="text" className="w-full px-4 py-3 rounded-xl bg-gray-50 border-transparent focus:bg-white focus:border-green-500 transition-all font-medium text-gray-900" placeholder="Subject" />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-bold text-gray-700">Message</label>
                            <textarea rows="4" className="w-full px-4 py-3 rounded-xl bg-gray-50 border-transparent focus:bg-white focus:border-green-500 transition-all font-medium text-gray-900" placeholder="How can we help?"></textarea>
                        </div>
                        <button type="submit" className="w-full py-4 bg-green-600 text-white font-extrabold rounded-xl hover:bg-green-700 transition shadow-lg shadow-green-200 flex items-center justify-center gap-2">
                            <Send size={18} /> Send Message
                        </button>
                    </form>
                </motion.div>

            </div>
        </div>
    );
};

export default ContactPage;
