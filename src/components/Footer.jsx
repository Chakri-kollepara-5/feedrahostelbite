import { Mail, Phone, MapPin } from "lucide-react";
import "../components/PartnerSection.css";
import partnerLogo from "../assets/patner.jpeg";
import { motion } from "framer-motion";

export default function Footer() {
  return (
    <footer className="bg-green-600 text-white py-6 px-5">
      <div className="max-w-6xl mx-auto space-y-6">

        {/* GRID */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">

          {/* Brand */}
          <div>
            <h2 className="text-xl font-bold">Feedra-HostelBite</h2>
            <p className="text-sm mt-1 opacity-90">
              Smart food donation & hostel meal booking platform.
            </p>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-base font-semibold mb-2">Contact</h3>

            <p className="flex items-center gap-2 text-sm mb-1">
              <Phone size={16} /> +91 88856 28836
            </p>

            <p className="flex items-center gap-2 text-sm mb-1">
              <Mail size={16} /> feedra985@gmail.com
            </p>

            <p className="flex items-center gap-2 text-sm">
              <MapPin size={16} /> Visakhapatnam, Andhra Pradesh
            </p>
          </div>

          {/* Right Section */}
          <div className="flex flex-col items-end w-full">

            {/* Partner Badge */}
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.35 }}
              className="partner-card-small"
            >
              <img
                src={partnerLogo}
                className="partner-logo-small"
                alt="Jani Basha Seva Samithi"
              />

              <div>
                <p className="partner-title">In Collaboration With</p>
                <p className="partner-name">Jani Basha Seva Samithi</p>
                <p className="partner-meta">Regd No: 114 of 2024</p>
              </div>
            </motion.div>

            {/* Quick Links — RIGHT ALIGNED MOBILE + DESKTOP */}
            <ul className="text-right text-sm mt-3 space-y-1 opacity-95 w-full">
              <li><a href="/dashboard" className="hover:underline">Dashboard</a></li>
              <li><a href="/hostelbite" className="hover:underline">Meals</a></li>
              <li><a href="/" className="hover:underline">Feedra</a></li>
              <li><a href="/settings" className="hover:underline">Settings</a></li>
            </ul>

          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/20 pt-3 text-center text-xs opacity-90">
          © {new Date().getFullYear()} Feedra-HostelBite • All Rights Reserved
        </div>
      </div>
    </footer>
  );
}
