import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
  Home,
  Heart,
  BarChart3,
  Users,
  Settings,
  LogOut,
  Menu,
  X,
  Utensils,
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import RealTimeNotifications from './RealTimeNotifications';
import toast from 'react-hot-toast';

const Navigation = () => {
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleLogout = async () => {
    try {
      await logout();
      toast.success('Logged out successfully');
      navigate('/login');
    } catch {
      toast.error('Failed to logout');
    }
  };

  const navItems = [
    { path: '/dashboard', icon: Home, label: 'Dashboard' },
    { path: '/donations', icon: Heart, label: 'Donations' },
    { path: '/hostelbite', icon: Utensils, label: 'HostelBite' },
    { path: '/analytics', icon: BarChart3, label: 'Analytics', adminOnly: true },
    { path: '/community', icon: Users, label: 'Community' },
    { path: '/settings', icon: Settings, label: 'Settings' },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <>
      {/* ================= DESKTOP NAV ================= */}
      <nav className="hidden md:flex bg-white/95 backdrop-blur-sm shadow-sm border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 w-full">
          <div className="flex items-center justify-between h-16">

            {/* Logo */}
            <Link to="/dashboard" className="flex items-center space-x-3">
              <div className="bg-gradient-to-r from-green-500 to-emerald-600 p-2 rounded-xl shadow-lg">
                <span className="text-2xl">🍃</span>
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                Feedra 🌱
              </span>
            </Link>

            {/* NAV LINKS */}
            <div className="flex items-center space-x-2">
              {navItems
                .filter(item => !item.adminOnly || user?.userType === 'admin')
                .map(item => {
                  const Icon = item.icon;
                  const isHostelBite = item.label === 'HostelBite';

                  return (
                    <div key={item.path} className="relative group">
                      <Link
                        to={item.path}
                        className={`flex items-center space-x-2 px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200
                          ${
                            isActive(item.path)
                              ? 'bg-gradient-to-r from-green-500 to-emerald-600 text-white shadow-lg'
                              : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                          }`}
                      >
                        <Icon className="h-4 w-4" />
                        <span>{item.label}</span>
                      </Link>

                      {/* DROPDOWN — ONLY HOSTELBITE */}
                      {isHostelBite && (
                        <div
                          className="
                            absolute left-0 top-full mt-2 w-48
                            rounded-xl bg-white border shadow-xl
                            opacity-0 invisible translate-y-2
                            group-hover:opacity-100 group-hover:visible group-hover:translate-y-0
                            transition-all duration-300 z-50
                          "
                        >
                          <Link to="/hostelbite" className="block px-4 py-2 text-sm hover:bg-gray-100 rounded-t-xl">
                            🍽️ Book Meals
                          </Link>
                          <Link to="/hostelbite#plans" className="block px-4 py-2 text-sm hover:bg-gray-100">
                            📦 Meal Plans
                          </Link>
                          <Link to="/hostelbite#payments" className="block px-4 py-2 text-sm hover:bg-gray-100">
                            💳 Payments
                          </Link>
                          <Link to="/hostelbite#support" className="block px-4 py-2 text-sm hover:bg-gray-100 rounded-b-xl">
                            🆘 Support
                          </Link>
                        </div>
                      )}
                    </div>
                  );
                })}
            </div>

            {/* USER SECTION */}
            <div className="flex items-center space-x-4">
              <RealTimeNotifications />

              <div className="flex items-center space-x-3">
                <div className="text-right">
                  <div className="text-sm font-medium text-gray-900">
                    {user?.displayName || user?.email?.split('@')[0]}
                  </div>
                  <div className="text-xs text-gray-500 capitalize">
                    {user?.userType}
                  </div>
                </div>

                <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full flex items-center justify-center text-white font-semibold">
                  {(user?.displayName || user?.email || 'U')[0].toUpperCase()}
                </div>

                <button
                  onClick={handleLogout}
                  className="flex items-center space-x-1 px-3 py-2 text-sm text-gray-600 hover:bg-gray-100 rounded-lg"
                >
                  <LogOut className="h-4 w-4" />
                  <span>Logout</span>
                </button>
              </div>
            </div>

          </div>
        </div>
      </nav>

      {/* ================= MOBILE NAV ================= */}
      <nav className="md:hidden bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
        <div className="px-4">
          <div className="flex items-center justify-between h-16">
            <Link to="/dashboard" className="flex items-center space-x-2">
              <div className="bg-gradient-to-r from-green-500 to-emerald-600 p-2 rounded-lg">
                🍃
              </div>
              <span className="text-lg font-bold text-green-600">Feedra</span>
            </Link>

            <div className="flex items-center space-x-2">
              <RealTimeNotifications />
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="p-2 rounded-lg hover:bg-gray-100"
              >
                {isMobileMenuOpen ? <X /> : <Menu />}
              </button>
            </div>
          </div>

          {isMobileMenuOpen && (
            <div className="pt-4 pb-4 space-y-2 border-t">
              {navItems
                .filter(item => !item.adminOnly || user?.userType === 'admin')
                .map(item => {
                  const Icon = item.icon;
                  return (
                    <Link
                      key={item.path}
                      to={item.path}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className={`flex items-center space-x-3 px-3 py-3 rounded-lg
                        ${
                          isActive(item.path)
                            ? 'bg-green-500 text-white'
                            : 'text-gray-600 hover:bg-gray-100'
                        }`}
                    >
                      <Icon className="h-5 w-5" />
                      <span>{item.label}</span>
                    </Link>
                  );
                })}

              <button
                onClick={handleLogout}
                className="flex items-center space-x-3 px-3 py-3 w-full text-gray-600 hover:bg-gray-100 rounded-lg"
              >
                <LogOut className="h-5 w-5" />
                <span>Logout</span>
              </button>
            </div>
          )}
        </div>
      </nav>
    </>
  );
};

export default Navigation;
