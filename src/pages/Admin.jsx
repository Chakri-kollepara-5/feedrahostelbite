import React, { useEffect, useState } from "react";
import { db } from "../firebaseConfig";
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



  // ---------------- FETCH USERS ----------------
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

  // ---------------- FETCH DONATIONS ----------------
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
    fetchUsers();
    fetchDonations();
  }, []);

  // ---------------- VERIFY USER ----------------
  const verifyUser = async (uid) => {
    try {
      await updateDoc(doc(db, "users", uid), {
        verified: true,
      });

      console.log("User verified:", uid);

      fetchUsers(); // Refresh table
    } catch (error) {
      console.error("Error verifying user:", error);
      alert("You don't have permission to verify! Make sure you're admin.");
    }
  };



  // METRICS
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



      {/* TOP CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10">
        {[
          {
            label: "Total Users",
            value: totalUsers,
            color: "from-green-500 to-emerald-600",
          },
          {
            label: "Verified Users",
            value: verifiedUsers,
            color: "from-blue-500 to-indigo-600",
          },
          {
            label: "Donors",
            value: totalDonors,
            color: "from-orange-500 to-amber-600",
          },
          {
            label: "NGOs",
            value: totalNGOs,
            color: "from-purple-500 to-fuchsia-600",
          },
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
              <th className="p-4 text-left">Location</th>
              <th className="p-4 text-left">Joined</th>
              <th className="p-4 text-left">Verification</th>
            </tr>
          </thead>

          <tbody>
            {users.map((u) => (
              <tr key={u.id} className="border-b hover:bg-gray-50 transition">

                {/* NAME & AVATAR */}
                <td className="p-4 flex items-center gap-3">
                  <div className="w-10 h-10 bg-green-200 text-green-800 rounded-full flex items-center justify-center font-bold">
                    {u.displayName?.charAt(0)?.toUpperCase()}
                  </div>
                  <span className="font-medium text-gray-800">{u.displayName}</span>
                </td>

                {/* EMAIL */}
                <td className="p-4 text-gray-700">{u.email}</td>

                {/* USER TYPE */}
                <td className="p-4">
                  <span
                    className={`px-3 py-1 rounded-full text-white text-xs font-bold ${
                      u.userType === "donor"
                        ? "bg-green-600"
                        : "bg-blue-600"
                    }`}
                  >
                    {u.userType}
                  </span>
                </td>

                {/* LOCATION */}
                <td className="p-4 text-gray-600">{u.location || "—"}</td>

                {/* JOINED */}
                <td className="p-4 text-gray-600">
                  {u.joinedAt ? u.joinedAt.toDate().toDateString() : "—"}
                </td>

                {/* VERIFICATION BUTTON */}
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
              <tr key={d.id} className="border-b hover:bg-gray-50 transition">
                <td className="p-4 font-medium text-gray-700">{d.description}</td>
                <td className="p-4 text-gray-600">{d.contactInfo}</td>
                <td className="p-4 text-gray-600">
                  {d.createdAt ? d.createdAt.toDate().toDateString() : "—"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>



      {/* ANALYTICS PAGE */}
      <h2 className="text-3xl font-extrabold mb-6">Platform Analytics</h2>
      <AnalyticsPage />

    </div>
  );
};

export default AdminPage;
