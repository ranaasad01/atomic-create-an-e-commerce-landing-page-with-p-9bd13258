"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { Sparkles, Mail, Camera as Instagram, MessageCircle as Twitter, Globe as Facebook, Code2 as Github } from 'lucide-react';
import { APP_NAME, APP_TAGLINE, APP_EMAIL, footerLinks } from "@/lib/data";
import { fadeInUp, staggerContainer } from "@/lib/motion";

export default function Footer() {
  const pathname = usePathname();

  const handleAnchorClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string
  ) => {
    if (href.startsWith("#") && pathname === "/") {
      e.preventDefault();
      document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
    }
  };

  const getHref = (href: string) => {
    if (href.startsWith("#") && pathname !== "/") {
      return "/" + href;
    }
    return href;
  };

  const currentYear = new Date().getFullYear();

  return (
    <footer id="contact" className="bg-gray-950 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main footer content */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10"
        >
          {/* Brand column */}
          <motion.div variants={fadeInUp} className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-2 mb-4 group w-fit">
              <div className="w-8 h-8 bg-gradient-to-br from-orange-400 to-orange-600 rounded-lg flex items-center justify-center">
                <Sparkles className="w-4 h-4 text-white" />
              </div>
              <span className="text-xl font-bold text-white group-hover:text-orange-400 transition-colors duration-200">
                {APP_NAME}
              </span>
            </Link>
            <p className="text-sm text-gray-400 leading-relaxed mb-6 max-w-xs">
              {APP_TAGLINE} We bring you the finest curated products from around
              the world, delivered with care and precision.
            </p>
            <a
              href={`mailto:${APP_EMAIL}`}
              className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-orange-400 transition-colors duration-200"
            >
              <Mail className="w-4 h-4" />
              {APP_EMAIL}
            </a>
            {/* Social icons */}
            <div className="flex items-center gap-3 mt-6">
              {[
                { icon: Instagram, label: "Instagram" },
                { icon: Twitter, label: "Twitter" },
                { icon: Facebook, label: "Facebook" },
                { icon: Github, label: "Github" },
              ].map(({ icon: Icon, label }) => (
                <motion.a
                  key={label}
                  href="#"
                  aria-label={label}
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-9 h-9 rounded-lg bg-gray-800 hover:bg-orange-500 flex items-center justify-center transition-colors duration-200"
                >
                  <Icon className="w-4 h-4" />
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Shop links */}
          <motion.div variants={fadeInUp}>
            <h4 className="text-white font-semibold text-sm uppercase tracking-wider mb-5">
              Shop
            </h4>
            <ul className="space-y-3">
              {footerLinks.shop.map((link) => (
                <li key={link.label}>
                  <Link
                    href={getHref(link.href)}
                    onClick={(e) => handleAnchorClick(e, link.href)}
                    className="text-sm text-gray-400 hover:text-orange-400 transition-colors duration-200"
                  >
                    {link.label === "New Collection" ? (
                      <span style={{ color: "#130701", backgroundColor: "#ffedd5" }}>{link.label}</span>
                    ) : link.label === "Shop Now" ? (
                      <span style={{ color: "#f5f1f0", backgroundColor: "#ffedd5" }}>{link.label}</span>
                    ) : (
                      link.label
                    )}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Company links */}
          <motion.div variants={fadeInUp}>
            <h4 className="text-white font-semibold text-sm uppercase tracking-wider mb-5">
              Company
            </h4>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.label}>
                  <Link
                    href={getHref(link.href)}
                    onClick={(e) => handleAnchorClick(e, link.href)}
                    className="text-sm text-gray-400 hover:text-orange-400 transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Support links */}
          <motion.div variants={fadeInUp}>
            <h4 className="text-white font-semibold text-sm uppercase tracking-wider mb-5">
              Support
            </h4>
            <ul className="space-y-3">
              {footerLinks.support.map((link) => (
                <li key={link.label}>
                  <Link
                    href={getHref(link.href)}
                    onClick={(e) => handleAnchorClick(e, link.href)}
                    className="text-sm text-gray-400 hover:text-orange-400 transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>
        </motion.div>

        {/* Bottom bar */}
        <div className="border-t border-gray-800 py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-gray-500">
            © {currentYear} {APP_NAME}. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            {["Privacy Policy", "Terms of Service", "Cookie Policy"].map(
              (item) => (
                <a
                  key={item}
                  href="#"
                  className="text-xs text-gray-500 hover:text-orange-400 transition-colors duration-200"
                >
                  {item}
                </a>
              )
            )}
          </div>
        </div>
      </div>
    </footer>
  );
}