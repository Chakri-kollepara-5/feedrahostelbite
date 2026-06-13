import API from './api';
import toast from 'react-hot-toast';

const MOCK_DONATIONS = [
  {
    _id: "mock-1",
    foodType: "Surplus Rice & Dal thali",
    quantity: 15,
    location: "KPHB Phase 3, Hyderabad",
    expiryTime: new Date(Date.now() + 8 * 3600000).toISOString(),
    createdAt: new Date(Date.now() - 3600000).toISOString(),
    donorName: "Curry Point Kitchen",
    status: "available",
    urgency: "high",
    description: "Freshly prepared rice and yellow dal, packed in hygienic containers.",
    image: "https://images.unsplash.com/photo-1542838132-92c53300491e?q=80&w=2574&auto=format&fit=crop"
  },
  {
    _id: "mock-2",
    foodType: "Fresh Veggie Sandwiches",
    quantity: 8,
    location: "Gachibowli, Hyderabad",
    expiryTime: new Date(Date.now() + 4 * 3600000).toISOString(),
    createdAt: new Date(Date.now() - 1800000).toISOString(),
    donorName: "Bite Sized Cafe",
    status: "available",
    urgency: "medium",
    description: "Cucumber, tomato, and cheese sandwiches, individually wrapped.",
    image: "https://images.pexels.com/photos/376464/pexels-photo-376464.jpeg?auto=compress&cs=tinysrgb&w=600"
  },
  {
    _id: "mock-3",
    foodType: "Mixed Fruits Basket",
    quantity: 10,
    location: "Madhapur, Hyderabad",
    expiryTime: new Date(Date.now() + 24 * 3600000).toISOString(),
    createdAt: new Date(Date.now() - 7200000).toISOString(),
    donorName: "Super Fresh Mart",
    status: "available",
    urgency: "low",
    description: "Apples, bananas, and oranges in good condition.",
    image: "https://images.unsplash.com/photo-1542838132-92c53300491e?q=80&w=2574&auto=format&fit=crop"
  }
];

/* ------------------ CREATE DONATION ------------------ */
export const createDonation = async (donationData) => {
  try {
    const { data } = await API.post('/donations/create', donationData);
    return data._id;
  } catch (error) {
    if (!error.response || error.code === 'ERR_NETWORK' || error.message?.includes('Network Error')) {
      console.warn('⚠️ Backend offline. Simulating local donation creation.');
      const mockId = 'mock-' + Math.random().toString(36).substr(2, 9);
      toast.success('Offline mode: Created donation locally (simulated)');
      return mockId;
    }
    console.error('Error creating donation:', error);
    throw error.response?.data?.message || 'Failed to create donation';
  }
};

/* ------------------ ANALYZE FRESHNESS ------------------ */
export const analyzeFreshness = async (payload) => {
  try {
    const { data } = await API.post('/donations/analyze-freshness', payload);
    return data;
  } catch (error) {
    if (!error.response || error.code === 'ERR_NETWORK' || error.message?.includes('Network Error')) {
      console.warn('⚠️ Backend offline. Simulating AI analysis.');
      return {
        freshnessScore: 85,
        imageScore: 80,
        foodCondition: "Good",
        safeConsumptionHours: 12,
        recommendedRadius: 10,
        confidenceScore: 90,
        aiNotes: "Offline mode fallback analysis."
      };
    }
    console.error('Error analyzing freshness:', error);
    throw error.response?.data?.message || 'Failed to analyze freshness';
  }
};

/* ------------------ FETCH DONATIONS ------------------ */
export const getDonations = async (options = {}) => {
  try {
    let queryParams = new URLSearchParams();

    if (options.long && options.lat) {
      queryParams.append('long', options.long);
      queryParams.append('lat', options.lat);
      if (options.distance) queryParams.append('distance', options.distance);
    }

    const { data } = await API.get(`/donations/nearby?${queryParams.toString()}`);
    return data.map(mapDonation);
  } catch (error) {
    if (!error.response || error.code === 'ERR_NETWORK' || error.message?.includes('Network Error') || error.__silent) {
      if (!globalThis.__isOfflineMode) console.info('ℹ️ Backend offline — showing mock donations.');
      return MOCK_DONATIONS.map(mapDonation);
    }
    console.error('Error fetching donations:', error);
    return [];
  }
};

/* ------------------ GET USER DONATIONS ------------------ */
export const getUserDonations = async (userId) => {
  try {
    const { data } = await API.get('/donations/my-donations');
    return data.map(mapDonation);
  } catch (error) {
    if (!error.response || error.code === 'ERR_NETWORK' || error.message?.includes('Network Error') || error.__silent) {
      if (!globalThis.__isOfflineMode) console.info('ℹ️ Backend offline — returning user mock donations.');
      return MOCK_DONATIONS.slice(0, 1).map(d => ({ ...d, donorId: userId })).map(mapDonation);
    }
    console.error(error);
    return [];
  }
};

/* ------------------ UPDATE DONATION STATUS ------------------ */
export const updateDonationStatus = async (donationId, status) => {
  try {
    const { data } = await API.patch(`/donations/${donationId}/status`, { status });
    return data;
  } catch (error) {
    if (!error.response || error.code === 'ERR_NETWORK' || error.message?.includes('Network Error') || error.__silent) {
      if (!globalThis.__isOfflineMode) console.info('ℹ️ Backend offline — simulating status update.');
      toast.success(`Donation marked as ${status} (offline mode)`);
      return { _id: donationId, status };
    }
    console.error('Error updating status:', error);
    throw error.response?.data?.message || 'Failed to update status';
  }
};

/* ------------------ DELETE DONATION ------------------ */
export const deleteDonation = async (donationId) => {
  try {
    await API.delete(`/donations/cancel/${donationId}`);
  } catch (error) {
    if (!error.response || error.code === 'ERR_NETWORK' || error.message?.includes('Network Error') || error.__silent) {
      if (!globalThis.__isOfflineMode) console.info('ℹ️ Backend offline — simulating donation cancel.');
      toast.success('Donation cancelled (offline mode)');
      return;
    }
    console.error('Error deleting donation:', error);
    throw error.response?.data?.message || 'Failed to delete';
  }
};

/* ------------------ CLAIM/COMPLETE Wrappers ------------------ */
export const claimDonation = async (donationId, userId) => {
  return updateDonationStatus(donationId, 'ACCEPTED');
};

export const completeDonation = async (donationId) => {
  return updateDonationStatus(donationId, 'DELIVERED');
};

/* ------------------ GET SINGLE DONATION ------------------ */
export const getDonation = async (donationId) => {
  try {
    const { data } = await API.get(`/donations/${donationId}`);
    return mapDonation(data);
  } catch (error) {
    if (!error.response || error.code === 'ERR_NETWORK' || error.message?.includes('Network Error')) {
      console.warn('⚠️ Backend offline. Returning single mock donation.');
      const mock = MOCK_DONATIONS.find(d => d._id === donationId) || MOCK_DONATIONS[0];
      return mapDonation(mock);
    }
    console.error('Error getting donation:', error);
    return null;
  }
};

/* ------------------ REAL-TIME (Simulated) ------------------ */
export const subscribeToDonations = (callback, errorCallback, filters = {}) => {
  const fetchIt = async () => {
    try {
      const data = await getDonations(filters);
      callback(data);
    } catch (err) {
      errorCallback(err.message);
    }
  };

  fetchIt();
  const interval = setInterval(fetchIt, 10000);
  return () => clearInterval(interval);
};

const mapDonation = (d) => ({
  ...d,
  id: d._id,
  // Backend stores 'title', frontend cards expect 'foodType'
  foodType: d.foodType || d.title || 'Food Donation',
  // Backend stores array 'images', frontend cards expect single 'image'
  image: d.image || (d.images && d.images[0]) || 'https://images.unsplash.com/photo-1542838132-92c53300491e?q=80&w=2574&auto=format&fit=crop',
  createdAt: new Date(d.createdAt),
  expiryDate: new Date(d.expiryTime || d.expiryDate || d.createdAt)
});
