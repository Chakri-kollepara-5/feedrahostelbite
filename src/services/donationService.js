import { 
  collection, 
  addDoc, 
  getDocs, 
  doc, 
  updateDoc, 
  deleteDoc, 
  query, 
  where, 
  orderBy,
  getDoc,
  onSnapshot,
  serverTimestamp,
  limit
} from 'firebase/firestore';
import { db } from '../config/firebase';

/* ------------------ CREATE DONATION ------------------ */
export const createDonation = async (donationData) => {
  try {
    console.log('🚀 Creating donation:', donationData);
    
    const donation = {
      ...donationData,
      status: 'available',
      createdAt: serverTimestamp(),
      urgency: donationData.urgency || 'medium',
      tags: donationData.tags || [],
    };
    
    const docRef = await addDoc(collection(db, 'donations'), donation);
    console.log('✅ Donation created with ID:', docRef.id);
    return docRef.id;

  } catch (error) {
    console.error('❌ Error creating donation:', error);
    if (error.code === 'permission-denied') {
      throw new Error('Permission denied. Check Firebase security rules.');
    }
    throw new Error('Failed to create donation');
  }
};

/* ------------------ FETCH DONATIONS ------------------ */
export const getDonations = async (options = {}) => {
  try {
    console.log('📊 Fetching donations with options:', options);

    let q = query(collection(db, 'donations'));

    if (options.status && options.status !== 'all') {
      q = query(q, where('status', '==', options.status));
    }

    if (options.userId) {
      q = query(q, where('donorId', '==', options.userId));
    }

    q = query(q, orderBy('createdAt', 'desc'));

    if (options.limitCount) {
      q = query(q, limit(options.limitCount));
    }

    const snapshot = await getDocs(q);

    const donations = snapshot.docs.map((docSnap) => {
      const data = docSnap.data();
      return {
        id: docSnap.id,
        ...data,
        createdAt: data.createdAt?.toDate ? data.createdAt.toDate() : new Date(),
        expiryDate: data.expiryDate?.toDate ? data.expiryDate.toDate() : new Date(),
        claimedAt: data.claimedAt?.toDate ? data.claimedAt.toDate() : null,
        completedAt: data.completedAt?.toDate ? data.completedAt.toDate() : null,
      };
    });

    console.log('✅ Fetched', donations.length, 'donations');
    return donations;

  } catch (error) {
    console.error('❌ Error fetching donations:', error);
    if (error.code === 'permission-denied') {
      throw new Error('Permission denied. Check Firestore rules.');
    }
    return [];
  }
};

/* ------------------ GET USER DONATIONS ------------------ */
export const getUserDonations = async (userId) => {
  return getDonations({ userId, limitCount: 10 });
};

/* ------------------ UPDATE DONATION STATUS ------------------ */
export const updateDonationStatus = async (donationId, status, claimedBy) => {
  try {
    console.log('🔄 Updating donation status:', donationId, '→', status);

    const donationRef = doc(db, 'donations', donationId);

    const updateData = {
      status,
      updatedAt: serverTimestamp()
    };

    if (claimedBy && status === 'claimed') {
      updateData.claimedBy = claimedBy;
      updateData.claimedAt = serverTimestamp();
    }

    if (status === 'completed') {
      updateData.completedAt = serverTimestamp();
    }

    await updateDoc(donationRef, updateData);
    console.log('✅ Donation status updated');

  } catch (error) {
    console.error('❌ Error updating donation:', error);
    if (error.code === 'permission-denied') {
      throw new Error('Permission denied. Check Firestore rules.');
    }
    throw new Error('Failed to update donation status');
  }
};

/* ------------------ DELETE DONATION ------------------ */
export const deleteDonation = async (donationId) => {
  try {
    console.log('🗑️ Deleting donation:', donationId);
    await deleteDoc(doc(db, 'donations', donationId));
    console.log('✅ Donation deleted');
    
  } catch (error) {
    console.error('❌ Error deleting donation:', error);
    throw new Error('Failed to delete donation');
  }
};

/* ------------------ CLAIM DONATION ------------------ */
export const claimDonation = async (donationId, userId) => {
  try {
    console.log('🎯 Claiming donation:', donationId, 'by user:', userId);
    await updateDonationStatus(donationId, 'claimed', userId);
    console.log('✅ Donation claimed');
    
  } catch (error) {
    console.error('❌ Error claiming donation:', error);
    throw new Error('Failed to claim donation');
  }
};

/* ------------------ COMPLETE DONATION ------------------ */
export const completeDonation = async (donationId) => {
  try {
    console.log('🏁 Completing donation:', donationId);
    await updateDonationStatus(donationId, 'completed');
    console.log('✅ Donation completed');
    
  } catch (error) {
    console.error('❌ Error completing donation:', error);
    throw new Error('Failed to complete donation');
  }
};

/* ------------------ GET SINGLE DONATION ------------------ */
export const getDonation = async (donationId) => {
  try {
    console.log('📄 Fetching donation:', donationId);

    const docRef = doc(db, 'donations', donationId);
    const snap = await getDoc(docRef);

    if (!snap.exists()) {
      console.log('❌ Donation not found');
      return null;
    }

    const data = snap.data();

    return {
      id: snap.id,
      ...data,
      createdAt: data.createdAt?.toDate ? data.createdAt.toDate() : new Date(),
      expiryDate: data.expiryDate?.toDate ? data.expiryDate.toDate() : new Date(),
      claimedAt: data.claimedAt?.toDate ? data.claimedAt.toDate() : null,
      completedAt: data.completedAt?.toDate ? data.completedAt.toDate() : null,
    };

  } catch (error) {
    console.error('❌ Error fetching donation:', error);
    return null;
  }
};

/* ------------------ REAL-TIME DONATION SUBSCRIPTION ------------------ */
export const subscribeToDonations = (callback, errorCallback, filters = {}) => {
  console.log('🔄 Subscribing to live donations with filters:', filters);

  try {
    let q = query(collection(db, 'donations'));

    if (filters.status && filters.status !== 'all') {
      q = query(q, where('status', '==', filters.status));
    }

    if (filters.userId) {
      q = query(q, where('donorId', '==', filters.userId));
    }

    q = query(q, orderBy('createdAt', 'desc'));

    if (filters.limitCount) {
      q = query(q, limit(filters.limitCount));
    }

    return onSnapshot(
      q,
      (snapshot) => {
        console.log('📡 Live update:', snapshot.size, 'donations');

        const donations = snapshot.docs.map((d) => {
          const data = d.data();
          return {
            id: d.id,
            ...data,
            createdAt: data.createdAt?.toDate ? data.createdAt.toDate() : new Date(),
            expiryDate: data.expiryDate?.toDate ? data.expiryDate.toDate() : new Date(),
            claimedAt: data.claimedAt?.toDate ? data.claimedAt.toDate() : null,
            completedAt: data.completedAt?.toDate ? data.completedAt.toDate() : null,
          };
        });

        callback(donations);
      },

      (error) => {
        console.error('❌ Live subscription error:', error);

        let msg = 'Failed to load donations live.';
        if (error.code === 'failed-precondition')
          msg = 'Indexes are being created. Try again later.';
        if (error.code === 'permission-denied')
          msg = 'Permission denied. Check Firestore rules.';

        errorCallback(msg);
      }
    );

  } catch (error) {
    console.error('❌ Subscription setup error:', error);
    errorCallback('Failed to setup real-time updates');
    return () => {};
  }
};
