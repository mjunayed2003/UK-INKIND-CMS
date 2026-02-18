"use client";

import React, { useState, useRef, ChangeEvent } from 'react';
import { Upload, Eye, Trash2, Play, Music, X, Image as ImageIcon } from 'lucide-react';

type ContentType = 'Images' | 'Videos' | 'Audio';

interface ContentItem {
  id: number;
  type: ContentType;
  name: string;
  category: string;
  assignedTo: string;
  status: string;
  preview: string;
}

// --- DEMO DATA ---
const initialData: ContentItem[] = [
  {
    id: 1,
    type: 'Images',
    name: 'Calm Forest Background',
    category: 'Background',
    assignedTo: 'Session 1-3',
    status: 'Active',
    preview: '/image/image-1.png' 
  },
  {
    id: 2,
    type: 'Videos',
    name: 'Intro Animation',
    category: 'Guide',
    assignedTo: 'Onboarding',
    status: 'Active',
    preview: '/image/image-1.png'
  },
  {
    id: 3,
    type: 'Audio',
    name: 'Soothing Rain',
    category: 'Ambience',
    assignedTo: 'Session 4',
    status: 'Active',
    preview: '/image/image-1.png'
  },
  {
    id: 4,
    type: 'Images',
    name: 'Mountain View',
    category: 'Thumbnail',
    assignedTo: 'Roadmap 2',
    status: 'Inactive',
    preview: '/image/image-1.png'
  }
];

export default function ContentManagerPage() {
  const [activeTab, setActiveTab] = useState<ContentType>('Images');
  const [contents, setContents] = useState<ContentItem[]>(initialData);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const tabs: ContentType[] = ['Images', 'Videos', 'Audio'];

  const filteredContent = contents.filter(item => item.type === activeTab);

  const handleDelete = (id: number) => {
    setContents(prev => prev.filter(item => item.id !== id));
  };

  const handleUpload = (newItem: ContentItem) => {
    setContents([newItem, ...contents]);
    setIsModalOpen(false);
  };

  return (
    <div className="space-y-6">
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

      <div className="flex gap-8 border-b border-gray-200">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`pb-2 px-1 text-lg font-serif transition-all relative ${
              activeTab === tab ? "text-[#4f795a] border-b-2 border-[#4f795a]" : "text-gray-800"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

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
            {filteredContent.length > 0 ? (
              filteredContent.map((item) => (
                <tr key={item.id} className="text-gray-700 font-serif">
                  <td className="px-6 py-6">
                    <div className="relative w-20 h-14 bg-gray-100 rounded-lg overflow-hidden flex items-center justify-center border border-gray-200 shadow-sm">
                      {item.type === 'Images' ? (
                         <img src={item.preview} alt="preview" className="w-full h-full object-cover" />
                      ) : item.type === 'Videos' ? (
                        <div className="relative w-full h-full bg-black flex items-center justify-center">
                           <Play size={18} className="text-white fill-white" />
                        </div>
                      ) : (
                        <div className="w-full h-full bg-white flex items-center justify-center">
                          <Music size={24} className="text-gray-400" />
                        </div>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-6 font-medium">{item.name}</td>
                  <td className="px-6 py-6 text-gray-500 font-sans">{item.category}</td>
                  <td className="px-6 py-6 text-gray-500 font-sans">{item.assignedTo}</td>
                  <td className="px-6 py-6 text-center">
                    <span className={`px-4 py-1 rounded-lg text-xs font-bold border ${item.status === 'Active' ? 'bg-[#f4faf7] text-[#2db394] border-[#2db394]/10' : 'bg-gray-100 text-gray-500'}`}>
                      {item.status}
                    </span>
                  </td>
                  <td className="px-6 py-6">
                    <div className="flex items-center justify-center gap-4 text-[#4f795a]">
                      <button className="hover:opacity-70"><Eye size={20} /></button>
                      <button 
                        onClick={() => handleDelete(item.id)}
                        className="text-red-500 hover:opacity-70 transition-opacity"
                      >
                        <Trash2 size={20} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={6} className="text-center py-12 text-gray-400 font-serif">
                  No {activeTab.toLowerCase()} found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {isModalOpen && (
        <UploadModal 
          activeTab={activeTab} 
          onClose={() => setIsModalOpen(false)} 
          onUpload={handleUpload}
        />
      )}
    </div>
  );
}

// --- UPLOAD MODAL ---

interface UploadModalProps {
  onClose: () => void;
  onUpload: (item: ContentItem) => void;
  activeTab: ContentType;
}

function UploadModal({ onClose, onUpload, activeTab }: UploadModalProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [formData, setFormData] = useState({
    name: '',
    category: '',
    assignedTo: 'Session 1',
    status: 'Active'
  });
  
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string>("");

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setSelectedFile(file);
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
      
      if (!formData.name) {
        setFormData(prev => ({ ...prev, name: file.name.split('.')[0] }));
      }
    }
  };

  const handleSubmit = () => {
    if (!formData.name || !formData.category) return;

    if (activeTab === 'Images' && !previewUrl) {
      alert("Please select an image");
      return;
    }

    const newItem: ContentItem = {
      id: Date.now(),
      type: activeTab,
      name: formData.name,
      category: formData.category,
      assignedTo: formData.assignedTo,
      status: formData.status,
      preview: previewUrl 
    };

    onUpload(newItem);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
      <div className="bg-white w-full max-w-[580px] rounded-3xl shadow-2xl p-8 relative animate-in fade-in zoom-in duration-200">
        <button onClick={onClose} className="absolute right-6 top-6 text-gray-400 hover:text-gray-600">
          <X size={24} />
        </button>

        <h2 className="text-xl font-serif text-gray-800 mb-8">Upload New {activeTab.slice(0, -1)}</h2>

        <div className="space-y-6">
          <div className="flex items-center gap-6">
            <input 
              type="file" 
              ref={fileInputRef} 
              onChange={handleFileChange} 
              className="hidden" 
              accept={activeTab === 'Images' ? "image/*" : activeTab === 'Videos' ? "video/*" : "audio/*"}
            />
            
            <div 
              onClick={() => fileInputRef.current?.click()}
              className="w-32 h-32 bg-[#eef2ef] rounded-xl flex items-center justify-center border-2 border-dashed border-gray-200 hover:border-[#4f795a] transition-colors cursor-pointer overflow-hidden relative"
            >
              {previewUrl && activeTab === 'Images' ? (
                <img src={previewUrl} alt="Preview" className="w-full h-full object-cover" />
              ) : (
                <ImageIcon size={40} className="text-gray-300" />
              )}
            </div>

            <div className="flex-1 space-y-3">
              <p className="text-sm font-serif text-gray-500 italic">
                {activeTab === 'Images' ? "JPG, PNG, SVG" : "MP4, MP3"} (max. 10MB)
              </p>
              <div className="flex items-center gap-4">
                <button 
                  onClick={() => fileInputRef.current?.click()}
                  className="bg-[#4f795a]/80 text-white px-6 py-2 rounded-lg font-serif text-sm hover:bg-[#4f795a]"
                >
                  Choose File
                </button>
                <span className="text-sm text-gray-400 font-serif truncate max-w-[150px]">
                  {selectedFile ? selectedFile.name : "No File Chosen"}
                </span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 text-gray-800">
            <div className="space-y-2">
              <label className="text-sm font-serif">Name</label>
              <input 
                type="text" 
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                placeholder="Content Name" 
                className="w-full p-3 bg-white border border-gray-100 rounded-xl focus:ring-1 focus:ring-[#4f795a] outline-none text-sm shadow-sm" 
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-serif">Category</label>
              <input 
                type="text" 
                value={formData.category}
                onChange={(e) => setFormData({...formData, category: e.target.value})}
                placeholder="e.g. Background" 
                className="w-full p-3 bg-white border border-gray-100 rounded-xl outline-none text-sm shadow-sm" 
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-serif">Status</label>
              <select 
                value={formData.status}
                onChange={(e) => setFormData({...formData, status: e.target.value})}
                className="w-full p-3 bg-[#f9fbfa] border border-gray-100 rounded-xl text-[#2db394] text-sm outline-none"
              >
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-serif">Assigned To</label>
              <select 
                value={formData.assignedTo}
                onChange={(e) => setFormData({...formData, assignedTo: e.target.value})}
                className="w-full p-3 bg-white border border-gray-100 rounded-xl text-gray-500 text-sm outline-none"
              >
                <option>Session 1</option>
                <option>Session 2</option>
                <option>Session 3</option>
                <option>General</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 pt-4">
            <button onClick={onClose} className="py-3 bg-[#e9edf5] text-gray-700 rounded-xl font-bold font-serif hover:bg-gray-200">Cancel</button>
            <button 
              onClick={handleSubmit}
              className="py-3 bg-[#4f795a]/80 text-white rounded-xl font-bold font-serif hover:bg-[#4f795a]"
            >
              Save Change
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}