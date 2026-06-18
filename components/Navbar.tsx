"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingCart, Menu, X, Sparkles } from 'lucide-react';
import { navLinks, navCTA, APP_NAME } from "@/lib/data";

interface NavbarProps {
  cartCount?: number;
}

export default function Navbar({ cartCount = 0 }: NavbarProps) {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleAnchorClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string
  ) => {
    if (href.startsWith("#") && pathname === "/") {
      e.preventDefault();
      document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
      setMobileOpen(false);
    } else {
      setMobileOpen(false);
    }
  };

  const getHref = (href: string) => {
    if (href.startsWith("#") && pathname !== "/") {
      return "/" + href;
    }
    return href;
  };

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-white/95 backdrop-blur-md shadow-sm border-b border-gray-100"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <motion.div
              whileHover={{ rotate: 15, scale: 1.1 }}
              transition={{ duration: 0.2 }}
              className="w-8 h-8 bg-gradient-to-br from-orange-400 to-orange-600 rounded-lg flex items-center justify-center shadow-md"
            >
              <Sparkles className="w-4 h-4 text-white" />
            </motion.div>
            <span className="text-xl font-bold tracking-tight text-gray-900 group-hover:text-orange-500 transition-colors duration-200">
              {APP_NAME}
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={getHref(link.href)}
                onClick={(e) => handleAnchorClick(e, link.href)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 hover:text-orange-500 hover:bg-orange-50 ${
                  pathname === link.href && !link.href.startsWith("#")
                    ? "text-orange-500 bg-orange-50"
                    : "text-gray-600"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Right side */}
          <div className="flex items-center gap-3">
            {/* Cart */}
            <Link href="/cart">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="relative p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200 cursor-pointer"
              >
                <ShoppingCart className="w-5 h-5 text-gray-700" />
                {cartCount > 0 && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute -top-1 -right-1 w-5 h-5 bg-orange-500 text-white text-xs font-bold rounded-full flex items-center justify-center"
                  >
                    {cartCount}
                  </motion.span>
                )}
              </motion.div>
            </Link>

            {/* CTA */}
            <Link
              href={getHref(navCTA.href)}
              onClick={(e) => handleAnchorClick(e, navCTA.href)}
              className="hidden sm:inline-flex"
            >
              <motion.span
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="inline-flex items-center px-5 py-2.5 bg-orange-500 hover:bg-orange-600 text-white text-sm font-semibold rounded-xl shadow-md shadow-orange-200 transition-colors duration-200 cursor-pointer"
                style={{ color: "#f5f1f0", backgroundColor: "#ffedd5" }}
              >
                {navCTA.label}
              </motion.span>
            </Link>

            {/* Mobile menu toggle */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200"
              aria-label="Toggle menu"
            >
              {mobileOpen ? (
                <X className="w-5 h-5 text-gray-700" />
              ) : (
                <Menu className="w-5 h-5 text-gray-700" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="lg:hidden bg-white border-t border-gray-100 overflow-hidden"
          >
            <div className="px-4 py-4 space-y-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={getHref(link.href)}
                  onClick={(e) => handleAnchorClick(e, link.href)}
                  className="block px-4 py-3 rounded-lg text-sm font-medium text-gray-700 hover:text-orange-500 hover:bg-orange-50 transition-all duration-200"
                >
                  {link.label}
                </Link>
              ))}
              <div className="pt-2">
                <Link
                  href={getHref(navCTA.href)}
                  onClick={(e) => handleAnchorClick(e, navCTA.href)}
                  className="block w-full text-center px-4 py-3 bg-orange-500 hover:bg-orange-600 text-white text-sm font-semibold rounded-xl transition-colors duration-200"
                >
                  {navCTA.label}
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}