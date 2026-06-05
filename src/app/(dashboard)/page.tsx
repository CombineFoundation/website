'use client';

import type { Metadata } from 'next';
import Link from 'next/link';
import { Home, Users, FileText, Settings, LogOut } from 'lucide-react';

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-100 px-6 sm:px-8 lg:px-12 py-6">
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600 mt-1">Welcome to your Combine Foundation dashboard</p>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-12">
        {/* Welcome Section */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-8 mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-3">Welcome to Your Dashboard</h2>
          <p className="text-gray-600 leading-relaxed">
            Manage your foundation's operations, view reports, and access administrative tools from here.
          </p>
        </div>

        {/* Quick Links Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          
          {/* Admin Dashboard Link */}
          <Link href="/admin/dashboard">
            <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6 hover:shadow-md hover:border-blue-200 transition-all cursor-pointer group">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4 group-hover:bg-blue-200 transition-colors">
                <Home className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">Admin Dashboard</h3>
              <p className="text-gray-600 text-sm">View analytics, manage users, and monitor applications</p>
            </div>
          </Link>

          {/* User Management Link */}
          <Link href="/admin/dashboard">
            <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6 hover:shadow-md hover:border-blue-200 transition-all cursor-pointer group">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4 group-hover:bg-green-200 transition-colors">
                <Users className="w-6 h-6 text-green-600" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">User Management</h3>
              <p className="text-gray-600 text-sm">Manage team members and user accounts</p>
            </div>
          </Link>

          {/* Applications Link */}
          <Link href="/admin/dashboard">
            <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6 hover:shadow-md hover:border-blue-200 transition-all cursor-pointer group">
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mb-4 group-hover:bg-orange-200 transition-colors">
                <FileText className="w-6 h-6 text-orange-600" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">Applications</h3>
              <p className="text-gray-600 text-sm">Review and manage volunteer and program applications</p>
            </div>
          </Link>

          {/* Settings Link */}
          <Link href="/admin/dashboard">
            <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6 hover:shadow-md hover:border-blue-200 transition-all cursor-pointer group">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4 group-hover:bg-purple-200 transition-colors">
                <Settings className="w-6 h-6 text-purple-600" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">Settings</h3>
              <p className="text-gray-600 text-sm">Configure dashboard preferences and organization settings</p>
            </div>
          </Link>

        </div>

        {/* Stats Section */}
        <div className="mt-12">
          <h2 className="text-xl font-bold text-gray-900 mb-6">Quick Stats</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
              <p className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-2">Active Projects</p>
              <h3 className="text-3xl font-bold text-gray-900">42</h3>
              <p className="text-xs text-gray-600 mt-2">6 pending review</p>
            </div>
            <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
              <p className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-2">Team Members</p>
              <h3 className="text-3xl font-bold text-gray-900">18</h3>
              <p className="text-xs text-gray-600 mt-2">2 new this month</p>
            </div>
            <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
              <p className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-2">New Messages</p>
              <h3 className="text-3xl font-bold text-gray-900">7</h3>
              <p className="text-xs text-gray-600 mt-2">3 require action</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
