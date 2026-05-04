import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-[#0b2848] text-white relative overflow-hidden py-16 px-4 md:px-8 mt-auto">
      {/* Huge Vertical COMBINE text on the right */}
      <div className="absolute right-0 top-0 bottom-0 flex items-center justify-center pointer-events-none select-none overflow-hidden">
        <span
          className="font-normal text-transparent"
          style={{
            writingMode: "vertical-rl",
            // textOrientation: "upright",
            WebkitTextStroke: "0px rgba(255, 255, 255, 0.12)",
            fontSize: "clamp(5.5rem, 5vh, 18rem)",
            letterSpacing: "0.01em",
            textTransform: "uppercase",
            color:"#0C3155",
            y: "50%",
            x: "100%",
            // transform: "rotate(180deg)",
          }}
        >
          COMBINE
        </span>
      </div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-8 relative z-10">
        {/* Left Column (Logo and Text) */}
        <div className="md:col-span-5 flex flex-col pr-4">
          <div className="bg-white inline-flex items-center justify-center p-5 rounded-md w-max mb-6">
            <Image src="/logo.png" alt="Combine Foundation Logo" width={80} height={35} className="object-contain" />
          </div>
          <p className="text-[13px] text-gray-300 leading-relaxed mb-12 max-w-sm">
            Lorem ipsum dolor sit amet consectetur adipiscing elit Ut et massa mi. Aliquam in hendrerit urna. Pellentesque sit amet sapien fringilla, mattis ligula consectetur, ultrices mauris. Maecenas vitae mattis tellus.
          </p>
          <div className="mt-auto text-xs text-gray-300 space-y-3">
            <p>Charity Registration No : PCP-R3/2022/234</p>
            <p>National Tax No : 3162706-4</p>
          </div>
        </div>

        {/* Links Columns */}
        <div className="md:col-span-7 grid grid-cols-2 md:grid-cols-3 gap-8 pt-4">
          {/* Quick Links */}
          <div className="flex flex-col space-y-4">
            <h3 className="text-[#eb5829] font-medium text-base mb-2">Quick Links</h3>
            <Link href="#" className="text-[13px] text-gray-200 hover:text-white transition-colors">Projects</Link>
            <Link href="#" className="text-[13px] text-gray-200 hover:text-white transition-colors">Free Courses</Link>
            <Link href="#" className="text-[13px] text-gray-200 hover:text-white transition-colors">Volunteer Program</Link>
            <Link href="#" className="text-[13px] text-gray-200 hover:text-white transition-colors">Careers</Link>
          </div>

          {/* Donate */}
          <div className="flex flex-col space-y-4">
            <h3 className="text-[#eb5829] font-medium text-base mb-2">Donate</h3>
            <Link href="#" className="text-[13px] text-gray-200 hover:text-white transition-colors">Donate Now</Link>
            <Link href="#" className="text-[13px] text-gray-200 hover:text-white transition-colors">Events Calender</Link>
            <Link href="#" className="text-[13px] text-gray-200 hover:text-white transition-colors">Publications</Link>
          </div>

          {/* Support */}
          <div className="flex flex-col space-y-4">
            <h3 className="text-[#eb5829] font-medium text-base mb-2">Support</h3>
            <Link href="#" className="text-[13px] text-gray-200 hover:text-white transition-colors">Contact Us</Link>
            <Link href="#" className="text-[13px] text-gray-200 hover:text-white transition-colors">Privacy Policy</Link>
            <Link href="#" className="text-[13px] text-gray-200 hover:text-white transition-colors">Terms of Service</Link>
            <Link href="#" className="text-[13px] text-gray-200 hover:text-white transition-colors">Annual Reports</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
