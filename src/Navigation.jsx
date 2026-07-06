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

  const [isMobileProfileOpen, setIsMobileProfileOpen] = useState(false);
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

  // Mobile Bottom Bar Navigation Items (Max 5 items)
  const mobileBottomItems = [
    { path: '/dashboard', icon: Home, label: 'Home' },
    { path: '/donations', icon: Heart, label: 'Donate' },
    { path: '/hostelbite', icon: Utensils, label: 'Hostel' },
    { path: '/community', icon: Users, label: 'Social' },
    { path: '/settings', icon: Settings, label: 'Settings' },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <>
      {/* ================= DESKTOP FLOATING HEADER (MD+) ================= */}
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 120, damping: 20 }}
        className="hidden md:block fixed top-4 left-1/2 -translate-x-1/2 w-[92%] max-w-6xl z-50 rounded-full border border-white/20 dark:border-[#0D2B1B]/15 bg-white/70 dark:bg-[#0D2B1B]/80 backdrop-blur-xl shadow-[0_20px_50px_rgba(13,43,27,0.06)] px-6 py-2 transition-colors duration-300"
      >
        <div className="flex items-center justify-between h-12">
          {/* Logo */}
          <Link to="/dashboard" className="flex items-center space-x-2">
            <span className="text-xl font-black text-[#0D2B1B] dark:text-white tracking-tighter uppercase flex items-center">
              Feedra<span className="text-[#9FE870] font-black font-mono">.</span>
            </span>
          </Link>

          {/* Links */}
          <div className="flex items-center space-x-1">
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

          {/* User & Controls */}
          <div className="flex items-center space-x-3">
            <RealTimeNotifications />
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full border border-gray-200/50 dark:border-white/10 text-[#0D2B1B] dark:text-white hover:bg-gray-100 dark:hover:bg-white/10 transition-colors shadow-sm"
            >
              {theme === 'light' ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4 text-[#9FE870]" />}
            </button>

            <div className="relative flex items-center">
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

              <AnimatePresence>
                {isProfileOpen && (
                  <>
                    <div className="fixed inset-0 z-40" onClick={() => setIsProfileOpen(false)}></div>
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.95 }}
                      transition={{ duration: 0.15 }}
                      className="absolute right-0 top-full mt-3 w-48 bg-white dark:bg-[#0C2417] border border-gray-100 dark:border-white/10 rounded-2xl shadow-xl p-2 z-50 flex flex-col gap-1"
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
          </div>
        </div>
      </motion.header>

      {/* ================= MOBILE MINI TOP HEADER (MD-) ================= */}
      <div className="md:hidden fixed top-3 left-1/2 -translate-x-1/2 w-[92%] z-50 bg-white/80 dark:bg-[#0D2B1B]/85 border border-white/20 dark:border-white/10 backdrop-blur-md rounded-full shadow-md px-4 py-1.5 flex items-center justify-between transition-colors duration-300">
        <Link to="/dashboard">
          <span className="text-lg font-black text-[#0D2B1B] dark:text-white tracking-tighter uppercase">
            Feedra<span className="text-[#9FE870] font-black font-mono">.</span>
          </span>
        </Link>
        
        <div className="flex items-center space-x-2">
          <RealTimeNotifications />
          <button
            onClick={toggleTheme}
            className="p-2 rounded-full border border-gray-200/50 dark:border-white/10 text-[#0D2B1B] dark:text-white hover:bg-gray-100 dark:hover:bg-white/10 transition-colors shadow-sm"
          >
            {theme === 'light' ? <Moon className="h-3.5 w-3.5" /> : <Sun className="h-3.5 w-3.5 text-[#9FE870]" />}
          </button>

          <button
            onClick={() => setIsMobileProfileOpen(p => !p)}
            className="w-7 h-7 bg-gradient-to-tr from-[#9FE870] to-[#b7f58b] border border-[#84cf57] text-[#0D2B1B] rounded-full flex items-center justify-center font-black text-[11px] shadow-sm ml-1"
          >
            {(user?.displayName || user?.email || 'U')[0].toUpperCase()}
          </button>
        </div>
      </div>

      {/* MOBILE MINI PROFILE OVERLAY */}
      <AnimatePresence>
        {isMobileProfileOpen && (
          <>
            <div className="md:hidden fixed inset-0 z-40 bg-black/30 backdrop-blur-xs" onClick={() => setIsMobileProfileOpen(false)}></div>
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="md:hidden fixed top-16 left-1/2 -translate-x-1/2 w-[92%] bg-white dark:bg-[#0D2B1B] border border-gray-100 dark:border-white/10 rounded-2xl shadow-xl p-4 z-50 flex flex-col gap-3"
            >
              <div className="flex items-center gap-3 pb-2 border-b border-gray-100 dark:border-white/5">
                <div className="w-10 h-10 bg-gradient-to-tr from-[#9FE870] to-[#b7f58b] border border-[#84cf57] text-[#0D2B1B] rounded-full flex items-center justify-center font-black text-sm shadow-sm">
                  {(user?.displayName || user?.email || 'U')[0].toUpperCase()}
                </div>
                <div>
                  <h4 className="text-xs font-black text-[#0D2B1B] dark:text-white">
                    {user?.displayName || user?.email?.split('@')[0]}
                  </h4>
                  <p className="text-[9px] font-black text-gray-500 uppercase tracking-widest">
                    {user?.userType} profile
                  </p>
                </div>
              </div>

              {/* Admin Links */}
              {user?.userType === 'admin' && (
                <div className="flex flex-col gap-1.5">
                  <Link
                    to="/analytics"
                    onClick={() => setIsMobileProfileOpen(false)}
                    className="flex items-center space-x-2.5 px-3 py-2 text-xs font-black uppercase tracking-wider text-gray-700 dark:text-white/80 hover:bg-gray-50 dark:hover:bg-white/5 rounded-xl"
                  >
                    <BarChart3 className="h-4 w-4" />
                    <span>Analytics</span>
                  </Link>
                  <Link
                    to="/agent-dashboard"
                    onClick={() => setIsMobileProfileOpen(false)}
                    className="flex items-center space-x-2.5 px-3 py-2 text-xs font-black uppercase tracking-wider text-gray-700 dark:text-white/80 hover:bg-gray-50 dark:hover:bg-white/5 rounded-xl"
                  >
                    <Bot className="h-4 w-4" />
                    <span>AI Engine</span>
                  </Link>
                </div>
              )}

              <button
                onClick={() => {
                  setIsMobileProfileOpen(false);
                  handleLogout();
                }}
                className="flex items-center justify-center space-x-2 px-3 py-2.5 text-xs font-black uppercase tracking-wider text-red-600 bg-red-50 dark:bg-red-500/10 hover:bg-red-100 dark:hover:bg-red-500/20 rounded-xl transition-colors"
              >
                <LogOut className="h-4 w-4" />
                <span>Logout</span>
              </button>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* ================= MOBILE BOTTOM FLOATING DOCK (MD-) ================= */}
      <div className="md:hidden fixed bottom-4 left-1/2 -translate-x-1/2 w-[92%] h-14 bg-white/80 dark:bg-[#0D2B1B]/85 border border-white/20 dark:border-white/10 backdrop-blur-xl shadow-lg rounded-full flex items-center justify-around px-2 z-50 transition-colors duration-300">
        {mobileBottomItems.map(item => {
          const Icon = item.icon;
          const active = isActive(item.path);

          return (
            <Link
              key={item.path}
              to={item.path}
              className="relative flex flex-col items-center justify-center w-12 h-10 rounded-full"
            >
              {active && (
                <motion.span
                  layoutId="mobileActiveTab"
                  className="absolute inset-0 bg-gradient-to-r from-[#b7f58b] to-[#9FE870] rounded-full -z-10 shadow-[0_0_12px_rgba(159,232,112,0.4)]"
                  transition={{ type: 'spring', stiffness: 400, damping: 28 }}
                />
              )}
              
              <Icon 
                className={`h-4.5 w-4.5 stroke-[2.5] transition-colors duration-300
                  ${active ? 'text-[#0D2B1B]' : 'text-gray-500 dark:text-white/70'}`}
              />
              <span className={`text-[8px] font-black uppercase tracking-wider mt-0.5 transition-colors duration-300
                ${active ? 'text-[#0D2B1B]' : 'text-gray-400 dark:text-white/50'}`}>
                {item.label}
              </span>
            </Link>
          );
        })}
      </div>
    </>
  );
};

export default Navigation;
