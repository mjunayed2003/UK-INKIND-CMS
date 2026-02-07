"use client";
import React from 'react';
import { ChevronLeft, Plus, Edit2, Trash2 } from 'lucide-react';
import Link from 'next/link';

const faqData = [
  { id: 1, question: "Leslie Alexander", answer: "Lorem ipsum dolor sit amet consectetur. Nunc dui tincidunt mi amet diam malesuada et." },
  { id: 2, question: "Leslie Alexander", answer: "Lorem ipsum dolor sit amet consectetur. Nunc dui tincidunt mi amet diam malesuada et." },
  { id: 3, question: "Leslie Alexander", answer: "Lorem ipsum dolor sit amet consectetur. Nunc dui tincidunt mi amet diam malesuada et." },
  { id: 4, question: "Leslie Alexander", answer: "Lorem ipsum dolor sit amet consectetur. Nunc dui tincidunt mi amet diam malesuada et." },
  { id: 5, question: "Leslie Alexander", answer: "Lorem ipsum dolor sit amet consectetur. Nunc dui tincidunt mi amet diam malesuada et." },
];

export default function SettingFAQPage() {
  return (
    <div className="max-w-6xl">
      <div className="flex justify-between items-center mb-8">
        <Link href="/dashboard/settings" className="flex items-center gap-2 text-gray-700 hover:text-black">
          <ChevronLeft size={20} />
          <span className="font-medium">Update FAQ</span>
        </Link>
        
        <button className="flex items-center gap-2 bg-[#4f795a] text-white px-6 py-2 rounded-lg hover:bg-[#3d5e46] transition-all">
          <Plus size={18} className="border border-white rounded-full" /> Add FAQ
        </button>
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm">
        <table className="w-full text-left">
          <thead className="bg-gray-50 border-b border-gray-100">
            <tr>
              <th className="p-4 text-xs font-bold text-gray-600 uppercase">User ID</th>
              <th className="p-4 text-xs font-bold text-gray-600 uppercase">Questions</th>
              <th className="p-4 text-xs font-bold text-gray-600 uppercase">Answer</th>
              <th className="p-4 text-xs font-bold text-gray-600 uppercase text-center">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {faqData.map((faq, idx) => (
              <tr key={faq.id} className={idx === 1 ? "bg-green-50/50" : ""}>
                <td className="p-4 text-sm text-gray-600">{faq.id}</td>
                <td className="p-4 text-sm text-gray-800 font-medium">{faq.question}</td>
                <td className="p-4 text-sm text-gray-500 max-w-md">{faq.answer}</td>
                <td className="p-4">
                  <div className="flex justify-center gap-4">
                    <button className="text-gray-400 hover:text-[#4f795a]"><Edit2 size={18} /></button>
                    <button className="text-red-300 hover:text-red-500"><Trash2 size={18} /></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}