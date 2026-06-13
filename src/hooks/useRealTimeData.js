import { useState, useEffect, useRef } from 'react';
import { getDonations, getUserDonations } from '../services/donationService';
import { db } from '../config/firebase';
import { collection, onSnapshot, query, orderBy } from 'firebase/firestore';

// ─── Donations Hook ──────────────────────────────────────────────────────────
export const useRealTimeDonations = (filters = {}) => {
  const [donations, setDonations]   = useState([]);
  const [loading, setLoading]       = useState(true);
  const [error, setError]           = useState(null);
  const unsubscribeRef              = useRef(null);
  const intervalRef                 = useRef(null);

  useEffect(() => {
    let isMounted = true;

    // REST Polling fallback logic
    const fetchDonationsFallback = async () => {
      try {
        const data = filters.userId
          ? await getUserDonations(filters.userId)
          : await getDonations(filters);

        if (isMounted) {
          setDonations(data);
          setLoading(false);
          setError(null);
        }
      } catch (err) {
        if (isMounted) {
          setError('Failed to load donations');
          setLoading(false);
        }
      }
    };

    const runPollingFallback = () => {
      fetchDonationsFallback();
      if (intervalRef.current) clearInterval(intervalRef.current);
      if (!globalThis.__isOfflineMode) {
        intervalRef.current = setInterval(() => {
          if (globalThis.__isOfflineMode) {
            clearInterval(intervalRef.current);
            return;
          }
          fetchDonationsFallback();
        }, 10000);
      }
    };

    // Attempt Firestore onSnapshot first
    if (!globalThis.__isOfflineMode && db) {
      try {
        const donationsRef = collection(db, 'donations');
        // Simple order by createdAt desc - requires no composite indexes
        const q = query(donationsRef, orderBy('createdAt', 'desc'));

        unsubscribeRef.current = onSnapshot(q, (snapshot) => {
          if (!isMounted) return;

          const list = snapshot.docs.map(doc => {
            const data = doc.data();
            return {
              id: doc.id,
              _id: doc.id,
              ...data,
              createdAt: data.createdAt?.toDate ? data.createdAt.toDate() : new Date(data.createdAt || Date.now()),
              expiryDate: data.expiryDate?.toDate ? data.expiryDate.toDate() : new Date(data.expiryDate || data.expiryTime || Date.now()),
              foodType: data.title || data.foodType || 'Food Donation',
              image: data.image || (data.images && data.images[0]) || 'https://images.unsplash.com/photo-1542838132-92c53300491e?q=80&w=2574&auto=format&fit=crop'
            };
          });

          // In-memory filtering
          let filtered = list;
          if (filters.status) {
            const targetStatus = filters.status.toLowerCase();
            filtered = filtered.filter(d => {
              const curStatus = (d.status || '').toLowerCase();
              return curStatus === targetStatus || (targetStatus === 'available' && curStatus === 'posted');
            });
          }
          if (filters.userId) {
            filtered = filtered.filter(d => d.donorId === filters.userId);
          }

          setDonations(filtered);
          setLoading(false);
          setError(null);
        }, (err) => {
          console.warn("Firestore subscription failed, falling back to REST API polling:", err.message);
          if (isMounted) runPollingFallback();
        });

      } catch (err) {
        console.warn("Firestore initialization error, falling back to REST API polling:", err.message);
        runPollingFallback();
      }
    } else {
      // Offline fallback
      runPollingFallback();
    }

    return () => {
      isMounted = false;
      if (unsubscribeRef.current) {
        unsubscribeRef.current();
        unsubscribeRef.current = null;
      }
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [filters.status, filters.userId]);

  return { donations, loading, error };
};

// ─── Stats Hook ──────────────────────────────────────────────────────────────
// Fallback values shown when backend is offline (match user's original dashboard)
const OFFLINE_STATS = {
  totalDonations: 15,
  totalFoodSaved: 78,
  activeDonors:   6,
  mealsProvided:  240,
  co2Saved:       180,
};

export const useRealTimeStats = () => {
  const [stats, setStats]     = useState(OFFLINE_STATS);
  const [loading, setLoading] = useState(true);
  const intervalRef           = useRef(null);

  useEffect(() => {
    let isMounted   = true;
    let wentOffline = false;

    const fetchStats = async () => {
      // If already offline, don't keep hammering — use fallback silently
      if (globalThis.__isOfflineMode) {
        if (isMounted && loading) {
          setStats(OFFLINE_STATS);
          setLoading(false);
        }
        return;
      }

      try {
        const { default: API } = await import('../services/api');
        const { data }         = await API.get('/stats/impact');

        if (isMounted) {
          wentOffline = false;
          setStats({
            totalDonations: data.totalDonations || 0,
            totalFoodSaved: data.totalFoodSaved || 0,
            activeDonors:   data.activeDonors   || 0,
            mealsProvided:  data.mealsProvided  || 0,
            co2Saved:       data.co2Saved       || 0,
          });
          setLoading(false);
        }
      } catch (error) {
        // Network / offline — use fallback once and stop polling
        const isOffline = !error.response ||
          error.code === 'ERR_NETWORK'    ||
          error.message?.includes('Network Error') ||
          error.__silent;

        if (isOffline && isMounted) {
          if (!wentOffline) {
            wentOffline = true;
            setStats(OFFLINE_STATS);
            setLoading(false);
          }
          // Stop the polling interval — no point retrying while offline
          if (intervalRef.current) {
            clearInterval(intervalRef.current);
            intervalRef.current = null;
          }
          return;
        }

        if (isMounted) setLoading(false);
      }
    };

    fetchStats();

    // Only poll while online
    if (!globalThis.__isOfflineMode) {
      intervalRef.current = setInterval(fetchStats, 15000);
    }

    return () => {
      isMounted = false;
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  return { stats, loading };
};
