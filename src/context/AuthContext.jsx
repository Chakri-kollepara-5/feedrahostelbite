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
import { auth } from '../config/firebase';
// remove db import if not used elsewhere, or keep for other things
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

  // Safe Firestore Timestamp → JS Date
  const safeDate = (value) => {
    if (!value) return new Date();
    if (typeof value.toDate === "function") return value.toDate();
    const d = new Date(value);
    return isNaN(d.getTime()) ? new Date() : d;
  };

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (firebaseUser) => {
      if (!firebaseUser) {
        setUser(null);
        setLoading(false);
        localStorage.removeItem('token');
        return;
      }

      try {
        const idToken = await firebaseUser.getIdToken();
        // Exchange Firebase Token for Backend JWT + User Data
        const { data } = await API.post('/auth/login', { firebaseToken: idToken });

        localStorage.setItem('token', data.token);
        // data.user should contain the user profile from MongoDB
        setUser(data);

        // Check for new user flag and send email
        if (data.isNewUser) {
          sendWelcomeEmail({
            name: data.name,
            email: data.email,
            userType: data.role
          }).then(sent => {
            if (sent) toast.success("Welcome email sent! 📧");
          });
        }
      } catch (err) {
        console.error("Backend auth error:", err);
        toast.error("Authentication failed. Backend error.");
        setUser(null);
        localStorage.removeItem('token');
      }

      setLoading(false);
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
