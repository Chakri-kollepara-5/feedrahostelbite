import { useState } from "react";
import { useNavigate } from "react-router-dom";
import HeroSlider from "../components/HeroSlider";
import IntroSplash from "../components/IntroSplash";

const LandingPage = () => {
  const navigate = useNavigate();

  // 🔥 Intro always plays on page load
  const [showIntro, setShowIntro] = useState(true);

  // 1️⃣ SHOW INTRO FIRST
  if (showIntro) {
    return <IntroSplash onFinish={() => setShowIntro(false)} />;
  }

  // 2️⃣ THEN LANDING PAGE
  return (
    <div className="bg-[#f7faf9] text-gray-900">

      {/* HERO SLIDER */}
      <HeroSlider />

      {/* LIVE COMMUNITY IMPACT */}
      <section className="bg-white py-20 border-t">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-14">
            Live Community Impact
          </h2>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-10">
            <ImpactCard title="Total Donations" value="11" growth="+12%" />
            <ImpactCard title="Food Saved (kg)" value="52" growth="+8%" />
            <ImpactCard title="Active Donors" value="5" growth="+15%" />
            <ImpactCard title="CO₂ Saved (kg)" value="120" growth="+8%" />
          </div>

          <p className="mt-8 text-sm text-gray-500">
            Live • Updated at 07:19 AM
          </p>
        </div>
      </section>

      {/* TRUST SECTION */}
      <section className="bg-gray-50 py-20">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h3 className="text-xl font-semibold mb-6">
            Trusted & Verified
          </h3>

          <div className="flex flex-col md:flex-row justify-center items-center gap-6 text-gray-700">
            <span className="px-4 py-2 bg-white rounded-lg shadow">
              🔐 Secure Payments (Razorpay)
            </span>
            <span className="px-4 py-2 bg-white rounded-lg shadow">
              🏛 Verified by Government of India
            </span>
            <span className="px-4 py-2 bg-white rounded-lg shadow">
              UDYAM-AP-10-0116772
            </span>
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="bg-green-600 text-white py-24 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-6">
          Turn surplus food into real impact
        </h2>

        <p className="text-white/90 mb-10 max-w-2xl mx-auto">
          Join donors, NGOs, and volunteers building a zero-waste future.
        </p>

        <div className="flex justify-center gap-4">
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

/* ---------------- SMALL COMPONENT ---------------- */

const ImpactCard = ({ title, value, growth }) => {
  return (
    <div className="bg-white rounded-2xl p-6 shadow hover:shadow-lg transition">
      <div className="text-3xl font-bold text-green-600">{value}</div>
      <div className="text-sm text-gray-600 mt-1">{title}</div>
      <div className="text-xs text-green-500 mt-2">{growth}</div>
    </div>
  );
};