import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
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
  Bot,
  Sun,
  Moon,
  ChevronDown
} from 'lucide-react';
import { useAuth } from './context/AuthContext';
import RealTimeNotifications from './RealTimeNotifications';
import toast from 'react-hot-toast';

const Navigation = () => {
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

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
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: 'spring', stiffness: 120, damping: 20 }}
      className={`fixed top-4 left-1/2 -translate-x-1/2 w-[92%] max-w-6xl z-50 border border-white/20 dark:border-[#0D2B1B]/15 bg-white/70 dark:bg-[#0D2B1B]/80 backdrop-blur-xl shadow-[0_20px_50px_rgba(13,43,27,0.06)] px-5 py-2 transition-all duration-300
        ${isMobileMenuOpen ? 'rounded-[24px]' : 'rounded-full'}`}
    >
      <div className="flex items-center justify-between h-12">

        {/* LOGO */}
        <Link to="/dashboard" className="flex items-center space-x-2">
          <span className="text-xl font-black text-[#0D2B1B] dark:text-white tracking-tighter uppercase flex items-center">
            Feedra<span className="text-[#9FE870] font-black font-mono">.</span>
          </span>
        </Link>

        {/* DESKTOP NAV LINKS */}
        <div className="hidden lg:flex items-center space-x-1">
          {navItems
            .filter(item => !item.adminOnly || user?.userType === 'admin')
            .map(item => {
              const Icon = item.icon;
              const active = isActive(item.path);
              const isHostelBite = item.label === 'HostelBite';

              return (
                <div key={item.path} className="relative group">
                  <Link
                    to={item.path}
                    className={`relative px-4 py-2 flex items-center space-x-1.5 rounded-full text-xs font-black uppercase tracking-wider transition-colors duration-200 z-10
                      ${active ? 'text-[#0D2B1B]' : 'text-[#0D2B1B] dark:text-white/80 hover:text-green-700 dark:hover:text-[#9FE870]'}`}
                  >
                    {active && (
                      <motion.span
                        layoutId="activeNavTab"
                        className="absolute inset-0 bg-gradient-to-r from-[#b7f58b] to-[#9FE870] rounded-full -z-10 shadow-[0_0_15px_rgba(159,232,112,0.4)]"
                        transition={{ type: 'spring', stiffness: 350, damping: 25 }}
                      />
                    )}
                    <Icon className="h-3.5 w-3.5 stroke-[2.5]" />
                    <span>{item.label}</span>
                  </Link>

                  {/* HOSTELBITE DROPDOWN */}
                  {isHostelBite && (
                    <div className="absolute left-0 top-full mt-2 w-48 rounded-2xl bg-white/95 dark:bg-[#0D2B1B]/95 backdrop-blur-md border border-[#0D2B1B]/10 dark:border-white/10 shadow-[0_12px_30px_rgba(13,43,27,0.08)] opacity-0 invisible translate-y-2 group-hover:opacity-100 group-hover:visible group-hover:translate-y-0 transition-all duration-300 z-50">
                      <Link to="/hostelbite" className="block px-4 py-2.5 text-xs font-bold uppercase tracking-wider text-[#0D2B1B] dark:text-white hover:bg-[#9FE870]/20 rounded-t-2xl">
                        Book Meals
                      </Link>
                      <Link to="/hostelbite#plans" className="block px-4 py-2.5 text-xs font-bold uppercase tracking-wider text-[#0D2B1B] dark:text-white hover:bg-[#9FE870]/20">
                        Meal Plans
                      </Link>
                      <Link to="/hostelbite#payments" className="block px-4 py-2.5 text-xs font-bold uppercase tracking-wider text-[#0D2B1B] dark:text-white hover:bg-[#9FE870]/20">
                        Payments
                      </Link>
                      <Link to="/hostelbite#support" className="block px-4 py-2.5 text-xs font-bold uppercase tracking-wider text-[#0D2B1B] dark:text-white hover:bg-[#9FE870]/20 rounded-b-2xl">
                        Support
                      </Link>
                    </div>
                  )}
                </div>
              );
            })}
        </div>

        {/* CONTROLS & PROFILE */}
        <div className="flex items-center space-x-3">
          
          {/* Notifications */}
          <RealTimeNotifications />

          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className="p-2 rounded-full border border-gray-200/50 dark:border-white/10 text-[#0D2B1B] dark:text-white hover:bg-gray-100 dark:hover:bg-white/10 transition-colors shadow-sm"
          >
            {theme === 'light' ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4 text-[#9FE870]" />}
          </button>

          {/* Desktop User Section */}
          <div className="hidden lg:relative lg:flex items-center">
            <button
              onClick={() => setIsProfileOpen(p => !p)}
              className="flex items-center space-x-2 border border-gray-200/50 dark:border-white/10 rounded-full p-1 pl-3 bg-white/50 dark:bg-white/5 hover:bg-gray-100/50 dark:hover:bg-white/10 transition-colors cursor-pointer"
            >
              <div className="text-right pr-1">
                <div className="text-xs font-black text-[#0D2B1B] dark:text-white leading-3">
                  {user?.displayName || user?.email?.split('@')[0]}
                </div>
                <span className="text-[8px] font-black text-[#0D2B1B]/60 dark:text-white/60 uppercase tracking-widest leading-none">
                  {user?.userType}
                </span>
              </div>
              <div className="w-8 h-8 bg-gradient-to-tr from-[#9FE870] to-[#b7f58b] border border-[#84cf57] text-[#0D2B1B] rounded-full flex items-center justify-center font-black text-xs shadow-sm">
                {(user?.displayName || user?.email || 'U')[0].toUpperCase()}
              </div>
              <ChevronDown className="h-3.5 w-3.5 text-gray-500 mr-1" />
            </button>

            {/* Profile Dropdown */}
            <AnimatePresence>
              {isProfileOpen && (
                <>
                  <div className="fixed inset-0 z-40" onClick={() => setIsProfileOpen(false)}></div>
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    transition={{ duration: 0.15 }}
                    className="absolute right-0 top-full mt-3 w-48 bg-white dark:bg-[#0D2B1B] border border-gray-100 dark:border-white/10 rounded-2xl shadow-xl p-2 z-50 flex flex-col gap-1"
                  >
                    <Link
                      to="/settings"
                      onClick={() => setIsProfileOpen(false)}
                      className="flex items-center space-x-2 px-3 py-2 text-xs font-bold uppercase tracking-wider text-gray-700 dark:text-white hover:bg-gray-50 dark:hover:bg-white/5 rounded-xl transition-colors"
                    >
                      <Settings className="h-4 w-4" />
                      <span>Settings</span>
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="flex items-center space-x-2 px-3 py-2 text-xs font-bold uppercase tracking-wider text-red-600 hover:bg-red-50 dark:hover:bg-red-500/10 rounded-xl transition-colors text-left"
                    >
                      <LogOut className="h-4 w-4" />
                      <span>Logout</span>
                    </button>
                  </motion.div>
                </>
              )}
            </AnimatePresence>
          </div>

          {/* Mobile Menu Toggler */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-2 rounded-full border border-gray-200/50 dark:border-white/10 text-[#0D2B1B] dark:text-white hover:bg-gray-100 dark:hover:bg-white/10 transition-colors shadow-sm"
          >
            {isMobileMenuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>

        </div>
      </div>

      {/* MOBILE NAV MENU DRAWER */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
            className="lg:hidden overflow-hidden border-t border-gray-100 dark:border-white/10 mt-3 pt-3 space-y-1.5"
          >
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
                      ${active
                        ? 'bg-gradient-to-r from-[#b7f58b] to-[#9FE870] text-[#0D2B1B] border-[#84cf57] shadow-md'
                        : 'text-[#0D2B1B] dark:text-white border-transparent hover:bg-gray-50 dark:hover:bg-white/5'}`}
                  >
                    <Icon className="h-4.5 w-4.5 stroke-[2.5]" />
                    <span>{item.label}</span>
                  </Link>
                );
              })}

            <div className="pt-2 border-t border-gray-100 dark:border-white/10 flex flex-col gap-2">
              <div className="flex items-center justify-between px-4 py-2 text-xs font-bold text-gray-500 uppercase">
                <span>User Account</span>
                <span className="font-black text-[#0D2B1B] dark:text-white">{user?.displayName || user?.email?.split('@')[0]}</span>
              </div>
              
              <button
                onClick={handleLogout}
                className="flex items-center space-x-3 px-4 py-3 w-full text-xs font-black uppercase tracking-wider text-red-600 bg-red-50 dark:bg-red-500/10 hover:bg-red-100 rounded-full border border-red-100 hover:border-red-200 transition-all duration-200"
              >
                <LogOut className="h-4.5 w-4.5 stroke-[2.5]" />
                <span>Logout</span>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

    </motion.header>
  );
};

export default Navigation;
