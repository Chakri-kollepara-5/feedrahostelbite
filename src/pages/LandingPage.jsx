import { useNavigate } from "react-router-dom";
import { useState } from "react";
import HeroSlider from "../components/HeroSlider";
import IntroSplash from "../components/IntroSplash";

const LandingPage = () => {
  const navigate = useNavigate();
  const [showIntro, setShowIntro] = useState(
    () => !localStorage.getItem("feedrabite_intro_seen")
  );

  if (showIntro) {
    return (
      <IntroSplash
        onFinish={() => {
          localStorage.setItem("feedrabite_intro_seen", "true");
          setShowIntro(false);
        }}
      />
    );
  }

  return (
    <div className="bg-[#f7faf9] text-gray-900">

      {/* HERO */}
      <HeroSlider />

      {/* LIVE IMPACT */}
      <section className="bg-white py-20 border-t">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h2 className="text-2xl font-bold mb-12">
            Live Community Impact
          </h2>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-10">
            <div>
              <div className="text-3xl font-bold text-green-600">11</div>
              <p className="text-sm text-gray-600">Total Donations</p>
            </div>
            <div>
              <div className="text-3xl font-bold text-green-600">52 kg</div>
              <p className="text-sm text-gray-600">Food Saved</p>
            </div>
            <div>
              <div className="text-3xl font-bold text-green-600">5</div>
              <p className="text-sm text-gray-600">Active Donors</p>
            </div>
            <div>
              <div className="text-3xl font-bold text-green-600">120 kg</div>
              <p className="text-sm text-gray-600">CO₂ Saved</p>
            </div>
          </div>
        </div>
      </section>

      {/* TRUST */}
      <section className="bg-gray-50 py-16 border-t text-center">
        <p className="text-sm text-gray-600 mb-6">
          Trusted payments & verified operations
        </p>

        <div className="flex flex-wrap justify-center gap-6">
          <div className="px-6 py-3 bg-white border rounded-lg shadow-sm">
            💳 Powered by <strong>Razorpay</strong>
          </div>

          <div className="px-6 py-3 bg-white border rounded-lg shadow-sm">
            🇮🇳 Verified by Government of India
            <div className="text-xs text-gray-500 mt-1">
              UDYAM-AP-10-0116772
            </div>
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="bg-green-600 text-white py-24 text-center">
        <h2 className="text-3xl font-bold mb-4">
          Ready to make real impact?
        </h2>
        <p className="mb-10 text-white/90">
          Whether you’re a donor or an NGO — start in seconds.
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

        <p className="mt-4 text-sm text-white/90">
          Existing user? Login • New user? Create an account
        </p>
      </section>

    </div>
  );
};

export default LandingPage;
