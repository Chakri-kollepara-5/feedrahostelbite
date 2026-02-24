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
// 🎯 Real-time Stats Listener (Backend Polling - MongoDB)
// ------------------------------------------------------------
export const useRealTimeStats = () => {
  const [stats, setStats] = useState({
    totalDonations: 0,
    totalFoodSaved: 0,
    activeDonors: 0,
    mealsProvided: 0,
    co2Saved: 0,
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    const fetchStats = async () => {
      try {
        const { default: API } = await import('../services/api');
        const { data } = await API.get('/stats/impact');

        if (isMounted) {
          setStats({
            totalDonations: data.totalDonations || 0,
            totalFoodSaved: data.totalFoodSaved || 0,
            activeDonors: data.activeDonors || 0,
            mealsProvided: data.mealsProvided || 0,
            co2Saved: data.co2Saved || 0,
          });
          setLoading(false);
        }
      } catch (error) {
        console.error('Stats fetch error:', error);
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    // Initial fetch
    fetchStats();

    // Poll every 10 seconds for real-time updates
    const interval = setInterval(fetchStats, 10000);

    return () => {
      isMounted = false;
      clearInterval(interval);
    };
  }, []);

  return { stats, loading };
};
