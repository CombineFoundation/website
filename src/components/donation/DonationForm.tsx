"use client";

import { useState } from "react";

const ChevronDown = () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="6 9 12 15 18 9" />
    </svg>
);

export default function DonationForm() {
    const [form, setForm] = useState({
        firstName: "",
        email: "",
        country: "",
        amount: "",
        lastName: "",
        phone: "",
        city: "",
        paymentMethod: "",
    });

    const handle = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
        setForm((p) => ({ ...p, [k]: e.target.value }));

    const fieldClass =
        "w-full px-4 py-3 rounded-lg border border-[#b0bec5] bg-white text-black text-sm placeholder-gray-400 outline-none focus:border-blue-400 transition-colors font-[inherit]";

    const selectClass =
        "w-full px-4 py-3 rounded-lg border border-[#b0bec5] bg-white text-sm outline-none focus:border-blue-400 transition-colors appearance-none cursor-pointer font-[inherit]";

    return (
        <div className="min-h-screen  flex items-center justify-center px-4 py-10" style={{ fontFamily: "'Segoe UI', sans-serif" }}>
            <div className="w-full 2xl:w-[80%]">

                {/* Title */}
                <h1 className="text-3xl md:text-4xl font-extrabold text-black tracking-tight mb-3">
                    Donation form
                </h1>
                <hr className="border-t border-[#b0bec5] mb-8" />

                {/* Two-col grid → single col on mobile */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-12 items-start">

                    {/* ── LEFT: Form ── */}
                    <div className="flex flex-col gap-3">
                        <input
                            className={fieldClass}
                            placeholder="First Name"
                            value={form.firstName}
                            onChange={handle("firstName")}
                        />
                        <input
                            className={fieldClass}
                            placeholder="Email"
                            type="email"
                            value={form.email}
                            onChange={handle("email")}
                        />

                        {/* Country */}
                        <div className="relative">
                            <select
                                className={`${selectClass} ${!form.country ? "text-gray-400" : "text-black"}`}
                                value={form.country}
                                onChange={handle("country")}
                            >
                                <option value="" disabled className="text-gray-400">Country</option>
                                <option value="PK" className="text-black">Pakistan</option>
                                <option value="US" className="text-black">United States</option>
                                <option value="UK" className="text-black">United Kingdom</option>
                                <option value="AE" className="text-black">UAE</option>
                            </select>
                            <span className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none flex items-center">
                                <ChevronDown />
                            </span>
                        </div>

                        <input
                            className={fieldClass}
                            placeholder="Amount"
                            type="number"
                            value={form.amount}
                            onChange={handle("amount")}
                        />
                        <input
                            className={fieldClass}
                            placeholder="Last Name"
                            value={form.lastName}
                            onChange={handle("lastName")}
                        />
                        <input
                            className={fieldClass}
                            placeholder="Phone Number"
                            type="tel"
                            value={form.phone}
                            onChange={handle("phone")}
                        />

                        {/* City */}
                        <div className="relative">
                            <select
                                className={`${selectClass} ${!form.city ? "text-gray-400" : "text-black"}`}
                                value={form.city}
                                onChange={handle("city")}
                            >
                                <option value="" disabled className="text-gray-400">City</option>
                                <option value="karachi" className="text-black">Karachi</option>
                                <option value="lahore" className="text-black">Lahore</option>
                                <option value="islamabad" className="text-black">Islamabad</option>
                                <option value="peshawar" className="text-black">Peshawar</option>
                                <option value="quetta" className="text-black">Quetta</option>
                            </select>
                            <span className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none flex items-center">
                                <ChevronDown />
                            </span>
                        </div>

                        {/* Payment Method */}
                        <div className="relative">
                            <select
                                className={`${selectClass} ${!form.paymentMethod ? "text-gray-400" : "text-black"}`}
                                value={form.paymentMethod}
                                onChange={handle("paymentMethod")}
                            >
                                <option value="" disabled className="text-gray-400">Payment Method</option>
                                <option value="card" className="text-black">Credit / Debit Card</option>
                                <option value="bank" className="text-black">Bank Transfer</option>
                                <option value="jazzcash" className="text-black">JazzCash</option>
                                <option value="easypaisa" className="text-black">EasyPaisa</option>
                            </select>
                            <span className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none flex items-center">
                                <ChevronDown />
                            </span>
                        </div>

                        {/* Donate button */}
                        <button
                            className="mt-1 w-full py-3.5 rounded-full text-white font-bold text-base  transition-all hover:opacity-90 hover:-translate-y-0.5 active:translate-y-0"
                            style={{
                                background: "linear-gradient(135deg, #0F3D6B 0%, #0061C3 33% ,#0061C3 66%, #0F3D6B 100%)",
                                boxShadow: "0 4px 14px rgba(13,59,122,0.35)",
                            }}
                        >
                            Donate
                        </button>
                    </div>

                    {/* ── RIGHT: Next Goal ── */}
                    <div className="flex flex-col items-center w-full">
                        <h2 className="text-2xl md:text-[1.65rem] font-bold text-black mb-2 text-center">
                            Next Goal
                        </h2>
                        <p className="text-sm text-gray-600 text-center leading-relaxed mb-6 ">
                            Lorem ipsum dolor sit amet consectetur adipiscing elit Ut et.
                        </p>

                        {/* Overlapping images */}
                        <div className="relative w-full max-w-[420px] h-[320px] mb-7">

                            {/* Back image */}
                            <div className="absolute left-0 top-0 w-[42%] h-[210px] rounded-md overflow-hidden shadow-md z-10">
                                <img
                                    src="/donation/df1.png"
                                    alt="Community event"
                                    className="w-full h-full object-cover object-top"
                                />
                            </div>

                            {/* Front image */}
                            <div
                                className="absolute left-[28%] top-[55px] w-[58%] h-[260px] rounded-md overflow-hidden z-20"
                                style={{ boxShadow: "0 6px 18px rgba(0,0,0,0.22)" }}
                            >
                                <img
                                    src="/donation/donation.png"
                                    alt="Community gathering"
                                    className="w-full h-full object-cover object-top"
                                />
                            </div>

                        </div>

                        {/* Progress */}
                        <div className="w-full">
                            <div className="flex justify-between mb-2">
                                <span className="font-bold text-base text-black">Progress</span>
                                <span className="font-bold text-base text-black">75%</span>
                            </div>
                            <div className="w-full h-2.5 bg-gray-300 rounded-full overflow-hidden">
                                <div
                                    className="h-full w-3/4 rounded-full"
                                    style={{ background: "linear-gradient(90deg, #e8390e, #f97316)" }}
                                />
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}