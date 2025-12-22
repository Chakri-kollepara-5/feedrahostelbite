import { useState, useEffect } from "react";
import {
  collection,
  onSnapshot,
  query,
  orderBy,
  where,
  limit
} from "firebase/firestore";
import { db } from "../config/firebase";

/**
 * 🔐 Safely convert Firestore Timestamp / string / number → JS Date
 */
const safeDate = (value) => {
  if (!value) return null;
  if (typeof value.toDate === "function") return value.toDate();
  const d = new Date(value);
  return isNaN(d.getTime()) ? null : d;
};

/**
 * =====================================================
 * 🔥 REAL-TIME DONATIONS HOOK (FIXED)
 * =====================================================
 */
export const useRealTimeDonations = (filters = {}) => {
  const [donations, setDonations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let unsubscribe = null;

    try {
      const constraints = [];

      // ✅ Status filter
      if (filters.status && filters.status !== "all") {
        constraints.push(where("status", "==", filters.status));
      }

      // ✅ User-specific donations
      if (filters.userId) {
        constraints.push(where("donorId", "==", filters.userId));
      }

      /**
       * 🔥 CRITICAL FIX
       * Firestore returns EMPTY results if ANY document
       * is missing the orderBy field.
       */
      constraints.push(where("createdAt", "!=", null));
      constraints.push(orderBy("createdAt", "desc"));

      // ✅ Limit
      if (filters.limit) {
        constraints.push(limit(filters.limit));
      }

      const q = query(collection(db, "donations"), ...constraints);

      unsubscribe = onSnapshot(
        q,
        (snapshot) => {
          const data = snapshot.docs.map((doc) => {
            const d = doc.data();

            return {
              id: doc.id,
              ...d,
              createdAt: safeDate(d.createdAt),
              expiryDate: safeDate(d.expiryDate),
              claimedAt: safeDate(d.claimedAt),
              completedAt: safeDate(d.completedAt),
            };
          });

          setDonations(data);
          setLoading(false);
          setError(null);
        },
        (err) => {
          console.error("🔥 Firestore listener error:", err);

          if (err.code === "permission-denied") {
            setError("Permission denied. Check Firestore rules.");
          } else if (err.code === "failed-precondition") {
            setError("Firestore index required. Create index and reload.");
          } else {
            setError("Failed to load live donations.");
          }

          setLoading(false);
        }
      );
    } catch (err) {
      console.error("🔥 Hook setup failed:", err);
      setError("Failed to initialize real-time listener");
      setLoading(false);
    }

    return () => {
      if (unsubscribe) unsubscribe();
    };
  }, [filters.status, filters.userId, filters.limit]);

  return { donations, loading, error };
};

/**
 * =====================================================
 * 📊 REAL-TIME STATS HOOK (ALSO FIXED)
 * =====================================================
 */
export const useRealTimeStats = () => {
  const [stats, setStats] = useState({
    totalDonations: 0,
    totalFoodSaved: 0,
    activeDonors: 0,
    co2Saved: 0,
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const q = query(
      collection(db, "donations"),
      where("createdAt", "!=", null),
      orderBy("createdAt", "desc")
    );

    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const data = snapshot.docs.map((d) => d.data());

        const totalFood = data.reduce(
          (sum, d) => sum + (Number(d.quantity) || 0),
          0
        );

        const donors = new Set(
          data.map((d) => d.donorId).filter(Boolean)
        ).size;

        setStats({
          totalDonations: data.length,
          totalFoodSaved: Math.round(totalFood),
          activeDonors: donors,
          co2Saved: Math.round(totalFood * 2.3),
        });

        setLoading(false);
      },
      (err) => {
        console.error("🔥 Stats listener error:", err);
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, []);

  return { stats, loading };
};
