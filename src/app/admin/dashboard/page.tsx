"use client";

import React from "react";
import { auth } from "@/lib/firebase";
import { signOut } from "firebase/auth";
import { useRouter } from "next/navigation";
import { LayoutDashboard, LogOut, Settings, Users, FileText, Bell } from "lucide-react";

export default function AdminDashboard() {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      // Clear the session cookie
      document.cookie = "session=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
      router.push("/admin");
    } catch (error) {
      console.error("Logout failed", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-[#134981] text-white hidden md:flex flex-col">
        <div className="p-6">
          <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center text-[#134981] font-bold text-xl mb-4">CF</div>
          <h2 className="text-xl font-bold">Admin Panel</h2>
        </div>
        
        <nav className="flex-grow px-4 space-y-2">
          <button className="w-full flex items-center gap-3 px-4 py-3 bg-[#1d67bc] rounded-xl font-medium transition-all">
            <LayoutDashboard className="w-5 h-5" />
            Dashboard
          </button>
          <button className="w-full flex items-center gap-3 px-4 py-3 hover:bg-[#1d67bc] rounded-xl font-medium transition-all text-blue-100 hover:text-white">
            <Users className="w-5 h-5" />
            User Management
          </button>
          <button className="w-full flex items-center gap-3 px-4 py-3 hover:bg-[#1d67bc] rounded-xl font-medium transition-all text-blue-100 hover:text-white">
            <FileText className="w-5 h-5" />
            Applications
          </button>
          <button className="w-full flex items-center gap-3 px-4 py-3 hover:bg-[#1d67bc] rounded-xl font-medium transition-all text-blue-100 hover:text-white">
            <Settings className="w-5 h-5" />
            Settings
          </button>
        </nav>

        <div className="p-6 border-t border-blue-800">
          <button 
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 hover:bg-red-500/20 text-red-100 hover:text-white rounded-xl font-medium transition-all"
          >
            <LogOut className="w-5 h-5" />
            Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-grow">
        <header className="bg-white border-b border-gray-100 px-8 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-800">Dashboard Overview</h1>
          <div className="flex items-center gap-4">
            <button className="p-2 text-gray-400 hover:text-[#134981] transition-colors relative">
              <Bell className="w-6 h-6" />
              <span className="absolute top-2 right-2 w-2 h-2 bg-orange-500 rounded-full border-2 border-white"></span>
            </button>
            <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center text-[#134981] font-bold">
              A
            </div>
          </div>
        </header>

        <div className="p-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100">
              <p className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-1">Total Users</p>
              <h3 className="text-3xl font-bold text-[#134981]">1,284</h3>
              <p className="text-xs text-green-500 font-bold mt-2">+12% from last month</p>
            </div>
            <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100">
              <p className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-1">Active Projects</p>
              <h3 className="text-3xl font-bold text-[#134981]">42</h3>
              <p className="text-xs text-blue-500 font-bold mt-2">6 pending review</p>
            </div>
            <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100">
              <p className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-1">New Messages</p>
              <h3 className="text-3xl font-bold text-[#134981]">18</h3>
              <p className="text-xs text-orange-500 font-bold mt-2">Requires immediate action</p>
            </div>
          </div>

          <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="p-6 border-b border-gray-100 flex justify-between items-center">
              <h3 className="text-lg font-bold text-gray-800">Recent Activity</h3>
              <button className="text-sm font-bold text-[#134981] hover:underline transition-all">View all</button>
            </div>
            <div className="p-6">
              <p className="text-gray-500 text-center py-12">No recent activity to display.</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
