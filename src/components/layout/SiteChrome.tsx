import { Footer } from "./Footer";
import { Navbar, type NavItem } from "./Navbar";
import { Topbar } from "./Topbar";

const navItems: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about" },
  {
    label: "Our Work",
    children: [
      { label: "Projects", href: "/projects" },
      { label: "Publications", href: "/publications" },
      { label: "Events", href: "/events" },
    ],
  },
  { label: "Our Team", href: "/team" },
  { label: "Publications", href: "/publications" },
];

export function SiteChrome({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Topbar />
      <Navbar navItems={navItems} />
      <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-10">
        {children}
      </main>
      <Footer />
    </>
  );
}

