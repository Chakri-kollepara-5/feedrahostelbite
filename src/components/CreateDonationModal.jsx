import React, { useState } from 'react';
import {
  X,
  MapPin,
  Package,
  Clock,
  FileText,
  Tag,
  AlertTriangle,
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { createDonation } from '../services/donationService';
import { sendDonationNotification } from '../services/emailService';
import toast from 'react-hot-toast';

import './CreateDonationModal.css';

const CreateDonationModal = ({ onClose, onSuccess }) => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    foodType: '',
    description: '',
    quantity: '',
    location: '',
    expiryDate: '',
    contactInfo: user?.email || '',
    urgency: 'medium',
    tags: [],
    pickupInstructions: '',
  });

  const foodTypes = [
    'Vegetables',
    'Fruits',
    'Grains',
    'Dairy',
    'Prepared Meals',
    'Baked Goods',
    'Canned Foods',
    'Beverages',
    'Snacks',
    'Other',
  ];

  const urgencyLevels = [
    { value: 'low', label: 'Low Priority', description: 'Good for several days' },
    { value: 'medium', label: 'Medium Priority', description: 'Should be picked up soon' },
    { value: 'high', label: 'High Priority', description: 'Urgent - expires very soon' },
  ];

  const commonTags = [
    'Vegetarian',
    'Vegan',
    'Gluten-Free',
    'Organic',
    'Fresh',
    'Frozen',
    'Cooked',
    'Raw',
    'Halal',
    'Kosher',
    'Dairy-Free',
    'Nut-Free',
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
      toast.error('Please login to create donations');
      return;
    }

    if (
      !formData.foodType ||
      !formData.description ||
      !formData.quantity ||
      !formData.location ||
      !formData.expiryDate
    ) {
      toast.error('Please fill in all required fields');
      return;
    }

    if (parseFloat(formData.quantity) <= 0) {
      toast.error('Quantity must be greater than 0');
      return;
    }

    const expiryDate = new Date(formData.expiryDate);
    const now = new Date();

    if (expiryDate <= new Date(now.getTime() + 3600000)) {
      toast.error('Expiry date must be at least 1 hour in the future');
      return;
    }

    setLoading(true);

    try {
      await createDonation({
        foodType: formData.foodType.toLowerCase(),
        description: formData.description,
        quantity: parseFloat(formData.quantity),
        location: formData.location,
        expiryDate: expiryDate.toISOString(),
        contactInfo: formData.contactInfo,
        donorId: user.uid,
        donorName:
          user.displayName || user.email?.split('@')[0] || 'Anonymous',
        urgency: formData.urgency,
        tags: formData.tags,
        pickupInstructions: formData.pickupInstructions,
      });

      try {
        await sendDonationNotification({
          donorName:
            user.displayName || user.email?.split('@')[0] || 'Anonymous',
          donorEmail: user.email || '',
          foodType: formData.foodType,
          quantity: parseFloat(formData.quantity),
          location: formData.location,
        });
        toast.success('Donation created and notification sent!');
      } catch {
        toast.success('Donation created successfully!');
        toast('Email notification failed to send');
      }

      onSuccess();
    } catch (error) {
      console.error(error);
      toast.error('Failed to create donation');
    } finally {
      setLoading(false);
    }
  };

  const getMinDatetime = () => {
    const now = new Date();
    now.setHours(now.getHours() + 1);
    return now.toISOString().slice(0, 16);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
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

          {/* FOOD TYPE + PRIORITY */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">
                <Package className="inline h-4 w-4 mr-1" />
                Food Type *
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

            <div>
              <label className="block text-sm font-medium mb-2">
                <AlertTriangle className="inline h-4 w-4 mr-1" />
                Priority *
              </label>
              <select
                name="urgency"
                value={formData.urgency}
                onChange={handleInputChange}
                className="w-full px-3 py-3 border rounded-xl"
              >
                {urgencyLevels.map((u) => (
                  <option key={u.value} value={u.value}>
                    {u.label} - {u.description}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* DESCRIPTION */}
          <div>
            <label className="block text-sm font-medium mb-2">
              <FileText className="inline h-4 w-4 mr-1" />
              Description *
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
              <Tag className="inline h-4 w-4 mr-1" />
              Tags
            </label>
            <div className="flex flex-wrap gap-2">
              {commonTags.map((tag) => (
                <button
                  type="button"
                  key={tag}
                  onClick={() => handleTagToggle(tag)}
                  className={`px-3 py-2 rounded-full text-sm ${
                    formData.tags.includes(tag)
                      ? 'bg-green-500 text-white'
                      : 'bg-gray-100'
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

            <div className="cont">
              <div className="cont">
  <button
    type="submit"
    disabled={loading}
    className={loading ? 'animate-submit' : ''}
  >
    <span className="btn-text">
      {loading ? 'Success' : 'Create Donation'}
    </span>
  </button>
</div>

            </div>
          </div>

        </form>
      </div>
    </div>
  );
};

export default CreateDonationModal;
