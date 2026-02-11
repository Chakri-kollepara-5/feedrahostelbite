import { useState, useEffect } from 'react';
import { getDonations, getUserDonations } from '../services/donationService'; // Import Service

export const useRealTimeDonations = (filters = {}) => {
  const [donations, setDonations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;

    const fetchDonations = async () => {
      try {
        let data = [];
        // If filter has userId, fetch user specific donations
        if (filters.userId) {
          data = await getUserDonations(filters.userId);
        } else {
          // Otherwise fetch feed (nearby/all)
          // We pass filters if needed, but getDonations currently handles location primarily.
          // We can pass status filter to getDonations if we update it, or filter client-side.
          // Current backend returns 'POSTED' only for nearby.
          // Client side filtering in DonationsPage handles visual filtering.
          data = await getDonations(filters);
        }

        if (isMounted) {
          setDonations(data);
          setLoading(false);
          setError(null);
        }
      } catch (err) {
        console.error("Polling error:", err);
        if (isMounted) {
          setError("Failed to load donations");
          setLoading(false);
        }
      }
    };

    // Initial Fetch
    fetchDonations();

    // Poll every 5 seconds
    const interval = setInterval(fetchDonations, 5000);

    return () => {
      isMounted = false;
      clearInterval(interval);
    };
  }, [filters.status, filters.userId]); // Re-run if key filters change

  return { donations, loading, error };
};

// ------------------------------------------------------------
// 🎯 Real-time Stats Listener (Also Converted to JS)
// ------------------------------------------------------------
// ------------------------------------------------------------
// 🎯 Real-time Stats Listener (Backend Polling)
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
    // Dynamically import db to avoid initialization errors if not passed
    let unsubscribe = () => { };

    const setupListener = async () => {
      try {
        const { db } = await import('../firebaseConfig');
        const { collection, onSnapshot, query, where } = await import('firebase/firestore');

        // Listen to all non-cancelled donations for stats
        // If the collection is huge, this is expensive (reads = N). 
        // For a hackathon/demo scale, it's fine and gives "real-time matching data".
        const q = query(collection(db, "donations"));

        unsubscribe = onSnapshot(q, (snapshot) => {
          let totalDonations = 0;
          let totalFoodSaved = 0;
          let uniqueDonors = new Set();

          snapshot.forEach((doc) => {
            const data = doc.data();
            totalDonations++;
            if (data.quantity) {
              totalFoodSaved += Number(data.quantity);
            }
            if (data.donorId) {
              uniqueDonors.add(data.donorId);
            }
          });

          setStats({
            totalDonations,
            totalFoodSaved: Math.round(totalFoodSaved),
            activeDonors: uniqueDonors.size,
            co2Saved: Math.round(totalFoodSaved * 2.5), // Approx factor
          });
          setLoading(false);
        }, (error) => {
          console.error("Stats listener error:", error);
          setLoading(false);
        });

      } catch (err) {
        console.error("Failed to setup real-time stats:", err);
        setLoading(false);
      }
    };

    setupListener();

    return () => {
      unsubscribe();
    };
  }, []);

  return { stats, loading };
};
