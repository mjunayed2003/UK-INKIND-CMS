"use client";

import React, { useState } from 'react';
import { ChevronLeft, Eye, EyeOff } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

type RecoveryStep = 'email' | 'code' | 'reset';

export default function RecoverAccountPage() {
    const [step, setStep] = useState<RecoveryStep>('email');
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);


    return (
        <main className="flex flex-col min-h-screen lg:flex-row">
            {/* Left Side: Form Content */}
            <div className="flex flex-col justify-center w-full px-8 py-12 lg:w-1/2 bg-[#4f795a] text-white sm:px-16 lg:px-24">
                <div className="max-w-md mx-auto lg:mx-0 w-full">
                    <h1 className="mb-2 text-3xl  ">Recover Account</h1>
                    <p className="mb-10 text-sm font-light text-gray-200">
                        Enter your email and we will send you a recovery code
                    </p>

                    <form onSubmit={(e) => e.preventDefault()} className="space-y-6">
                        {/* STEP 1: Email Address */}
                        {step === 'email' && (
                            <>
                                <div>
                                    <label className="block mb-2 text-sm font-light">Email Address</label>
                                    <input
                                        type="email"
                                        placeholder="Enter your email address"
                                        className="w-full px-4 py-3 bg-[#5c8469] border border-white/20 rounded-md focus:outline-none focus:ring-1 focus:ring-white/40 placeholder:text-gray-300/50"
                                    />
                                </div>
                                <button
                                    onClick={() => setStep('code')}
                                    className="w-full py-3.5 font-bold text-black transition-colors bg-[#fbe5cd] rounded-lg hover:bg-[#f2d8bd]"
                                >
                                    Send Recovery Email
                                </button>
                                <div className="flex justify-center items-center gap-2 pt-4">
                                    <ChevronLeft size={16} />
                                    <button type="button" className="text-sm font-light hover:underline">Or continue with</button>
                                </div>
                            </>
                        )}

                        {/* STEP 2: Recovery Code */}
                        {step === 'code' && (
                            <>
                                <div>
                                    <label className="block mb-2 text-sm font-light">Recovery Code</label>
                                    <input
                                        type="text"
                                        placeholder="Recovery Code"
                                        className="w-full px-4 py-3 bg-[#5c8469] border border-white/20 rounded-md focus:outline-none focus:ring-1 focus:ring-white/40 placeholder:text-gray-300/50"
                                    />
                                </div>
                                <button
                                    onClick={() => setStep('reset')}
                                    className="w-full py-3.5 font-bold text-black transition-colors bg-[#fbe5cd] rounded-lg hover:bg-[#f2d8bd]"
                                >
                                    Next
                                </button>
                                <div className="text-center pt-2">
                                    <p className="text-sm font-light">
                                        Didn't receive the code? <button className="font-bold hover:underline">Resend</button>
                                    </p>
                                    <button onClick={() => setStep('email')} className="flex items-center justify-center gap-2 mt-6 mx-auto text-sm font-light hover:underline">
                                       <Link href="/login"> <ChevronLeft size={16} /> Back To Login</Link>
                                    </button>
                                </div>
                            </>
                        )}

                        {/* STEP 3: Reset Password */}
                        {step === 'reset' && (
                            <>
                                <div className="space-y-4">
                                    <div>
                                        <label className="block mb-2 text-sm font-light">New Password</label>
                                        <div className="relative">
                                            <input
                                                type={showPassword ? "text" : "password"}
                                                placeholder="Password"
                                                className="w-full px-4 py-3 bg-[#5c8469] border border-white/20 rounded-md focus:outline-none"
                                            />
                                            <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-3 text-white/60">
                                                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                            </button>
                                        </div>
                                    </div>
                                    <div>
                                        <label className="block mb-2 text-sm font-light">Confirm Password</label>
                                        <div className="relative">
                                            <input
                                                type={showConfirmPassword ? "text" : "password"}
                                                placeholder="Confirm Password"
                                                className="w-full px-4 py-3 bg-[#5c8469] border border-white/20 rounded-md focus:outline-none"
                                            />
                                            <button type="button" onClick={() => setShowConfirmPassword(!showConfirmPassword)} className="absolute right-3 top-3 text-white/60">
                                                {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                            </button>
                                        </div>
                                    </div>
                                </div>
                                <button
                                    className="w-full py-3.5 font-bold text-black transition-colors bg-[#fbe5cd] rounded-lg hover:bg-[#f2d8bd]"
                                >
                                    Set New Password
                                </button>
                                <button onClick={() => setStep('email')} className="flex items-center justify-center gap-2 mt-6 mx-auto text-sm font-light hover:underline">
                                     <Link href="/login"><ChevronLeft size={16} />Back To Login</Link>
                                </button>
                            </>
                        )}
                    </form>
                </div>
            </div>

            {/* Right Side: Logo Display */}
            <div className="items-center justify-center hidden w-full bg-white lg:flex lg:w-1/2">
                <div className="flex flex-col items-center text-center">
                    {/* 
                    Note: Replace '/logo.png' with your actual logo path.
                    I'm using a placeholder structure to match your image layout.
                   */}
                    <div className="relative w-[377px] h-[367px] mb-4">
                        {/* You would use an <Image /> component here with your specific file */}
                        <div className="flex items-center justify-center w-full h-full">
                            {/* SVG Placeholder for the Tree Logo */}
                            <Image
                                src="/image/logo.png"
                                alt="UK INKIND Logo"
                                className="object-contain"
                                width={377}
                                height={367}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}