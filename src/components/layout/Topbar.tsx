import Link from "next/link";
import { Mail, Phone } from "lucide-react";

export function Topbar() {
  return (
    <div className="w-full border-b border-black/10 bg-[#0b4b8e] text-white">
      <div className="mx-auto flex h-9 max-w-6xl items-center justify-between px-4 text-xs">
        <div className="flex items-center gap-4">
          <Link
            className="inline-flex items-center gap-2 opacity-95 hover:opacity-100"
            href="mailto:combinefoundation@combinegrp.com"
          >
            <Mail className="h-3.5 w-3.5" />
            <span className="hidden sm:inline">
              combinefoundation@combinegrp.com
            </span>
            <span className="sm:hidden">Email</span>
          </Link>
          <Link
            className="inline-flex items-center gap-2 opacity-95 hover:opacity-100"
            href="tel:+923134801551"
          >
            <Phone className="h-3.5 w-3.5" />
            <span className="hidden sm:inline">+92 21 34801551-52</span>
            <span className="sm:hidden">Call</span>
          </Link>
        </div>

        <div className="flex items-center gap-3">
          <Link
            className="opacity-90 hover:opacity-100"
            href="#"
            aria-label="Instagram"
          >
            Instagram
          </Link>
          <Link
            className="opacity-90 hover:opacity-100"
            href="#"
            aria-label="LinkedIn"
          >
            LinkedIn
          </Link>
        </div>
      </div>
    </div>
  );
}

