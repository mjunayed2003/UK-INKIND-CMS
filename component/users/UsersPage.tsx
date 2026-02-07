"use client";

import  { useState } from 'react';
import { Search, Filter, Eye, X } from 'lucide-react';

// Mock Data
const usersData = Array(10).fill({
  id: "USER-1000",
  name: "User1",
  email: "user1@example.com",
  plan: "The Main Plan",
  subPlan: "Rockstar",
  type: "Psychologist",
  progress: 18,
  status: "Active",
  joined: "1/12/2026",
  lastActive: "1/13/2026",
  sessions: 13
});

export default function UsersPage() {
  const [selectedUser, setSelectedUser] = useState<any>(null);

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <section>
        <h1 className="text-2xl font-semibold text-gray-800 font-serif">User Monitoring</h1>
        <p className="text-gray-500 text-sm">View user progress and account details.</p>
      </section>

      {/* Search and Filter Bar */}
      <div className="bg-[#f2f6f3] p-4 rounded-2xl flex gap-4 items-center">
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
          <input 
            type="text" 
            placeholder="Search by username or email" 
            className="w-full pl-12 pr-4 py-3 bg-transparent border-none focus:ring-0 text-gray-600 placeholder:text-gray-400"
          />
        </div>
        <button className="bg-[#4f795a] text-white px-6 py-3 rounded-xl flex items-center gap-2 font-medium hover:bg-[#3d5d45] transition-colors">
          <Filter size={18} /> Filters
        </button>
      </div>

      {/* Users Table */}
      <div className="bg-white rounded-[2rem] p-6 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full border-separate border-spacing-y-4">
            <thead>
              <tr className="bg-[#76977e] text-white font-serif">
                <th className="px-6 py-4 font-normal text-left rounded-l-2xl">User Name</th>
                <th className="px-6 py-4 font-normal text-left">Email</th>
                <th className="px-6 py-4 font-normal text-left">Subscription</th>
                <th className="px-6 py-4 font-normal text-left">Roadmap Type</th>
                <th className="px-6 py-4 font-normal text-left">Session Progress</th>
                <th className="px-6 py-4 font-normal text-left">Status</th>
                <th className="px-6 py-4 font-normal text-left rounded-r-2xl">Actions</th>
              </tr>
            </thead>
            <tbody>
              {usersData.map((user, index) => (
                <tr key={index} className="text-[#333] font-serif group">
                  <td className="px-6 py-4">{user.name}</td>
                  <td className="px-6 py-4 text-gray-500 font-sans">{user.email}</td>
                  <td className="px-6 py-4">
                    <span className="px-4 py-1 border border-[#4f795a]/20 text-[#2db394] rounded-lg text-sm">
                      {user.plan}
                    </span>
                  </td>
                  <td className="px-6 py-4">{user.type}</td>
                  <td className="px-6 py-4">
                    <div className="w-32">
                      <span className="text-[10px] font-bold font-sans">{user.progress}%</span>
                      <div className="w-full bg-[#cbd5cc] h-2 rounded-full mt-1">
                        <div className="bg-[#4f795a] h-full rounded-full" style={{ width: `${user.progress}%` }}></div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-4 py-1 rounded-xl text-xs font-sans border ${
                      index % 2 === 0 ? 'bg-[#f4faf7] text-[#2db394] border-[#2db394]/10' : 'bg-[#fff5f5] text-[#f25c5c] border-[#f25c5c]/10'
                    }`}>
                      {index % 2 === 0 ? 'Active' : 'Suspended'}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <button 
                      onClick={() => setSelectedUser(user)}
                      className="flex items-center gap-2 text-[#4f795a] hover:opacity-70"
                    >
                      <div className="w-5 h-5 flex items-center justify-center">
                        <Eye />
                      </div>
                      <span className="font-sans font-medium text-sm">View</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* --- USER DETAILS MODAL --- */}
      {selectedUser && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
          <div className="bg-white w-[500px] rounded-2xl shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200">
            {/* Modal Header */}
            <div className="flex justify-between items-center p-6 border-b border-gray-100">
              <h2 className="text-xl font-bold text-[#2d3748]">User Details</h2>
              <button onClick={() => setSelectedUser(null)} className="text-gray-400 hover:text-gray-600">
                <X size={24} />
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-8 space-y-8">
              <div className="grid grid-cols-2 gap-y-8">
                <div>
                  <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">User ID</p>
                  <p className="font-bold text-[#2d3748]">{selectedUser.id}</p>
                </div>
                <div>
                  <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Email</p>
                  <p className="text-sm font-medium text-gray-600">{selectedUser.email}</p>
                </div>
                <div>
                  <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Subscription Plan</p>
                  <span className="px-3 py-1 bg-[#fff8e1] text-[#d4a017] rounded-full text-xs font-bold border border-[#fceebb]">
                    {selectedUser.subPlan}
                  </span>
                </div>
                <div>
                  <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Status</p>
                  <span className="px-3 py-1 bg-[#e8f5e9] text-[#2db394] rounded-full text-xs font-bold">
                    {selectedUser.status}
                  </span>
                </div>
                <div>
                  <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Roadmap Type</p>
                  <p className="text-sm font-medium text-gray-600 flex items-center gap-2">
                    👤 {selectedUser.type}
                  </p>
                </div>
                <div>
                  <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Joined Date</p>
                  <p className="text-sm font-medium text-gray-600">{selectedUser.joined}</p>
                </div>
                <div>
                  <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Last Active</p>
                  <p className="text-sm font-medium text-gray-600">{selectedUser.lastActive}</p>
                </div>
                <div>
                  <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Sessions Completed</p>
                  <p className="text-sm font-medium text-gray-600">{selectedUser.sessions}</p>
                </div>
              </div>

              {/* Progress Section */}
              <div className="space-y-2">
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Overall Progress</p>
                <div className="relative w-full bg-gray-100 h-3 rounded-full overflow-hidden">
                  <div className="bg-[#2b6cb0] h-full rounded-full" style={{ width: '96%' }}></div>
                  <span className="absolute right-10 top-1/2 -translate-y-1/2 text-[9px] text-white font-bold">96%</span>
                </div>
              </div>

              {/* Modal Footer */}
              <div className="flex justify-end pt-4">
                <button 
                  onClick={() => setSelectedUser(null)}
                  className="bg-[#4f795a] text-white px-8 py-2.5 rounded-lg font-bold hover:bg-[#3d5d45] transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}