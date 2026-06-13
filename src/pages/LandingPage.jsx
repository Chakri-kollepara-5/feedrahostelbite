import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import IntroSplash from "../IntroSplash";
import HeroSlider from "../HeroSlider";
import partnerLogo from "../assets/patner.jpeg";
import Button from "../ui/Button";

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
    <div className="w-full overflow-x-hidden bg-[#F4F7F5] text-[#0D2B1B]">

      {/* ================= HERO ================= */}
      <section className="min-h-[100svh]">
        <HeroSlider />
      </section>

      {/* ================= VALUE PROP ================= */}
      <section className="py-24 px-4 relative overflow-hidden">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="max-w-5xl mx-auto text-center"
        >
          <h2 className="text-4xl md:text-5xl font-black leading-tight uppercase tracking-tighter">
            Saving food is not charity.
            <span className="block text-[#9FE870] bg-[#0D2B1B] border border-[#0A2215] inline-block px-6 py-2 mt-4 rounded-full shadow-[0_10px_20px_rgba(13,43,27,0.2)] lowercase md:text-5xl text-3xl">
              it’s responsibility.
            </span>
          </h2>

          <p className="mt-8 text-[#0D2B1B]/80 text-base md:text-lg max-w-2xl mx-auto font-medium">
            Feedra connects surplus food with NGOs and communities through
            real-time tracking, verified donors, and smart logistics.
          </p>

          <div className="mt-12 flex flex-col sm:flex-row justify-center gap-6">
            <Button
              variant="primary"
              size="lg"
              onClick={() => navigate("/login")}
              className="px-10"
            >
              Login
            </Button>

            <Button
              variant="secondary"
              size="lg"
              onClick={() => navigate("/register")}
              className="px-10"
            >
              Create Account
            </Button>
          </div>
        </motion.div>
      </section>

      {/* ================= IMPACT ================= */}
      <section className="py-20 px-4 relative">
        <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <ImpactCard title="Total Donations" value="11" />
          <ImpactCard title="Food Saved (kg)" value="52" />
          <ImpactCard title="Active Donors" value="5" />
          <ImpactCard title="CO₂ Saved (kg)" value="120" />
        </div>

        <p className="mt-8 text-center text-xs font-bold font-mono text-[#0D2B1B]/60 uppercase tracking-widest">
          Live • Updated at 07:19 AM
        </p>
      </section>

      {/* ================= TRUST — HIGHLIGHTED ================= */}
      <section className="py-24 px-4">
        <div className="max-w-6xl mx-auto text-center">

          <h3 className="text-3xl font-black uppercase tracking-tighter mb-4">
            Trusted & Verified Platform
          </h3>

          <div className="w-24 h-1.5 bg-[#9FE870] border border-[#84cf57] mx-auto mb-12 rounded-full shadow-[0_2px_8px_rgba(159,232,112,0.35)]" />

          <div className="bg-gradient-to-br from-[#b7f58b] via-[#9FE870] to-[#86db59] border border-[#84cf57]/30 shadow-[0_25px_50px_-15px_rgba(13,43,27,0.15)] rounded-3xl p-8 md:p-12 relative overflow-hidden">

            <p className="text-[#0D2B1B]/80 font-semibold max-w-2xl mx-auto mb-10 text-base md:text-lg">
              We partner only with certified NGOs, verified donors and secure payment
              gateways to ensure safe, transparent and accountable food redistribution.
            </p>

            <div className="flex flex-col md:flex-row justify-center gap-6">
              <TrustBadge text="Secure Payments via Razorpay" />
              <TrustBadge text="Verified by Government of India" />
              <TrustBadge text="UDYAM-AP-10-0116772" />
            </div>

            <p className="text-xs font-bold font-mono text-[#0D2B1B]/55 uppercase tracking-wider mt-10">
              Your trust matters — every donation is verified and traceable.
            </p>
          </div>
        </div>
      </section>

      {/* ================= PARTNER ================= */}
      <section className="partner-wrapper px-4 py-20 bg-transparent">
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="partner-card max-w-4xl mx-auto bg-white/95 border border-[#0D2B1B]/10 shadow-[0_20px_45px_rgba(13,43,27,0.08)] rounded-3xl p-8 flex flex-col md:flex-row gap-8 items-center hover:scale-[1.005] hover:shadow-[0_30px_60px_rgba(13,43,27,0.12)] transition-all duration-300"
        >
          <img
            src={partnerLogo}
            alt="Jani Basha Seva Samithi"
            className="w-32 h-32 object-contain rounded-2xl border border-[#0D2B1B]/10 p-2 bg-gradient-to-tr from-[#9FE870] to-[#b7f58b] flex-shrink-0 shadow-[0_10px_20px_rgba(159,232,112,0.25)] hover:scale-105 transition-all duration-300"
          />

          <div className="partner-text text-left space-y-4">
            <h3 className="text-2xl font-black uppercase tracking-tighter text-[#0D2B1B]">Collaboration Partner</h3>

            <p className="text-sm font-semibold text-[#0D2B1B]/80 leading-relaxed">
              Feedra is collaborating with <b>Jani Basha Seva Samithi</b> to
              support community-focused initiatives and create meaningful social impact.
            </p>

            <div className="text-xs font-bold font-mono text-[#0D2B1B]/60 uppercase tracking-wide">
              Regd No: 114 of 2024 • Logo used with permission
            </div>

            <a
              href="https://youtube.com/@kbchannel786?si=DnaGWs-_Z4IjAs5k"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-5 py-2.5 rounded-full border border-[#84cf57] bg-gradient-to-b from-[#b7f58b] to-[#9FE870] text-[#0D2B1B] font-black uppercase tracking-wider text-xs shadow-[0_3px_8px_rgba(159,232,112,0.3)] hover:translate-y-[-1px] hover:shadow-[0_5px_12px_rgba(159,232,112,0.4)] active:translate-y-[2px] transition-all duration-200"
            >
              Visit Partner YouTube Channel
            </a>
          </div>
        </motion.div>
      </section>

      {/* ================= CTA ================= */}
      <section className="bg-[#0D2B1B] text-white py-24 px-4 text-center border-t border-[#0A2215] relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(159,232,112,0.06),transparent_60%)] pointer-events-none"></div>
        <h2 className="text-3xl md:text-5xl font-black mb-6 uppercase tracking-tighter text-[#9FE870] relative z-10">
          Turn surplus food into real impact
        </h2>

        <p className="text-[#F4F7F5]/80 max-w-2xl mx-auto mb-12 font-semibold text-sm md:text-base relative z-10">
          Join donors, NGOs, and volunteers building a zero-waste future.
        </p>

        <div className="flex flex-col sm:flex-row justify-center gap-6 relative z-10">
          <Button
            variant="secondary"
            size="lg"
            onClick={() => navigate("/login")}
            className="px-10"
          >
            Login
          </Button>

          <Button
            variant="outline"
            size="lg"
            onClick={() => navigate("/register")}
            className="px-10 bg-transparent text-white border-white/20 hover:bg-white/10"
          >
            Create Free Account
          </Button>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;

/* ---------------- SMALL COMPONENTS ---------------- */

const ImpactCard = ({ title, value }) => (
  <div className="bg-white/95 rounded-3xl p-6 border border-[#0D2B1B]/10 shadow-[0_15px_35px_-5px_rgba(13,43,27,0.06),0_5px_15px_rgba(0,0,0,0.02)] hover:scale-[1.03] hover:-translate-y-1.5 hover:shadow-[0_25px_50px_rgba(13,43,27,0.12),0_0_15px_rgba(159,232,112,0.1)] transition-all duration-300">
    <div className="text-4xl font-black text-[#0D2B1B] tracking-tight">{value}</div>
    <div className="text-xs font-black uppercase tracking-wider text-[#0D2B1B]/60 mt-3">{title}</div>
  </div>
);

const TrustBadge = ({ text }) => (
  <div
    className="px-6 py-3 rounded-full border border-gray-200/60 bg-white/90 shadow-[0_8px_20px_-5px_rgba(0,0,0,0.05)] hover:-translate-y-0.5 hover:shadow-[0_12px_24px_-5px_rgba(0,0,0,0.08)] transition-all duration-200 flex items-center gap-3 mx-auto"
  >
    <span className="w-2.5 h-2.5 bg-[#9FE870] border border-[#84cf57] rounded-full animate-pulse flex-shrink-0"></span>
    <span className="text-xs font-black uppercase tracking-wider text-[#0D2B1B]">
      {text}
    </span>
  </div>
);
