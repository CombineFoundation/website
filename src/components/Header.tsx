import Link from "next/link";
import Image from "next/image";
import {
  Mail,
  Phone,
  ChevronDown,
} from "lucide-react";

export default function Header() {
  return (
    <header className="w-full">
      {/* Top Bar */}
      <div className="bg-[#134981] text-white py-2 px-4 md:px-8 text-xs font-medium">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          {/* Social Icons */}
          <div className="flex items-center space-x-4">
            <Link href="#" className="hover:opacity-80 transition-opacity">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
              </svg>
            </Link>
            <Link href="#" className="hover:opacity-80 transition-opacity">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path fillRule="evenodd" d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" clipRule="evenodd" />
              </svg>
            </Link>
          </div>

          {/* Contact Info */}
          <div className="flex items-center space-x-6">
            <a
              href="mailto:combinefoundation@combinegrp.com"
              className="flex items-center space-x-2 hover:opacity-80 transition-opacity"
            >
              <Mail className="w-4 h-4" />
              <span className="hidden sm:inline">combinefoundation@combinegrp.com</span>
            </a>
            <a
              href="tel:+922134801551-52"
              className="flex items-center space-x-2 hover:opacity-80 transition-opacity"
            >
              <Phone className="w-4 h-4" />
              <span className="hidden sm:inline">+92 21 34801551-52</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <div className="bg-white border-b border-gray-100 shadow-sm px-4 md:px-8 py-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          {/* Logo */}
          <Link href="/" className="flex items-center justify-center">
            <Image 
              src="/logo.png" 
              alt="Combine Foundation Logo" 
              width={90} 
              height={25} 
              className="object-contain" 
              priority
            />
          </Link>

          {/* Navigation */}
          <nav className="hidden lg:flex items-center space-x-8 font-medium text-sm text-gray-700">
            <Link href="/" className="hover:text-[#134981] transition-colors">
              Home
            </Link>
            <Link href="/about" className="hover:text-[#134981] transition-colors">
              About Us
            </Link>
            <button className="flex items-center hover:text-[#134981] transition-colors group">
              Our Work
              <ChevronDown className="w-4 h-4 ml-1 text-gray-500 group-hover:text-[#134981]" />
            </button>
            <Link href="/team" className="hover:text-[#134981] transition-colors">
              Our Team
            </Link>
            <Link href="/publications" className="hover:text-[#134981] transition-colors">
              Publications
            </Link>
          </nav>

          {/* Action Buttons */}
          <div className="flex items-center space-x-3 text-sm font-semibold">
            <button className="hidden sm:flex items-center bg-gradient-to-r from-[#134981] to-[#1d67bc] text-white px-6 py-2.5 rounded-full hover:opacity-90 transition-opacity shadow-md">
              Join Us
              <ChevronDown className="w-4 h-4 ml-1 opacity-80" />
            </button>
            <button className="border-2 border-[#134981] text-[#134981] px-6 py-2 rounded-full hover:bg-blue-50 transition-colors">
              Donate
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
