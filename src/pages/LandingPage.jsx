import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import IntroSplash from "../components/IntroSplash";
import HeroSlider from "../components/HeroSlider";
import partnerLogo from "../assets/patner.jpeg";

/* ---------------- ANIMATION VARIANTS ---------------- */

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0 },
};

const LandingPage = () => {
  const navigate = useNavigate();
  const [showIntro, setShowIntro] = useState(true);

  if (showIntro) return <IntroSplash onFinish={() => setShowIntro(false)} />;

  return (
    <div className="w-full overflow-x-hidden bg-[#f7faf9] text-gray-900">

      {/* ================= HERO ================= */}
      <section className="min-h-[100svh]">
        <HeroSlider />
      </section>

      {/* ================= VALUE PROP ================= */}
      <section className="bg-white py-20 px-4">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="max-w-5xl mx-auto text-center"
        >
          <h2 className="text-3xl md:text-4xl font-extrabold leading-tight">
            Saving food is not charity.
            <span className="block text-green-600 mt-2">
              It’s responsibility.
            </span>
          </h2>

          <p className="mt-6 text-gray-600 text-base max-w-2xl mx-auto">
            FeedraBite connects surplus food with NGOs and communities through
            real-time tracking, verified donors, and smart logistics.
          </p>

          <div className="mt-10 flex flex-col sm:flex-row justify-center gap-4">
            <button
              onClick={() => navigate("/login")}
              className="px-8 py-3 rounded-lg bg-green-600 text-white font-semibold hover:bg-green-700 shadow-md hover:shadow-lg transition"
            >
              Login
            </button>

            <button
              onClick={() => navigate("/register")}
              className="px-8 py-3 rounded-lg border border-green-600 text-green-700 font-semibold hover:bg-green-50 shadow-sm hover:shadow-md transition"
            >
              Create Account
            </button>
          </div>
        </motion.div>
      </section>

      {/* ================= IMPACT ================= */}
      <section className="bg-gray-50 py-16 px-4">
        <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <ImpactCard title="Total Donations" value="11" />
          <ImpactCard title="Food Saved (kg)" value="52" />
          <ImpactCard title="Active Donors" value="5" />
          <ImpactCard title="CO₂ Saved (kg)" value="120" />
        </div>

        <p className="mt-6 text-center text-xs text-gray-500">
          Live • Updated at 07:19 AM
        </p>
      </section>

      {/* ================= TRUST — HIGHLIGHTED ================= */}
      <section className="bg-white py-20 px-4">
        <div className="max-w-6xl mx-auto text-center">

          <h3 className="text-2xl font-bold mb-6">
            Trusted & Verified Platform
          </h3>

          <div className="w-24 h-1 bg-green-600 mx-auto mb-10 rounded-full" />

          <div className="bg-white border border-green-100 shadow-xl rounded-2xl p-8">

            <p className="text-gray-600 max-w-2xl mx-auto mb-8">
              We partner only with certified NGOs, verified donors and secure payment
              gateways to ensure safe, transparent and accountable food redistribution.
            </p>

            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <TrustBadge text="Secure Payments via Razorpay" />
              <TrustBadge text="Verified by Government of India" />
              <TrustBadge text="UDYAM-AP-10-0116772" />
            </div>

            <p className="text-xs text-gray-500 mt-6">
              Your trust matters — every donation is verified and traceable.
            </p>
          </div>
        </div>
      </section>

      {/* ================= PARTNER ================= */}
      <section className="partner-wrapper px-4 pb-20">
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="partner-card max-w-4xl mx-auto"
        >
          <img
            src={partnerLogo}
            alt="Jani Basha Seva Samithi"
            className="partner-logo"
          />

          <div className="partner-text">
            <h3 className="shine-text">Collaboration Partner</h3>

            <p>
              Feedra is collaborating with <b>Jani Basha Seva Samithi</b> to
              support community-focused initiatives and create meaningful social impact.
            </p>

            <div className="partner-meta">
              Regd No: 114 of 2024 • Logo used with permission
            </div>

            <a
              href="https://youtube.com/@kbchannel786?si=DnaGWs-_Z4IjAs5k"
              target="_blank"
              rel="noopener noreferrer"
              className="partner-link-btn"
            >
              🎥 Visit Partner YouTube Channel
            </a>
          </div>
        </motion.div>
      </section>

      {/* ================= CTA ================= */}
      <section className="bg-green-600 text-white py-24 px-4 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-6">
          Turn surplus food into real impact
        </h2>

        <p className="text-white/90 max-w-2xl mx-auto mb-10">
          Join donors, NGOs, and volunteers building a zero-waste future.
        </p>

        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <button
            onClick={() => navigate("/login")}
            className="bg-white text-green-700 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition"
          >
            Login
          </button>

          <button
            onClick={() => navigate("/register")}
            className="bg-green-800 px-8 py-3 rounded-lg font-semibold hover:bg-green-900 transition"
          >
            Create Free Account
          </button>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;

/* ---------------- SMALL COMPONENTS ---------------- */

const ImpactCard = ({ title, value }) => (
  <div className="bg-white rounded-xl p-6 shadow hover:shadow-xl transition border border-gray-100">
    <div className="text-3xl font-bold text-green-600">{value}</div>
    <div className="text-xs text-gray-600 mt-2">{title}</div>
  </div>
);

const TrustBadge = ({ text }) => (
  <div
    className="px-6 py-3 rounded-xl border bg-white shadow-sm 
    hover:shadow-lg transition 
    flex items-center gap-2 mx-auto
    border-green-200 hover:border-green-400"
  >
    <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
    <span className="text-sm font-medium text-gray-700">
      {text}
    </span>
  </div>
);
