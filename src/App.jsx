import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom";
import { Toaster } from "react-hot-toast";

import { AuthProvider, useAuth } from "./context/AuthContext";

// Pages
import LandingPage from "./pages/LandingPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import ResetPasswordPage from "./pages/ResetPasswordPage";
import DashboardPage from "./pages/DashboardPage";
import AdminPage from "./pages/Admin.jsx";
import DonationsPage from "./pages/DonationsPage";
import AnalyticsPage from "./pages/AnalyticsPage";
import CommunityPage from "./pages/CommunityPage";
import SettingsPage from "./pages/SettingsPage";
import HostelBitePage from "./pages/HostelBitePage";
import PaymentsPage from "./pages/PaymentsPage";

// Components
import Navigation from "./components/Navigation";
import ChatAssistButton from "./components/ChatAssistButtonwhatsapp";
import Footer from "./components/Footer";

/* ---------------- ROUTE GUARDS ---------------- */

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600" />
      </div>
    );
  }

  return user ? children : <Navigate to="/login" />;
};

const PublicRoute = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600" />
      </div>
    );
  }

  return user ? <Navigate to="/dashboard" /> : children;
};

/* ---------------- APP CONTENT ---------------- */

function AppContent() {
  const { user } = useAuth();
  const location = useLocation();

  // ❌ Navbar must NOT appear on these routes
  const hideNavbarRoutes = ["/", "/login", "/register", "/reset-password"];

  const shouldShowNavbar =
    user && !hideNavbarRoutes.includes(location.pathname);

  return (
    <div className="min-h-screen bg-gray-50">

      {/* ✅ NAVBAR (ONLY FOR APP PAGES) */}
      {shouldShowNavbar && <Navigation />}

      <Routes>
        {/* 🔥 LANDING PAGE (NO AUTH GUARD) */}
        <Route path="/" element={<LandingPage />} />

        {/* AUTH PAGES */}
        <Route
          path="/login"
          element={
            <PublicRoute>
              <LoginPage />
            </PublicRoute>
          }
        />

        <Route
          path="/register"
          element={
            <PublicRoute>
              <RegisterPage />
            </PublicRoute>
          }
        />

        <Route
          path="/reset-password"
          element={
            <PublicRoute>
              <ResetPasswordPage />
            </PublicRoute>
          }
        />

        {/* PROTECTED APP PAGES */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <DashboardPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <AdminPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/donations"
          element={
            <ProtectedRoute>
              <DonationsPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/analytics"
          element={
            <ProtectedRoute>
              <AnalyticsPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/community"
          element={
            <ProtectedRoute>
              <CommunityPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/settings"
          element={
            <ProtectedRoute>
              <SettingsPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/hostelbite"
          element={
            <ProtectedRoute>
              <HostelBitePage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/payments"
          element={
            <ProtectedRoute>
              <PaymentsPage />
            </ProtectedRoute>
          }
        />

        {/* FALLBACK */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>

      {/* TOASTS */}
      <Toaster position="top-right" />

      {/* FLOATING CHAT (ONLY WHEN LOGGED IN) */}
      {user && <ChatAssistButton />}

      <Footer />
    </div>
  );
}

/* ---------------- ROOT ---------------- */

function App() {
  return (
    <AuthProvider>
      <Router>
        <AppContent />
      </Router>
    </AuthProvider>
  );
}

export default App;