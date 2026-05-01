"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';

interface NavItem {
  label: string;
  href: string;
}

interface NavbarProps {
  navItems: NavItem[];
}

const Navbar = ({ navItems }: NavbarProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        {/* Logo Placeholder */}
        <Link href="/" className="flex items-center gap-2">
          <div className="w-10 h-10 bg-navy rounded-full flex items-center justify-center text-white font-bold">CF</div>
          <span className="font-bold text-xl text-navy hidden sm:block">Combine Foundation</span>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8">
          {navItems.map((item) => (
            <Link 
              key={item.href} 
              href={item.href}
              className="text-navy font-medium hover:text-orange transition-colors"
            >
              {item.label}
            </Link>
          ))}
          <button className="bg-orange text-white px-6 py-2 rounded-full font-bold hover:bg-opacity-90 transition-all">
            Donate Now
          </button>
        </div>

        {/* Mobile Menu Toggle */}
        <button 
          className="md:hidden text-navy"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 p-4 flex flex-col gap-4 animate-in slide-in-from-top duration-300">
          {navItems.map((item) => (
            <Link 
              key={item.href} 
              href={item.href}
              className="text-navy font-medium text-lg py-2"
              onClick={() => setIsOpen(false)}
            >
              {item.label}
            </Link>
          ))}
          <button className="bg-orange text-white px-6 py-3 rounded-xl font-bold w-full">
            Donate Now
          </button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
