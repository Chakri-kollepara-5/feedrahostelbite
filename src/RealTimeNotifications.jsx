import React, { useEffect, useState, useRef } from 'react';
import { Bell, X, Package, Users, Heart } from 'lucide-react';
import { useAuth } from './context/AuthContext';
import { collection, onSnapshot, query, orderBy, limit } from 'firebase/firestore';
import { db } from './config/firebase';
import toast from 'react-hot-toast';

const playNotificationSound = () => {
  try {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (!AudioContext) return;
    const ctx = new AudioContext();
    
    // First chime note (D5)
    const osc1 = ctx.createOscillator();
    const gain1 = ctx.createGain();
    osc1.type = 'sine';
    osc1.frequency.setValueAtTime(587.33, ctx.currentTime);
    gain1.gain.setValueAtTime(0.08, ctx.currentTime);
    gain1.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.4);
    osc1.connect(gain1);
    gain1.connect(ctx.destination);
    osc1.start();
    osc1.stop(ctx.currentTime + 0.4);

    // Second chime note (A5, slightly delayed for a premium notification chime)
    setTimeout(() => {
      const osc2 = ctx.createOscillator();
      const gain2 = ctx.createGain();
      osc2.type = 'sine';
      osc2.frequency.setValueAtTime(880, ctx.currentTime);
      gain2.gain.setValueAtTime(0.08, ctx.currentTime);
      gain2.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.6);
      osc2.connect(gain2);
      gain2.connect(ctx.destination);
      osc2.start();
      osc2.stop(ctx.currentTime + 0.6);
    }, 120);
  } catch (error) {
    console.warn("AudioContext chime error:", error);
  }
};

const RealTimeNotifications = () => {
  const { user } = useAuth();
  const [notifications, setNotifications] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);
  const prevDonationsRef = useRef({});

  // Convert Firestore Timestamp or Date safely
  const formatTime = (value) => {
    if (!value) return '';
    if (typeof value.toDate === 'function') {
      return value.toDate().toLocaleTimeString();
    }
    const d = new Date(value);
    return !isNaN(d.getTime()) ? d.toLocaleTimeString() : '';
  };

  useEffect(() => {
    if (!user) return;

    const donationsQuery = query(
      collection(db, 'donations'),
      orderBy('createdAt', 'desc'),
      limit(20)
    );

    let isInitial = true;

    const unsubscribe = onSnapshot(donationsQuery, (snapshot) => {
      const initialList = [];

      snapshot.docChanges().forEach((change) => {
        const donation = change.doc.data();
        const docId = change.doc.id;
        const prevDoc = prevDonationsRef.current[docId];

        // Store current state in ref
        prevDonationsRef.current[docId] = donation;

        if (change.type === 'added') {
          // If it's a new donation (available) from someone else
          if (donation.status === 'available' && donation.donorId !== user.uid) {
            const foodName = donation.title || donation.foodType || 'Food';
            const locationName = donation.location || 'nearby';

            const notification = {
              id: docId,
              type: 'new_donation',
              title: 'New Food Donation Available!',
              message: `${donation.quantity}kg of ${foodName} available in ${locationName}`,
              timestamp: donation.createdAt?.toDate ? donation.createdAt.toDate() : new Date(donation.createdAt),
              read: isInitial, // Automatically mark historical items as read
              data: donation
            };

            if (isInitial) {
              initialList.push(notification);
            } else {
              setNotifications((prev) => [notification, ...prev.slice(0, 9)]);
              setUnreadCount((prev) => prev + 1);
              playNotificationSound();

              toast.custom((t) => (
                <div
                  className={`${
                    t.visible ? 'animate-enter' : 'animate-leave'
                  } max-w-md w-full bg-white shadow-2xl rounded-3xl pointer-events-auto flex border border-[#0D2B1B]/15 overflow-hidden font-sans text-[#0D2B1B]`}
                  style={{
                    animation: t.visible ? 'fade-in 0.3s ease-out' : 'fade-out 0.2s ease-in'
                  }}
                >
                  <div className="flex-1 w-0 p-4">
                    <div className="flex items-start">
                      <div className="flex-shrink-0 pt-0.5">
                        <img
                          className="h-12 w-12 rounded-2xl object-cover border border-[#0D2B1B]/10"
                          src={donation.image || (donation.images && donation.images[0]) || "https://images.unsplash.com/photo-1542838132-92c53300491e?q=80&w=2574&auto=format&fit=crop"}
                          alt=""
                        />
                      </div>
                      <div className="ml-3 flex-1">
                        <div className="flex items-center gap-2">
                          <p className="text-sm font-black uppercase tracking-tight text-[#0D2B1B]">
                            New Donation!
                          </p>
                          <span className={`text-[10px] font-black uppercase px-2 py-0.5 rounded-full ${
                            donation.urgency === 'high' ? 'bg-red-50 text-red-700 border border-red-200' :
                            donation.urgency === 'medium' ? 'bg-yellow-50 text-yellow-700 border border-yellow-200' :
                            'bg-green-50 text-green-700 border border-green-200'
                          }`}>
                            {donation.urgency || 'medium'}
                          </span>
                        </div>
                        <p className="mt-1 text-sm font-bold text-[#0D2B1B]/70">
                          {donation.quantity}kg of {foodName} in {locationName}
                        </p>
                        {donation.freshnessScore && (
                          <div className="mt-2 flex items-center gap-1.5 bg-gradient-to-r from-indigo-50 to-indigo-100/50 border border-indigo-200/50 px-2 py-1 rounded-xl w-fit">
                            <span className="text-[10px] font-black text-indigo-700 uppercase tracking-wider">AI Freshness:</span>
                            <span className="text-xs font-black text-indigo-800">{donation.freshnessScore}/100</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="flex border-l border-gray-100">
                    <button
                      onClick={() => {
                        toast.dismiss(t.id);
                      }}
                      className="w-full border border-transparent rounded-none rounded-r-3xl p-4 flex items-center justify-center text-sm font-black text-green-600 hover:text-green-700 focus:outline-none"
                    >
                      Dismiss
                    </button>
                  </div>
                </div>
              ), {
                duration: 6000,
                position: 'top-right'
              });
            }
          }
        } else if (change.type === 'modified' && !isInitial) {
          // Detect status changes for donations owned by this user
          if (prevDoc && prevDoc.status !== donation.status) {
            if (donation.donorId === user.uid) {
              const foodName = donation.title || donation.foodType || 'Food';
              let titleText = '';
              let msgText = '';
              let nType = 'new_donation';

              const normStatus = (donation.status || '').toLowerCase();

              if (normStatus === 'accepted' || normStatus === 'claimed') {
                titleText = 'Donation Claimed! 🎉';
                msgText = `Your donation of ${foodName} has been claimed.`;
                nType = 'donation_claimed';
              } else if (normStatus === 'picked_up') {
                titleText = 'Food Picked Up 🚗';
                msgText = `Your donation of ${foodName} has been picked up.`;
                nType = 'donation_claimed';
              } else if (normStatus === 'delivered' || normStatus === 'completed') {
                titleText = 'Donation Delivered! ❤️';
                msgText = `Your donation of ${foodName} has been successfully delivered.`;
                nType = 'donation_completed';
              }

              if (titleText) {
                const notification = {
                  id: `${docId}-${normStatus}`,
                  type: nType,
                  title: titleText,
                  message: msgText,
                  timestamp: new Date(),
                  read: false,
                  data: donation
                };

                setNotifications((prev) => [notification, ...prev.slice(0, 9)]);
                setUnreadCount((prev) => prev + 1);
                playNotificationSound();

                toast.success(msgText, {
                  duration: 5000,
                  icon: normStatus === 'delivered' || normStatus === 'completed' ? '❤️' : '🔔'
                });
              }
            }
          }
        }
      });

      if (isInitial) {
        setNotifications(initialList.slice(0, 10));
        isInitial = false;
      }
    });

    return () => unsubscribe();
  }, [user]);

  const markAsRead = (id) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
    setUnreadCount((prev) => Math.max(prev - 1, 0));
  };

  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
    setUnreadCount(0);
  };

  const getNotificationIcon = (type) => {
    switch (type) {
      case 'new_donation':
        return <Package className="h-5 w-5 text-green-600" />;
      case 'donation_claimed':
        return <Users className="h-5 w-5 text-blue-600" />;
      case 'donation_completed':
        return <Heart className="h-5 w-5 text-purple-600" />;
      default:
        return <Bell className="h-5 w-5 text-gray-600" />;
    }
  };

  return (
    <div className="relative">
      <button
        onClick={() => setShowDropdown(!showDropdown)}
        className="relative p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
      >
        <Bell className="h-6 w-6" />
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
            {unreadCount > 9 ? '9+' : unreadCount}
          </span>
        )}
      </button>

      {showDropdown && (
        <div className="absolute right-0 mt-2 w-80 bg-white rounded-xl shadow-lg border border-gray-200 z-50">
          <div className="p-4 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold text-gray-900">Notifications</h3>

              <div className="flex items-center space-x-2">
                {unreadCount > 0 && (
                  <button
                    onClick={markAllAsRead}
                    className="text-sm text-green-600 hover:text-green-700"
                  >
                    Mark all read
                  </button>
                )}
                <button
                  onClick={() => setShowDropdown(false)}
                  className="p-1 hover:bg-gray-100 rounded"
                >
                  <X className="h-4 w-4 text-gray-500" />
                </button>
              </div>
            </div>
          </div>

          <div className="max-h-96 overflow-y-auto">
            {notifications.length === 0 ? (
              <div className="p-6 text-center text-gray-500">
                <div className="text-4xl mb-2">🔔</div>
                <p>No notifications yet</p>
                <p className="text-xs mt-1">We'll notify you about new food donations! 🍽️</p>
              </div>
            ) : (
              notifications.map((n) => (
                <div
                  key={n.id}
             className={`p-4 border-b border-gray-100 hover:bg-gray-50 cursor-default ${
  !n.read ? 'bg-green-50' : ''
}`}

                  onClick={() => markAsRead(n.id)}
                >
                  <div className="flex items-start space-x-3">
                    {getNotificationIcon(n.type)}

                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-gray-900 text-sm">{n.title}</p>
                      <p className="text-gray-600 text-sm mt-1">{n.message}</p>
                      <p className="text-gray-400 text-xs mt-2">{formatTime(n.timestamp)}</p>
                    </div>

                    {!n.read && <div className="w-2 h-2 bg-green-500 rounded-full"></div>}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default RealTimeNotifications;
