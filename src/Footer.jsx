import { Mail, Phone, MapPin, Instagram, Linkedin, Facebook, Twitter, Youtube } from "lucide-react";
import { Link } from "react-router-dom";
import "./PartnerSection.css";
import partnerLogo from "./assets/patner.jpeg";
import footerSilhouette from "./assets/footer-silhouette-stark.png";
import feedraQr from "./assets/feedra-qr-final.png";
import { motion } from "framer-motion";

export default function Footer() {
  return (
    <footer className="bg-[#0D2B1B] text-[#F4F7F5]/85 pt-16 pb-0 relative overflow-hidden font-sans select-none border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6 relative z-10 pb-24 md:pb-48">
        <div className="grid grid-cols-1 md:grid-cols-10 gap-8">

          {/* Left Column: Brand & QR (Span 3) */}
          <div className="md:col-span-3 space-y-6">
            <div>
              <h2 className="text-3xl font-bold text-[#9FE870] tracking-tight font-sans">
                FEEDRA<span className="font-mono text-white">.</span>
              </h2>
              <p className="text-xs text-[#F4F7F5]/70 mt-4 leading-relaxed font-normal">
                The Feedra Foundation is a non-profit organisation that strives to eliminate classroom hunger and reduce food waste by connecting donations directly with those in need.
              </p>
            </div>

            {/* Social Icons */}
            <div className="flex gap-4 text-[#9FE870]">
              <a href="#" className="hover:text-white transition-colors"><Instagram size={20} /></a>
              <a href="#" className="hover:text-white transition-colors"><Linkedin size={20} /></a>
              <a href="#" className="hover:text-white transition-colors"><Facebook size={20} /></a>
              <a href="#" className="hover:text-white transition-colors"><Twitter size={20} /></a>
              <a href="#" className="hover:text-white transition-colors"><Youtube size={20} /></a>
            </div>

            {/* QR Code Block */}
            <div className="bg-[#0A2215] p-4 pt-6 rounded-3xl border border-[#9FE870]/20 inline-block text-center mt-2 w-max mx-auto md:mx-0 shadow-lg shadow-[#9FE870]/5">
              <p className="text-[11px] font-semibold text-[#9FE870]/90 mb-3 tracking-wide leading-tight px-2">
                For Online<br />Donations Scan Below
              </p>

              {/* QR Image wrapper */}
              <div className="w-44 h-44 bg-white mx-auto border border-white/10 rounded-2xl overflow-hidden relative shadow-sm">
                <img
                  src={feedraQr}
                  alt="PhonePe QR"
                  className="w-full h-full object-contain p-1"
                />
              </div>

              <div className="text-[10px] font-semibold mt-3 text-white/90 flex flex-col items-center">
                <span className="text-[#9FE870] text-[9px] mb-0.5 font-medium">UPI ID:</span>
                <span className="bg-[#0D2B1B] px-3 py-1 rounded-xl border border-[#9FE870]/10 text-[#9FE870] font-mono tracking-tight">8885628836@ybl</span>
              </div>
            </div>
          </div>

          {/* Middle Columns: Links (Span 5) */}
          <div className="md:col-span-4 grid grid-cols-2 lg:grid-cols-3 gap-6 text-xs font-bold text-[#F4F7F5]/60">
            {/* Column 1 */}
            <div className="space-y-3">
              <h3 className="text-[#9FE870] font-semibold tracking-wide text-xs mb-4 uppercase">ABOUT US</h3>
              <p><Link to="/about" className="hover:text-white transition-colors">About Us</Link></p>
              <p><Link to="/about" className="hover:text-white transition-colors">Our Vision and Mission</Link></p>
              <p><Link to="/about" className="hover:text-white transition-colors">Inspiration - Story of Hope</Link></p>
              <p><Link to="/about" className="hover:text-white transition-colors">Board of Trustees</Link></p>
              <p><Link to="/terms" className="hover:text-white transition-colors">Tax exemption</Link></p>
              <p><Link to="/contact" className="hover:text-white transition-colors">Donation FAQs</Link></p>
              <p><Link to="/terms" className="hover:text-white transition-colors">Terms & Conditions</Link></p>
            </div>

            {/* Column 2 */}
            <div className="space-y-3">
              <h3 className="text-[#9FE870] font-semibold tracking-wide text-xs mb-4 uppercase">OUR WORK</h3>
              <p><Link to="/about" className="hover:text-white transition-colors">Our Work</Link></p>
              <p><Link to="/dashboard" className="hover:text-white transition-colors">Feeding For Education</Link></p>
              <p><Link to="/hostelbite" className="hover:text-white transition-colors">Hostel Meals</Link></p>
              <p><Link to="/donations" className="hover:text-white transition-colors">Relief feeding</Link></p>
              <p><Link to="/dashboard" className="hover:text-white transition-colors">Research & Advocacy</Link></p>
              <p><Link to="/dashboard" className="hover:text-white transition-colors">Beyond Meals</Link></p>
            </div>

            {/* Column 3 */}
            <div className="space-y-6">
              <div className="space-y-3">
                <h3 className="text-[#9FE870] font-semibold tracking-wide text-xs mb-4 uppercase">DONATE</h3>
                <p><Link to="/donations" className="hover:text-white transition-colors">Online donations</Link></p>
                <p><Link to="/donations" className="hover:text-white transition-colors">Sponsor a meal</Link></p>
                <p><Link to="/register" className="hover:text-white transition-colors">Partner with us</Link></p>
              </div>

              <div className="space-y-3">
                <h3 className="text-[#9FE870] font-semibold tracking-wide text-xs mb-4 uppercase">GET IN TOUCH</h3>
                <p><Link to="/contact" className="hover:text-white transition-colors">Contact Us</Link></p>
              </div>

              <div className="space-y-3">
                <h3 className="text-[#9FE870] font-semibold tracking-wide text-xs mb-4 uppercase">GET INVOLVED</h3>
                <p><Link to="/community" className="hover:text-white transition-colors">Future shaper</Link></p>
              </div>
            </div>
          </div>

          {/* Right Column: Badges (Span 3) */}
          <div className="md:col-span-3 flex flex-col items-center md:items-end justify-start">
            {/* Partner Badge */}
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.35, delay: 0.1 }}
              className="flex flex-col items-center md:items-end w-full"
            >
              <img
                src={partnerLogo}
                className="w-20 h-20 object-contain rounded-xl border border-[#9FE870]/30 p-1 bg-white mb-3 shadow-md"
                alt="Jani Basha Seva Samithi"
              />
              <div className="text-center md:text-right">
                <p className="text-[10px] text-[#F4F7F5]/60 font-medium tracking-wide">In Collaboration With</p>
                <p className="text-sm font-semibold text-white">Jani Basha Seva Samithi</p>
                <p className="text-xs text-[#9FE870] mt-0.5 font-medium font-mono">Regd No: 114 of 2024</p>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Bottom Line */}
        <div className="flex flex-col md:flex-row items-center justify-between border-t border-[#F4F7F5]/10 pt-6 mt-12 text-xs text-[#F4F7F5]/50 font-medium tracking-wide">
          <p>Udyam Id : UDYAM-AP-10-0116772</p>
          <p>The Feedra Foundation © {new Date().getFullYear()}</p>
        </div>
      </div>

      {/* Decorative Silhouette Bottom Graphic */}
      <div 
        className="absolute bottom-0 left-0 w-full h-[180px] md:h-[240px] pointer-events-none z-50 opacity-20"
        style={{
          backgroundImage: `url(${footerSilhouette})`,
          backgroundRepeat: 'repeat-x',
          backgroundPosition: 'bottom',
          backgroundSize: 'auto 100%',
          filter: 'invert(87%) sepia(35%) saturate(836%) hue-rotate(42deg) brightness(95%) contrast(97%)'
        }}
      />
    </footer>
  );
}
