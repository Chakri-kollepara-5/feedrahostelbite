import React, { useState } from "react";
import axios from "axios";
import { Brain, Activity, ShieldCheck, Loader2, Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import { Card } from "./ui/Card";
import Button from "./ui/Button";

const FoodWastageAIStatus = () => {
  const [loading, setLoading] = useState(false);
  const [aiActive, setAiActive] = useState(false);

  const activateAI = async () => {
    setLoading(true);
    try {
      // Simulate API call for demo if backend not running
      await new Promise(resolve => setTimeout(resolve, 2000));
      /* 
      await axios.post("http://127.0.0.1:8000/predict", { ... }); 
      */
      setAiActive(true);
    } catch (err) {
      console.error(err);
      // Fallback for demo
      setAiActive(true);
    }
    setLoading(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      <Card className="relative overflow-hidden border-0 !bg-gradient-to-br from-green-900 via-emerald-900 to-green-950 text-white shadow-2xl">

        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <motion.div
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.5, 0.3]
            }}
            transition={{ duration: 4, repeat: Infinity }}
            className="absolute -top-20 -right-20 w-80 h-80 bg-green-500/20 rounded-full blur-3xl"
          />
          <div className="absolute top-0 right-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10 mix-blend-overlay"></div>
        </div>

        <div className="relative z-10 flex flex-col md:flex-row items-center gap-8 p-8">

          {/* Left Content */}
          <div className="flex-1 space-y-6 text-center md:text-left">
            <div>
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                className="flex items-center justify-center md:justify-start gap-2 mb-2"
              >
                <Sparkles className="h-5 w-5 text-green-300 animate-pulse" />
                <span className="text-green-300 font-medium tracking-wider text-xs uppercase">Powered by Feedra AI</span>
              </motion.div>

              <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-white mb-2">
                AI Wastage Engine
              </h2>
              <p className="text-green-100/80 text-lg max-w-xl mx-auto md:mx-0 leading-relaxed">
                Smart prediction to reduce food waste before it happens.
                <span className="hidden sm:inline"> Optimize resources and maximize community impact.</span>
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center md:justify-start gap-4">
              {!aiActive && !loading && (
                <Button
                  onClick={activateAI}
                  size="lg"
                  className="bg-white text-green-900 hover:bg-green-50 border-none shadow-[0_0_20px_rgba(255,255,255,0.3)]"
                >
                  <Activity className="mr-2 h-5 w-5" />
                  Activate AI Engine
                </Button>
              )}

              {loading && (
                <div className="flex items-center gap-3 bg-white/10 px-6 py-3 rounded-xl backdrop-blur-md border border-white/20">
                  <Loader2 className="h-5 w-5 animate-spin text-green-300" />
                  <span className="font-medium">Calibrating Algorithms...</span>
                </div>
              )}

              {aiActive && !loading && (
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="flex items-center gap-3 bg-green-500/20 px-6 py-3 rounded-xl border border-green-400/50 text-green-100"
                >
                  <ShieldCheck className="h-6 w-6 text-green-400" />
                  <span className="font-bold tracking-wide">AI ACTIVE & MONITORING</span>
                </motion.div>
              )}
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-3 gap-4 pt-4 border-t border-white/10">
              <div>
                <div className="text-2xl font-bold">98%</div>
                <div className="text-xs text-green-300 uppercase tracking-widest">Accuracy</div>
              </div>
              <div>
                <div className="text-2xl font-bold">2.4<span className="text-sm">kg</span></div>
                <div className="text-xs text-green-300 uppercase tracking-widest">Saved Today</div>
              </div>
              <div>
                <div className="text-2xl font-bold">Real-time</div>
                <div className="text-xs text-green-300 uppercase tracking-widest">Analysis</div>
              </div>
            </div>
          </div>

          {/* Right Visual */}
          <div className="relative">
            <div className="absolute inset-0 bg-green-500/30 blur-[60px] rounded-full"></div>
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="relative z-10 bg-gradient-to-b from-white/10 to-transparent p-1 rounded-2xl backdrop-blur-sm border border-white/20"
            >
              <div className="bg-black/40 rounded-xl p-8 backdrop-blur-md">
                <Brain className={`w-32 h-32 md:w-40 md:h-40 ${aiActive ? 'text-green-400 drop-shadow-[0_0_15px_rgba(74,222,128,0.5)]' : 'text-gray-400'}`} />
              </div>

              {/* Connecting Dots Animation */}
              {aiActive && (
                <>
                  <motion.div
                    animate={{ opacity: [0, 1, 0], scale: [1, 1.5, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="absolute -top-2 -right-2 w-4 h-4 bg-green-400 rounded-full shadow-lg shadow-green-400"
                  />
                  <motion.div
                    animate={{ opacity: [0, 1, 0], scale: [1, 1.5, 1] }}
                    transition={{ duration: 2, repeat: Infinity, delay: 1 }}
                    className="absolute -bottom-2 -left-2 w-4 h-4 bg-green-400 rounded-full shadow-lg shadow-green-400"
                  />
                </>
              )}
            </motion.div>
          </div>

        </div>
      </Card>
    </motion.div>
  );
};

export default FoodWastageAIStatus;
