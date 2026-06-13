import React, { useState } from 'react';
import { User, Bell, Shield, Globe, Smartphone, Mail, Lock, Eye, EyeOff, TestTube, Info } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { testEmailConfiguration } from '../services/emailService';
import toast from 'react-hot-toast';

export default function SettingsPage() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('profile');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [emailTesting, setEmailTesting] = useState(false);

  const [profileData, setProfileData] = useState({
    displayName: user?.displayName || '',
    email: user?.email || '',
    phone: '',
    location: '',
    organization: '',
    bio: '',
  });

  const [notificationSettings, setNotificationSettings] = useState({
    emailNotifications: true,
    pushNotifications: true,
    donationAlerts: true,
    communityUpdates: false,
    weeklyDigest: true,
    marketingEmails: false,
  });

  const [privacySettings, setPrivacySettings] = useState({
    profileVisibility: 'public',
    showLocation: true,
    showDonationHistory: false,
    allowMessages: true,
    dataSharing: false,
  });

  const [securityData, setSecurityData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
    twoFactorEnabled: false,
  });

  const handleProfileUpdate = async () => {
    setLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      toast.success('Profile updated successfully!');
    } catch {
      toast.error('Failed to update profile');
    } finally {
      setLoading(false);
    }
  };

  const handleNotificationUpdate = () => {
    toast.success('Notification preferences updated!');
  };

  const handlePrivacyUpdate = () => {
    toast.success('Privacy settings updated!');
  };

  const handlePasswordChange = async () => {
    if (securityData.newPassword !== securityData.confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }
    if (securityData.newPassword.length < 6) {
      toast.error('Password must be at least 6 characters');
      return;
    }

    setLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      toast.success('Password changed successfully!');
      setSecurityData({
        ...securityData,
        currentPassword: '',
        newPassword: '',
        confirmPassword: '',
      });
    } catch {
      toast.error('Failed to change password');
    } finally {
      setLoading(false);
    }
  };

  const handleTestEmail = async () => {
    setEmailTesting(true);
    try {
      const success = await testEmailConfiguration();
      success
        ? toast.success('Email configuration test successful! 📧')
        : toast.error('Email test failed. Check console.');
    } catch (err) {
      toast.error('Email test failed.');
      console.error(err);
    } finally {
      setEmailTesting(false);
    }
  };

  const tabs = [
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'privacy', label: 'Privacy', icon: Shield },
    { id: 'security', label: 'Security', icon: Lock },
    { id: 'email', label: 'Email Settings', icon: Mail },
  ];

  return (
    <div className="min-h-screen bg-[#F4F7F5] pb-24 font-sans text-[#0D2B1B]">
      <div className="max-w-5xl mx-auto p-6 md:p-8">

        {/* HEADER SECTION */}
        <div className="bg-gradient-to-br from-[#b7f58b] via-[#9FE870] to-[#86db59] border border-[#84cf57]/40 rounded-3xl p-8 md:p-10 mb-8 shadow-[0_20px_40px_-10px_rgba(13,43,27,0.12)] relative overflow-hidden flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="relative z-10 space-y-2">
            <div className="flex items-center gap-2">
              <svg viewBox="0 0 100 100" className="h-10 w-10 fill-[#0D2B1B] flex-shrink-0">
                <path d="M20 20 L80 20 L50 50 L80 80 L20 80 L50 50 Z" />
              </svg>
              <h1 className="text-4xl md:text-5xl font-black tracking-tighter uppercase text-[#0D2B1B]">
                Settings
              </h1>
            </div>
            <p className="text-[#0D2B1B]/80 font-medium text-sm md:text-base max-w-md">
              Manage your Feedra profile, alerts, security and system configuration.
            </p>
          </div>
        </div>

        {/* MAIN SETTINGS GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* TAB NAVIGATION SIDEBAR */}
          <div className="lg:col-span-4 space-y-3">
            <div className="bg-white/95 backdrop-blur-sm rounded-3xl p-4 border border-[#0D2B1B]/10 shadow-[0_10px_25px_-5px_rgba(13,43,27,0.05)] flex flex-row lg:flex-col gap-2 overflow-x-auto lg:overflow-x-visible whitespace-nowrap">
              {tabs.map(tab => {
                const Icon = tab.icon;
                const isActive = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full flex items-center justify-start px-5 py-3.5 font-bold text-sm rounded-xl border transition-all duration-200 cursor-pointer ${
                      isActive
                        ? 'bg-gradient-to-b from-[#16462d] to-[#0D2B1B] text-[#9FE870] border-[#0A2215] shadow-sm'
                        : 'bg-transparent text-[#0D2B1B] border-transparent hover:bg-[#9FE870]/20 hover:text-[#0D2B1B]'
                    }`}
                  >
                    <Icon className={`h-5 w-5 mr-3 ${isActive ? 'text-[#9FE870]' : 'text-[#0D2B1B]'}`} />
                    {tab.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* TAB CONTENT PANEL */}
          <div className="lg:col-span-8">
            <div className="bg-white/95 backdrop-blur-sm rounded-3xl p-6 md:p-8 border border-[#0D2B1B]/10 shadow-[0_15px_35px_-5px_rgba(13,43,27,0.08),0_5px_15px_rgba(0,0,0,0.02)] min-h-[480px] transition-all duration-300">
              
              {/* PROFILE TAB */}
              {activeTab === 'profile' && (
                <div className="space-y-6">
                  <div className="border-b border-gray-100 pb-4">
                    <h3 className="text-xl font-black tracking-tight text-[#0D2B1B]">Profile Information</h3>
                    <p className="text-xs text-gray-500 mt-1">Configure your personal and organizational profile settings.</p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div className="space-y-2">
                      <label className="block text-xs font-black uppercase tracking-wider text-[#0D2B1B]">Display Name</label>
                      <input
                        type="text"
                        value={profileData.displayName}
                        onChange={e => setProfileData({ ...profileData, displayName: e.target.value })}
                        className="w-full px-5 py-3 border border-gray-200 rounded-full text-sm focus:outline-none focus:ring-4 focus:ring-[#9FE870]/30 focus:border-[#9FE870] focus:shadow-[0_0_20px_rgba(159,232,112,0.2)] transition-all font-medium"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="block text-xs font-black uppercase tracking-wider text-[#0D2B1B]">Email Address</label>
                      <input
                        type="email"
                        value={profileData.email}
                        onChange={e => setProfileData({ ...profileData, email: e.target.value })}
                        className="w-full px-5 py-3 border border-gray-200 rounded-full text-sm focus:outline-none focus:ring-4 focus:ring-[#9FE870]/30 focus:border-[#9FE870] focus:shadow-[0_0_20px_rgba(159,232,112,0.2)] transition-all font-medium"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="block text-xs font-black uppercase tracking-wider text-[#0D2B1B]">Phone Number</label>
                      <input
                        type="text"
                        value={profileData.phone}
                        onChange={e => setProfileData({ ...profileData, phone: e.target.value })}
                        className="w-full px-5 py-3 border border-gray-200 rounded-full text-sm focus:outline-none focus:ring-4 focus:ring-[#9FE870]/30 focus:border-[#9FE870] focus:shadow-[0_0_20px_rgba(159,232,112,0.2)] transition-all font-medium"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="block text-xs font-black uppercase tracking-wider text-[#0D2B1B]">Location</label>
                      <input
                        type="text"
                        value={profileData.location}
                        onChange={e => setProfileData({ ...profileData, location: e.target.value })}
                        className="w-full px-5 py-3 border border-gray-200 rounded-full text-sm focus:outline-none focus:ring-4 focus:ring-[#9FE870]/30 focus:border-[#9FE870] focus:shadow-[0_0_20px_rgba(159,232,112,0.2)] transition-all font-medium"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="block text-xs font-black uppercase tracking-wider text-[#0D2B1B]">
                      Organization (Optional)
                    </label>
                    <input
                      type="text"
                      value={profileData.organization}
                      onChange={e => setProfileData({ ...profileData, organization: e.target.value })}
                      className="w-full px-5 py-3 border border-gray-200 rounded-full text-sm focus:outline-none focus:ring-4 focus:ring-[#9FE870]/30 focus:border-[#9FE870] focus:shadow-[0_0_20px_rgba(159,232,112,0.2)] transition-all font-medium"
                      placeholder="NGO, restaurant, or company"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="block text-xs font-black uppercase tracking-wider text-[#0D2B1B]">Bio</label>
                    <textarea
                      value={profileData.bio}
                      onChange={e => setProfileData({ ...profileData, bio: e.target.value })}
                      rows="4"
                      className="w-full px-5 py-3 border border-gray-200 rounded-2xl text-sm focus:outline-none focus:ring-4 focus:ring-[#9FE870]/30 focus:border-[#9FE870] focus:shadow-[0_0_20px_rgba(159,232,112,0.2)] transition-all font-medium resize-none"
                      placeholder="Tell others about your mission to reduce food waste..."
                    />
                  </div>

                  <button
                    onClick={handleProfileUpdate}
                    className="w-full sm:w-auto px-8 py-3.5 bg-gradient-to-b from-[#16462d] to-[#0D2B1B] text-[#9FE870] hover:from-[#1d5c3b] hover:to-[#123e25] font-bold text-sm rounded-full border border-[#0A2215] transition-all duration-300 shadow-[0_4px_10px_rgba(13,43,27,0.15)] hover:shadow-[0_6px_15px_rgba(13,43,27,0.2)] hover:translate-y-[-1px] active:translate-y-[2px] cursor-pointer"
                  >
                    {loading ? 'Updating...' : 'Update Profile'}
                  </button>
                </div>
              )}

              {/* EMAIL SETTINGS TAB */}
              {activeTab === 'email' && (
                <div className="space-y-6">
                  <div className="border-b border-gray-100 pb-4">
                    <h3 className="text-xl font-black tracking-tight text-[#0D2B1B]">Email Configuration</h3>
                    <p className="text-xs text-gray-500 mt-1">Verify and test client-side email dispatch integrations.</p>
                  </div>

                  <div className="bg-[#9FE870]/5 border border-[#84cf57]/15 p-5 rounded-2xl space-y-4">
                    <p className="text-sm font-bold text-[#0D2B1B]">
                      Active EmailJS integration metrics:
                    </p>

                    <div className="space-y-2.5 text-sm font-semibold">
                      <div className="flex justify-between items-center py-1.5 border-b border-gray-100">
                        <span className="text-gray-600">Service ID</span>
                        <code className="bg-[#0D2B1B] text-[#9FE870] px-2.5 py-0.5 rounded font-mono text-xs shadow-sm">service_vohavhh</code>
                      </div>
                      <div className="flex justify-between items-center py-1.5 border-b border-gray-100">
                        <span className="text-gray-600">Template ID</span>
                        <code className="bg-[#0D2B1B] text-[#9FE870] px-2.5 py-0.5 rounded font-mono text-xs shadow-sm">template_ika8wzo</code>
                      </div>
                      <div className="flex justify-between items-center py-1.5">
                        <span className="text-gray-600">Public Key</span>
                        <code className="bg-[#0D2B1B] text-[#9FE870] px-2.5 py-0.5 rounded font-mono text-xs shadow-sm">jiM9CZ-dCLtb6rTlf</code>
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={handleTestEmail}
                    disabled={emailTesting}
                    className="w-full sm:w-auto flex items-center justify-center space-x-2 bg-gradient-to-b from-[#16462d] to-[#0D2B1B] text-[#9FE870] hover:from-[#1d5c3b] hover:to-[#123e25] px-8 py-3.5 rounded-full border border-[#0A2215] transition-all duration-300 font-bold text-sm shadow-[0_4px_10px_rgba(13,43,27,0.15)] hover:shadow-[0_6px_15px_rgba(13,43,27,0.2)] hover:translate-y-[-1px] active:translate-y-[2px] cursor-pointer disabled:opacity-50"
                  >
                    <TestTube className="h-5 w-5" />
                    <span>{emailTesting ? 'Testing...' : 'Test Email Configuration'}</span>
                  </button>

                  <div className="bg-amber-50/60 border border-amber-100 p-5 rounded-2xl text-xs space-y-2 text-amber-800">
                    <p className="font-extrabold text-amber-900 flex items-center gap-1.5">
                      <Info className="h-4.5 w-4.5 text-amber-700 flex-shrink-0" /> Troubleshooting checklist:
                    </p>
                    <ol className="list-decimal ml-4 font-semibold space-y-1">
                      <li>Confirm credentials match in the console configuration logs.</li>
                      <li>Verify Template Variables correspond to input keys.</li>
                      <li>Verify your account billing quota hasn't been exceeded.</li>
                      <li>Open Developer Tools to view response code details.</li>
                    </ol>
                  </div>
                </div>
              )}

              {/* NOTIFICATIONS TAB */}
              {activeTab === 'notifications' && (
                <div className="space-y-6">
                  <div className="border-b border-gray-100 pb-4">
                    <h3 className="text-xl font-black tracking-tight text-[#0D2B1B]">Notification Preferences</h3>
                    <p className="text-xs text-gray-500 mt-1">Decide how and when you want to receive alerts.</p>
                  </div>

                  <div className="space-y-3.5">
                    {Object.keys(notificationSettings).map(key => (
                      <div
                        key={key}
                        className="flex items-center justify-between p-4 bg-gray-50 border border-gray-200/50 rounded-2xl hover:bg-gray-100/50 transition-colors"
                      >
                        <span className="font-extrabold text-sm text-[#0D2B1B] capitalize">
                          {key.replace(/([A-Z])/g, ' $1')}
                        </span>

                        <label className="relative inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            checked={notificationSettings[key]}
                            onChange={e =>
                              setNotificationSettings({
                                ...notificationSettings,
                                [key]: e.target.checked,
                              })
                            }
                            className="sr-only peer"
                          />
                          <div className="w-11 h-6 bg-gray-200 rounded-full border border-gray-300/60 peer peer-checked:bg-[#9FE870] peer-checked:border-[#84cf57]/30
                            after:content-[''] after:absolute after:top-[4px] after:left-[4px] after:bg-white after:border-gray-200 after:border after:rounded-full after:h-4 after:w-4 after:transition-all
                            peer-checked:after:translate-x-5 peer-checked:after:bg-[#0D2B1B]" />
                        </label>
                      </div>
                    ))}
                  </div>

                  <button
                    onClick={handleNotificationUpdate}
                    className="w-full sm:w-auto px-8 py-3.5 bg-gradient-to-b from-[#16462d] to-[#0D2B1B] text-[#9FE870] hover:from-[#1d5c3b] hover:to-[#123e25] font-bold text-sm rounded-full border border-[#0A2215] transition-all duration-300 shadow-[0_4px_10px_rgba(13,43,27,0.15)] hover:shadow-[0_6px_15px_rgba(13,43,27,0.2)] hover:translate-y-[-1px] active:translate-y-[2px] cursor-pointer"
                  >
                    Save Preferences
                  </button>
                </div>
              )}

              {/* PRIVACY TAB */}
              {activeTab === 'privacy' && (
                <div className="space-y-6">
                  <div className="border-b border-gray-100 pb-4">
                    <h3 className="text-xl font-black tracking-tight text-[#0D2B1B]">Privacy Settings</h3>
                    <p className="text-xs text-gray-500 mt-1">Configure who can view your profile and donation history.</p>
                  </div>

                  <div className="space-y-2">
                    <label className="block text-xs font-black uppercase tracking-wider text-[#0D2B1B]">Profile Visibility</label>
                    <select
                      value={privacySettings.profileVisibility}
                      onChange={e =>
                        setPrivacySettings({ ...privacySettings, profileVisibility: e.target.value })
                      }
                      className="w-full px-5 py-3 border border-gray-200 rounded-full text-sm focus:outline-none focus:ring-4 focus:ring-[#9FE870]/30 focus:border-[#9FE870] focus:shadow-[0_0_20px_rgba(159,232,112,0.2)] transition-all font-semibold appearance-none bg-white"
                    >
                      <option value="public">Public</option>
                      <option value="community">Community</option>
                      <option value="private">Private</option>
                    </select>
                  </div>

                  <div className="space-y-3.5 pt-2">
                    {Object.keys(privacySettings)
                      .filter(k => k !== 'profileVisibility')
                      .map(key => (
                        <div
                          key={key}
                          className="flex items-center justify-between p-4 bg-gray-50 border border-gray-200/50 rounded-2xl hover:bg-gray-100/50 transition-colors"
                        >
                          <span className="font-extrabold text-sm text-[#0D2B1B] capitalize">
                            {key.replace(/([A-Z])/g, ' $1')}
                          </span>

                          <label className="relative inline-flex items-center cursor-pointer">
                            <input
                              type="checkbox"
                              checked={privacySettings[key]}
                              onChange={e =>
                                setPrivacySettings({
                                  ...privacySettings,
                                  [key]: e.target.checked,
                                })
                              }
                              className="sr-only peer"
                            />
                            <div className="w-11 h-6 bg-gray-200 rounded-full border border-gray-300/60 peer peer-checked:bg-[#9FE870] peer-checked:border-[#84cf57]/30
                              after:content-[''] after:absolute after:top-[4px] after:left-[4px] after:bg-white after:border-gray-200 after:border after:rounded-full after:h-4 after:w-4 after:transition-all
                              peer-checked:after:translate-x-5 peer-checked:after:bg-[#0D2B1B]" />
                          </label>
                        </div>
                      ))}
                  </div>

                  <button
                    onClick={handlePrivacyUpdate}
                    className="w-full sm:w-auto px-8 py-3.5 bg-gradient-to-b from-[#16462d] to-[#0D2B1B] text-[#9FE870] hover:from-[#1d5c3b] hover:to-[#123e25] font-bold text-sm rounded-full border border-[#0A2215] transition-all duration-300 shadow-[0_4px_10px_rgba(13,43,27,0.15)] hover:shadow-[0_6px_15px_rgba(13,43,27,0.2)] hover:translate-y-[-1px] active:translate-y-[2px] cursor-pointer"
                  >
                    Update Privacy Settings
                  </button>
                </div>
              )}

              {/* SECURITY TAB */}
              {activeTab === 'security' && (
                <div className="space-y-6">
                  <div className="border-b border-gray-100 pb-4">
                    <h3 className="text-xl font-black tracking-tight text-[#0D2B1B]">Security Settings</h3>
                    <p className="text-xs text-gray-500 mt-1">Manage passwords and two-factor authentication.</p>
                  </div>

                  <div className="bg-amber-50/60 border border-amber-100 p-5 rounded-2xl text-xs flex items-start gap-2.5 text-amber-800">
                    <Info className="h-4.5 w-4.5 text-amber-700 flex-shrink-0 mt-0.5" />
                    <p className="font-semibold leading-relaxed">
                      For maximum protection, ensure your new password contains letters, numbers, and symbols, and activate two-factor authentication.
                    </p>
                  </div>

                  <div className="space-y-5">
                    <div className="space-y-2">
                      <label className="block text-xs font-black uppercase tracking-wider text-[#0D2B1B]">Current Password</label>
                      <div className="relative">
                        <input
                          type={showPassword ? 'text' : 'password'}
                          value={securityData.currentPassword}
                          onChange={e =>
                            setSecurityData({ ...securityData, currentPassword: e.target.value })
                          }
                          className="w-full px-5 py-3 border border-gray-200 rounded-full text-sm focus:outline-none focus:ring-4 focus:ring-[#9FE870]/30 focus:border-[#9FE870] focus:shadow-[0_0_20px_rgba(159,232,112,0.2)] transition-all font-semibold pr-12"
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-4 top-3.5 text-gray-400 hover:text-[#0D2B1B] transition-colors"
                        >
                          {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                        </button>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="block text-xs font-black uppercase tracking-wider text-[#0D2B1B]">New Password</label>
                      <input
                        type="password"
                        value={securityData.newPassword}
                        onChange={e =>
                          setSecurityData({ ...securityData, newPassword: e.target.value })
                        }
                        className="w-full px-5 py-3 border border-gray-200 rounded-full text-sm focus:outline-none focus:ring-4 focus:ring-[#9FE870]/30 focus:border-[#9FE870] focus:shadow-[0_0_20px_rgba(159,232,112,0.2)] transition-all font-semibold"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="block text-xs font-black uppercase tracking-wider text-[#0D2B1B]">Confirm New Password</label>
                      <input
                        type="password"
                        value={securityData.confirmPassword}
                        onChange={e =>
                          setSecurityData({ ...securityData, confirmPassword: e.target.value })
                        }
                        className="w-full px-5 py-3 border border-gray-200 rounded-full text-sm focus:outline-none focus:ring-4 focus:ring-[#9FE870]/30 focus:border-[#9FE870] focus:shadow-[0_0_20px_rgba(159,232,112,0.2)] transition-all font-semibold"
                      />
                    </div>

                    <button
                      onClick={handlePasswordChange}
                      className="w-full sm:w-auto px-8 py-3.5 bg-gradient-to-b from-[#16462d] to-[#0D2B1B] text-[#9FE870] hover:from-[#1d5c3b] hover:to-[#123e25] font-bold text-sm rounded-full border border-[#0A2215] transition-all duration-300 shadow-[0_4px_10px_rgba(13,43,27,0.15)] hover:shadow-[0_6px_15px_rgba(13,43,27,0.2)] hover:translate-y-[-1px] active:translate-y-[2px] cursor-pointer"
                    >
                      Change Password
                    </button>
                  </div>

                  <div className="border-t border-gray-100 pt-6 mt-6">
                    <h4 className="font-black text-base text-[#0D2B1B] mb-2">Two-Factor Authentication</h4>

                    <div className="flex items-center justify-between bg-gray-50 border border-gray-200/50 p-4 rounded-2xl">
                      <div>
                        <p className="font-extrabold text-sm text-[#0D2B1B]">Enable 2FA</p>
                        <p className="text-xs text-gray-500 mt-0.5">
                          Adds an additional layer of login protection.
                        </p>
                      </div>

                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={securityData.twoFactorEnabled}
                          onChange={e =>
                            setSecurityData({
                              ...securityData,
                              twoFactorEnabled: e.target.checked,
                            })
                          }
                          className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-gray-200 rounded-full border border-gray-300/60 peer peer-checked:bg-[#9FE870] peer-checked:border-[#84cf57]/30
                          after:content-[''] after:absolute after:top-[4px] after:left-[4px] after:bg-white after:border-gray-200 after:border after:rounded-full after:h-4 after:w-4 after:transition-all
                          peer-checked:after:translate-x-5 peer-checked:after:bg-[#0D2B1B]" />
                      </label>
                    </div>
                  </div>
                </div>
              )}

            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
