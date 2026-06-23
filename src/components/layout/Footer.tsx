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
        {/* Column 2: Quick Links */}
        <div>
          <h4 className="text-orange font-black text-lg mb-6">Quick Links</h4>
          <ul className="flex flex-col gap-3 text-lg">
            <li><Link href="/projects" className="font-black hover:text-orange transition-colors">Projects</Link></li>
            <li><Link href="/courses" className="font-black hover:text-orange transition-colors">Free Courses</Link></li>
            <li><Link href="/volunteer-program" className="font-black hover:text-orange transition-colors">Volunteer Program</Link></li>
            <li><Link href="/career" className="font-black hover:text-orange transition-colors">Careers</Link></li>
          </ul>
        </div>

        {/* Column 3: Donate */}
        <div>
          <h4 className="text-orange font-black text-lg mb-6">Donate</h4>
          <ul className="flex flex-col gap-3 text-lg">
            <li><Link href="/donations" className="font-black hover:text-orange transition-colors">Donate Now</Link></li>
            <li><Link href="/events#calendar" className="font-black hover:text-orange transition-colors">Events Calendar</Link></li>
            <li><Link href="/publications" className="font-black hover:text-orange transition-colors">Publications</Link></li>
          </ul>
        </div>

        {/* Column 4: Support */}
        <div>
          <h4 className="text-orange font-black text-lg mb-6">Support</h4>
          <ul className="flex flex-col gap-3 text-lg">
            <li><Link href="/contact" className="font-black hover:text-orange transition-colors">Contact Us</Link></li>
            <li><Link href="/privacy" className="font-black hover:text-orange transition-colors">Privacy Policy</Link></li>
            <li><Link href="/terms" className="font-black hover:text-orange transition-colors">Terms of Service</Link></li>
            <li><Link href="/publications#annual-reports" className="font-black hover:text-orange transition-colors">Annual Reports</Link></li>
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
