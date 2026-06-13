import React, { useState, useRef } from "react";
import {
  X,
  Package,
  FileText,
  Tag,
  AlertTriangle,
  Camera,
  Clock,
  Thermometer,
  Sparkles,
  CheckCircle,
  Activity
} from "lucide-react";
import { useAuth } from "./context/AuthContext";
import { createDonation, analyzeFreshness } from "./services/donationService";
import toast from "react-hot-toast";
import "./CreateDonationModal.css";

const CreateDonationModal = ({ onClose, onSuccess }) => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [analyzing, setAnalyzing] = useState(false);
  const [aiResult, setAiResult] = useState(null);
  const fileInputRef = useRef(null);

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
    preparationTime: "",
    storageMethod: "Room Temperature",
    imagePreview: null,
    imageBase64: null,
    mimeType: null
  });

  const foodTypes = [
    "Vegetables", "Fruits", "Grains", "Dairy", "Prepared Meals",
    "Baked Goods", "Canned Foods", "Beverages", "Snacks", "Other",
  ];

  const storageMethods = ['Room Temperature', 'Refrigerated', 'Frozen', 'Hot Held'];

  const commonTags = [
    "Vegetarian", "Vegan", "Gluten-Free", "Organic", "Fresh",
    "Frozen", "Cooked", "Raw", "Halal", "Kosher", "Dairy-Free", "Nut-Free",
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

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        toast.error("Image size should be less than 5MB");
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData(p => ({
          ...p,
          imagePreview: reader.result,
          imageBase64: reader.result,
          mimeType: file.type
        }));
        setAiResult(null); // Reset AI result if image changes
      };
      reader.readAsDataURL(file);
    }
  };

  const triggerAnalyze = async () => {
    if (!formData.imageBase64) {
      toast.error("Please upload an image first.");
      return;
    }
    
    setAnalyzing(true);
    try {
      const result = await analyzeFreshness({
        imageBase64: formData.imageBase64,
        mimeType: formData.mimeType,
        preparationTime: formData.preparationTime || 0,
        storageMethod: formData.storageMethod
      });
      setAiResult(result);
      toast.success("AI Analysis Complete!");
    } catch (err) {
      toast.error(typeof err === 'string' ? err : "Analysis failed");
    } finally {
      setAnalyzing(false);
    }
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

    if (!aiResult) {
      toast.error("Please run the AI Freshness Analysis before publishing.");
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
      // Construction donation object for Backend API
      const donationPayload = {
        title: formData.foodType,
        foodType: formData.foodType.toLowerCase(),
        description: formData.description,
        quantity: qty,
        location: formData.location,
        expiryTime: expiry.toISOString(),
        contactInfo: formData.contactInfo,
        urgency: formData.urgency,
        tags: formData.tags,
        pickupInstructions: formData.pickupInstructions,
        donorId: user.uid || user.id,
        donorName: user.displayName || user.email?.split('@')[0] || "Donor",
        images: formData.imageBase64 ? [formData.imageBase64] : [],
        preparationTime: Number(formData.preparationTime) || 0,
        storageMethod: formData.storageMethod,
        // AI Fields
        freshnessScore: aiResult.freshnessScore,
        imageScore: aiResult.imageScore,
        foodCondition: aiResult.foodCondition,
        safeConsumptionHours: aiResult.safeConsumptionHours,
        recommendedRadius: aiResult.recommendedRadius,
        confidenceScore: aiResult.confidenceScore,
        aiNotes: aiResult.aiNotes
      };

      await createDonation(donationPayload);

      toast.success("Donation created successfully!");
      onSuccess();
    } catch (err) {
      console.error(err);
      toast.error(typeof err === 'string' ? err : "Failed to create donation");
    } finally {
      setLoading(false);
    }
  };

  const getMinDatetime = () => {
    const d = new Date();
    d.setHours(d.getHours() + 1);
    return d.toISOString().slice(0, 16);
  };

  const getConditionColor = (condition) => {
    switch (condition) {
      case 'Excellent': return 'text-green-600 bg-green-50 border-green-200';
      case 'Good': return 'text-blue-600 bg-blue-50 border-blue-200';
      case 'Needs Immediate Pickup': return 'text-yellow-600 bg-yellow-50 border-yellow-200';
      case 'High Risk': return 'text-orange-600 bg-orange-50 border-orange-200';
      case 'Unsafe': return 'text-red-600 bg-red-50 border-red-200';
      default: return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">

        {/* HEADER */}
        <div className="flex items-center justify-between p-6 border-b">
          <h2 className="text-2xl font-bold">Create Food Donation</h2>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-lg">
            <X />
          </button>
        </div>

        {/* FORM */}
        <form onSubmit={handleSubmit} className="p-6 space-y-8">

          {/* 01 DONATION DETAILS */}
          <div className="space-y-6">
            <h3 className="text-lg font-semibold border-b pb-2">01 Donation Details</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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

              <div>
                <label className="block text-sm font-medium mb-2">
                  <FileText className="inline h-4 w-4 mr-1" /> Description *
                </label>
                <input
                  type="text"
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  placeholder="Short description"
                  required
                  className="w-full px-3 py-3 border rounded-xl"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">Quantity (kg) *</label>
                <input
                  type="number"
                  name="quantity"
                  value={formData.quantity}
                  onChange={handleInputChange}
                  className="w-full px-3 py-3 border rounded-xl"
                  required
                />
              </div>
              <div className="col-span-2">
                <label className="block text-sm font-medium mb-2">Location *</label>
                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleInputChange}
                  placeholder="Pickup address"
                  className="w-full px-3 py-3 border rounded-xl"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">Expiry Date *</label>
                <input
                  type="datetime-local"
                  name="expiryDate"
                  value={formData.expiryDate}
                  onChange={handleInputChange}
                  min={getMinDatetime()}
                  className="w-full px-3 py-3 border rounded-xl"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Contact Email</label>
                <input
                  type="email"
                  name="contactInfo"
                  value={formData.contactInfo}
                  onChange={handleInputChange}
                  className="w-full px-3 py-3 border rounded-xl"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Tags</label>
              <div className="flex flex-wrap gap-2">
                {commonTags.map((tag) => (
                  <button
                    type="button"
                    key={tag}
                    onClick={() => handleTagToggle(tag)}
                    className={`px-3 py-2 rounded-full text-sm ${formData.tags.includes(tag)
                        ? "bg-green-500 text-white"
                        : "bg-gray-100"
                      }`}
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* 02 AI ANALYSIS */}
          <div className="space-y-6 bg-gray-50 p-6 rounded-2xl border">
            <h3 className="text-lg font-semibold border-b pb-2 flex items-center">
              <Sparkles className="h-5 w-5 mr-2 text-indigo-500" /> 02 AI Food Freshness Analysis
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Image Upload Area */}
              <div className="space-y-4">
                <label className="block text-sm font-medium">Food Image *</label>
                <div 
                  className="border-2 border-dashed rounded-xl p-4 flex flex-col items-center justify-center min-h-[200px] cursor-pointer hover:bg-gray-100 transition-colors relative overflow-hidden bg-white"
                  onClick={() => fileInputRef.current?.click()}
                >
                  <input 
                    type="file" 
                    ref={fileInputRef} 
                    onChange={handleImageUpload} 
                    accept="image/*" 
                    className="hidden" 
                  />
                  {formData.imagePreview ? (
                    <img src={formData.imagePreview} alt="Preview" className="absolute inset-0 w-full h-full object-cover" />
                  ) : (
                    <>
                      <Camera className="h-8 w-8 text-gray-400 mb-2" />
                      <p className="text-sm text-gray-500">Click to upload food image</p>
                    </>
                  )}
                </div>
              </div>

              {/* Prep & Storage Info */}
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">
                    <Clock className="inline h-4 w-4 mr-1 text-gray-500" /> Preparation Time (hours ago)
                  </label>
                  <input
                    type="number"
                    name="preparationTime"
                    value={formData.preparationTime}
                    onChange={handleInputChange}
                    placeholder="e.g. 2"
                    min="0"
                    className="w-full px-3 py-3 border rounded-xl"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">
                    <Thermometer className="inline h-4 w-4 mr-1 text-gray-500" /> Storage Method
                  </label>
                  <select
                    name="storageMethod"
                    value={formData.storageMethod}
                    onChange={handleInputChange}
                    className="w-full px-3 py-3 border rounded-xl"
                  >
                    {storageMethods.map(m => <option key={m} value={m}>{m}</option>)}
                  </select>
                </div>
                
                <button
                  type="button"
                  onClick={triggerAnalyze}
                  disabled={analyzing || !formData.imagePreview}
                  className={`w-full py-3 rounded-xl font-medium flex items-center justify-center transition-colors
                    ${formData.imagePreview && !analyzing ? 'bg-indigo-600 hover:bg-indigo-700 text-white' : 'bg-gray-200 text-gray-500 cursor-not-allowed'}`}
                >
                  {analyzing ? (
                    <><Activity className="animate-spin h-5 w-5 mr-2" /> Analyzing...</>
                  ) : (
                    <><Sparkles className="h-5 w-5 mr-2" /> Run AI Analysis</>
                  )}
                </button>
              </div>
            </div>

            {/* AI Result Area */}
            {aiResult && (
              <div className="mt-6 bg-white border rounded-xl p-4 animate-fade-in shadow-sm">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h4 className="font-semibold text-lg flex items-center">
                      Analysis Complete <CheckCircle className="h-5 w-5 text-green-500 ml-2" />
                    </h4>
                    <p className="text-sm text-gray-500 mt-1">{aiResult.aiNotes}</p>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-indigo-600">{aiResult.freshnessScore}<span className="text-base font-normal text-gray-400">/100</span></div>
                    <div className="text-xs font-medium text-gray-500 uppercase tracking-wider mt-1">Hybrid Score</div>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm">
                  <div className={`p-3 rounded-lg border ${getConditionColor(aiResult.foodCondition)}`}>
                    <span className="block text-xs font-semibold uppercase opacity-75 mb-1">Condition</span>
                    <span className="font-bold">{aiResult.foodCondition}</span>
                  </div>
                  <div className="p-3 bg-gray-50 rounded-lg border">
                    <span className="block text-xs font-semibold text-gray-500 uppercase mb-1">Safe Hours</span>
                    <span className="font-bold text-gray-800">{aiResult.safeConsumptionHours}h</span>
                  </div>
                  <div className="p-3 bg-gray-50 rounded-lg border">
                    <span className="block text-xs font-semibold text-gray-500 uppercase mb-1">Delivery Radius</span>
                    <span className="font-bold text-gray-800">{aiResult.recommendedRadius} km</span>
                  </div>
                  <div className="p-3 bg-gray-50 rounded-lg border">
                    <span className="block text-xs font-semibold text-gray-500 uppercase mb-1">AI Confidence</span>
                    <span className="font-bold text-gray-800">{aiResult.confidenceScore}%</span>
                  </div>
                </div>
                
                {aiResult.foodCondition === 'Unsafe' && (
                  <div className="mt-4 p-3 bg-red-50 text-red-700 rounded-lg border border-red-200 flex items-start text-sm">
                    <AlertTriangle className="h-5 w-5 mr-2 flex-shrink-0" />
                    <p><strong>Warning:</strong> This food has been marked as unsafe by the AI analysis and cannot be published. Please discard safely.</p>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* ACTIONS */}
          <div className="flex gap-3 pt-4 border-t">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-3 bg-gray-100 hover:bg-gray-200 rounded-xl font-medium transition-colors"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={loading || !aiResult || aiResult.foodCondition === 'Unsafe'}
              className="flex-1 py-3 bg-green-600 hover:bg-green-700 text-white rounded-xl font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Publishing..." : "Publish Donation"}
            </button>
          </div>

        </form>
      </div>
    </div>
  );
};

export default CreateDonationModal;
