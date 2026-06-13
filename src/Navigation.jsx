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
  Bot
} from 'lucide-react';
import { useAuth } from './context/AuthContext';
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
    { path: '/agent-dashboard', icon: Bot, label: 'AI Engine', adminOnly: true },
    { path: '/settings', icon: Settings, label: 'Settings' },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <>
      {/* ================= DESKTOP NAV ================= */}
      <nav className="hidden md:flex bg-white/75 backdrop-blur-xl border-b border-[#0D2B1B]/5 sticky top-0 z-50 py-1.5 shadow-[0_4px_30px_rgba(13,43,27,0.03)]">
        <div className="max-w-6xl mx-auto px-6 w-full">
          <div className="flex items-center justify-between h-16">

            {/* Logo */}
            <Link to="/dashboard" className="flex items-center space-x-2">
              <span className="text-2xl font-black text-[#0D2B1B] tracking-tighter uppercase flex items-center">
                Feedra<span className="text-[#9FE870] font-black font-mono">.</span>
              </span>
            </Link>

            {/* NAV LINKS */}
            <div className="flex items-center space-x-1">
              {navItems
                .filter(item => !item.adminOnly || user?.userType === 'admin')
                .map(item => {
                  const Icon = item.icon;
                  const isHostelBite = item.label === 'HostelBite';
                  const active = isActive(item.path);

                  return (
                    <div key={item.path} className="relative group">
                      <Link
                        to={item.path}
                        className={`flex items-center space-x-1.5 px-4 py-2 rounded-full text-xs font-black uppercase tracking-wider transition-all duration-200 border
                          ${
                            active
                              ? 'bg-gradient-to-b from-[#b7f58b] to-[#9FE870] text-[#0D2B1B] border-[#84cf57] shadow-[0_3px_10px_rgba(159,232,112,0.35)]'
                              : 'text-[#0D2B1B] border-transparent hover:bg-[#9FE870]/20 hover:border-[#9FE870]/40'
                          }`}
                      >
                        <Icon className="h-3.5 w-3.5 stroke-[2.5]" />
                        <span>{item.label}</span>
                      </Link>

                      {/* DROPDOWN — ONLY HOSTELBITE */}
                      {isHostelBite && (
                        <div
                          className="
                            absolute left-0 top-full mt-2 w-48
                            rounded-2xl bg-white/95 backdrop-blur-md border border-[#0D2B1B]/10 shadow-[0_12px_30px_rgba(13,43,27,0.08)]
                            opacity-0 invisible translate-y-2
                            group-hover:opacity-100 group-hover:visible group-hover:translate-y-0
                            transition-all duration-300 z-50
                          "
                        >
                          <Link to="/hostelbite" className="block px-4 py-2.5 text-xs font-bold uppercase tracking-wider text-[#0D2B1B] hover:bg-[#9FE870]/20 rounded-t-2xl">
                            Book Meals
                          </Link>
                          <Link to="/hostelbite#plans" className="block px-4 py-2.5 text-xs font-bold uppercase tracking-wider text-[#0D2B1B] hover:bg-[#9FE870]/20">
                            Meal Plans
                          </Link>
                          <Link to="/hostelbite#payments" className="block px-4 py-2.5 text-xs font-bold uppercase tracking-wider text-[#0D2B1B] hover:bg-[#9FE870]/20">
                            Payments
                          </Link>
                          <Link to="/hostelbite#support" className="block px-4 py-2.5 text-xs font-bold uppercase tracking-wider text-[#0D2B1B] hover:bg-[#9FE870]/20 rounded-b-2xl">
                            Support
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
                  <div className="text-sm font-black text-[#0D2B1B]">
                    {user?.displayName || user?.email?.split('@')[0]}
                  </div>
                  <div className="text-[10px] font-bold text-[#0D2B1B]/75 uppercase tracking-wider">
                    {user?.userType}
                  </div>
                </div>

                <div className="w-10 h-10 bg-gradient-to-tr from-[#9FE870] to-[#b7f58b] border border-[#84cf57] text-[#0D2B1B] rounded-full flex items-center justify-center font-black shadow-[0_3px_10px_rgba(159,232,112,0.3)]">
                  {(user?.displayName || user?.email || 'U')[0].toUpperCase()}
                </div>

                <button
                  onClick={handleLogout}
                  className="flex items-center space-x-1.5 px-4 py-2 text-xs font-black uppercase tracking-wider text-[#0D2B1B] bg-red-50 hover:bg-red-100 border border-red-200/50 hover:border-red-300 rounded-full transition-all duration-200 shadow-sm"
                >
                  <LogOut className="h-3.5 w-3.5 stroke-[2.5]" />
                  <span>Logout</span>
                </button>
              </div>
            </div>

          </div>
        </div>
      </nav>

      {/* ================= MOBILE NAV ================= */}
      <nav className="md:hidden bg-white/75 backdrop-blur-xl border-b border-[#0D2B1B]/5 sticky top-0 z-50 shadow-[0_4px_30px_rgba(13,43,27,0.03)]">
        <div className="px-4">
          <div className="flex items-center justify-between h-16">
            <Link to="/dashboard" className="flex items-center space-x-2">
              <span className="text-xl font-black text-[#0D2B1B] tracking-tighter uppercase">
                Feedra<span className="text-[#9FE870] font-black font-mono">.</span>
              </span>
            </Link>

            <div className="flex items-center space-x-2">
              <RealTimeNotifications />
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="p-2 rounded-full border border-transparent hover:bg-[#9FE870]/20 text-[#0D2B1B]"
              >
                {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>

          {isMobileMenuOpen && (
            <div className="pt-2 pb-4 space-y-2 border-t border-[#0D2B1B]/5">
              {navItems
                .filter(item => !item.adminOnly || user?.userType === 'admin')
                .map(item => {
                  const Icon = item.icon;
                  const active = isActive(item.path);
                  return (
                    <Link
                      key={item.path}
                      to={item.path}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className={`flex items-center space-x-3 px-4 py-3 rounded-full text-xs font-black uppercase tracking-wider border transition-all duration-200
                        ${
                          active
                            ? 'bg-gradient-to-r from-[#b7f58b] to-[#9FE870] text-[#0D2B1B] border-[#84cf57] shadow-[0_2px_8px_rgba(159,232,112,0.25)]'
                            : 'text-[#0D2B1B] border-transparent hover:bg-[#9FE870]/10 hover:border-[#9FE870]/20'
                        }`}
                    >
                      <Icon className="h-5 w-5 stroke-[2.5]" />
                      <span>{item.label}</span>
                    </Link>
                  );
                })}

              <button
                onClick={handleLogout}
                className="flex items-center space-x-3 px-4 py-3 w-full text-xs font-black uppercase tracking-wider text-red-600 bg-red-50 hover:bg-red-100 rounded-full border border-red-100 hover:border-red-200 transition-all duration-200"
              >
                <LogOut className="h-5 w-5 stroke-[2.5]" />
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
