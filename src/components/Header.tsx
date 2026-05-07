"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Mail,
  Phone,
  ChevronDown,
  Menu,
  X,
  Calendar,
  Briefcase,
  BookOpen,
  Users,
  Trophy,
} from "lucide-react";

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const ourWorkItems = [
    { label: "Events", href: "/events", icon: <Calendar className="w-4 h-4" /> },
    { label: "Projects", href: "/projects", icon: <Trophy className="w-4 h-4" /> },
    { label: "Courses", href: "/courses", icon: <BookOpen className="w-4 h-4" /> },
  ];

  const joinUsItems = [
    { label: "Career Opportunities", href: "/careers", icon: <Briefcase className="w-4 h-4" /> },
    { label: "Volunteer for Combine", href: "/volunteer", icon: <Users className="w-4 h-4" /> },
  ];

  return (
    <header className="w-full sticky top-0 z-[100] bg-white">
      {/* Top Bar */}
      <div className="bg-[#134981] text-white py-2 px-4 md:px-8 text-xs font-medium">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          {/* Social Icons */}
          <div className="flex items-center space-x-4">
            <Link href="#" className="hover:text-blue-200 transition-colors">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
              </svg>
            </Link>
            <Link href="#" className="hover:text-blue-200 transition-colors">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.84 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
              </svg>
            </Link>
          </div>

          {/* Contact Info */}
          <div className="flex items-center space-x-6">
            <a
              href="mailto:combinefoundation@combinegrp.com"
              className="flex items-center space-x-2 hover:text-blue-200 transition-colors"
            >
              <Mail className="w-4 h-4" />
              <span className="hidden sm:inline text-[10px] md:text-xs">combinefoundation@combinegrp.com</span>
            </a>
            <a
              href="tel:+922134801551-52"
              className="flex items-center space-x-2 hover:text-blue-200 transition-colors"
            >
              <Phone className="w-4 h-4" />
              <span className="hidden sm:inline text-[10px] md:text-xs">+92 21 34801551-52</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <div className="bg-white border-b border-gray-100 shadow-sm px-4 md:px-8 py-4 relative">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          {/* Logo */}
          <Link href="/" className="flex items-center group">
            <div className="relative overflow-hidden">
              <Image 
                src="/logo.png" 
                alt="Combine Foundation Logo" 
                width={120} 
                height={34} 
                className="object-contain transition-transform duration-300 group-hover:scale-105" 
                priority
              />
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-10 font-semibold text-sm text-gray-800">
            <Link href="/" className="hover:text-[#134981] transition-colors relative after:absolute after:bottom-[-4px] after:left-0 after:w-0 after:h-[2px] after:bg-[#134981] hover:after:w-full after:transition-all">
              Home
            </Link>
            <Link href="/about" className="hover:text-[#134981] transition-colors relative after:absolute after:bottom-[-4px] after:left-0 after:w-0 after:h-[2px] after:bg-[#134981] hover:after:w-full after:transition-all">
              About Us
            </Link>
            
            {/* Our Work Dropdown */}
            <div className="relative group py-2">
              <button className="flex items-center hover:text-[#134981] transition-colors">
                Our Work
                <ChevronDown className="w-4 h-4 ml-1.5 text-gray-400 group-hover:text-[#134981] transition-transform group-hover:rotate-180" />
              </button>
              
              {/* Dropdown Menu */}
              <div className="absolute top-full left-0 mt-0 w-56 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform group-hover:translate-y-0 translate-y-2 z-[100]">
                <div className="bg-white rounded-xl shadow-2xl border border-gray-100 overflow-hidden mt-2">
                  <div className="py-2">
                    {ourWorkItems.map((item) => (
                      <Link 
                        key={item.label} 
                        href={item.href}
                        className="flex items-center px-4 py-3 text-gray-700 hover:bg-blue-50 hover:text-[#134981] transition-colors group/item"
                      >
                        <span className="p-2 rounded-lg bg-gray-50 group-hover/item:bg-white group-hover/item:shadow-sm mr-3 transition-all">
                          {item.icon}
                        </span>
                        {item.label}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <Link href="/team" className="hover:text-[#134981] transition-colors relative after:absolute after:bottom-[-4px] after:left-0 after:w-0 after:h-[2px] after:bg-[#134981] hover:after:w-full after:transition-all">
              Our Team
            </Link>
            <Link href="/publications" className="hover:text-[#134981] transition-colors relative after:absolute after:bottom-[-4px] after:left-0 after:w-0 after:h-[2px] after:bg-[#134981] hover:after:w-full after:transition-all">
              Publications
            </Link>
          </nav>

          {/* Action Buttons */}
          <div className="hidden lg:flex items-center space-x-4">
            {/* Join Us Dropdown */}
            <div className="relative group">
              <button className="flex items-center bg-gradient-to-r from-[#134981] to-[#1d67bc] text-white px-7 py-3 rounded-full hover:shadow-lg transition-all transform hover:-translate-y-0.5 active:translate-y-0">
                Join Us
                <ChevronDown className="w-4 h-4 ml-2 opacity-80 group-hover:rotate-180 transition-transform" />
              </button>

              {/* Dropdown Menu */}
              <div className="absolute top-full right-0 mt-0 w-64 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform group-hover:translate-y-0 translate-y-2 z-[100]">
                <div className="bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden mt-3">
                  <div className="bg-[#134981] p-4 text-white">
                    <p className="text-[10px] uppercase tracking-wider font-bold opacity-80">Be a part of change</p>
                    <p className="text-sm font-semibold">Join Our Mission</p>
                  </div>
                  <div className="py-2">
                    {joinUsItems.map((item) => (
                      <Link 
                        key={item.label} 
                        href={item.href}
                        className="flex items-center px-5 py-4 text-gray-700 hover:bg-blue-50 hover:text-[#134981] transition-colors group/item"
                      >
                        <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center mr-3 group-hover/item:bg-[#134981] group-hover/item:text-white transition-all">
                          {item.icon}
                        </div>
                        <span className="text-sm font-medium">{item.label}</span>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <Link href="/donate" className="border-2 border-[#134981] text-[#134981] px-8 py-2.5 rounded-full font-bold hover:bg-[#134981] hover:text-white transition-all duration-300 shadow-sm">
              Donate
            </Link>
          </div>

          {/* Mobile Toggle */}
          <button 
            className="lg:hidden p-2 text-[#134981] hover:bg-blue-50 rounded-lg transition-colors"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X className="w-7 h-7" /> : <Menu className="w-7 h-7" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 top-[110px] bg-white z-[90] lg:hidden animate-in fade-in slide-in-from-right duration-300 overflow-y-auto">
          <div className="p-6 flex flex-col space-y-6">
            <div className="space-y-4">
              <Link href="/" className="block text-xl font-bold text-gray-800" onClick={() => setIsMobileMenuOpen(false)}>Home</Link>
              <Link href="/about" className="block text-xl font-bold text-gray-800" onClick={() => setIsMobileMenuOpen(false)}>About Us</Link>
              
              <div className="space-y-3">
                <p className="text-xs uppercase tracking-widest text-gray-400 font-bold">Our Work</p>
                {ourWorkItems.map(item => (
                  <Link key={item.label} href={item.href} className="flex items-center text-lg font-medium text-[#134981] ml-2" onClick={() => setIsMobileMenuOpen(false)}>
                    <span className="mr-2">{item.icon}</span>
                    {item.label}
                  </Link>
                ))}
              </div>

              <div className="space-y-3">
                <p className="text-xs uppercase tracking-widest text-gray-400 font-bold">Join Us</p>
                {joinUsItems.map(item => (
                  <Link key={item.label} href={item.href} className="flex items-center text-lg font-medium text-[#134981] ml-2" onClick={() => setIsMobileMenuOpen(false)}>
                    <span className="mr-2">{item.icon}</span>
                    {item.label}
                  </Link>
                ))}
              </div>

              <Link href="/team" className="block text-xl font-bold text-gray-800" onClick={() => setIsMobileMenuOpen(false)}>Our Team</Link>
              <Link href="/publications" className="block text-xl font-bold text-gray-800" onClick={() => setIsMobileMenuOpen(false)}>Publications</Link>
            </div>

            <div className="pt-6 border-t border-gray-100 flex flex-col space-y-4">
              <Link href="/donate" className="w-full bg-[#134981] text-white text-center py-4 rounded-xl font-bold text-lg shadow-lg">
                Donate Now
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
