import React from 'react';
import { motion } from 'framer-motion';

const AboutPage = () => {
  return (
    <div className="min-h-screen bg-[#fcfdfc] pt-24 pb-20 px-6">
      <div className="max-w-4xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl font-extrabold text-blue-900 mb-6">About Feedra</h1>
          <p className="text-lg text-gray-600 leading-relaxed">
            Feedra is more than just a platform; it's a movement to bridge the gap between food surplus and food scarcity. 
            We believe that in a world of abundance, no one should go hungry.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 mb-20">
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-gray-900 border-b-2 border-green-500 pb-2 w-fit">Our Mission</h2>
            <p className="text-gray-600 leading-relaxed">
              To eliminate hunger and reduce food waste by creating a seamless, transparent, and technology-driven ecosystem that connects donors with those in need in real-time.
            </p>
          </div>

          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-gray-900 border-b-2 border-blue-500 pb-2 w-fit">Our Vision</h2>
            <p className="text-gray-600 leading-relaxed">
              A zero-hunger future where every surplus meal is valued and every hungry person is reached, powered by community collaboration and smart logistics.
            </p>
          </div>
        </div>

        <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm space-y-8">
          <h2 className="text-2xl font-bold text-gray-900 text-center">Why Choose Feedra?</h2>
          <div className="grid sm:grid-cols-2 gap-6">
            <div className="flex gap-4">
              <div className="text-xl font-mono font-bold text-green-600">01</div>
              <div>
                <h3 className="font-bold text-gray-800">Verified Network</h3>
                <p className="text-sm text-gray-600">Every NGO and donor on our platform is strictly verified for safety and accountability.</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="text-xl font-mono font-bold text-blue-600">02</div>
              <div>
                <h3 className="font-bold text-gray-800">Community Driven</h3>
                <p className="text-sm text-gray-600">Built for the community, by the community. Connecting neighbors to help neighbors.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
