"use client";

import React, { useState, useEffect } from 'react';
import { Check, Edit3, Plus, Trash2, X, ChevronDown } from 'lucide-react';

// Types
interface Plan {
  id: string;
  name: string;
  price: string;
  period: string;
  tagline: string;
  features: string[];
  spots?: number;
  totalSpots?: number;
  visible: boolean;
}

const initialPlans: Plan[] = [
  {
    id: '1',
    name: 'Free',
    price: '0',
    period: '/6 months',
    tagline: 'For those facing financial hardship',
    features: ['Includes Prime Plan program', 'Limited availability'],
    spots: 10,
    totalSpots: 50,
    visible: true
  },
  {
    id: '2',
    name: 'The Main Plan',
    price: '45',
    period: '/month',
    tagline: 'Affordable entry to virtual EMDR therapy',
    features: ['4 sessions/month', 'Get Started'],
    visible: true
  },
  {
    id: '3',
    name: 'Prime Plan',
    price: '75',
    period: '/month',
    tagline: 'Best value for consistent healing',
    features: ['Includes homework', 'Progress tracking', 'Full program access'],
    visible: true
  },
  {
    id: '4',
    name: 'Hero Plan',
    price: '120',
    period: '/month',
    tagline: 'Support yourself and someone in need',
    features: ['Funds 1 Community Access monthly', 'Full Prime Plan access'],
    visible: true
  },
  {
    id: '5',
    name: 'Rockstar Plan',
    price: '950',
    period: '/month',
    tagline: 'Unlimited care, generous giving',
    features: ['Funds 2 community access plans', 'Unlimited care access'],
    visible: true
  }
];

export default function SubscriptionsPage() {
  const [plans, setPlans] = useState<Plan[]>(initialPlans);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<Plan | null>(null);

  // Handle opening the modal
  const handleEdit = (plan: Plan) => {
    setSelectedPlan(plan);
    setIsModalOpen(true);
  };

  // Handle saving changes from the modal
  const handleSaveChanges = (updatedPlan: Plan) => {
    setPlans((prevPlans) => 
      prevPlans.map((plan) => (plan.id === updatedPlan.id ? updatedPlan : plan))
    );
    setIsModalOpen(false);
    setSelectedPlan(null);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <section>
        <h1 className="text-2xl font-serif text-gray-800">Subscription Plans</h1>
        <p className="text-sm text-gray-500 font-light">Manage pricing tiers, features, and availability.</p>
      </section>

      {/* Plans Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {plans.map((plan) => (
          <div key={plan.id} className="bg-white p-6 rounded-[1.5rem] shadow-sm border border-gray-100 flex flex-col min-h-[550px]">
            <div className="flex-1">
              <span className="bg-[#f4faf7] text-[#2db394] px-3 py-1 rounded-full text-[10px] font-bold border border-[#2db394]/10 mb-4 inline-block uppercase">
                Active
              </span>
              
              <h3 className="text-[18px] font-serif font-bold text-gray-800 mb-2">{plan.name}</h3>
              
              <div className="flex items-baseline mb-3">
                <span className="text-3xl font-bold font-serif text-gray-800">£{plan.price}</span>
                <span className="text-[18px] text-gray-400 ml-1 font-serif">{plan.period}</span>
              </div>
              
              <p className="text-[18px] text-[#4f795a] font-serif leading-relaxed mb-6 italic">
                {plan.tagline}
              </p>

              {/* Progress Bar for Available Spots (Free Plan only) */}
              {plan.spots !== undefined && (
                <div className="mb-6 bg-[#f9f9f9] p-4 rounded-xl border border-gray-50">
                  <div className="flex justify-between text-[12px] font-bold text-gray-400 mb-2">
                    <span>Available Spots</span>
                    <span>{plan.totalSpots}</span>
                  </div>
                  <div className="w-full bg-gray-200 h-2 rounded-full overflow-hidden">
                    <div className="bg-[#4f795a] h-full w-[25%] rounded-full opacity-80"></div>
                  </div>
                </div>
              )}

              {/* Features List */}
              <ul className="space-y-4 mb-8">
                {plan.features.map((feature, idx) => (
                  <li key={idx} className="flex gap-3 text-[18px] text-gray-600 font-serif leading-tight">
                    <Check size={14} className="text-[#4f795a] flex-shrink-0 mt-1" />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>

            {/* Bottom Controls */}
            <div className="mt-auto space-y-6">
              <div className="flex items-center justify-between">
                <div className="text-[10px]">
                  <p className="font-bold text-gray-800">Plan Status</p>
                  <p className="text-gray-400 font-light">Visible to users</p>
                </div>
                {/* Toggle Switch */}
                <div className="w-10 h-5 bg-[#4f795a] rounded-full relative cursor-pointer">
                  <div className="absolute right-1 top-1 w-3 h-3 bg-white rounded-full"></div>
                </div>
              </div>

              <button 
                onClick={() => handleEdit(plan)}
                className="w-full py-3 border border-gray-100 rounded-xl flex items-center justify-center gap-2 text-sm font-bold text-gray-700 hover:bg-gray-50 transition-colors"
              >
                <Edit3 size={16} /> Edit Plan
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Edit Modal */}
      {isModalOpen && selectedPlan && (
        <EditPlanModal 
          plan={selectedPlan} 
          onSave={handleSaveChanges} 
          onClose={() => setIsModalOpen(false)} 
        />
      )}
    </div>
  );
}

// --- MODAL COMPONENT ---

interface EditPlanModalProps {
  plan: Plan;
  onSave: (updatedPlan: Plan) => void;
  onClose: () => void;
}

function EditPlanModal({ plan, onSave, onClose }: EditPlanModalProps) {
  // Local state for the form inputs
  const [formData, setFormData] = useState<Plan>({ ...plan });

  // Update text fields
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // --- Features Logic ---

  // Update a specific feature text
  const handleFeatureChange = (index: number, value: string) => {
    const newFeatures = [...formData.features];
    newFeatures[index] = value;
    setFormData(prev => ({ ...prev, features: newFeatures }));
  };

  // Add a new empty feature
  const handleAddFeature = () => {
    setFormData(prev => ({ ...prev, features: [...prev.features, "New Feature"] }));
  };

  // Delete a feature
  const handleDeleteFeature = (index: number) => {
    const newFeatures = formData.features.filter((_, i) => i !== index);
    setFormData(prev => ({ ...prev, features: newFeatures }));
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
      <div className="bg-white w-full max-w-[580px] rounded-3xl shadow-2xl p-8 relative animate-in fade-in zoom-in duration-200 flex flex-col max-h-[90vh]">
        <button onClick={onClose} className="absolute right-6 top-6 text-gray-400 hover:text-gray-600 z-10">
          <X size={24} />
        </button>

        <h2 className="text-xl font-serif text-gray-800 mb-8 flex-shrink-0">Edit {plan.name}</h2>

        <div className="space-y-6 overflow-y-auto pr-2 custom-scrollbar">
          <div className="grid grid-cols-2 gap-4 text-gray-800">
            <div className="space-y-2">
              <label className="text-sm font-serif">Plan Name</label>
              <input 
                name="name"
                type="text" 
                value={formData.name} 
                onChange={handleChange}
                className="w-full p-3 bg-white border border-gray-100 rounded-xl outline-none text-sm shadow-sm focus:border-[#4f795a]" 
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-serif">Tagline</label>
              <input 
                name="tagline"
                type="text" 
                value={formData.tagline} 
                onChange={handleChange}
                className="w-full p-3 bg-white border border-gray-100 rounded-xl outline-none text-sm shadow-sm focus:border-[#4f795a]" 
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-serif">Plan Price (£)</label>
              <input 
                name="price"
                type="text" 
                value={formData.price} 
                onChange={handleChange}
                className="w-full p-3 bg-white border border-gray-100 rounded-xl outline-none text-sm shadow-sm focus:border-[#4f795a]" 
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-serif">Period</label>
              <div className="relative">
                <select 
                  name="period"
                  value={formData.period}
                  onChange={handleChange}
                  className="w-full p-3 bg-white border border-gray-100 rounded-xl text-sm outline-none appearance-none pr-10 focus:border-[#4f795a]"
                >
                  <option value="/month">/month</option>
                  <option value="/year">/year</option>
                  <option value="/6 months">/6 months</option>
                </select>
                <ChevronDown className="absolute right-3 top-3 text-gray-400 pointer-events-none" size={18} />
              </div>
            </div>
          </div>

          {/* Features Section */}
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-sm font-serif text-gray-800">Features</h3>
              <button 
                onClick={handleAddFeature}
                className="bg-[#4f795a] text-white px-4 py-2 rounded-lg flex items-center gap-2 text-xs font-bold hover:bg-[#3d5e46] transition-colors"
              >
                <Plus size={16} /> Add Feature
              </button>
            </div>
            
            <div className="space-y-3">
              {formData.features.map((feature, i) => (
                <div key={i} className="flex items-center gap-3 animate-in fade-in slide-in-from-left-4 duration-300">
                  <input 
                    type="text" 
                    value={feature} 
                    onChange={(e) => handleFeatureChange(i, e.target.value)}
                    className="flex-1 p-3 bg-[#f9fbfa] border border-gray-100 rounded-xl text-sm text-gray-700 focus:border-[#4f795a] outline-none"
                  />
                  <button 
                    onClick={() => handleDeleteFeature(i)}
                    className="text-red-300 hover:text-red-500 p-2 transition-colors"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer Buttons */}
        <div className="grid grid-cols-2 gap-4 pt-6 mt-auto flex-shrink-0 bg-white border-t border-gray-50">
          <button 
            onClick={onClose} 
            className="py-3 bg-[#e9edf5] text-gray-700 rounded-xl font-bold font-serif hover:bg-gray-200 transition-colors"
          >
            Cancel
          </button>
          <button 
            onClick={() => onSave(formData)}
            className="py-3 bg-[#4f795a] text-white rounded-xl font-bold font-serif hover:bg-[#3d5e46] transition-colors"
          >
            Save Change
          </button>
        </div>
      </div>
    </div>
  );
}