import Link from 'next/link';

const Topbar = () => {
  return (
    <div className="bg-[#134981] text-white py-1.5 px-4 text-xs hidden md:block border-b border-white/10">
      <div className="max-w-[1500px] mx-auto flex justify-between items-center">
        <p className="font-medium">Welcome to Combine Foundation - Empowering Communities</p>
        <div className="flex gap-6 items-center">
          <Link href="/admin" className="hover:text-[#F97316] transition-all font-bold tracking-wide uppercase text-[10px]">Login</Link>
          <Link href="/register" className="hover:text-[#F97316] transition-all font-bold tracking-wide uppercase text-[10px]">Register</Link>
        </div>
      </div>
    </div>
  );
};

export default Topbar;
