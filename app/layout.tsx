import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Lumière — Modern Shopping Experience",
  description:
    "Discover curated products with exceptional quality. Shop the latest collections at Lumière.",
  keywords: ["e-commerce", "shopping", "fashion", "lifestyle", "products"],
  openGraph: {
    title: "Lumière — Modern Shopping Experience",
    description:
      "Discover curated products with exceptional quality. Shop the latest collections at Lumière.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="bg-white text-gray-900 antialiased font-sans">
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}