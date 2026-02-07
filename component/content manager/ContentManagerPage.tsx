"use client";

import React, { useState } from 'react';
import { Upload, Eye, Trash2, Play, Music, X, Image as ImageIcon } from 'lucide-react';

type ContentType = 'Images' | 'Videos' | 'Audio';

export default function ContentManagerPage() {
  const [activeTab, setActiveTab] = useState<ContentType>('Images');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const tabs: ContentType[] = ['Images', 'Videos', 'Audio'];

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div className="flex justify-between items-start">
        <section>
          <h1 className="text-2xl font-serif text-gray-800">Content Manager</h1>
          <p className="text-gray-500 text-sm font-light">Upload and manage media assets for sessions and roadmaps.</p>
        </section>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="bg-[#4f795a] text-white px-6 py-3 rounded-xl flex items-center gap-2 font-medium hover:bg-[#3d5d45] transition-colors"
        >
          <Upload size={18} /> Upload Content
        </button>
      </div>

      {/* Tabs Section */}
      <div className="flex gap-8 border-b border-gray-200">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`pb-2 px-1 text-lg font-serif transition-all relative ${
              activeTab === tab ? "text-[#4f795a] border-b-2 border-[#4f795a]" : "text-gray-400"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Content Table */}
      <div className="bg-white rounded-[2rem] p-4 shadow-sm border border-gray-50 overflow-hidden">
        <table className="w-full text-left">
          <thead>
            <tr className="bg-[#e2e8e4] text-[#4f795a] font-serif rounded-xl overflow-hidden">
              <th className="px-6 py-4 font-bold rounded-l-xl">Preview</th>
              <th className="px-6 py-4 font-bold">Name</th>
              <th className="px-6 py-4 font-bold">Category</th>
              <th className="px-6 py-4 font-bold">Assigned To</th>
              <th className="px-6 py-4 font-bold text-center">Status</th>
              <th className="px-6 py-4 font-bold text-center rounded-r-xl">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {[1, 2].map((item) => (
              <tr key={item} className="text-gray-700 font-serif">
                <td className="px-6 py-6">
                  <div className="relative w-16 h-12 bg-gray-100 rounded-lg overflow-hidden flex items-center justify-center border border-gray-200 shadow-sm">
                    {activeTab === 'Images' && (
                       <img src="/image/image-1.png" alt="Preview" className="object-cover w-full h-full" />
                    )}
                    {activeTab === 'Videos' && (
                      <div className="relative w-full h-full">
                        <img src="/image/image-1.png" alt="Preview" className="object-cover w-full h-full brightness-75" />
                        <Play size={18} className="absolute inset-0 m-auto text-white fill-white" />
                      </div>
                    )}
                    {activeTab === 'Audio' && (
                      <div className="w-full h-full bg-white flex items-center justify-center">
                        <Music size={24} className="text-gray-400" />
                      </div>
                    )}
                  </div>
                </td>
                <td className="px-6 py-6 font-medium">Calm Forest Background</td>
                <td className="px-6 py-6 text-gray-500 font-sans">Background</td>
                <td className="px-6 py-6 text-gray-500 font-sans">Session 1-3</td>
                <td className="px-6 py-6 text-center">
                  <span className="bg-[#f4faf7] text-[#2db394] px-4 py-1 rounded-lg text-xs font-bold border border-[#2db394]/10">
                    Active
                  </span>
                </td>
                <td className="px-6 py-6">
                  <div className="flex items-center justify-center gap-4 text-[#4f795a]">
                    <button className="hover:opacity-70"><Eye size={20} /></button>
                    <button className="text-red-500 hover:opacity-70"><Trash2 size={20} /></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Upload Modal */}
      {isModalOpen && <UploadModal onClose={() => setIsModalOpen(false)} />}
    </div>
  );
}

// --- MODAL COMPONENT ---

function UploadModal({ onClose }: { onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
      <div className="bg-white w-full max-w-[580px] rounded-3xl shadow-2xl p-8 relative animate-in fade-in zoom-in duration-200">
        <button onClick={onClose} className="absolute right-6 top-6 text-gray-400 hover:text-gray-600">
          <X size={24} />
        </button>

        <h2 className="text-xl font-serif text-gray-800 mb-8">Upload New Content</h2>

        <div className="space-y-6">
          {/* File Upload Area */}
          <div className="flex items-center gap-6">
            <div className="w-32 h-32 bg-[#eef2ef] rounded-xl flex items-center justify-center border-2 border-dashed border-gray-200">
              <ImageIcon size={40} className="text-gray-300" />
            </div>
            <div className="flex-1 space-y-3">
              <p className="text-sm font-serif text-gray-500 italic">SVG, PNG, JPG, MP4 or MP3 (max. 10MB)</p>
              <div className="flex items-center gap-4">
                <button className="bg-[#4f795a]/80 text-white px-6 py-2 rounded-lg font-serif text-sm">Choose File</button>
                <span className="text-sm text-gray-400 font-serif">No File Chosen</span>
              </div>
            </div>
          </div>

          {/* Form Fields */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-serif">Name</label>
              <input type="text" placeholder="The Main Plan" className="w-full p-3 bg-white border border-gray-100 rounded-xl focus:ring-1 focus:ring-[#4f795a] outline-none text-sm shadow-sm" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-serif">Category</label>
              <input type="text" placeholder="Affordable entry to virtual EMDR therapy" className="w-full p-3 bg-white border border-gray-100 rounded-xl outline-none text-sm shadow-sm" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-serif">Status</label>
              <select className="w-full p-3 bg-[#f9fbfa] border border-gray-100 rounded-xl text-[#2db394] text-sm outline-none">
                <option>Active</option>
                <option>Inactive</option>
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-serif">Assigned To</label>
              <select className="w-full p-3 bg-white border border-gray-100 rounded-xl text-gray-500 text-sm outline-none">
                <option>Month</option>
                <option>Session 1</option>
              </select>
            </div>
          </div>

          {/* Buttons */}
          <div className="grid grid-cols-2 gap-4 pt-4">
            <button onClick={onClose} className="py-3 bg-[#e9edf5] text-gray-700 rounded-xl font-bold font-serif hover:bg-gray-200">Cancel</button>
            <button className="py-3 bg-[#4f795a]/80 text-white rounded-xl font-bold font-serif hover:bg-[#4f795a]">Save Change</button>
          </div>
        </div>
      </div>
    </div>
  );
}