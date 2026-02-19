"use client";

import React, { useState } from 'react';
import { ChevronLeft, Eye, X } from 'lucide-react';
import Link from 'next/link';

// --- Types ---
type Status = 'Pending' | 'Approved' | 'Cancelled';

interface UserRequest {
  id: string;
  name: string;
  email: string;
  joinedDate: string;
  status: Status;
  assessment: {
    phq9: { level: string; score: string };
    gad7: { level: string; score: string };
    des2: { score: string };
  };
}

// --- Mock Data ---
const initialUsers: UserRequest[] = [
  {
    id: "User-213",
    name: "Leslie Alexander",
    email: "user1@example.com",
    joinedDate: "Nov 13, 2025",
    status: "Pending",
    assessment: {
      phq9: { level: "Minimal", score: "0/27" },
      gad7: { level: "Minimal", score: "0/21" },
      des2: { score: "0.0%" },
    }
  },
  {
    id: "User-214",
    name: "Ronald Richards",
    email: "ronald@example.com",
    joinedDate: "Nov 14, 2025",
    status: "Approved",
    assessment: {
      phq9: { level: "Moderate", score: "12/27" },
      gad7: { level: "Severe", score: "16/21" },
      des2: { score: "15.0%" },
    }
  },
  {
    id: "User-215",
    name: "Jane Cooper",
    email: "jane@example.com",
    joinedDate: "Nov 15, 2025",
    status: "Cancelled",
    assessment: {
      phq9: { level: "None", score: "0/27" },
      gad7: { level: "None", score: "0/21" },
      des2: { score: "0.0%" },
    }
  },
  {
    id: "User-216",
    name: "Robert Fox",
    email: "robert@example.com",
    joinedDate: "Nov 16, 2025",
    status: "Pending",
    assessment: {
      phq9: { level: "Minimal", score: "3/27" },
      gad7: { level: "Mild", score: "6/21" },
      des2: { score: "2.5%" },
    }
  },
];

export default function AccessPage() {
  const [users, setUsers] = useState<UserRequest[]>(initialUsers);
  const [selectedUser, setSelectedUser] = useState<UserRequest | null>(null);

  // Handle Status Update
  const handleStatusChange = (userId: string, newStatus: Status) => {
    setUsers(users.map(user => 
      user.id === userId ? { ...user, status: newStatus } : user
    ));
    setSelectedUser(null); // Close modal
  };

  return (
    <div className="min-h-screen bg-[#fdfbf7] p-4 md:p-8 font-serif text-gray-800">
      
      {/* Header */}
      <div className="flex items-center gap-2 mb-8 text-gray-700">
        <Link href="/dashboard" className="hover:opacity-70 flex items-center gap-2">
          <ChevronLeft size={20} />
          <span className="text-lg font-medium">Access</span>
        </Link>
      </div>

      {/* Main Table Card */}
      <div className="bg-white rounded-[1.5rem] shadow-sm border border-gray-100 overflow-hidden min-h-[600px]">
        {/* Table Container for Responsiveness */}
        <div className="overflow-x-auto">
          {/* Table Header */}
          <div className="grid grid-cols-12 px-8 py-6 border-b border-gray-100 bg-[#fbfbfb] min-w-[600px]">
            <div className="col-span-5 text-sm font-bold text-gray-500 uppercase tracking-wider">User Name</div>
            <div className="col-span-5 text-sm font-bold text-gray-500 uppercase tracking-wider">Status</div>
            <div className="col-span-2 text-sm font-bold text-gray-500 uppercase tracking-wider text-right">Action</div>
          </div>

          {/* Table Body */}
          <div className="divide-y divide-gray-50 min-w-[600px]">
            {users.map((user) => (
              <div 
                key={user.id} 
                className={`grid grid-cols-12 px-8 py-6 items-center transition-colors hover:bg-gray-50 ${user.status === 'Approved' ? 'bg-[#f4faf7]/50' : ''}`}
              >
                <div className="col-span-5 font-medium text-gray-700">{user.name}</div>
                <div className="col-span-5">
                  <span className={`text-sm font-medium ${
                    user.status === 'Approved' ? 'text-[#4f795a]' : 
                    user.status === 'Cancelled' ? 'text-red-500' : 'text-gray-600'
                  }`}>
                    {user.status}
                  </span>
                </div>
                <div className="col-span-2 flex justify-end">
                  <button 
                    onClick={() => setSelectedUser(user)}
                    className="w-8 h-8 rounded-full bg-[#4f795a] text-white flex items-center justify-center hover:bg-[#3d5e46] transition-all shadow-sm"
                  >
                    <Eye size={14} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* --- USER DETAILS MODAL (RESPONSIVE FIX) --- */}
      {selectedUser && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
          {/* Added max-h-[90vh] and flex-col to keep header/footer visible */}
          <div className="bg-white w-full max-w-[650px] max-h-[90vh] flex flex-col rounded-3xl shadow-2xl animate-in fade-in zoom-in duration-200">
            
            {/* Modal Header (Fixed at Top) */}
            <div className="flex justify-between items-center px-8 py-6 border-b border-gray-100 flex-shrink-0">
              <h2 className="text-xl font-bold text-gray-800">User Details</h2>
              <button onClick={() => setSelectedUser(null)} className="text-gray-400 hover:text-gray-600">
                <X size={24} />
              </button>
            </div>

            {/* Modal Content Wrapper (Scrollable) */}
            <div className="overflow-y-auto p-6 md:p-8 space-y-6">
              
              {/* User Basic Info */}
              <div className="bg-[#fffcf7] p-6 rounded-2xl border border-[#f7f0e6]">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <p className="text-gray-400 text-[10px] mb-1 uppercase tracking-wide font-bold">User ID</p>
                    <p className="text-gray-700 font-medium">{selectedUser.id}</p>
                  </div>
                  <div>
                    <p className="text-gray-400 text-[10px] mb-1 uppercase tracking-wide font-bold">Email</p>
                    <p className="text-gray-800 font-serif break-all">{selectedUser.email}</p>
                  </div>
                  <div className="sm:col-span-2">
                    <p className="text-gray-400 text-[10px] mb-1 uppercase tracking-wide font-bold">Joined Date</p>
                    <p className="text-gray-700 font-medium">{selectedUser.joinedDate}</p>
                  </div>
                </div>
              </div>

              {/* Assessment Results Card */}
              <div className="bg-[#fff9f2] border border-[#fceebb] rounded-xl p-6">
                <h3 className="text-lg font-serif text-gray-700 mb-4 border-b border-[#ebdcc7] pb-2">Your Assessment Results</h3>
                
                <div className="space-y-4">
                  <div>
                    <p className="text-[#8c9bab] text-sm font-medium">Depression (PHQ-9)</p>
                    <p className="text-sm text-gray-800">
                      <span className="font-bold">{selectedUser.assessment.phq9.level}</span>
                      <span className="text-[#8c9bab]"> (Score: {selectedUser.assessment.phq9.score})</span>
                    </p>
                    <div className="h-[1px] bg-[#ebdcc7] mt-2 w-full"></div>
                  </div>
                  <div>
                    <p className="text-[#8c9bab] text-sm font-medium">Anxiety (GAD-7)</p>
                    <p className="text-sm text-gray-800">
                      <span className="font-bold">{selectedUser.assessment.gad7.level}</span>
                      <span className="text-[#8c9bab]"> (Score: {selectedUser.assessment.gad7.score})</span>
                    </p>
                    <div className="h-[1px] bg-[#ebdcc7] mt-2 w-full"></div>
                  </div>
                  <div>
                    <p className="text-[#8c9bab] text-sm font-medium">Dissociation (DES-II)</p>
                    <p className="text-sm text-gray-800">
                      <span className="font-bold">Score: {selectedUser.assessment.des2.score}</span>
                    </p>
                  </div>
                </div>
              </div>

              {/* Immediate Support Available Card */}
              <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm">
                <h3 className="text-lg font-serif text-[#8c9bab] mb-4">Immediate Support Available</h3>
                
                <div className="space-y-5">
                  {[
                    { title: "Samaritans (24/7)", subtitle: "Free emotional support", contact: "Call: 116 123" },
                    { title: "NHS Crisis Line", subtitle: "Urgent mental health support", contact: "Call: 111" },
                    { title: "SHOUT Crisis Text Line", subtitle: "24/7 text support", contact: 'Text "SHOUT" to 85258' },
                  ].map((item, idx) => (
                    <div key={idx}>
                      <p className="font-bold text-gray-800 text-sm">{item.title}</p>
                      <p className="text-xs text-gray-500 mt-0.5">{item.subtitle}</p>
                      <p className="text-xs text-gray-800 font-medium mt-1">{item.contact}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Modal Actions Footer (Fixed at Bottom) */}
            <div className="p-6 border-t border-gray-100 flex gap-4 flex-shrink-0 bg-white rounded-b-3xl">
              <button 
                onClick={() => handleStatusChange(selectedUser.id, 'Cancelled')}
                className="flex-1 py-3 bg-white border border-gray-200 text-gray-700 rounded-xl font-serif font-bold hover:bg-gray-50 transition-colors shadow-sm"
              >
                Cancel
              </button>
              <button 
                onClick={() => handleStatusChange(selectedUser.id, 'Approved')}
                className="flex-1 py-3 bg-[#4f795a] text-white rounded-xl font-serif font-bold hover:bg-[#3d5e46] transition-colors shadow-md"
              >
                Approve
              </button>
            </div>

          </div>
        </div>
      )}
    </div>
  );
}