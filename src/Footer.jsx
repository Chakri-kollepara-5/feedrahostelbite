import { Mail, Phone, MapPin, Instagram, Linkedin, Facebook, Twitter, Youtube } from "lucide-react";
import { Link } from "react-router-dom";
import "./PartnerSection.css";
import partnerLogo from "./assets/patner.jpeg";
import footerSilhouette from "./assets/footer-silhouette-stark.png";
import feedraQr from "./assets/feedra-qr-final.png";
import { motion } from "framer-motion";

export default function Footer() {
  return (
    <footer className="bg-[#f0f3f2] text-gray-700 pt-12 pb-0 relative overflow-hidden font-sans select-none">
      <div className="max-w-7xl mx-auto px-6 relative z-10 pb-24 md:pb-48">
        <div className="grid grid-cols-1 md:grid-cols-10 gap-8">

          {/* Left Column: Brand & QR (Span 3) */}
          <div className="md:col-span-3 space-y-6">
            <div>
              <h2 className="text-2xl font-bold text-blue-900 tracking-tight flex items-center gap-2">
                <span className="text-3xl">🍲</span> FEEDRA
              </h2>
              <p className="text-sm text-gray-600 mt-4 leading-relaxed font-medium">
                The Feedra Foundation is a non-profit organisation that strives to eliminate classroom hunger and reduce food waste by connecting donations directly with those in need.
              </p>
            </div>

            {/* Social Icons */}
            <div className="flex gap-4 text-green-700">
              <a href="#" className="hover:text-green-900 transition-colors"><Instagram size={20} /></a>
              <a href="#" className="hover:text-green-900 transition-colors"><Linkedin size={20} /></a>
              <a href="#" className="hover:text-green-900 transition-colors"><Facebook size={20} /></a>
              <a href="#" className="hover:text-green-900 transition-colors"><Twitter size={20} /></a>
              <a href="#" className="hover:text-green-900 transition-colors"><Youtube size={20} /></a>
            </div>

            {/* QR Code Block - Directly using the Raw Screenshot with a Window Crop */}
            <div className="bg-white p-3 pt-5 rounded-md shadow-sm border border-red-100 inline-block text-center mt-2 w-max mx-auto md:mx-0">
              <p className="text-[12px] font-bold text-red-600 mb-3 uppercase tracking-wide leading-tight px-2">
                For Online<br />Donations Scan Below
              </p>

              {/* Using the Perfectly Pre-Cropped Direct Image Asset */}
              <div className="w-44 h-44 bg-white mx-auto border border-gray-100 rounded-lg overflow-hidden relative shadow-sm">
                <img
                  src={feedraQr}
                  alt="PhonePe QR"
                  className="w-full h-full object-contain p-1"
                />
              </div>

              <div className="text-[11px] font-extrabold mt-3 text-gray-800 uppercase flex flex-col items-center">
                <span className="text-red-600 text-[10px] mb-0.5">UPI ID:</span>
                <span className="bg-gray-50 px-2 py-0.5 rounded border border-gray-100">8885628836@ybl</span>
              </div>
            </div>
          </div>

          {/* Middle Columns: Links (Span 5) */}
          <div className="md:col-span-4 grid grid-cols-2 lg:grid-cols-3 gap-6 text-sm font-medium text-gray-500">
            {/* Column 1 */}
            <div className="space-y-3">
              <h3 className="text-gray-900 font-bold tracking-wide text-xs mb-4">ABOUT US</h3>
              <p><Link to="/about" className="hover:text-blue-800 transition-colors">About Us</Link></p>
              <p><Link to="/about" className="hover:text-blue-800 transition-colors">Our Vision and Mission</Link></p>
              <p><Link to="/about" className="hover:text-blue-800 transition-colors">Inspiration - The story of Hope</Link></p>
              <p><Link to="/about" className="hover:text-blue-800 transition-colors">Board of Trustees</Link></p>
              <p><Link to="/terms" className="hover:text-blue-800 transition-colors">Tax exemption</Link></p>
              <p><Link to="/contact" className="hover:text-blue-800 transition-colors">Donation FAQs</Link></p>
              <p><Link to="/terms" className="hover:text-blue-800 transition-colors">Terms and Conditions</Link></p>
            </div>

            {/* Column 2 */}
            <div className="space-y-3">
              <h3 className="text-gray-900 font-bold tracking-wide text-xs mb-4">OUR WORK</h3>
              <p><Link to="/about" className="hover:text-blue-800 transition-colors">Our Work</Link></p>
              <p><Link to="/dashboard" className="hover:text-blue-800 transition-colors">Feeding For Education</Link></p>
              <p><Link to="/hostelbite" className="hover:text-blue-800 transition-colors">Hostel Meals</Link></p>
              <p><Link to="/donations" className="hover:text-blue-800 transition-colors">Relief feeding</Link></p>
              <p><Link to="/dashboard" className="hover:text-blue-800 transition-colors">Research & Advocacy</Link></p>
              <p><Link to="/dashboard" className="hover:text-blue-800 transition-colors">Beyond Meals</Link></p>
            </div>

            {/* Column 3 */}
            <div className="space-y-6">
              <div className="space-y-3">
                <h3 className="text-gray-900 font-bold tracking-wide text-xs mb-4">DONATE</h3>
                <p><Link to="/donations" className="hover:text-blue-800 transition-colors">Online donations</Link></p>
                <p><Link to="/donations" className="hover:text-blue-800 transition-colors">Sponsor a meal</Link></p>
                <p><Link to="/register" className="hover:text-blue-800 transition-colors">Partner with us</Link></p>
              </div>

              <div className="space-y-3">
                <h3 className="text-gray-900 font-bold tracking-wide text-xs mb-4">GET IN TOUCH</h3>
                <p><Link to="/contact" className="hover:text-blue-800 transition-colors">Contact Us</Link></p>
              </div>

              <div className="space-y-3">
                <h3 className="text-gray-900 font-bold tracking-wide text-xs mb-4">GET INVOLVED</h3>
                <p><Link to="/community" className="hover:text-blue-800 transition-colors">Future shaper</Link></p>
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
                className="w-20 h-20 object-contain rounded drop-shadow mb-2 mix-blend-multiply"
                alt="Jani Basha Seva Samithi"
              />
              <div className="text-center md:text-right">
                <p className="text-xs text-gray-500 font-medium tracking-wide">In Collaboration With</p>
                <p className="text-sm font-bold text-gray-800">Jani Basha Seva Samithi</p>
                <p className="text-xs text-gray-400 mt-0.5">Regd No: 114 of 2024</p>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Bottom Line */}
        <div className="flex flex-col md:flex-row items-center justify-between border-t border-gray-300 pt-6 mt-12 text-xs text-gray-500 font-medium tracking-wide">
          <p>Udyam Id : UDYAM-AP-10-0116772</p>
          <p>The Feedra Foundation © {new Date().getFullYear()}</p>
        </div>
      </div>

      {/* Decorative Silhouette Bottom Graphic (Final Professional Repeating Strategy) */}
      <div
        className="absolute bottom-0 left-0 w-full h-[180px] md:h-[240px] pointer-events-none z-50 invert-[30%] sepia-[100%] saturate-[2500%] hue-rotate-[190deg] brightness-[95%] contrast-[110%]"
        style={{
          backgroundImage: `url(${footerSilhouette})`,
          backgroundRepeat: 'repeat-x',
          backgroundPosition: 'bottom',
          backgroundSize: 'auto 100%'
        }}
      />
    </footer>
  );
}
