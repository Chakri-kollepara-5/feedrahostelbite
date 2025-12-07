import React, { useState } from "react";
import axios from "axios";
import { Brain, Activity, ShieldCheck, Loader2 } from "lucide-react";

const FoodWastageAIStatus = () => {
  const [loading, setLoading] = useState(false);
  const [aiActive, setAiActive] = useState(false);

  const checkPrediction = async () => {
    setLoading(true);

    try {
      await axios.post("http://127.0.0.1:8000/predict", {
        food_prepared_kg: 1,
        food_consumed_kg: 1,
        customers_served: 1,
        temperature: 25,
        humidity: 40,
        menu_type: "Veg",
        day_of_week: "Monday"
      });

      setAiActive(true);
    } catch (err) {
      setAiActive(false);
      console.error(err);
    }

    setLoading(false);
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6">
      <div className="flex items-center space-x-3 mb-4">
        <Brain className="h-7 w-7 text-purple-600" />
        <h2 className="text-xl font-semibold text-gray-900">
          AI Wastage Prediction Engine
        </h2>
      </div>

      <p className="text-gray-600 mb-6 text-sm">
        Our AI model continuously analyzes food patterns to optimize wastage
        reduction. This feature enhances forecasting accuracy and boosts 
        sustainability across hostels and communities.
      </p>

      {loading ? (
        <div className="flex items-center justify-center space-x-2 text-purple-700">
          <Loader2 className="animate-spin h-5 w-5" />
          <span className="font-medium">Activating AI Engine...</span>
        </div>
      ) : aiActive ? (
        <div className="flex items-center space-x-2 bg-purple-50 p-3 rounded-xl border border-purple-200">
          <ShieldCheck className="h-6 w-6 text-purple-700" />
          <span className="text-purple-900 font-medium">
            AI Prediction Engine Active (XGBoost • v1.0)
          </span>
        </div>
      ) : (
        <button
          onClick={checkPrediction}
          className="flex items-center bg-purple-600 text-white px-4 py-3 rounded-lg hover:bg-purple-700 transition-all space-x-2"
        >
          <Activity className="h-5 w-5" />
          <span>Activate AI Engine</span>
        </button>
      )}
    </div>
  );
};

export default FoodWastageAIStatus;
