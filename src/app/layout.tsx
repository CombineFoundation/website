import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/next";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  variable: "--font-montserrat",
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
      className={`${montserrat.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-[var(--font-montserrat)]">
        {children}
        <SpeedInsights />
        <Analytics />
      </body>
    </html>
  );
}