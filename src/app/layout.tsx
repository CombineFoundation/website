"use client";

import { Montserrat } from "next/font/google";
import "./globals.css";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { usePathname } from "next/navigation";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  variable: "--font-montserrat",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isAdminPage = pathname?.startsWith("/admin") || pathname?.startsWith("/login");

  return (
    <html
      lang="en"
      className={`${montserrat.variable} h-full w-full antialiased overflow-x-hidden`}
    >
      <body className="min-h-full flex flex-col font-[var(--font-montserrat)] overflow-x-hidden">
        {!isAdminPage && <Header />}
        <main className="flex-grow flex flex-col overflow-x-hidden">
          {children}
        </main>
        {!isAdminPage && <Footer />}
        <SpeedInsights />
        <Analytics />
      </body>
    </html>
  );
}