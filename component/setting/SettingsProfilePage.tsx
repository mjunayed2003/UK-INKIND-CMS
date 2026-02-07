"use client";
import React, { useState } from "react";
import Image from "next/image";
import { ChevronLeft, Edit3, Save, ChevronDown } from "lucide-react";
import Link from "next/link";

/* Country list (flag image + code only) */
const countries = [
    { iso: "us", code: "+1" },
    { iso: "bd", code: "+880" },
    { iso: "in", code: "+91" },
    { iso: "gb", code: "+44" },
    { iso: "au", code: "+61" },
];

export default function SettingProfilePage() {
    const [isEditing, setIsEditing] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const [selectedCountry, setSelectedCountry] = useState(countries[0]);
    const [phone, setPhone] = useState("5735353");

    return (
        <div className="max-w-5xl">
            {/* Header */}
            <div className="flex justify-between items-center mb-8">
                <Link
                    href="/dashboard/settings"
                    className="flex items-center gap-2 text-gray-700 hover:text-black"
                >
                    <ChevronLeft size={20} />
                    <span className="font-medium">Personal Information</span>
                </Link>

                <button
                    onClick={() => setIsEditing(!isEditing)}
                    className="flex items-center gap-2 bg-[#4f795a] text-white px-6 py-2 rounded-lg hover:bg-[#3d5e46] transition-all"
                >
                    {isEditing ? (
                        <>
                            <Save size={18} /> Save Change
                        </>
                    ) : (
                        <>
                            <Edit3 size={18} /> Edit Profile
                        </>
                    )}
                </button>
            </div>

            <div className="flex gap-8">
                {/* Profile Card */}
                <div className="w-1/3 bg-white rounded-2xl p-8 border border-gray-100 flex flex-col items-center shadow-sm h-fit">
                    <div className="relative w-32 h-32 mb-4">
                        <Image
                            src="/image/setting-profile.png"
                            alt="Profile"
                            fill
                            className="rounded-full object-cover border-4 border-white shadow-md"
                        />
                    </div>
                    <p className="text-gray-400 text-sm mb-1">Profile</p>
                    <h2 className="text-2xl font-bold text-gray-800">Admin</h2>
                </div>

                {/* Form */}
                <div className="flex-1 space-y-6">
                    {/* Name */}
                    <div>
                        <label className="block text-gray-500 text-sm mb-2">Name</label>
                        <input
                            type="text"
                            defaultValue="Tamim"
                            disabled={!isEditing}
                            className="w-full p-3 bg-white border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#4f795a] disabled:bg-gray-50"
                        />
                    </div>

                    {/* Email */}
                    <div>
                        <label className="block text-gray-500 text-sm mb-2">Email</label>
                        <input
                            type="email"
                            defaultValue="gddvc@gmail.com"
                            disabled={!isEditing}
                            className="w-full p-3 bg-white border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#4f795a] disabled:bg-gray-50"
                        />
                    </div>

                    {/* Phone */}
                    <div>
                        <label className="block text-gray-500 text-sm mb-2">
                            Phone Number
                        </label>

                        <div className="flex gap-2">
                            {/* Country Dropdown */}
                            <div className="relative">
                                <button
                                    type="button"
                                    disabled={!isEditing}
                                    onClick={() => setIsOpen(!isOpen)}
                                    className="flex items-center gap-2 bg-white border border-gray-200 px-3 py-3 rounded-lg min-w-[90px] disabled:bg-gray-50"
                                >
                                    <Image
                                        src={`https://flagcdn.com/w20/${selectedCountry.iso}.png`}
                                        alt="flag"
                                        width={20}
                                        height={15}
                                    />
                                    <span className="text-sm">{selectedCountry.code}</span>
                                    <ChevronDown size={14} />
                                </button>

                                {/* Dropdown list */}
                                {isOpen && isEditing && (
                                    <div className="absolute z-10 mt-2 w-full bg-white border border-gray-200 rounded-lg shadow-md">
                                        {countries.map((c) => (
                                            <div
                                                key={c.iso}
                                                onClick={() => {
                                                    setSelectedCountry(c);
                                                    setIsOpen(false);
                                                }}
                                                className="flex items-center gap-2 px-3 py-2 hover:bg-gray-100 cursor-pointer"
                                            >
                                                <Image
                                                    src={`https://flagcdn.com/w20/${c.iso}.png`}
                                                    alt="flag"
                                                    width={20}
                                                    height={15}
                                                />
                                                <span className="text-sm">{c.code}</span>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>

                            {/* Phone input */}
                            <input
                                type="text"
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                                disabled={!isEditing}
                                className="flex-1 p-3 bg-white border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#4f795a] disabled:bg-gray-50"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
