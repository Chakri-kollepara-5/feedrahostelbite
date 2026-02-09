import { useState, useEffect } from 'react';
import {
  collection,
  onSnapshot,
  query,
  orderBy,
  where,
  limit
} from 'firebase/firestore';
import { db } from '../config/firebase';

// 🔥 Safe timestamp → JS Date
const safeDate = (value) => {
  if (!value) return new Date();
  if (typeof value.toDate === "function") return value.toDate();
  const d = new Date(value);
  return isNaN(d.getTime()) ? new Date() : d;
};

export const useRealTimeDonations = (filters = {}) => {
  const [donations, setDonations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let unsubscribe = null;

    const setupListener = () => {
      try {
        let q = query(collection(db, "donations"));

        const constraints = [];

        if (filters.status && filters.status !== "all") {
          constraints.push(where("status", "==", filters.status));
        }

        if (filters.userId) {
          constraints.push(where("donorId", "==", filters.userId));
        }

        constraints.push(orderBy("createdAt", "desc"));

        if (filters.limit) {
          constraints.push(limit(filters.limit));
        }

        if (constraints.length > 0) {
          q = query(collection(db, "donations"), ...constraints);
        }

        unsubscribe = onSnapshot(
          q,
          (snapshot) => {
            const data = snapshot.docs.map((docItem) => {
              const d = docItem.data();
              return {
                id: docItem.id,
                ...d,
                createdAt: safeDate(d.createdAt),
                expiryDate: safeDate(d.expiryDate),
                claimedAt: d.claimedAt ? safeDate(d.claimedAt) : null,
                completedAt: d.completedAt ? safeDate(d.completedAt) : null,
              };
            });

            setDonations(data);
            setLoading(false);
            setError(null);
          },
          (err) => {
            console.error("Realtime listener error:", err);

            if (err.code === "failed-precondition") {
              setError("Database index required. Refresh after a moment.");
            } else if (err.code === "permission-denied") {
              setError("Permission denied. Check Firebase rules.");
            } else {
              setError("Failed to load donations");
            }

            setLoading(false);
          }
        );
      } catch (err) {
        console.error("Setup error:", err);
        setError("Failed to setup real-time updates");
        setLoading(false);
      }
    };

    setupListener();

    return () => {
      if (unsubscribe) unsubscribe();
    };
  }, [filters.status, filters.userId, filters.limit]);

  return { donations, loading, error };
};

// ------------------------------------------------------------
// 🎯 Real-time Stats Listener (Also Converted to JS)
// ------------------------------------------------------------
export const useRealTimeStats = () => {
  const [stats, setStats] = useState({
    totalDonations: 0,
    totalFoodSaved: 0,
    activeDonors: 0,
    co2Saved: 0,
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const q = query(collection(db, "donations"), orderBy("createdAt", "desc"));

    const unsub = onSnapshot(
      q,
      (snapshot) => {
        const data = snapshot.docs.map((d) => d.data());
        const foodSaved = data.reduce((sum, d) => sum + (d.quantity || 0), 0);
        const donors = new Set(data.map((d) => d.donorId)).size;

        setStats({
          totalDonations: data.length,
          totalFoodSaved: Math.round(foodSaved),
          activeDonors: donors,
          co2Saved: Math.round(foodSaved * 2.3),
        });

        setLoading(false);
      },
      (err) => {
        console.error("Stats error:", err);
        setLoading(false);
      }
    );

    return () => unsub();
  }, []);

  return { stats, loading };
};
