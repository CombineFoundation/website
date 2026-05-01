import React from 'react';
import Link from 'next/link';

const Footer = () => {
  return (
    <footer className="bg-navy text-white pt-16 pb-8">
      <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-12">
        {/* Column 1: About */}
        <div>
          <div className="w-12 h-12 bg-white rounded-full mb-6 flex items-center justify-center text-navy font-bold">CF</div>
          <p className="text-gray-300 text-sm leading-relaxed mb-6">
            Combine Foundation is dedicated to empowering youth and supporting communities through education and social initiatives.
          </p>
        </div>

        {/* Column 2: Quick Links */}
        <div>
          <h4 className="text-orange font-bold text-lg mb-6">Quick Links</h4>
          <ul className="flex flex-col gap-3 text-sm">
            <li><Link href="/about" className="hover:text-orange transition-colors">About Us</Link></li>
            <li><Link href="/team" className="hover:text-orange transition-colors">Our Team</Link></li>
            <li><Link href="/programs" className="hover:text-orange transition-colors">Programs</Link></li>
            <li><Link href="/contact" className="hover:text-orange transition-colors">Contact</Link></li>
          </ul>
        </div>

        {/* Column 3: Donate */}
        <div>
          <h4 className="text-orange font-bold text-lg mb-6">Donate</h4>
          <ul className="flex flex-col gap-3 text-sm">
            <li><Link href="/donate" className="hover:text-orange transition-colors">Tax Benefits</Link></li>
            <li><Link href="/donate" className="hover:text-orange transition-colors">Sponsorship</Link></li>
            <li><Link href="/donate" className="hover:text-orange transition-colors">Volunteer</Link></li>
          </ul>
        </div>

        {/* Column 4: Support */}
        <div>
          <h4 className="text-orange font-bold text-lg mb-6">Support</h4>
          <ul className="flex flex-col gap-3 text-sm">
            <li><Link href="/help" className="hover:text-orange transition-colors">Help Center</Link></li>
            <li><Link href="/privacy" className="hover:text-orange transition-colors">Privacy Policy</Link></li>
            <li><Link href="/terms" className="hover:text-orange transition-colors">Terms of Service</Link></li>
          </ul>
        </div>
      </div>

      <div className="container mx-auto px-4 mt-16 pt-8 border-t border-gray-700 text-center text-gray-400 text-sm">
        <p>© {new Date().getFullYear()} Combine Foundation. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
