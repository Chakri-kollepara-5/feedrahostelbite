import React, { useState } from "react";
import { Truck, ClipboardCheck, ArrowRight, ShieldCheck, Monitor, Users, Package, RefreshCw, TrendingUp, MapPin, CheckCircle2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const AgentDashboard = () => {
  const [loading, setLoading] = useState(false);
  const [agents, setAgents] = useState([
    { id: 1, name: "Surplus Assessment", status: "idle", output: "Evaluates registered surplus inventory." },
    { id: 2, name: "Routing & Logistics", status: "idle", output: "Identifies optimal redistribution paths to verified NGOs." },
    { id: 3, name: "Action Plan Generation", status: "idle", output: "Dispatches alerts and initiates transfer protocols." },
  ]);
  const [results, setResults] = useState(null);
  const [summary, setSummary] = useState("");

  const statusStyle = {
    idle:    { background: "#f1f0e8", color: "#888" },
    running: { background: "#E6F1FB", color: "#185FA5" },
    done:    { background: "#EAF3DE", color: "#3B6D11" },
  };

  const updateAgent = (index, status, output) => {
    setAgents(prev => prev.map((a, i) =>
      i === index ? { ...a, status, output } : a
    ));
  };

  const runAgents = async () => {
    setLoading(true);
    setResults(null);
    setSummary("");

    setAgents(prev => prev.map(a => ({ ...a, status: "idle", })));

    try {
      updateAgent(0, "running", "Evaluating surplus metrics...");
      await sleep(500);
      updateAgent(1, "running", "Computing optimal logistics routes...");
      await sleep(500);
      updateAgent(2, "running", "Generating action protocols...");

      let actualSurplusData = [];
      try {
        const getDonations = await fetch(`${import.meta.env.VITE_API_BASE_URL}/donations/nearby`, {
          headers: { "Authorization": `Bearer ${localStorage.getItem('token') || ''}` }
        });
        const donationsData = await getDonations.json();
        actualSurplusData = Array.isArray(donationsData) ? donationsData : (donationsData.data || []);
      } catch (err) {
        console.warn("Using fallback mock data.", err);
      }
      
      if (!actualSurplusData || actualSurplusData.length === 0) {
        actualSurplusData = [
          { name: 'Prepared Meals', kg: 10, donor: 'Surplus Donor', city: 'Local City' },
          { name: 'Fresh Fruits', kg: 14, donor: 'Community Kitchen', city: 'Local City' },
          { name: 'Snacks', kg: 4, donor: 'Local Bakery', city: 'Local City' }
        ];
      }

      const mappedSurplusData = actualSurplusData.map(d => ({
        name: d.title || d.name,
        kg: d.quantity || d.kg,
        description: d.description || '',
        city: d.location?.formattedAddress || 'Local'
      }));

      const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/agent/run`, {
        method: "POST",
        headers: { "Content-Type": "application/json", "Authorization": `Bearer ${localStorage.getItem('token') || ''}` },
        body: JSON.stringify({ surplusData: mappedSurplusData }),
      });

      if (!res.ok) throw new Error("Agent run failed");

      const data = await res.json();

      if (data.success) {
        // Remove duplicate matches based on unique food/donor/recipient combo
        const seen = new Set();
        const uniqueMatches = data.data.matches.matches.filter(m => {
          const key = `${m.food}-${m.donor}-${m.recipient}`.toLowerCase();
          if (seen.has(key)) return false;
          seen.add(key);
          return true;
        });

        data.data.matches.matches = uniqueMatches;

        updateAgent(0, "done", `Processed ${data.data.surplusAnalysis.items.length} items`);
        updateAgent(1, "done", `${uniqueMatches.length} unique routes identified`);
        updateAgent(2, "done", `${data.data.alerts.alerts.length} protocols generated`);
        setResults(data.data);
        setSummary(data.data.alerts.summary);
      }
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  };

  const sleep = ms => new Promise(r => setTimeout(r, ms));

  const priorityColor = {
    critical: { bg: "#FCEBEB", color: "#A32D2D" },
    high:     { bg: "#FAEEDA", color: "#854F0B" },
    medium:   { bg: "#FAEEDA", color: "#854F0B" },
    info:     { bg: "#E1F5EE", color: "#0F6E56" },
  };

  return (
    <div className="bg-white rounded-[2.5rem] border border-slate-100 p-6 sm:p-10 shadow-2xl shadow-slate-200/50 mx-auto max-w-full overflow-hidden">
      
      {/* 1. Dashboard Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
        <div className="flex items-center gap-5">
          <div className="w-16 h-16 rounded-[1.5rem] bg-slate-900 text-white flex items-center justify-center shadow-2xl shadow-slate-900/20 flex-shrink-0">
            <Monitor className="w-8 h-8" />
          </div>
          <div>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight leading-none">
              Logistics Operational Console
            </h2>
            <div className="mt-3 flex items-center gap-3">
              <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-[10px] font-black border border-emerald-100 uppercase tracking-widest leading-none">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                System Active
              </span>
              <p className="text-xs sm:text-sm text-slate-400 font-bold hidden sm:block">Verified Surplus Management Protocol</p>
            </div>
          </div>
        </div>

        <button
          onClick={runAgents}
          disabled={loading}
          className="relative group bg-slate-900 hover:bg-black text-white px-8 py-4 rounded-2xl font-black text-xs uppercase tracking-widest transition-all shadow-xl hover:shadow-2xl active:scale-95 disabled:bg-slate-200 disabled:shadow-none flex items-center gap-3 justify-center min-w-[240px]"
        >
          {loading ? (
            <RefreshCw className="w-4 h-4 animate-spin" />
          ) : (
            <RefreshCw className="w-4 h-4 group-hover:rotate-180 transition-transform duration-700" />
          )}
          {loading ? "Optimizing Routes..." : "Compute Logistics Routes"}
        </button>
      </div>

      {/* 2. Registry Workflow (Horizontal) */}
      <div className="mb-16">
        <h3 className="text-[10px] font-black text-slate-300 uppercase tracking-[0.3em] mb-6 px-1">Pipeline Architecture</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative">
          {/* Connector lines for MD+ screens */}
          <div className="absolute top-1/2 left-0 w-full h-[2px] bg-slate-50 -z-10 hidden md:block" />
          
          {agents.map((agent, i) => (
            <motion.div 
              key={agent.id} 
              className={`p-6 rounded-[2rem] border-2 transition-all duration-500 ${agent.status === 'running' ? 'bg-indigo-50/30 border-indigo-100 shadow-xl' : 'bg-white border-slate-50'}`}
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}
            >
              <div className="flex items-center gap-4 mb-4">
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center font-black text-sm shadow-sm border-2
                  ${agent.status === 'done' ? 'bg-emerald-50 text-emerald-700 border-emerald-100' : agent.status === 'running' ? 'bg-indigo-50 text-indigo-700 border-indigo-100' : 'bg-slate-50 text-slate-400 border-slate-100'}
                `}>
                  0{i+1}
                </div>
                <div className="flex-1">
                  <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-0.5">{agent.name}</p>
                  <p className={`text-[11px] font-black uppercase tracking-widest ${agent.status === 'done' ? 'text-emerald-600' : 'text-slate-900'}`}>{agent.status}</p>
                </div>
              </div>
              <p className="text-[11px] font-bold text-slate-400 leading-relaxed pr-2">{agent.output}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* 3. Results Section (Full Width) */}
      <div className="space-y-12">
        <AnimatePresence>
          {!results && !loading && (
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }}
              className="py-32 border-4 border-dashed border-slate-50 rounded-[3rem] flex flex-col items-center justify-center text-center px-10"
            >
              <div className="w-24 h-24 bg-slate-50 rounded-[2rem] flex items-center justify-center mb-8 border-2 border-slate-100 rotate-12">
                <Truck className="w-12 h-12 text-slate-200" />
              </div>
              <h3 className="text-2xl font-black text-slate-900 mb-4 tracking-tight">Deployment System Initialized</h3>
              <p className="text-sm text-slate-400 max-w-md font-bold leading-relaxed">
                Connect your surplus registry to generate optimized <span className="text-indigo-600">Redistribution Manifests</span> for verified NGO fulfillment partners.
              </p>
            </motion.div>
          )}

          {results && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-16">
              
              {/* Summary & Metrics */}
              <div className="grid grid-cols-1 xl:grid-cols-12 gap-8 items-stretch">
                <div className="xl:col-span-8 bg-slate-900 rounded-[2.5rem] p-8 sm:p-10 text-white relative overflow-hidden shadow-2xl shadow-slate-900/10">
                  <div className="absolute top-[-20%] right-[-10%] w-[300px] h-[300px] bg-indigo-500/10 rounded-full blur-[100px]" />
                  <div className="relative z-10">
                    <div className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center border border-white/10 mb-6">
                      <ClipboardCheck className="w-6 h-6 text-indigo-400" />
                    </div>
                    <p className="text-[10px] font-black text-indigo-400 uppercase tracking-[0.3em] mb-3">Intelligence Summary</p>
                    <p className="text-lg sm:text-xl font-bold leading-relaxed text-slate-100 max-w-3xl">{summary}</p>
                  </div>
                </div>

                <div className="xl:col-span-4 grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-3 xl:grid-cols-1 gap-4">
                  {[
                    { label: "Inventory Elements", value: results.surplusAnalysis.items.length, icon: <Package className="w-5 h-5" />, color: "indigo" },
                    { label: "Optimal Matches", value: results.matches.matches.length, icon: <TrendingUp className="w-5 h-5" />, color: "emerald" },
                    { label: "Alerts Issued", value: results.alerts.alerts.length, icon: <ShieldCheck className="w-5 h-5" />, color: "amber" },
                  ].map((m, idx) => (
                    <div key={idx} className="bg-white border-2 border-slate-50 rounded-[2rem] p-6 flex flex-row xl:flex-row items-center gap-6 shadow-sm hover:shadow-md transition-shadow">
                      <div className={`w-14 h-14 rounded-2xl bg-${m.color}-50 flex items-center justify-center border-2 border-${m.color}-100 shrink-0`}>
                        <div className={`text-${m.color}-600`}>{m.icon}</div>
                      </div>
                      <div className="min-w-0">
                        <div className="text-2xl font-black text-slate-900 tracking-tight leading-none mb-2">{m.value}</div>
                        <div className="text-[9px] font-black text-slate-300 uppercase tracking-widest leading-none">{m.label}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Notifications Grid */}
              <div className="space-y-8">
                <div className="flex items-center gap-4 px-2">
                  <h3 className="text-[10px] font-black text-slate-300 uppercase tracking-[0.3em] whitespace-nowrap">Priority Notifications</h3>
                  <div className="h-[2px] w-full bg-slate-50" />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {results.alerts.alerts.map((alert, i) => {
                    const style = priorityColor[alert.type] || priorityColor.info;
                    return (
                      <div key={i} className="rounded-[2rem] p-6 border-2 border-slate-50 bg-white hover:border-slate-100 transition-all">
                        <div className="flex items-center gap-2.5 mb-4">
                          <div className="w-2 h-2 rounded-full" style={{ backgroundColor: style.color }} />
                          <div className="text-[10px] font-black uppercase tracking-widest opacity-40">{alert.title}</div>
                        </div>
                        <div className="text-xs font-bold leading-relaxed text-slate-600 pl-4 border-l-2 border-slate-100">{alert.body}</div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Manifest Cards - THE "NO GAP" GRID */}
              <div className="space-y-10">
                <div className="flex items-center gap-4 px-2">
                  <h3 className="text-[10px] font-black text-slate-300 uppercase tracking-[0.3em] whitespace-nowrap">REDISTRIBUTION MANIFESTS</h3>
                  <div className="h-[2px] w-full bg-slate-50" />
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3 gap-8">
                  {results.matches.matches.map((match, i) => {
                    const donorName = match.donor?.toLowerCase().includes("unknown") ? "Local Hub" : (match.donor || "Supplier");
                    const recipientName = match.recipient?.toLowerCase().includes("unknown") ? "NGO Center" : (match.recipient || "NGO Hub");
                    const isVerified = recipientName.toLowerCase().includes("akshaya") || recipientName.toLowerCase().includes("robin hood");

                    return (
                      <div key={i} className={`rounded-[3rem] p-8 bg-white border-2 transition-all duration-300 hover:shadow-2xl hover:shadow-slate-200/50 ${isVerified ? 'border-indigo-100 shadow-xl shadow-indigo-500/5' : 'border-slate-50'}`}>
                        {isVerified && (
                          <div className="mb-6">
                            <span className="inline-flex bg-indigo-50 text-indigo-600 text-[10px] font-black px-4 py-1.5 rounded-full items-center gap-2 border border-indigo-100 uppercase tracking-widest shadow-sm">
                              <ShieldCheck className="w-3 h-3" />
                              Gold Standard Route
                            </span>
                          </div>
                        )}

                        <div className="flex items-center gap-6 mb-10">
                          <div className="w-20 h-20 shrink-0 rounded-[2rem] bg-slate-50 flex items-center justify-center border-2 border-slate-100 shadow-sm">
                            <Package className="w-10 h-10 text-slate-300" />
                          </div>
                          <div>
                            <h3 className="text-2xl font-black text-slate-900 tracking-tight leading-none mb-3 break-words capitalize">{match.food}</h3>
                            <div className="flex items-center gap-2">
                              <span className="text-xs font-black text-indigo-600 bg-indigo-50 px-4 py-1.5 rounded-[1rem] border border-indigo-100 leading-none">
                                {match.kg} KG
                              </span>
                              <span className="text-[10px] font-black text-slate-300 uppercase tracking-widest leading-none">Net Volume</span>
                            </div>
                          </div>
                        </div>

                        <div className="space-y-0 relative pl-6 border-l-[3px] border-dashed border-slate-100 ml-6 pb-2">
                          <div className="relative pb-10">
                            <div className="absolute -left-[37px] top-0 w-6 h-6 rounded-full bg-white border-[3px] border-slate-200 shadow-sm" />
                            <div>
                              <p className="text-[10px] font-black text-slate-300 uppercase tracking-widest mb-2">Point of Origin</p>
                              <p className="text-lg font-black text-slate-800 leading-tight break-words">{donorName}</p>
                            </div>
                          </div>

                          <div className="relative">
                            <div className="absolute -left-[37px] top-0 w-6 h-6 rounded-full bg-indigo-600 border-[3px] border-white shadow-xl ring-8 ring-indigo-50" />
                            <div>
                              <p className="text-[10px] font-black text-slate-300 uppercase tracking-widest mb-2">Fulfillment Target</p>
                              <p className="text-lg font-black text-slate-800 leading-tight break-words">{recipientName}</p>
                            </div>
                          </div>
                        </div>
                        
                        <div className="mt-10 pt-8 border-t border-slate-50 flex flex-col gap-6">
                          <p className="text-[12px] text-slate-400 font-bold leading-relaxed italic pr-4">
                            &ldquo;{match.reason}&rdquo;
                          </p>
                          <button className="w-full py-5 bg-slate-900 text-white rounded-[1.5rem] text-[11px] font-black uppercase tracking-[0.2em] hover:bg-black transition-all shadow-xl hover:shadow-black/20 active:scale-95">
                            Process Transaction
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default AgentDashboard;
