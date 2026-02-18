"use client";

import React, { useState } from 'react';
import { ChevronLeft, Plus, Edit2, Trash2, X, Save } from 'lucide-react';
import Link from 'next/link';

// Type definition
interface FaqItem {
  id: number;
  question: string;
  answer: string;
}

// Initial Mock Data
const initialFaqData: FaqItem[] = [
  { id: 1, question: "How do I reset my password?", answer: "Go to settings and click on reset password." },
  { id: 2, question: "Can I upgrade my subscription?", answer: "Yes, you can upgrade anytime from the billing page." },
  { id: 3, question: "Where can I view my reports?", answer: "Reports are available in the dashboard overview tab." },
];

export default function SettingFAQPage() {
  // --- State Management ---
  const [faqs, setFaqs] = useState<FaqItem[]>(initialFaqData);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentFaq, setCurrentFaq] = useState<FaqItem | null>(null); // Null = Add Mode, Object = Edit Mode
  
  // Form State
  const [formData, setFormData] = useState({ question: '', answer: '' });

  // --- Handlers ---

  // Open Modal for Adding
  const handleOpenAdd = () => {
    setCurrentFaq(null);
    setFormData({ question: '', answer: '' });
    setIsModalOpen(true);
  };

  // Open Modal for Editing
  const handleOpenEdit = (faq: FaqItem) => {
    setCurrentFaq(faq);
    setFormData({ question: faq.question, answer: faq.answer });
    setIsModalOpen(true);
  };

  // Handle Delete
  const handleDelete = (id: number) => {
    if (confirm("Are you sure you want to delete this FAQ?")) {
      setFaqs(faqs.filter(item => item.id !== id));
    }
  };

  // Handle Save (Add or Update)
  const handleSave = () => {
    if (!formData.question || !formData.answer) return alert("Please fill in both fields");

    if (currentFaq) {
      // Update Existing
      setFaqs(faqs.map(item => 
        item.id === currentFaq.id 
          ? { ...item, question: formData.question, answer: formData.answer } 
          : item
      ));
    } else {
      // Add New
      const newId = faqs.length > 0 ? Math.max(...faqs.map(f => f.id)) + 1 : 1;
      setFaqs([...faqs, { id: newId, question: formData.question, answer: formData.answer }]);
    }
    setIsModalOpen(false);
  };

  return (
    <div className="max-w-6xl ">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <Link href="/dashboard/settings" className="flex items-center gap-2 text-gray-700 hover:text-black transition-colors">
          <ChevronLeft size={20} />
          <span className="font-medium">Update FAQ</span>
        </Link>
        
        <button 
          onClick={handleOpenAdd}
          className="flex items-center gap-2 bg-[#4f795a] text-white px-6 py-2.5 rounded-xl hover:bg-[#3d5e46] transition-all shadow-sm font-medium"
        >
          <Plus size={18} /> Add FAQ
        </button>
      </div>

      {/* Table Section */}
      <div className="bg-white rounded-[1.5rem] border border-gray-100 overflow-hidden shadow-sm">
        <table className="w-full text-left">
          <thead className="bg-[#f8faf9] border-b border-gray-100">
            <tr>
              <th className="p-5 text-xs font-bold text-gray-500 uppercase tracking-wider font-serif">ID</th>
              <th className="p-5 text-xs font-bold text-gray-500 uppercase tracking-wider font-serif">Questions</th>
              <th className="p-5 text-xs font-bold text-gray-500 uppercase tracking-wider font-serif">Answer</th>
              <th className="p-5 text-xs font-bold text-gray-500 uppercase tracking-wider text-center font-serif">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {faqs.length > 0 ? (
              faqs.map((faq) => (
                <tr key={faq.id} className="hover:bg-gray-50 transition-colors">
                  <td className="p-5 text-sm text-gray-400 font-sans">#{faq.id}</td>
                  <td className="p-5 text-sm text-gray-800 font-medium font-serif">{faq.question}</td>
                  <td className="p-5 text-sm text-gray-500 max-w-md font-sans leading-relaxed">{faq.answer}</td>
                  <td className="p-5">
                    <div className="flex justify-center gap-3">
                      <button 
                        onClick={() => handleOpenEdit(faq)}
                        className="p-2 text-gray-400 hover:text-[#4f795a] hover:bg-[#4f795a]/10 rounded-lg transition-all"
                        title="Edit"
                      >
                        <Edit2 size={18} />
                      </button>
                      <button 
                        onClick={() => handleDelete(faq.id)}
                        className="p-2 text-red-300 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all"
                        title="Delete"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={4} className="p-8 text-center text-gray-400">No FAQs found. Add one to get started.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* --- MODAL --- */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
          <div className="bg-white w-full max-w-lg rounded-2xl shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200">
            
            {/* Modal Header */}
            <div className="flex justify-between items-center px-6 py-4 border-b border-gray-100">
              <h3 className="text-lg font-serif font-bold text-gray-800">
                {currentFaq ? 'Edit FAQ' : 'Add New FAQ'}
              </h3>
              <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-gray-600 transition-colors">
                <X size={20} />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700 font-serif">Question</label>
                <input 
                  type="text" 
                  value={formData.question}
                  onChange={(e) => setFormData({ ...formData, question: e.target.value })}
                  placeholder="e.g. How do I change my email?"
                  className="w-full p-3 text-gray-800 bg-white border border-gray-200 rounded-xl focus:ring-1 focus:ring-[#4f795a] focus:border-[#4f795a] outline-none text-sm transition-all"
                />
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700 font-serif">Answer</label>
                <textarea 
                  rows={4}
                  value={formData.answer}
                  onChange={(e) => setFormData({ ...formData, answer: e.target.value })}
                  placeholder="Write the answer here..."
                  className="w-full p-3 text-gray-800 bg-white border border-gray-200 rounded-xl focus:ring-1 focus:ring-[#4f795a] focus:border-[#4f795a] outline-none text-sm transition-all resize-none"
                />
              </div>
            </div>

            {/* Modal Footer */}
            <div className="flex justify-end gap-3 px-6 py-4 bg-gray-50 border-t border-gray-100">
              <button 
                onClick={() => setIsModalOpen(false)}
                className="px-5 py-2.5 rounded-xl text-gray-600 font-medium hover:bg-gray-200 transition-colors text-sm"
              >
                Cancel
              </button>
              <button 
                onClick={handleSave}
                className="px-5 py-2.5 rounded-xl bg-[#4f795a] text-white font-medium hover:bg-[#3d5e46] transition-colors text-sm flex items-center gap-2 shadow-sm"
              >
                <Save size={16} /> Save Changes
              </button>
            </div>

          </div>
        </div>
      )}
    </div>
  );
}