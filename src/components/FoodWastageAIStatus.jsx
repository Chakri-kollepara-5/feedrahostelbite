import React, { useState } from "react";
import axios from "axios";
import { Brain, Activity, ShieldCheck, Loader2 } from "lucide-react";
import "./aiImpactCard.css";

const FoodWastageAIStatus = () => {
  const [loading, setLoading] = useState(false);
  const [aiActive, setAiActive] = useState(false);

  const activateAI = async () => {
    setLoading(true);
    try {
      await axios.post("http://127.0.0.1:8000/predict", {
        food_prepared_kg: 1,
        food_consumed_kg: 1,
        customers_served: 1,
        temperature: 25,
        humidity: 40,
        menu_type: "Veg",
        day_of_week: "Monday",
      });
      setAiActive(true);
    } catch (err) {
      setAiActive(false);
      console.error(err);
    }
    setLoading(false);
  };

  return (
    <div className="ai-impact-wrap animate pop">
      <div className="ai-impact-overlay">
        <div className="ai-impact-left animate slide-left delay-2">
          <h2 className="animate slide-left pop delay-3">
            AI Wastage Engine
          </h2>
          <p className="animate slide-left pop delay-4">
            Smart prediction • Real-time • Sustainable
          </p>

          {!aiActive && !loading && (
            <button onClick={activateAI} className="ai-btn">
              <Activity size={18} /> Activate AI
            </button>
          )}

          {loading && (
            <div className="ai-loading">
              <Loader2 className="spin" /> Activating…
            </div>
          )}

          {aiActive && !loading && (
            <div className="ai-active">
              <ShieldCheck /> AI Engine Active
            </div>
          )}
        </div>

        <div className="ai-impact-bg animate slide delay-5">
          <Brain size={120} />
        </div>

        <div className="ai-dots">
          <span className="dot delay-6"></span>
          <span className="dot delay-7"></span>
          <span className="dot delay-8"></span>
        </div>
      </div>

      <div className="ai-impact-text">
        <p className="ai-text-premium">
  <span className="ai-highlight">Powered by real-time intelligence</span>, this
  AI engine analyzes food preparation and consumption patterns to
  <strong> reduce wastage</strong>, <strong> optimize resources</strong>, and
  <strong> maximize community impact</strong> across hostels and communities.
</p>

      </div>
    </div>
  );
};

export default FoodWastageAIStatus;
