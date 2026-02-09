import React, { useState } from "react";
import {
  X,
  Package,
  FileText,
  Tag,
  AlertTriangle,
} from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { db } from "../config/firebase";
import { addDoc, collection, Timestamp } from "firebase/firestore";
import toast from "react-hot-toast";
import "./CreateDonationModal.css";

const CreateDonationModal = ({ onClose, onSuccess }) => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    foodType: "",
    description: "",
    quantity: "",
    location: "",
    expiryDate: "",
    contactInfo: user?.email || "",
    urgency: "medium",
    tags: [],
    pickupInstructions: "",
  });

  const foodTypes = [
    "Vegetables",
    "Fruits",
    "Grains",
    "Dairy",
    "Prepared Meals",
    "Baked Goods",
    "Canned Foods",
    "Beverages",
    "Snacks",
    "Other",
  ];

  const urgencyLevels = [
    { value: "low", label: "Low Priority" },
    { value: "medium", label: "Medium Priority" },
    { value: "high", label: "High Priority" },
  ];

  const commonTags = [
    "Vegetarian",
    "Vegan",
    "Gluten-Free",
    "Organic",
    "Fresh",
    "Frozen",
    "Cooked",
    "Raw",
    "Halal",
    "Kosher",
    "Dairy-Free",
    "Nut-Free",
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((p) => ({ ...p, [name]: value }));
  };

  const handleTagToggle = (tag) => {
    setFormData((p) => ({
      ...p,
      tags: p.tags.includes(tag)
        ? p.tags.filter((t) => t !== tag)
        : [...p.tags, tag],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user) {
      toast.error("Please login to create donations");
      return;
    }

    if (
      !formData.foodType ||
      !formData.description ||
      !formData.quantity ||
      !formData.location ||
      !formData.expiryDate
    ) {
      toast.error("Please fill all required fields");
      return;
    }

    const qty = Number(formData.quantity);
    if (qty <= 0) {
      toast.error("Quantity must be greater than 0");
      return;
    }

    const expiry = new Date(formData.expiryDate);
    if (expiry <= new Date()) {
      toast.error("Expiry date must be in the future");
      return;
    }

    setLoading(true);

    try {
      // 🔥 THIS IS THE FIX
      await addDoc(collection(db, "donations"), {
        foodType: formData.foodType.toLowerCase(),
        description: formData.description,
        quantity: qty,
        location: formData.location,

        // ✅ REQUIRED FOR UI
        status: "available",
        createdAt: Timestamp.now(),
        expiryDate: Timestamp.fromDate(expiry),

        donorId: user.uid,
        donorName:
          user.displayName || user.email?.split("@")[0] || "Anonymous",
        contactInfo: formData.contactInfo,

        urgency: formData.urgency,
        tags: formData.tags,
        pickupInstructions: formData.pickupInstructions,

        claimedBy: null,
        claimedAt: null,
        completedAt: null,
      });

      toast.success("Donation created successfully!");
      onSuccess();
    } catch (err) {
      console.error(err);
      toast.error("Failed to create donation");
    } finally {
      setLoading(false);
    }
  };

  const getMinDatetime = () => {
    const d = new Date();
    d.setHours(d.getHours() + 1);
    return d.toISOString().slice(0, 16);
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">

        {/* HEADER */}
        <div className="flex items-center justify-between p-6 border-b">
          <h2 className="text-2xl font-bold">Create Food Donation</h2>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-lg">
            <X />
          </button>
        </div>

        {/* FORM */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">

          {/* FOOD TYPE */}
          <div>
            <label className="block text-sm font-medium mb-2">
              <Package className="inline h-4 w-4 mr-1" /> Food Type *
            </label>
            <select
              name="foodType"
              value={formData.foodType}
              onChange={handleInputChange}
              className="w-full px-3 py-3 border rounded-xl"
              required
            >
              <option value="">Select food type</option>
              {foodTypes.map((t) => (
                <option key={t} value={t}>{t}</option>
              ))}
            </select>
          </div>

          {/* DESCRIPTION */}
          <div>
            <label className="block text-sm font-medium mb-2">
              <FileText className="inline h-4 w-4 mr-1" /> Description *
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              rows={3}
              required
              className="w-full px-3 py-3 border rounded-xl"
            />
          </div>

          {/* QUANTITY + LOCATION */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="number"
              name="quantity"
              value={formData.quantity}
              onChange={handleInputChange}
              placeholder="Quantity (kg)"
              className="px-3 py-3 border rounded-xl"
              required
            />

            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleInputChange}
              placeholder="Pickup location"
              className="px-3 py-3 border rounded-xl"
              required
            />
          </div>

          {/* EXPIRY + CONTACT */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="datetime-local"
              name="expiryDate"
              value={formData.expiryDate}
              onChange={handleInputChange}
              min={getMinDatetime()}
              className="px-3 py-3 border rounded-xl"
              required
            />

            <input
              type="email"
              name="contactInfo"
              value={formData.contactInfo}
              onChange={handleInputChange}
              placeholder="Contact email"
              className="px-3 py-3 border rounded-xl"
            />
          </div>

          {/* TAGS */}
          <div>
            <label className="block text-sm font-medium mb-2">
              <Tag className="inline h-4 w-4 mr-1" /> Tags
            </label>
            <div className="flex flex-wrap gap-2">
              {commonTags.map((tag) => (
                <button
                  type="button"
                  key={tag}
                  onClick={() => handleTagToggle(tag)}
                  className={`px-3 py-2 rounded-full text-sm ${
                    formData.tags.includes(tag)
                      ? "bg-green-500 text-white"
                      : "bg-gray-100"
                  }`}
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>

          {/* PICKUP INSTRUCTIONS */}
          <textarea
            name="pickupInstructions"
            value={formData.pickupInstructions}
            onChange={handleInputChange}
            placeholder="Pickup instructions (optional)"
            className="w-full px-3 py-3 border rounded-xl"
          />

          {/* ACTIONS */}
          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-3 bg-gray-100 rounded-xl"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={loading}
              className="flex-1 py-3 bg-green-600 text-white rounded-xl"
            >
              {loading ? "Creating..." : "Create Donation"}
            </button>
          </div>

        </form>
      </div>
    </div>
  );
};

export default CreateDonationModal;
