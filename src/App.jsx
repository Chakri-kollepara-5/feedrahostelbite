import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import AdminPage from "./pages/Admin.jsx";
import LandingPage from "./pages/LandingPage";




import ChatAssistButton from "./components/ChatAssistButtonwhatsapp";
import Footer from "./components/Footer";

import { AuthProvider, useAuth } from './context/AuthContext';

// Components
import Navigation from './components/Navigation';

// Pages
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ResetPasswordPage from './pages/ResetPasswordPage';
import DashboardPage from './pages/DashboardPage';
import DonationsPage from './pages/DonationsPage';
import AnalyticsPage from './pages/AnalyticsPage';
import CommunityPage from './pages/CommunityPage';
import SettingsPage from './pages/SettingsPage';
import HostelBitePage from './pages/HostelBitePage';
import PaymentsPage from './pages/PaymentsPage';



// ------------------ ROUTE GUARDS ------------------

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
      </div>
    );
  }

  return user ? children : <Navigate to="/login" />;
};

const PublicRoute = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
      </div>
    );
  }

  return user ? <Navigate to="/dashboard" /> : children;
};



// ------------------ APP CONTENT ------------------

function AppContent() {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-gray-50">

      {/* Navigation (Only when logged in) */}
      {user && <Navigation />}

      <Routes>

        <Route
  path="/"
  element={
    <PublicRoute>
      <LandingPage />
    </PublicRoute>
  }
/>

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

        {/* 404 fallback */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>

      {/* Toast */}
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 4000,
          style: {
            background: '#363636',
            color: '#fff',
          },
          success: {
            duration: 3000,
            iconTheme: { primary: '#10B981', secondary: '#fff' },
          },
          error: {
            duration: 4000,
            iconTheme: { primary: '#EF4444', secondary: '#fff' },
          },
        }}
      />

      {user && <ChatAssistButton />}

      <Footer />
    </div>
  );
}

// ------------------ ROOT APP WRAPPER ------------------

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
