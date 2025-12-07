import React, { useState } from 'react';
import { User, Bell, Shield, Globe, Smartphone, Mail, Lock, Eye, EyeOff, TestTube } from 'lucide-react';
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
    <div className="min-h-screen bg-gray-50 pb-20">
      <div className="max-w-4xl mx-auto p-6">

        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Settings</h1>
          <p className="text-gray-600">Manage your account preferences and security</p>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100">

          <div className="flex border-b border-gray-200 overflow-x-auto">
            {tabs.map(tab => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center px-6 py-4 font-medium whitespace-nowrap transition-colors ${
                    activeTab === tab.id
                      ? 'text-green-600 border-b-2 border-green-600'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  <Icon className="h-5 w-5 mr-2" />
                  {tab.label}
                </button>
              );
            })}
          </div>

          <div className="p-6">

            {/* PROFILE TAB */}
            {activeTab === 'profile' && (
              <div className="space-y-6">
                <h3 className="text-lg font-semibold text-gray-900">Profile Information</h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  
                  <div>
                    <label className="block mb-2 text-sm font-medium">Display Name</label>
                    <input
                      type="text"
                      value={profileData.displayName}
                      onChange={e => setProfileData({ ...profileData, displayName: e.target.value })}
                      className="w-full px-3 py-2 border rounded-lg"
                    />
                  </div>

                  <div>
                    <label className="block mb-2 text-sm font-medium">Email</label>
                    <input
                      type="email"
                      value={profileData.email}
                      onChange={e => setProfileData({ ...profileData, email: e.target.value })}
                      className="w-full px-3 py-2 border rounded-lg"
                    />
                  </div>

                  <div>
                    <label className="block mb-2 text-sm font-medium">Phone</label>
                    <input
                      type="tel"
                      value={profileData.phone}
                      onChange={e => setProfileData({ ...profileData, phone: e.target.value })}
                      className="w-full px-3 py-2 border rounded-lg"
                      placeholder="(555) 123-4567"
                    />
                  </div>

                  <div>
                    <label className="block mb-2 text-sm font-medium">Location</label>
                    <input
                      type="text"
                      value={profileData.location}
                      onChange={e => setProfileData({ ...profileData, location: e.target.value })}
                      className="w-full px-3 py-2 border rounded-lg"
                      placeholder="City, State"
                    />
                  </div>
                </div>

                <div>
                  <label className="block mb-2 text-sm font-medium">
                    Organization (Optional)
                  </label>
                  <input
                    type="text"
                    value={profileData.organization}
                    onChange={e => setProfileData({ ...profileData, organization: e.target.value })}
                    className="w-full px-3 py-2 border rounded-lg"
                    placeholder="NGO, restaurant, or company"
                  />
                </div>

                <div>
                  <label className="block mb-2 text-sm font-medium">Bio</label>
                  <textarea
                    value={profileData.bio}
                    onChange={e => setProfileData({ ...profileData, bio: e.target.value })}
                    rows="4"
                    className="w-full px-3 py-2 border rounded-lg resize-none"
                    placeholder="Tell others about your mission to reduce food waste..."
                  />
                </div>

                <button
                  onClick={handleProfileUpdate}
                  className="bg-green-600 text-white px-6 py-3 rounded-lg"
                >
                  {loading ? 'Updating...' : 'Update Profile'}
                </button>
              </div>
            )}

            {/* EMAIL SETTINGS TAB */}
            {activeTab === 'email' && (
              <div className="space-y-6">

                <h3 className="text-lg font-semibold">Email Configuration</h3>

                <div className="bg-blue-50 border p-4 rounded-lg">
                  <p className="text-blue-800 text-sm mb-2">
                    Your app uses EmailJS. Test configuration below:
                  </p>

                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>Service ID:</span>
                      <code className="bg-blue-100 px-2">service_vohavhh</code>
                    </div>
                    <div className="flex justify-between">
                      <span>Template ID:</span>
                      <code className="bg-blue-100 px-2">template_ika8wzo</code>
                    </div>
                    <div className="flex justify-between">
                      <span>Public Key:</span>
                      <code className="bg-blue-100 px-2">jiM9CZ-dCLtb6rTlf</code>
                    </div>
                  </div>
                </div>

                <button
                  onClick={handleTestEmail}
                  disabled={emailTesting}
                  className="flex items-center space-x-2 bg-blue-600 text-white px-6 py-3 rounded-lg"
                >
                  <TestTube className="h-5 w-5" />
                  <span>{emailTesting ? 'Testing...' : 'Test Email Configuration'}</span>
                </button>

                <div className="bg-yellow-50 border p-4 rounded-lg text-sm">
                  <p className="font-medium text-yellow-900 mb-1">Troubleshooting:</p>
                  <ol className="list-decimal ml-4 text-yellow-800 space-y-1">
                    <li>Check EmailJS dashboard</li>
                    <li>Verify template</li>
                    <li>Check quota</li>
                    <li>Check console for errors</li>
                  </ol>
                </div>
              </div>
            )}

            {/* NOTIFICATIONS TAB */}
            {activeTab === 'notifications' && (
              <div className="space-y-6">
                <h3 className="text-lg font-semibold">Notification Preferences</h3>

                <div className="space-y-4">
                  {Object.keys(notificationSettings).map(key => (
                    <div
                      key={key}
                      className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
                    >
                      <div>
                        <h4 className="font-medium">{key.replace(/([A-Z])/g, ' $1')}</h4>
                      </div>

                      <label className="relative inline-flex items-center cursor-default">
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
                        <div className="w-11 h-6 bg-gray-200 rounded-full peer-checked:bg-green-600
                          after:absolute after:h-5 after:w-5 after:bg-white after:rounded-full after:left-1 after:top-1
                          after:transition-all peer-checked:after:translate-x-5" />
                      </label>
                    </div>
                  ))}
                </div>

                <button
                  onClick={handleNotificationUpdate}
                  className="bg-green-600 text-white px-6 py-3 rounded-lg"
                >
                  Save Preferences
                </button>
              </div>
            )}

            {/* PRIVACY TAB */}
            {activeTab === 'privacy' && (
              <div className="space-y-6">
                <h3 className="text-lg font-semibold">Privacy Settings</h3>

                <div>
                  <label className="block mb-2">Profile Visibility</label>
                  <select
                    value={privacySettings.profileVisibility}
                    onChange={e =>
                      setPrivacySettings({ ...privacySettings, profileVisibility: e.target.value })
                    }
                    className="w-full px-3 py-2 border rounded-lg"
                  >
                    <option value="public">Public</option>
                    <option value="community">Community</option>
                    <option value="private">Private</option>
                  </select>
                </div>

                {Object.keys(privacySettings)
                  .filter(k => k !== 'profileVisibility')
                  .map(key => (
                    <div
                      key={key}
                      className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
                    >
                      <span>{key.replace(/([A-Z])/g, ' $1')}</span>

                      <label className="relative inline-flex items-center cursor-default">
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
                        <div className="w-11 h-6 bg-gray-200 rounded-full peer-checked:bg-green-600
                          after:absolute after:h-5 after:w-5 after:bg-white after:rounded-full after:left-1 after:top-1
                          after:transition-all peer-checked:after:translate-x-5" />
                      </label>
                    </div>
                  ))}

                <button
                  onClick={handlePrivacyUpdate}
                  className="bg-green-600 text-white px-6 py-3 rounded-lg"
                >
                  Update Privacy Settings
                </button>
              </div>
            )}

            {/* SECURITY TAB */}
            {activeTab === 'security' && (
              <div className="space-y-6">
                <h3 className="text-lg font-semibold">Security Settings</h3>

                <div className="bg-yellow-50 border p-4 rounded-lg">
                  <p className="text-sm text-yellow-800">
                    Use a strong password & enable 2FA for more security.
                  </p>
                </div>

                <div className="space-y-4">
                  
                  <div>
                    <label className="block mb-2">Current Password</label>
                    <div className="relative">
                      <input
                        type={showPassword ? 'text' : 'password'}
                        value={securityData.currentPassword}
                        onChange={e =>
                          setSecurityData({ ...securityData, currentPassword: e.target.value })
                        }
                        className="w-full px-3 py-2 border rounded-lg pr-10"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-2 text-gray-400"
                      >
                        {showPassword ? <EyeOff /> : <Eye />}
                      </button>
                    </div>
                  </div>

                  <div>
                    <label className="block mb-2">New Password</label>
                    <input
                      type="password"
                      value={securityData.newPassword}
                      onChange={e =>
                        setSecurityData({ ...securityData, newPassword: e.target.value })
                      }
                      className="w-full px-3 py-2 border rounded-lg"
                    />
                  </div>

                  <div>
                    <label className="block mb-2">Confirm New Password</label>
                    <input
                      type="password"
                      value={securityData.confirmPassword}
                      onChange={e =>
                        setSecurityData({ ...securityData, confirmPassword: e.target.value })
                      }
                      className="w-full px-3 py-2 border rounded-lg"
                    />
                  </div>

                  <button
                    onClick={handlePasswordChange}
                    className="bg-green-600 text-white px-6 py-3 rounded-lg"
                  >
                    Change Password
                  </button>
                </div>

                <div className="border-t pt-6">
                  <h4 className="font-medium mb-3">Two-Factor Authentication</h4>

                  <div className="flex items-center justify-between bg-gray-50 p-4 rounded-lg">
                    <div>
                      <p className="font-medium">Enable 2FA</p>
                      <p className="text-sm text-gray-600">
                        Add extra security to your account.
                      </p>
                    </div>

                    <label className="relative inline-flex items-center cursor-default">
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
                      <div className="w-11 h-6 bg-gray-200 rounded-full peer-checked:bg-green-600
                        after:absolute after:h-5 after:w-5 after:bg-white after:rounded-full after:left-1 after:top-1
                        after:transition-all peer-checked:after:translate-x-5" />
                    </label>
                  </div>
                </div>

              </div>
            )}

          </div>
        </div>
      </div>
    </div>
  );
}
