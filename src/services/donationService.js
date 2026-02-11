import API from './api';

/* ------------------ CREATE DONATION ------------------ */
export const createDonation = async (donationData) => {
  try {
    const { data } = await API.post('/donations/create', donationData);
    return data._id;
  } catch (error) {
    console.error('Error creating donation:', error);
    throw error.response?.data?.message || 'Failed to create donation';
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

    // Pass other generic filters if backend supports them later
    // For now backend handles 'nearby' or 'all recent' via the same endpoint

    const { data } = await API.get(`/donations/nearby?${queryParams.toString()}`);
    return data.map(mapDonation);
  } catch (error) {
    console.error('Error fetching donations:', error);
    return [];
  }
};

/* ------------------ GET USER DONATIONS ------------------ */
export const getUserDonations = async (userId) => {
  // This usually implies "My Donations" in the context of this app's previous logic
  try {
    const { data } = await API.get('/donations/my-donations');
    return data.map(mapDonation);
  } catch (error) {
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
    console.error('Error updating status:', error);
    throw error.response?.data?.message || 'Failed to update status';
  }
};

/* ------------------ DELETE DONATION ------------------ */
export const deleteDonation = async (donationId) => {
  try {
    await API.delete(`/donations/cancel/${donationId}`);
  } catch (error) {
    console.error('Error deleting donation:', error);
    throw error.response?.data?.message || 'Failed to delete';
  }
};

/* ------------------ CLAIM/COMPLETE Wrappers ------------------ */
export const claimDonation = async (donationId, userId) => {
  return updateDonationStatus(donationId, 'ACCEPTED'); // Status flow: POSTED -> ACCEPTED
};

export const completeDonation = async (donationId) => {
  return updateDonationStatus(donationId, 'DELIVERED'); // or PICKED_UP then DELIVERED
};

/* ------------------ GET SINGLE DONATION ------------------ */
export const getDonation = async (donationId) => {
  try {
    const { data } = await API.get(`/donations/${donationId}`);
    return mapDonation(data);
  } catch (error) {
    console.error('Error getting donation:', error);
    return null;
  }
};

/* ------------------ REAL-TIME (Simulated) ------------------ */
export const subscribeToDonations = (callback, errorCallback, filters = {}) => {
  // Polling fallback since we moved to REST
  const fetchIt = async () => {
    try {
      const data = await getDonations(filters);
      callback(data);
    } catch (err) {
      errorCallback(err.message);
    }
  };

  fetchIt();
  const interval = setInterval(fetchIt, 10000); // Poll every 10s
  return () => clearInterval(interval);
};

// Helper to map Mongo _id to id for frontend compatibility
const mapDonation = (d) => ({
  ...d,
  id: d._id,
  createdAt: new Date(d.createdAt),
  expiryDate: new Date(d.expiryTime || d.createdAt) // expiryTime in backend
});
