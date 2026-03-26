import React, { createContext, useContext, useEffect, useState } from 'react';
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  sendPasswordResetEmail,
  GoogleAuthProvider,
  signInWithPopup
} from 'firebase/auth';
import { auth, db } from '../config/firebase';
import { doc, setDoc } from 'firebase/firestore';
import API from '../services/api';
import { sendWelcomeEmail } from '../services/emailService';
import toast from 'react-hot-toast';

// Create Context
const AuthContext = createContext(undefined);

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
  return ctx;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);   // UserProfile-like object
  const [loading, setLoading] = useState(true);
  const [isSyncing, setIsSyncing] = useState(false); // Track active sync to prevent redundancy

  /**
   * Centralized Sync Method
   * Exchanging Firebase Token for Backend JWT + User Profile
   */
  const syncUser = async (firebaseUser, metadata = {}) => {
    if (!firebaseUser) return;
    
    // 1. Prevent overlapping syncs
    if (isSyncing) {
      console.log('⏳ Sync already in progress, skipping...');
      return;
    }

    try {
      setIsSyncing(true);
      console.log('🔄 Syncing user with backend...', metadata);
      
      const idToken = await firebaseUser.getIdToken();
      
      // We pass createIfMissing: true by default to ensure sync
      const { data } = await API.post('/auth/login', { 
          firebaseToken: idToken,
          createIfMissing: true,
          ...metadata // userType, organization, phone, name
      });
      
      console.log('✅ Backend Sync Success:', data);

      if (data.token) {
        localStorage.setItem('token', data.token);
      }
      
      setUser(data);
      setIsSyncing(false);

      // Handle welcome email asynchronously (non-blocking)
      if (data.isNewUser) {
        sendWelcomeEmail({
          name: data.name,
          email: data.email,
          userType: data.role
        }).catch(err => console.warn('⚠️ Welcome email error:', err));
      }

      return data;
    } catch (err) {
      console.error("❌ Backend sync error:", err);
      setIsSyncing(false);
      
      if (err.response?.status === 404) {
        toast.error("Account does not exist. Please register first.");
        await signOut(auth);
      } else {
        const msg = err.response?.data?.message || err.message;
        console.warn(`⚠️ Sync failure: ${msg}`);
      }
      
      // If we don't have a user, ensure we clear state
      if (!user) {
        setUser(null);
        localStorage.removeItem('token');
      }
      
      throw err;
    }
  };

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (firebaseUser) => {
      console.log('🔥 Auth State Changed:', firebaseUser ? `User: ${firebaseUser.uid}` : 'No User');

      if (!firebaseUser) {
        setUser(null);
        setLoading(false);
        localStorage.removeItem('token');
        return;
      }

      try {
        // 1. Check if we already have a valid session for this user to avoid redundant calls
        const localToken = localStorage.getItem('token');
        if (localToken && user && user.firebaseUid === firebaseUser.uid) {
          console.log('⏩ Session already active and matched. Skipping redundant sync.');
          setLoading(false);
          return;
        }

        // 2. Perform background sync
        await syncUser(firebaseUser);
        setLoading(false);
      } catch (err) {
        console.warn('⚠️ Background sync failed:', err.message);
        setLoading(false);
      }
    });

    return unsub;
  }, []);

  // AUTH FUNCTIONS
  const login = async (email, password) => {
    await signInWithEmailAndPassword(auth, email, password);
  };

  const register = async (email, password, displayName, userType) => {
    const result = await createUserWithEmailAndPassword(auth, email, password);
    const firebaseUser = result.user;

    const profile = {
      uid: firebaseUser.uid,
      email: firebaseUser.email || "",
      displayName,
      userType,
      createdAt: new Date(),
      welcomeEmailSent: false,
    };

    await setDoc(doc(db, "users", firebaseUser.uid), profile);

    // Send welcome email
    try {
      const sent = await sendWelcomeEmail({
        name: displayName,
        email: firebaseUser.email || "",
        userType,
      });

      if (sent) {
        await setDoc(
          doc(db, "users", firebaseUser.uid),
          {
            ...profile,
            welcomeEmailSent: true,
            welcomeEmailSentAt: new Date(),
          },
          { merge: true }
        );
      }
    } catch (err) {
      console.error("Welcome email error:", err);
    }
  };

  const logout = async () => {
    await signOut(auth);
    localStorage.removeItem('token');
    setUser(null);
  };

  const resetPassword = async (email) => {
    await sendPasswordResetEmail(auth, email);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        register,
        logout,
        resetPassword,
        syncUser,
        googleLogin: async () => {
          const provider = new GoogleAuthProvider();
          await signInWithPopup(auth, provider);
        }
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
