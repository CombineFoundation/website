import type { Metadata } from "next";

import { Geist, Geist_Mono, Montserrat, Inter } from "next/font/google";

import "./globals.css";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/next";


const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  weight: ["400", "600", "700"],
});

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});


export const metadata: Metadata = {
  title: "Combine Foundation",


  description: "Combine Foundation is a non-profit organization dedicated to supporting and empowering individuals and communities through various initiatives and programs. Our mission is to create positive change and foster growth by providing resources, education, and opportunities for those in need.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"

      className={`${geistSans.variable} ${geistMono.variable} ${montserrat.variable} ${inter.variable} h-full antialiased `}
    >
      <body className="min-h-full flex flex-col font-(--font-montserrat)">
        {children}
        <SpeedInsights />
        <Analytics />
      </body>
    </html>
  );
}