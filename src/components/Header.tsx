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

const Linkedin = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
  >
    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
  </svg>
);

const Facebook = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
  >
    <path d="M12 2C6.477 2 2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12c0-5.523-4.477-10-10-10z"/>
  </svg>
);

const Instagram = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
  </svg>
);

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const ourWorkItems = [
    { label: "Events", href: "/events", icon: <Calendar className="w-4 h-4" /> },
    { label: "Projects", href: "/projects", icon: <Trophy className="w-4 h-4" /> },
    { label: "Courses", href: "#", icon: <BookOpen className="w-4 h-4" /> },
  ];

  const joinUsItems = [
    { label: "Career Opportunities", href: "#", icon: <Briefcase className="w-4 h-4" /> },
    { label: "Volunteer for Combine", href: "/volunteer-program", icon: <Users className="w-4 h-4" /> },
  ];

  return (
    <header className="w-full top-0 z-[100] bg-white">
      {/* Top Bar */}
      <div className="bg-[#134981] text-white py-2 px-4 md:px-8 text-xs font-medium">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          {/* Social Icons */}
          <div className="flex items-center space-x-4">
            <Link 
              href="https://www.instagram.com/combinefoundation" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="hover:text-blue-200 transition-colors"
            >
              <Instagram className="w-4 h-4" />
            </Link>
            <Link 
              href="https://www.linkedin.com/company/combine-foundation/" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="hover:text-blue-200 transition-colors"
            >
              <Linkedin className="w-4 h-4" />
            </Link>
            <Link 
              href="https://www.facebook.com/combinefoundationoffical" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="hover:text-blue-200 transition-colors"
            >
              <Facebook className="w-4 h-4" />
            </Link>
          </div>

          {/* Contact Info */}
          <div className="flex items-center space-x-6">
            <a
              href="mailto:info@combinefoundation.org"
              className="flex items-center space-x-2 hover:text-blue-200 transition-colors"
            >
              <Mail className="w-4 h-4" />
              <span className="hidden sm:inline text-[10px] md:text-xs">info@combinefoundation.org</span>
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
                {joinUsItems.map((item) => (
                  <Link 
                    key={item.label} 
                    href={item.href}
                    className="flex items-center px-5 py-4 bg-white rounded-xl shadow-2xl border border-gray-100 mb-2 text-gray-700 hover:bg-blue-50 hover:text-[#134981] transition-colors group/item"
                  >
                    <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center mr-3 group-hover/item:bg-[#134981] group-hover/item:text-white transition-all">
                      {item.icon}
                    </div>
                    <span className="text-sm font-medium">{item.label}</span>
                  </Link>
                ))}
              </div>
            </div>

            <Link href="/donations" className="border-2 border-[#134981] text-[#134981] px-8 py-2.5 rounded-full font-bold hover:bg-[#134981] hover:text-white transition-all duration-300 shadow-sm">
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
              <Link href="/donations" className="w-full bg-[#134981] text-white text-center py-4 rounded-xl font-bold text-lg shadow-lg">
                Donate Now
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
