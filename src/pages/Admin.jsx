import React, { useEffect, useState } from "react";
import { db } from "../firebaseConfig";
import { getAuth } from "firebase/auth";
import {
  collection,
  getDocs,
  doc,
  updateDoc
} from "firebase/firestore";

import AnalyticsPage from "./AnalyticsPage";

const AdminPage = () => {
  const [users, setUsers] = useState([]);
  const [donations, setDonations] = useState([]);

  const [loadingUsers, setLoadingUsers] = useState(true);
  const [loadingDonations, setLoadingDonations] = useState(true);

  const [isAdmin, setIsAdmin] = useState(false);
  const [checkingAdmin, setCheckingAdmin] = useState(true);

  /* ---------------- CHECK ADMIN CLAIM ---------------- */
  useEffect(() => {
    const checkAdmin = async () => {
      const auth = getAuth();
      const user = auth.currentUser;

      if (!user) {
        setIsAdmin(false);
        setCheckingAdmin(false);
        return;
      }

      const tokenResult = await user.getIdTokenResult();
      setIsAdmin(tokenResult.claims.admin === true);
      setCheckingAdmin(false);
    };

    checkAdmin();
  }, []);

  /* ---------------- FETCH USERS ---------------- */
  const fetchUsers = async () => {
    try {
      const snap = await getDocs(collection(db, "users"));
      const list = snap.docs.map((d) => ({ id: d.id, ...d.data() }));
      setUsers(list);
    } catch (err) {
      console.error("Error loading users:", err);
    } finally {
      setLoadingUsers(false);
    }
  };

  /* ---------------- FETCH DONATIONS ---------------- */
  const fetchDonations = async () => {
    try {
      const snap = await getDocs(collection(db, "donations"));
      const list = snap.docs.map((d) => ({ id: d.id, ...d.data() }));
      setDonations(list);
    } catch (err) {
      console.error("Error loading donations:", err);
    } finally {
      setLoadingDonations(false);
    }
  };

  useEffect(() => {
    if (isAdmin) {
      fetchUsers();
      fetchDonations();
    }
  }, [isAdmin]);

  /* ---------------- VERIFY USER ---------------- */
  const verifyUser = async (uid) => {
    if (!isAdmin) {
      alert("Access denied. Admins only.");
      return;
    }

    try {
      await updateDoc(doc(db, "users", uid), {
        verified: true,
      });

      fetchUsers();
    } catch (error) {
      console.error("Error verifying user:", error);
      alert("Verification failed. Check Firestore rules.");
    }
  };

  /* ---------------- LOADING STATES ---------------- */
  if (checkingAdmin) {
    return (
      <div className="p-10 text-center font-bold text-lg">
        Checking admin permissions...
      </div>
    );
  }

  if (!isAdmin) {
    return (
      <div className="p-10 text-center text-red-600 font-bold text-xl">
        ❌ Access Denied — Admins Only
      </div>
    );
  }

  /* ---------------- METRICS ---------------- */
  const totalUsers = users.length;
  const verifiedUsers = users.filter((u) => u.verified).length;
  const totalDonors = users.filter((u) => u.userType === "donor").length;
  const totalNGOs = users.filter((u) => u.userType === "ngo").length;

  return (
    <div className="p-6">

      {/* HEADER */}
      <h1 className="text-4xl font-extrabold mb-3">Admin Dashboard</h1>
      <p className="text-gray-600 mb-8">
        Manage users, donations, verification, and analytics.
      </p>

      {/* METRIC CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10">
        {[
          { label: "Total Users", value: totalUsers, color: "from-green-500 to-emerald-600" },
          { label: "Verified Users", value: verifiedUsers, color: "from-blue-500 to-indigo-600" },
          { label: "Donors", value: totalDonors, color: "from-orange-500 to-amber-600" },
          { label: "NGOs", value: totalNGOs, color: "from-purple-500 to-fuchsia-600" },
        ].map((item, index) => (
          <div
            key={index}
            className={`p-6 rounded-xl shadow-md text-white bg-gradient-to-r ${item.color}`}
          >
            <p className="text-lg font-semibold">{item.label}</p>
            <h2 className="text-4xl font-bold mt-1">{item.value}</h2>
          </div>
        ))}
      </div>

      {/* USERS TABLE */}
      <h2 className="text-2xl font-bold mb-3">Users Overview</h2>

      <div className="bg-white shadow-lg rounded-xl overflow-hidden mb-10">
        <table className="min-w-full text-sm">
          <thead className="bg-gray-100 border-b">
            <tr>
              <th className="p-4 text-left">User</th>
              <th className="p-4 text-left">Email</th>
              <th className="p-4 text-left">Type</th>
              <th className="p-4 text-left">Verification</th>
            </tr>
          </thead>

          <tbody>
            {users.map((u) => (
              <tr key={u.id} className="border-b hover:bg-gray-50">
                <td className="p-4 font-medium">{u.displayName}</td>
                <td className="p-4">{u.email}</td>
                <td className="p-4">{u.userType}</td>
                <td className="p-4">
                  {!u.verified ? (
                    <button
                      onClick={() => verifyUser(u.id)}
                      className="px-3 py-1 bg-green-600 text-white rounded text-xs hover:bg-green-700"
                    >
                      Verify
                    </button>
                  ) : (
                    <span className="px-2 py-1 bg-green-100 text-green-700 text-xs rounded">
                      Verified
                    </span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* DONATIONS TABLE */}
      <h2 className="text-2xl font-bold mb-3">Recent Donations</h2>

      <div className="bg-white shadow-lg rounded-xl overflow-hidden mb-12">
        <table className="min-w-full text-sm">
          <thead className="bg-gray-100 border-b">
            <tr>
              <th className="p-4 text-left">Description</th>
              <th className="p-4 text-left">Contact</th>
              <th className="p-4 text-left">Created At</th>
            </tr>
          </thead>
          <tbody>
            {donations.map((d) => (
              <tr key={d.id} className="border-b hover:bg-gray-50">
                <td className="p-4">{d.description}</td>
                <td className="p-4">{d.contactInfo}</td>
                <td className="p-4">
                  {d.createdAt?.toDate
                    ? d.createdAt.toDate().toDateString()
                    : "—"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* ANALYTICS */}
      <AnalyticsPage />
    </div>
  );
};

export default AdminPage;
