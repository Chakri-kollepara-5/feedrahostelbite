import React, { createContext, useContext, useEffect, useState } from 'react';
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  sendPasswordResetEmail
} from 'firebase/auth';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { auth, db } from '../config/firebase';
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
        return;
      }

      try {
        const userRef = doc(db, "users", firebaseUser.uid);
        const snap = await getDoc(userRef);

        if (snap.exists()) {
          const data = snap.data();

          const profile = {
            uid: firebaseUser.uid,
            email: firebaseUser.email || "",
            displayName: data.displayName || "User",
            userType: data.userType || "volunteer",
            createdAt: safeDate(data.createdAt),
          };

          setUser(profile);

          // Detect new users for welcome email
          const isNew =
            !data.welcomeEmailSent &&
            data.createdAt &&
            Date.now() - safeDate(data.createdAt).getTime() < 60000;

          if (isNew) {
            try {
              const sent = await sendWelcomeEmail({
                name: profile.displayName,
                email: profile.email,
                userType: profile.userType,
              });

              if (sent) {
                await setDoc(
                  userRef,
                  {
                    ...data,
                    welcomeEmailSent: true,
                    welcomeEmailSentAt: new Date(),
                  },
                  { merge: true }
                );
                toast.success("Welcome email sent! 📧");
              }
            } catch (err) {
              console.error("Welcome email error:", err);
            }
          }
        } else {
          // Create new user profile
          const basic = {
            uid: firebaseUser.uid,
            email: firebaseUser.email || "",
            displayName: firebaseUser.displayName || "User",
            userType: "volunteer",
            createdAt: new Date(),
            welcomeEmailSent: false,
          };

          await setDoc(userRef, basic);
          setUser(basic);
        }
      } catch (err) {
        console.error("User profile fetch error:", err);

        setUser({
          uid: firebaseUser.uid,
          email: firebaseUser.email || "",
          displayName: firebaseUser.displayName || "User",
          userType: "volunteer",
          createdAt: new Date(),
        });
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
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
