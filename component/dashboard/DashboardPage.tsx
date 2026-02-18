"use client";

import { useState } from 'react';
import Link from 'next/link';
import { TrendingUp, Eye, X } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from 'recharts';
import StatsGrid from './StatsGrid';

const chartData = [{ name: 'Jun', value: 60 }, { name: 'Feb', value: 65 }, { name: 'Mar', value: 95 }, { name: 'Apr', value: 30 }, { name: 'May', value: 90 }, { name: 'Jun', value: 25 }];

// Mock data matches UsersPage structure
const dashboardUsers = [
  {
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
  },
  {
    id: "USER-1001",
    name: "User2",
    email: "user2@example.com",
    plan: "The Main Plan",
    subPlan: "Hero",
    type: "Psychologist",
    progress: 45,
    status: "Suspended",
    joined: "5/10/2025",
    lastActive: "1/10/2026",
    sessions: 8
  },
  {
    id: "USER-1002",
    name: "User3",
    email: "user3@example.com",
    plan: "The Main Plan",
    subPlan: "Prime",
    type: "Psychologist",
    progress: 92,
    status: "Active",
    joined: "12/01/2026",
    lastActive: "Now",
    sessions: 24
  },
  {
    id: "USER-1003",
    name: "User4",
    email: "user4@example.com",
    plan: "The Main Plan",
    subPlan: "Rockstar",
    type: "Coach",
    progress: 10,
    status: "Active",
    joined: "2/14/2026",
    lastActive: "Yesterday",
    sessions: 2
  }
];

export default function DashboardPage() {
  const [selectedUser, setSelectedUser] = useState<any>(null);

  return (
    <>
      <section className="mb-8">
        <h1 className="text-3xl font-serif text-gray-800">System Overview</h1>
        <p className="text-gray-500 text-sm">Real-time monitoring of platform health and user activity</p>
      </section>

      <StatsGrid />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 my-8">
        <div className="lg:col-span-2 bg-white p-8 rounded-[2.5rem] shadow-sm border border-gray-50">
          <h3 className="text-2xl font-serif mb-1 text-gray-800">Monthly Recurring Revenue</h3>
          <p className="text-gray-500 text-sm mb-6">Revenue trends over the last 6 months</p>
          <div className="flex items-center gap-4 mb-8">
            <span className="text-4xl font-bold font-serif text-gray-800">£156,910</span>
            <div className="flex items-center font-serif gap-1 text-[#497955]"><TrendingUp size={24} /><span className="text-lg font-bold">15%</span></div>
          </div>
          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData}>
                <defs><linearGradient id="g" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#4f795a" stopOpacity={0.2} /><stop offset="95%" stopColor="#4f795a" stopOpacity={0} /></linearGradient></defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#eee" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} dy={10} />
                <YAxis axisLine={false} tickLine={false} />
                <Area type="monotone" dataKey="value" stroke="#4f795a" strokeWidth={2} fill="url(#g)" dot={{ r: 5, fill: "#fff", stroke: "#4f795a", strokeWidth: 2 }} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-gray-50">
          <h3 className="text-2xl font-serif mb-1 text-gray-800">Subscription Distribution</h3>
          <p className="text-gray-500 text-sm mb-6">Current user breakdown across all plans</p>
          <div className="space-y-8">
            {['Rockstar', 'Hero', 'Prime', 'Main', 'Free'].map((plan) => (
              <div key={plan} className="space-y-2">
                <div className="flex justify-between font-serif"><span className='text-gray-500'>{plan}</span> <p className="text-2xl font-bold text-gray-500">
                  <span className="text-2xl font-normal text-gray-800 mr-2">89 User</span>
                  £45/Month
                </p>
                </div>
                <div className="w-full bg-[#dbe4dd] h-3 rounded-full overflow-hidden"><div className="bg-[#4f795a] h-full w-[65%] rounded-full"></div></div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-white rounded-[2rem] p-8 shadow-sm">
        <div className="flex justify-end mb-4">
          {/* View All Button navigates to Users Page */}
          <Link href="/dashboard/users" className="font-serif underline text-gray-800 hover:text-[#4f795a] transition-colors">
            View all
          </Link>
        </div>
        
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
              {dashboardUsers.map((user, i) => (
                <tr key={i} className="text-sm font-serif">
                  <td className="px-6 py-4 text-gray-500">{user.name}</td>
                  <td className="px-6 py-4 text-gray-500 font-sans">{user.email}</td>
                  <td className="px-6 py-4">
                    <span className="px-4 py-1.5 border border-[#4f795a]/20 text-[#2db394] rounded-lg">
                      {user.plan}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-gray-600">{user.type}</td>
                  <td className="px-6 py-4">
                    <div className="w-32">
                      <span className="text-[10px] font-bold font-sans block mb-1">{user.progress}%</span>
                      <div className="w-full bg-[#cbd5cc] h-2 rounded-full">
                        <div className="bg-[#4f795a] h-full rounded-full" style={{ width: `${user.progress}%` }}></div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-5 py-1 rounded-xl border ${user.status === 'Active' ? 'bg-[#f4faf7] text-[#2db394]' : 'bg-[#fff5f5] text-[#f25c5c]'}`}>
                      {user.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <button 
                      onClick={() => setSelectedUser(user)}
                      className="flex items-center gap-2 text-[#4f795a] hover:opacity-70"
                    >
                      <Eye size={16} /> View
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
            <div className="flex justify-between items-center p-6 border-b border-gray-100">
              <h2 className="text-xl font-bold text-[#2d3748]">User Details</h2>
              <button onClick={() => setSelectedUser(null)} className="text-gray-400 hover:text-gray-600">
                <X size={24} />
              </button>
            </div>

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

              <div className="space-y-2">
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Overall Progress</p>
                <div className="relative w-full bg-gray-100 h-3 rounded-full overflow-hidden">
                  <div className="bg-[#2b6cb0] h-full rounded-full" style={{ width: `${selectedUser.progress}%` }}></div>
                  <span className="absolute right-10 top-1/2 -translate-y-1/2 text-[9px] text-white font-bold">{selectedUser.progress}%</span>
                </div>
              </div>

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
    </>
  );
}