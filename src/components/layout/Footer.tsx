import Link from "next/link";

export function Footer() {
  return (
    <footer className="mt-auto w-full bg-[#07335f] text-white">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-14 md:grid-cols-4">
        <div className="md:col-span-1">
          <div className="text-sm font-semibold tracking-wide">
            COMBINE FOUNDATION
          </div>
          <p className="mt-4 max-w-sm text-sm text-white/80">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Ut et massa
            mi. Aliquam in hendrerit urna.
          </p>
          <div className="mt-6 text-xs text-white/70">
            Charity Registration No : PCP-R3/2022/234
            <br />
            National Tax No : 3162706-4
          </div>
        </div>

        <div>
          <div className="text-sm font-semibold text-[#ff7a33]">Quick Links</div>
          <ul className="mt-4 space-y-3 text-sm text-white/85">
            <li>
              <Link className="hover:text-white" href="/projects">
                Projects
              </Link>
            </li>
            <li>
              <Link className="hover:text-white" href="/free-courses">
                Free Courses
              </Link>
            </li>
            <li>
              <Link className="hover:text-white" href="/volunteer">
                Volunteer Program
              </Link>
            </li>
            <li>
              <Link className="hover:text-white" href="/careers">
                Careers
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <div className="text-sm font-semibold text-[#ff7a33]">Donate</div>
          <ul className="mt-4 space-y-3 text-sm text-white/85">
            <li>
              <Link className="hover:text-white" href="/donate">
                Donate Now
              </Link>
            </li>
            <li>
              <Link className="hover:text-white" href="/events">
                Events Calendar
              </Link>
            </li>
            <li>
              <Link className="hover:text-white" href="/publications">
                Publications
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <div className="text-sm font-semibold text-[#ff7a33]">Support</div>
          <ul className="mt-4 space-y-3 text-sm text-white/85">
            <li>
              <Link className="hover:text-white" href="/contact">
                Contact Us
              </Link>
            </li>
            <li>
              <Link className="hover:text-white" href="/privacy">
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link className="hover:text-white" href="/terms">
                Terms of Service
              </Link>
            </li>
            <li>
              <Link className="hover:text-white" href="/reports">
                Annual Reports
              </Link>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-5 text-xs text-white/70">
          <span>© {new Date().getFullYear()} Combine Foundation</span>
          <span className="hidden sm:inline">Built with Next.js</span>
        </div>
      </div>
    </footer>
  );
}

