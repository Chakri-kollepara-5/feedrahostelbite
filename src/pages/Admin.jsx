import React, { useEffect, useState } from "react";
import API from "../services/api";
import AnalyticsPage from "./AnalyticsPage";
import { useAuth } from "../context/AuthContext";
import Badge from "../ui/Badge";
import Button from "../ui/Button";
import { Card } from "../ui/Card";
import { 
  Shield, 
  Users, 
  CheckCircle2, 
  Gift, 
  AlertTriangle, 
  RefreshCw, 
  Database, 
  TrendingUp, 
  Sparkles,
  Activity,
  ArrowUpRight
} from "lucide-react";

const AdminPage = () => {
  const { user: authUser, loading: authLoading } = useAuth();
  
  const [users, setUsers] = useState([]);
  const [donations, setDonations] = useState([]);
  const [activeTab, setActiveTab] = useState("users"); // users, donations, analytics

  const [loadingUsers, setLoadingUsers] = useState(true);
  const [loadingDonations, setLoadingDonations] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const [isAdmin, setIsAdmin] = useState(false);
  const [checkingAdmin, setCheckingAdmin] = useState(true);

  /* ---------------- CHECK ADMIN STATUS ---------------- */
  useEffect(() => {
    if (!authLoading) {
      setIsAdmin(authUser && authUser.role === "admin");
      setCheckingAdmin(false);
    }
  }, [authUser, authLoading]);

  /* ---------------- FETCH USERS ---------------- */
  const fetchUsers = async (silent = false) => {
    if (!silent) setLoadingUsers(true);
    try {
      const { data } = await API.get("/admin/users");
      const list = data.map((u) => ({
        id: u._id || u.id,
        displayName: u.name || u.displayName,
        email: u.email,
        userType: u.role || u.userType,
        verified: u.isVerified || u.verified,
        ...u
      }));
      setUsers(list);
    } catch (err) {
      console.error("Error loading users:", err);
    } finally {
      if (!silent) setLoadingUsers(false);
    }
  };

  /* ---------------- FETCH DONATIONS ---------------- */
  const fetchDonations = async (silent = false) => {
    if (!silent) setLoadingDonations(true);
    try {
      const { data } = await API.get("/donations/nearby");
      const list = data.map((d) => ({
        id: d._id || d.id,
        description: d.description,
        contactInfo: d.contactInfo || "No Contact Info",
        createdAt: d.createdAt,
        ...d
      }));
      setDonations(list);
    } catch (err) {
      console.error("Error loading donations:", err);
    } finally {
      if (!silent) setLoadingDonations(false);
    }
  };

  /* ---------------- MANUAL REFRESH ---------------- */
  const handleRefresh = async () => {
    setIsRefreshing(true);
    await Promise.all([fetchUsers(true), fetchDonations(true)]);
    setIsRefreshing(false);
  };

  /* ---------------- REAL-TIME POLLING ---------------- */
  useEffect(() => {
    if (isAdmin) {
      fetchUsers();
      fetchDonations();

      const interval = setInterval(() => {
        fetchUsers(true);
        fetchDonations(true);
      }, 5000);

      return () => clearInterval(interval);
    }
  }, [isAdmin]);

  /* ---------------- VERIFY NGO ---------------- */
  const verifyUser = async (uid) => {
    if (!isAdmin) {
      alert("Access denied. Admins only.");
      return;
    }

    try {
      await API.patch(`/admin/verify-ngo/${uid}`);
      fetchUsers(true);
    } catch (error) {
      console.error("Error verifying user:", error);
      alert("Verification failed. Check server logs.");
    }
  };

  /* ---------------- LOADERS & ERRORS ---------------- */
  if (checkingAdmin) {
    return (
      <div className="min-h-screen bg-[#F4F7F5] flex flex-col items-center justify-center p-6 relative overflow-hidden">
        {/* Glow ambient background lights */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-[100px] pointer-events-none"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-lime-500/10 rounded-full blur-[100px] pointer-events-none"></div>
        
        <div className="relative flex flex-col items-center z-10">
          <div className="w-16 h-16 relative mb-6">
            <div className="absolute inset-0 border-4 border-emerald-500/20 rounded-full animate-ping"></div>
            <div className="absolute inset-0 border-4 border-t-emerald-500 rounded-full animate-spin"></div>
          </div>
          <p className="text-[#0D2B1B] font-bold text-sm tracking-wide uppercase">Establishing Secure Link...</p>
        </div>
      </div>
    );
  }

  if (!isAdmin) {
    return (
      <div className="min-h-screen bg-[#F4F7F5] flex flex-col items-center justify-center p-6 relative">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_var(--tw-gradient-stops))] from-red-500/5 via-transparent to-transparent pointer-events-none"></div>
        <Card className="max-w-md w-full p-8 text-center border border-red-200/50 shadow-2xl bg-white/90 backdrop-blur-xl rounded-[2.5rem]">
          <div className="bg-red-50/50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 text-red-500 border border-red-100">
            <AlertTriangle className="h-8 w-8" />
          </div>
          <h2 className="text-xl font-bold text-[#0D2B1B] mb-2 tracking-tight">Access Denied</h2>
          <p className="text-sm text-gray-500 mb-6 leading-relaxed">
            This workspace is restricted to administrators only. Please connect using authorized credentials.
          </p>
          <Button variant="danger" className="w-full" onClick={() => window.location.href = "/dashboard"}>
            Return to Dashboard
          </Button>
        </Card>
      </div>
    );
  }

  /* ---------------- METRICS ---------------- */
  const totalUsers = users.length;
  const verifiedUsers = users.filter((u) => u.verified).length;
  const totalDonors = users.filter((u) => u.userType === "donor").length;
  const totalNGOs = users.filter((u) => u.userType === "ngo").length;

  return (
    <div className="min-h-screen bg-[#F4F7F5] pb-24 font-sans text-[#0D2B1B] relative overflow-hidden">
      {/* ambient lighting */}
      <div className="absolute top-[-20%] left-[-10%] w-[600px] h-[600px] bg-emerald-500/5 rounded-full blur-[150px] pointer-events-none"></div>
      <div className="absolute bottom-[10%] right-[-10%] w-[500px] h-[500px] bg-lime-500/5 rounded-full blur-[150px] pointer-events-none"></div>

      <div className="max-w-6xl mx-auto p-6 md:p-8 relative z-10">
        
        {/* FUTURISTIC HERO BANNER */}
        <div className="relative overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-[#0D2B1B] via-[#0F3521] to-[#0A2215] p-8 md:p-10 shadow-[0_20px_50px_-12px_rgba(13,43,27,0.3)] border border-white/10 mb-8 flex flex-col md:flex-row md:items-center justify-between gap-8 group">
          {/* Decorative subtle light grid */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none"></div>
          
          <div className="relative z-10">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-[#9FE870] text-[10px] font-bold uppercase tracking-wider mb-4">
              <Activity className="h-3 w-3 animate-pulse" />
              Live Core Systems
            </div>
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-white mb-2">
              Admin <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#9FE870] to-[#b3f08c]">Command Center</span>
            </h1>
            <p className="text-xs font-medium text-emerald-100/60 max-w-lg leading-relaxed">
              Verify platform participants, analyze live donation batches, and oversee environmental impact parameters.
            </p>
          </div>

          <div className="relative z-10 flex items-center gap-3 self-start md:self-center">
            <div className="text-right hidden sm:block">
              <span className="text-[10px] font-bold text-emerald-100/40 uppercase tracking-widest block">System Status</span>
              <span className="text-xs font-bold text-[#9FE870] flex items-center gap-1.5 justify-end">
                <span className="w-2 h-2 rounded-full bg-[#9FE870] animate-pulse"></span>
                Fully Synchronized
              </span>
            </div>

            <button 
              onClick={handleRefresh}
              disabled={isRefreshing}
              className="px-5 py-3 rounded-2xl bg-white/10 backdrop-blur-md border border-white/10 text-white hover:bg-white hover:text-[#0D2B1B] hover:-translate-y-0.5 active:translate-y-0 shadow-lg transition-all duration-300 flex items-center gap-2 text-xs font-bold uppercase tracking-wider"
            >
              <RefreshCw className={`h-4 w-4 ${isRefreshing ? "animate-spin" : ""}`} />
              Sync Feeds
            </button>
          </div>
        </div>

        {/* METRICS CONTROL GRID */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {[
            { label: "Total Users", value: totalUsers, icon: Users, color: "text-blue-500 bg-blue-500/5 border-blue-500/10 hover:border-blue-500/30" },
            { label: "Verified Users", value: verifiedUsers, icon: CheckCircle2, color: "text-emerald-500 bg-emerald-500/5 border-emerald-500/10 hover:border-emerald-500/30" },
            { label: "Active Donors", value: totalDonors, icon: Gift, color: "text-orange-500 bg-orange-500/5 border-orange-500/10 hover:border-orange-500/30" },
            { label: "Registered NGOs", value: totalNGOs, icon: Shield, color: "text-purple-500 bg-purple-500/5 border-purple-500/10 hover:border-purple-500/30" },
          ].map((item, index) => (
            <Card key={index} className={`p-5 bg-white/70 backdrop-blur-xl border border-gray-200/50 shadow-sm flex items-center justify-between hover:-translate-y-1 hover:shadow-md transition-all duration-300 ${item.color}`}>
              <div>
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">{item.label}</p>
                <h3 className="text-2xl font-bold mt-1 text-[#0D2B1B] tracking-tight">{item.value}</h3>
              </div>
              <div className="p-3 rounded-2xl border border-gray-100 bg-gray-50 text-[#0D2B1B] shadow-sm">
                <item.icon className="h-5 w-5" />
              </div>
            </Card>
          ))}
        </div>

        {/* ADVANCED AI ANALYTICS PANEL */}
        <div className="bg-white/80 backdrop-blur-xl border border-gray-100/80 rounded-[2rem] p-6 mb-8 shadow-sm relative overflow-hidden group">
          {/* subtle decoration glow */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/5 rounded-full blur-2xl pointer-events-none group-hover:scale-150 transition-transform duration-700"></div>
          
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-2.5">
              <div className="p-2 rounded-xl bg-indigo-50 text-indigo-600 border border-indigo-100">
                <Sparkles className="h-4 w-4" />
              </div>
              <h3 className="font-bold tracking-tight text-base text-[#0D2B1B]">AI Platform Diagnosis</h3>
            </div>
            
            <div className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-indigo-50 border border-indigo-100/50 text-indigo-700 text-[10px] font-bold">
              <TrendingUp className="h-3 w-3" />
              Active Metrics
            </div>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { 
                label: "Average Freshness", 
                value: donations.length > 0 ? Math.round(donations.reduce((acc, d) => acc + (d.freshnessScore || 80), 0) / donations.length) + "%" : "N/A",
                desc: "Quality assessment average",
                accent: "text-indigo-600",
                indicator: "from-indigo-500 to-blue-500"
              },
              { 
                label: "High Risk Foods", 
                value: donations.filter(d => d.foodCondition === 'High Risk' || d.foodCondition === 'Unsafe').length,
                desc: "Flagged storage conditions",
                accent: "text-red-500",
                indicator: "from-red-500 to-rose-500"
              },
              { 
                label: "Meals Provisioned", 
                value: donations.filter(d => (d.freshnessScore || 80) >= 60).reduce((acc, d) => acc + (d.quantity || 0) * 3, 0),
                desc: "Equates to 3 meals / kg",
                accent: "text-emerald-600",
                indicator: "from-emerald-500 to-teal-500"
              },
              { 
                label: "AI Verified Items", 
                value: donations.filter(d => d.freshnessScore != null).length,
                desc: "Image freshness scans",
                accent: "text-cyan-600",
                indicator: "from-cyan-500 to-blue-500"
              },
            ].map((item, index) => (
              <div key={index} className="flex flex-col relative group/metric">
                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">{item.label}</span>
                <div className="flex items-baseline gap-1 mt-1">
                  <span className={`text-3xl font-bold tracking-tight ${item.accent}`}>{item.value}</span>
                </div>
                <span className="text-[10px] text-gray-500 mt-1 font-medium">{item.desc}</span>
                
                {/* Glow progress line */}
                <div className="w-full h-1 bg-gray-100 rounded-full mt-3 overflow-hidden">
                  <div className={`h-full rounded-full bg-gradient-to-r ${item.indicator} w-2/3 transition-all duration-500`}></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* FUTURISTIC TAB SWITCHERS */}
        <div className="bg-white/60 backdrop-blur-md p-1.5 rounded-2xl w-max mb-8 border border-gray-200/50 shadow-sm flex items-center">
          {[
            { id: "users", label: "Users Registry", icon: Users },
            { id: "donations", label: "Donation Feed", icon: Database },
            { id: "analytics", label: "Live System Charts", icon: Shield },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-5 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all duration-300 flex items-center gap-2 ${
                activeTab === tab.id
                  ? "bg-[#0D2B1B] text-white shadow-md shadow-[#0D2B1B]/10 hover:bg-[#0D2B1B]/95"
                  : "text-gray-500 hover:text-[#0D2B1B] hover:bg-gray-100/50"
              }`}
            >
              <tab.icon className="h-3.5 w-3.5" />
              {tab.label}
            </button>
          ))}
        </div>

        {/* TAB WORKSPACE */}
        <div className="transition-all duration-300">
          {activeTab === "users" && (
            <Card className="bg-white border border-gray-100 shadow-xl overflow-hidden p-2 rounded-[2rem]">
              <div className="overflow-x-auto">
                <table className="min-w-full text-sm">
                  <thead>
                    <tr className="border-b border-gray-100 text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                      <th className="p-5 text-left">User Profile</th>
                      <th className="p-5 text-left">Email Address</th>
                      <th className="p-5 text-left">Account Type</th>
                      <th className="p-5 text-left">Verification Status</th>
                    </tr>
                  </thead>

                  <tbody className="divide-y divide-gray-50">
                    {loadingUsers ? (
                      <tr>
                        <td colSpan="4" className="p-8 text-center text-gray-500 font-medium">
                          <div className="flex items-center justify-center gap-2">
                            <RefreshCw className="h-4 w-4 animate-spin text-emerald-600" />
                            <span>Querying users directory...</span>
                          </div>
                        </td>
                      </tr>
                    ) : users.length === 0 ? (
                      <tr>
                        <td colSpan="4" className="p-8 text-center text-gray-500 font-medium">
                          No users registered.
                        </td>
                      </tr>
                    ) : (
                      users.map((u) => (
                        <tr key={u.id} className="hover:bg-gray-50/50 transition-colors group/row">
                          <td className="p-5">
                            <div className="flex items-center space-x-3">
                              <div className="w-8 h-8 rounded-full bg-[#0d2b1b]/5 flex items-center justify-center text-xs font-bold text-[#0D2B1B] border border-[#0d2b1b]/10 uppercase">
                                {u.displayName ? u.displayName.slice(0, 2) : "US"}
                              </div>
                              <span className="font-bold text-[#0D2B1B]">{u.displayName}</span>
                            </div>
                          </td>
                          <td className="p-5 text-gray-600 font-mono text-xs">{u.email}</td>
                          <td className="p-5">
                            <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border ${
                              u.userType === "ngo" 
                                ? "bg-amber-50 text-amber-700 border-amber-100" 
                                : u.userType === "admin" 
                                ? "bg-emerald-50 text-emerald-700 border-emerald-100" 
                                : "bg-gray-50 text-gray-600 border-gray-200/60"
                            }`}>
                              {u.userType}
                            </span>
                          </td>
                          <td className="p-5">
                            {u.userType === "ngo" && !u.verified ? (
                              <button
                                onClick={() => verifyUser(u.id)}
                                className="px-4 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-full text-xs font-bold transition-all shadow-md shadow-emerald-600/10 flex items-center gap-1"
                              >
                                <span>Verify NGO</span>
                                <ArrowUpRight className="h-3.5 w-3.5" />
                              </button>
                            ) : u.userType === "ngo" && u.verified ? (
                              <span className="px-3 py-1.5 bg-emerald-50 text-emerald-700 border border-emerald-100 text-xs font-bold rounded-full inline-flex items-center gap-1 shadow-sm">
                                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                                Verified
                              </span>
                            ) : (
                              <span className="text-gray-400 text-xs font-medium">—</span>
                            )}
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </Card>
          )}

          {activeTab === "donations" && (
            <Card className="bg-white border border-gray-100 shadow-xl overflow-hidden p-2 rounded-[2rem]">
              <div className="overflow-x-auto">
                <table className="min-w-full text-sm">
                  <thead>
                    <tr className="border-b border-gray-100 text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                      <th className="p-5 text-left">Description</th>
                      <th className="p-5 text-left">Contact Info</th>
                      <th className="p-5 text-left">Timestamp</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50">
                    {loadingDonations ? (
                      <tr>
                        <td colSpan="3" className="p-8 text-center text-gray-500 font-medium">
                          <div className="flex items-center justify-center gap-2">
                            <RefreshCw className="h-4 w-4 animate-spin text-emerald-600" />
                            <span>Updating active batches...</span>
                          </div>
                        </td>
                      </tr>
                    ) : donations.length === 0 ? (
                      <tr>
                        <td colSpan="3" className="p-8 text-center text-gray-500 font-medium">
                          No active donations found.
                        </td>
                      </tr>
                    ) : (
                      donations.map((d) => (
                        <tr key={d.id} className="hover:bg-gray-50/50 transition-colors">
                          <td className="p-5 text-gray-800 font-bold">{d.description}</td>
                          <td className="p-5 text-gray-600 font-mono text-xs">{d.contactInfo}</td>
                          <td className="p-5 text-gray-500 text-xs font-bold">
                            {d.createdAt ? new Date(d.createdAt).toLocaleString() : "—"}
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </Card>
          )}

          {activeTab === "analytics" && (
            <div className="-mt-16">
              <AnalyticsPage />
            </div>
          )}
        </div>

      </div>
    </div>
  );
};

export default AdminPage;
