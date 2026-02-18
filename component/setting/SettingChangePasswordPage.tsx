"use client";
import React from 'react';
import { ChevronLeft, EyeOff } from 'lucide-react';
import Link from 'next/link';

export default function SettingChangePasswordPage() {
  return (
    <div className="relative min-h-[80vh] flex flex-col">
      <Link href="/dashboard/settings" className="flex items-center gap-2 text-gray-700 hover:text-black mb-8">
        <ChevronLeft size={20} />
        <span className="font-medium">Change Password</span>
      </Link>

      {/* Decorative Background Pattern */}
      <div className="absolute inset-0 flex flex-col justify-between pointer-events-none opacity-20 overflow-hidden">
        <div className="w-[800px] h-[400px] bg-[#4f795a] rounded-full -mt-[200px] mx-auto"></div>
        <div className="w-[800px] h-[400px] bg-[#4f795a] rounded-full -mb-[200px] mx-auto"></div>
      </div>

      <div className="flex-1 flex items-center justify-center relative z-10">
        <div className="bg-white p-10 rounded-3xl shadow-xl w-full max-w-md border border-gray-100">
          <h2 className="text-2xl font-serif font-semibold text-gray-800 mb-8">Change Password</h2>
          
          <div className="space-y-6">
            <div className="relative">
              <label className="absolute -top-3 left-4 bg-white px-2 text-sm text-gray-500">Current Password</label>
              <input type="password" placeholder="********" className="text-gray-800 w-full p-4 border border-gray-200 rounded-xl focus:outline-none" />
            </div>
            
            <div className="relative">
              <label className="absolute -top-3 left-4 bg-white px-2 text-sm text-gray-500">New Password</label>
              <input type="password" placeholder="********" className="text-gray-800 w-full p-4 border border-gray-200 rounded-xl focus:outline-none" />
            </div>

            <div className="relative">
              <label className="absolute -top-3 left-4 bg-white px-2 text-sm text-gray-500">Confirm Password</label>
              <div className="flex items-center border border-gray-200 rounded-xl overflow-hidden pr-4">
                <input type="password" placeholder="********" className="text-gray-800 w-full p-4 focus:outline-none" />
                <EyeOff className="text-gray-400" size={20} />
              </div>
            </div>

            <button className="w-full bg-[#4f795a] text-white py-4 rounded-xl font-medium hover:bg-[#3d5e46] transition-all mt-4">
              Confirm
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}