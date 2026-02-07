"use client";

import { TrendingUp, Eye } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from 'recharts';
import StatsGrid from './StatsGrid';

const chartData = [{ name: 'Jun', value: 60 }, { name: 'Feb', value: 65 }, { name: 'Mar', value: 95 }, { name: 'Apr', value: 30 }, { name: 'May', value: 90 }, { name: 'Jun', value: 25 }];

export default function DashboardPage() {
  return (
    <>
      <section className="mb-8">
        <h1 className="text-3xl font-serif text-gray-800">System Overview</h1>
        <p className="text-gray-500 text-sm">Real-time monitoring of platform health and user activity</p>
      </section>

      <StatsGrid />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 my-8">
        <div className="lg:col-span-2 bg-white p-8 rounded-[2.5rem] shadow-sm border border-gray-50">
          <h3 className="text-2xl font-serif mb-1">Monthly Recurring Revenue</h3>
          <div className="flex items-center gap-4 mb-8">
            <span className="text-4xl font-bold font-serif">£156,910</span>
            <div className="flex items-center gap-1 text-[#4f795a]"><TrendingUp size={24} /><span className="text-lg font-bold">15%</span></div>
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
          <h3 className="text-2xl font-serif mb-6">Subscription Distribution</h3>
          <div className="space-y-8">
            {['Rockstar', 'Hero', 'Prime', 'Main', 'Free'].map((plan) => (
              <div key={plan} className="space-y-2">
                <div className="flex justify-between font-serif"><span>{plan}</span><span className="text-[#4f795a] font-bold underline">£45/Month</span></div>
                <div className="w-full bg-[#dbe4dd] h-3 rounded-full overflow-hidden"><div className="bg-[#4f795a] h-full w-[65%] rounded-full"></div></div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-white rounded-[2rem] p-8 shadow-sm">
        <div className="flex justify-end mb-4"><button className="font-serif underline">View all</button></div>
        <table className="w-full border-separate border-spacing-y-4">
          <thead>
            <tr className="bg-[#76977e] text-white font-serif">
              <th className="px-6 py-4 text-left rounded-l-2xl">User Name</th>
              <th className="px-6 py-4 text-left">Email</th>
              <th className="px-6 py-4 text-left">Subscription</th>
              <th className="px-6 py-4 text-left">Status</th>
              <th className="px-6 py-4 text-left rounded-r-2xl">Actions</th>
            </tr>
          </thead>
          <tbody>
            {['Active', 'Suspended', 'Active'].map((status, i) => (
              <tr key={i} className="text-sm font-serif">
                <td className="px-6 py-4">User1</td>
                <td className="px-6 py-4 text-gray-500 font-sans">user1@example.com</td>
                <td className="px-6 py-4"><span className="px-4 py-1.5 border border-[#4f795a]/20 text-[#2db394] rounded-lg">The Main Plan</span></td>
                <td className="px-6 py-4">
                  <span className={`px-5 py-1 rounded-xl border ${status === 'Active' ? 'bg-[#f4faf7] text-[#2db394]' : 'bg-[#fff5f5] text-[#f25c5c]'}`}>{status}</span>
                </td>
                <td className="px-6 py-4"><button className="flex items-center gap-2 text-[#4f795a]"><Eye size={16} /> View</button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}