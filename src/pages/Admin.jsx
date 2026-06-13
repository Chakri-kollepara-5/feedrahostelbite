import React, { useEffect, useState } from "react";
import API from "../services/api";
import AnalyticsPage from "./AnalyticsPage";
import { useAuth } from "../context/AuthContext";
import Badge from "../ui/Badge";
import Button from "../ui/Button";
import { Card } from "../ui/Card";
import { Shield, Users, CheckCircle, Gift, AlertTriangle, RefreshCw, Database } from "lucide-react";

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
      // Initial fetch
      fetchUsers();
      fetchDonations();

      // Poll every 5 seconds for real-time updates
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
      <div className="min-h-screen bg-[#F4F7F5] flex flex-col items-center justify-center p-6">
        <div className="relative w-16 h-16 mb-4">
          <div className="absolute inset-0 border-4 border-emerald-500/20 rounded-full animate-ping"></div>
          <div className="absolute inset-0 border-4 border-t-emerald-500 rounded-full animate-spin"></div>
        </div>
        <p className="text-[#0D2B1B] font-semibold text-sm">Verifying admin permissions...</p>
      </div>
    );
  }

  if (!isAdmin) {
    return (
      <div className="min-h-screen bg-[#F4F7F5] flex flex-col items-center justify-center p-6">
        <Card className="max-w-md w-full p-8 text-center border border-red-100 shadow-xl bg-white">
          <div className="bg-red-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 text-red-500">
            <AlertTriangle className="h-8 w-8" />
          </div>
          <h2 className="text-xl font-bold text-[#0D2B1B] mb-2">Access Denied</h2>
          <p className="text-sm text-gray-500 mb-6">
            This workspace is restricted to administrators only. Please log in with an admin account to proceed.
          </p>
          <Button variant="danger" onClick={() => window.location.href = "/dashboard"}>
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
    <div className="min-h-screen bg-[#F4F7F5] pb-24 font-sans text-[#0D2B1B]">
      <div className="max-w-6xl mx-auto p-6 md:p-8">
        
        {/* HEADER PANEL */}
        <div className="bg-white/80 backdrop-blur-xl border border-gray-100/80 rounded-3xl p-6 md:p-8 shadow-sm flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6 mb-8">
          <div>
            <div className="flex items-center space-x-2 text-emerald-600 mb-1">
              <Shield className="h-5 w-5" />
              <span className="text-xs font-bold uppercase tracking-wider">Admin Workspace</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">Admin Dashboard</h1>
            <p className="text-xs font-medium text-gray-500 mt-1">
              Manage system metrics, users verification, and real-time donations.
            </p>
          </div>

          <Button 
            variant="outline" 
            onClick={handleRefresh}
            disabled={isRefreshing}
            className="self-start sm:self-center bg-white border-gray-200 text-[#0D2B1B] hover:bg-gray-50 shadow-sm flex items-center gap-2"
          >
            <RefreshCw className={`h-4 w-4 ${isRefreshing ? "animate-spin" : ""}`} />
            Refresh Data
          </Button>
        </div>

        {/* METRICS ROW */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {[
            { label: "Total Users", value: totalUsers, icon: Users, color: "text-blue-600 bg-blue-50 border-blue-100/50" },
            { label: "Verified Users", value: verifiedUsers, icon: CheckCircle, color: "text-emerald-600 bg-emerald-50/50 border-emerald-100/50" },
            { label: "Active Donors", value: totalDonors, icon: Gift, color: "text-orange-600 bg-orange-50/50 border-orange-100/50" },
            { label: "Registered NGOs", value: totalNGOs, icon: Shield, color: "text-purple-600 bg-purple-50/50 border-purple-100/50" },
          ].map((item, index) => (
            <Card key={index} className="p-5 bg-white border border-gray-100/80 shadow-sm flex items-center justify-between">
              <div>
                <p className="text-[11px] font-bold text-gray-400 uppercase tracking-wide">{item.label}</p>
                <h3 className="text-2xl font-bold mt-1 text-[#0D2B1B]">{item.value}</h3>
              </div>
              <div className={`p-3 rounded-2xl border ${item.color}`}>
                <item.icon className="h-5 w-5" />
              </div>
            </Card>
          ))}
        </div>

        {/* AI DONATION HEALTH & RISK BAR */}
        <div className="bg-white/90 backdrop-blur-md border border-gray-100/90 rounded-3xl p-6 mb-8 shadow-sm">
          <div className="flex items-center space-x-2 text-indigo-600 mb-6">
            <span className="text-xl">🤖</span>
            <h3 className="font-bold tracking-tight text-lg text-[#0D2B1B]">AI Donation Health Metrics</h3>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { 
                label: "Avg Freshness", 
                value: donations.length > 0 ? Math.round(donations.reduce((acc, d) => acc + (d.freshnessScore || 80), 0) / donations.length) + "/100" : "N/A",
                desc: "Real-time shelf freshness",
                accent: "text-indigo-600"
              },
              { 
                label: "High Risk Foods", 
                value: donations.filter(d => d.foodCondition === 'High Risk' || d.foodCondition === 'Unsafe').length,
                desc: "Flagged unsafe items",
                accent: "text-red-500"
              },
              { 
                label: "Meals Provided", 
                value: donations.filter(d => (d.freshnessScore || 80) >= 60).reduce((acc, d) => acc + (d.quantity || 0) * 3, 0),
                desc: "Approx 3 meals per kg",
                accent: "text-emerald-600"
              },
              { 
                label: "AI Verified Items", 
                value: donations.filter(d => d.freshnessScore != null).length,
                desc: "Completed image checks",
                accent: "text-cyan-600"
              },
            ].map((item, index) => (
              <div key={index} className="flex flex-col">
                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">{item.label}</span>
                <span className={`text-2xl font-bold mt-1.5 ${item.accent}`}>{item.value}</span>
                <span className="text-[10px] text-gray-500 mt-1 font-medium">{item.desc}</span>
              </div>
            ))}
          </div>
        </div>

        {/* TAB CONTROLS */}
        <div className="flex bg-gray-200/50 p-1.5 rounded-full w-max mb-8 border border-gray-200/20">
          {[
            { id: "users", label: "Users Registry", icon: Users },
            { id: "donations", label: "Donation Feed", icon: Database },
            { id: "analytics", label: "Live System Charts", icon: Shield },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-5 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-300 flex items-center gap-1.5 ${
                activeTab === tab.id
                  ? "bg-white text-[#0D2B1B] shadow-sm"
                  : "text-gray-500 hover:text-[#0D2B1B]"
              }`}
            >
              <tab.icon className="h-3.5 w-3.5" />
              {tab.label}
            </button>
          ))}
        </div>

        {/* TAB CONTENT */}
        <div className="transition-all duration-300">
          {activeTab === "users" && (
            <Card className="bg-white border border-gray-100 shadow-sm overflow-hidden p-2 rounded-3xl">
              <div className="overflow-x-auto">
                <table className="min-w-full text-sm">
                  <thead>
                    <tr className="border-b border-gray-100 text-[10px] font-bold text-gray-400 uppercase tracking-wider">
                      <th className="p-4 text-left">User Profile</th>
                      <th className="p-4 text-left">Email Address</th>
                      <th className="p-4 text-left">Account Type</th>
                      <th className="p-4 text-left">Verification Status</th>
                    </tr>
                  </thead>

                  <tbody className="divide-y divide-gray-50">
                    {loadingUsers ? (
                      <tr>
                        <td colSpan="4" className="p-8 text-center text-gray-500 font-medium">
                          Loading registered users...
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
                        <tr key={u.id} className="hover:bg-gray-50/55 transition-colors">
                          <td className="p-4 font-bold text-[#0D2B1B]">{u.displayName}</td>
                          <td className="p-4 text-gray-600 font-mono text-xs">{u.email}</td>
                          <td className="p-4 capitalize">
                            <Badge variant={u.userType === "ngo" ? "warning" : u.userType === "admin" ? "success" : "neutral"}>
                              {u.userType}
                            </Badge>
                          </td>
                          <td className="p-4">
                            {u.userType === "ngo" && !u.verified ? (
                              <Button
                                size="sm"
                                onClick={() => verifyUser(u.id)}
                                className="px-3 py-1 bg-emerald-600 hover:bg-emerald-700 text-white rounded-full text-xs transition-all shadow-sm"
                              >
                                Verify NGO
                              </Button>
                            ) : u.userType === "ngo" && u.verified ? (
                              <span className="px-3 py-1 bg-emerald-50 text-emerald-700 border border-emerald-100 text-xs font-semibold rounded-full">
                                Verified
                              </span>
                            ) : (
                              <span className="text-gray-400 text-xs">—</span>
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
            <Card className="bg-white border border-gray-100 shadow-sm overflow-hidden p-2 rounded-3xl">
              <div className="overflow-x-auto">
                <table className="min-w-full text-sm">
                  <thead>
                    <tr className="border-b border-gray-100 text-[10px] font-bold text-gray-400 uppercase tracking-wider">
                      <th className="p-4 text-left">Description</th>
                      <th className="p-4 text-left">Contact Info</th>
                      <th className="p-4 text-left">Timestamp</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50">
                    {loadingDonations ? (
                      <tr>
                        <td colSpan="3" className="p-8 text-center text-gray-500 font-medium">
                          Loading active donations...
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
                        <tr key={d.id} className="hover:bg-gray-50/55 transition-colors">
                          <td className="p-4 text-gray-800 font-medium">{d.description}</td>
                          <td className="p-4 text-gray-600 font-mono text-xs">{d.contactInfo}</td>
                          <td className="p-4 text-gray-500 text-xs font-medium">
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
