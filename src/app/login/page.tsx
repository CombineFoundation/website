"use client";

import React, { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Lock, Mail, AlertCircle, Loader2, ArrowRight } from "lucide-react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      
      // On success, set a session cookie for the middleware
      const token = await userCredential.user.getIdToken();
      document.cookie = `session=${token}; path=/; max-age=3600; SameSite=Lax`;
      
      router.push("/admin");
    } catch (err: any) {
      console.error(err);
      // Friendly error messages as requested
      switch (err.code) {
        case "auth/user-not-found":
          setError("Account not found. Please check your email.");
          break;
        case "auth/wrong-password":
          setError("Incorrect password. Please try again.");
          break;
        case "auth/invalid-email":
          setError("Please enter a valid email address.");
          break;
        case "auth/too-many-requests":
          setError("Too many failed attempts. Please try again later.");
          break;
        case "auth/network-request-failed":
          setError("Network error. Please check your internet connection.");
          break;
        default:
          setError("Failed to sign in. Please check your credentials.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F8FAFC] p-4 font-sans">
      <div className="max-w-md w-full">
        {/* Branding */}
        <div className="text-center mb-10">
          <Link href="/" className="inline-block mb-6 transition-transform hover:scale-105">
            <div className="bg-[#134981] p-4 rounded-2xl shadow-lg">
              <Image 
                src="/logo.png" 
                alt="Combine Foundation" 
                width={200} 
                height={60} 
                className="object-contain brightness-0 invert"
              />
            </div>
          </Link>
          <h1 className="text-3xl font-extrabold text-[#134981] tracking-tight">Admin Portal</h1>
          <p className="text-gray-500 mt-2 font-medium">Restricted Access • Authorized Personnel Only</p>
        </div>

        {/* Login Card */}
        <div className="bg-white rounded-[2rem] shadow-2xl border border-gray-100 overflow-hidden">
          {/* Accent Bar */}
          <div className="h-2 bg-gradient-to-r from-[#134981] via-[#F97316] to-[#134981]"></div>
          
          <div className="p-10">
            <form onSubmit={handleLogin} className="space-y-6">
              {error && (
                <div className="bg-red-50 border-l-4 border-red-500 p-4 flex items-start gap-3 rounded-r-xl animate-in fade-in slide-in-from-top-4 duration-300">
                  <AlertCircle className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
                  <p className="text-sm text-red-700 font-semibold">{error}</p>
                </div>
              )}

              <div className="space-y-2">
                <label className="text-sm font-bold text-[#134981] ml-1 uppercase tracking-wider">Email Address</label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400 group-focus-within:text-[#F97316] transition-colors">
                    <Mail className="w-5 h-5" />
                  </div>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="block w-full pl-12 pr-4 py-4 bg-gray-50 border-2 border-gray-100 rounded-2xl text-gray-900 focus:ring-0 focus:border-[#F97316] transition-all outline-none font-medium"
                    placeholder="admin@combinefoundation.com"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-bold text-[#134981] ml-1 uppercase tracking-wider">Password</label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400 group-focus-within:text-[#F97316] transition-colors">
                    <Lock className="w-5 h-5" />
                  </div>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="block w-full pl-12 pr-4 py-4 bg-gray-50 border-2 border-gray-100 rounded-2xl text-gray-900 focus:ring-0 focus:border-[#F97316] transition-all outline-none font-medium"
                    placeholder="••••••••"
                    required
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-[#134981] hover:bg-[#0e3661] text-white py-4 rounded-2xl font-bold text-lg shadow-[0_10px_20px_-10px_rgba(19,73,129,0.5)] hover:shadow-[0_15px_25px_-10px_rgba(19,73,129,0.6)] transition-all transform hover:-translate-y-1 active:translate-y-0 disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center gap-2 group mt-4"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-6 h-6 animate-spin" />
                    <span>Verifying...</span>
                  </>
                ) : (
                  <>
                    <span>Sign In to Dashboard</span>
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform text-[#F97316]" />
                  </>
                )}
              </button>
            </form>
          </div>

          <div className="px-10 py-6 bg-gray-50 border-t border-gray-100 flex justify-between items-center">
            <Link href="/" className="text-xs font-bold text-gray-400 hover:text-[#134981] transition-colors flex items-center gap-1">
              <span className="text-lg">←</span> Back to Website
            </Link>
            <div className="flex gap-2">
              <div className="w-2 h-2 rounded-full bg-[#F97316]"></div>
              <div className="w-2 h-2 rounded-full bg-[#134981]"></div>
            </div>
          </div>
        </div>

        {/* Security Note */}
        <div className="mt-8 flex items-center justify-center gap-2 text-gray-400">
          <Lock className="w-4 h-4" />
          <p className="text-xs font-medium uppercase tracking-[0.2em]">End-to-End Encrypted Session</p>
        </div>
      </div>
    </div>
  );
}

  );
}
