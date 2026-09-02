"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  TbBrandWhatsapp,
  TbMenu2,
  TbX,
  TbArrowUpRight,
} from "react-icons/tb";
import { motion, AnimatePresence } from "motion/react";
import Button from "./ui/Button";
import { NAV_LINKS, WHATSAPP_URL } from "@/lib/siteData";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [mobileMenuOpen]);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? "pt-3.5 pb-4.5 bg-brand-bg-soft/95 backdrop-blur-md border-b-3 border-brand-ink shadow-sm"
            : "pt-4.5 pb-5.5 bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between gap-2">
            {/* Logo Button */}
            <Link
              href="/"
              className="group flex items-center gap-2.5 h-10 px-3.5 rounded-xl bg-white border-2 border-brand-ink shadow-neo-purple hover:shadow-neo-sm transition-all shrink-0"
            >
              <Image
                src="/icons/logo_yotsulabs.png"
                alt="Yotsulabs Logo"
                width={28}
                height={28}
                className="w-7 h-7 object-contain"
              />
              <span className="font-heading font-black text-lg tracking-tight text-brand-ink group-hover:text-brand-purple transition-colors whitespace-nowrap">
                Yotsulabs<span className="text-brand-purple">.</span>
              </span>
            </Link>

            {/* Desktop Nav Links (Visible ONLY on xl: screens 1280px+) */}
            <nav className="hidden xl:flex items-center gap-1.5 h-10 bg-white border-2 border-brand-ink px-3 py-1 rounded-xl shadow-neo-sm">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="px-3.5 py-1 text-sm font-bold text-slate-700 hover:text-brand-ink hover:bg-brand-purple-light rounded-lg border border-transparent hover:border-brand-ink transition-all"
                >
                  {link.name}
                </Link>
              ))}
            </nav>

            {/* CTA & Mobile Controls */}
            <div className="flex items-center gap-3 shrink-0">
              {/* Desktop Both Action Buttons (Order Project + Konsultasi Gratis) */}
              <div className="hidden xl:flex items-center gap-2.5">
                <Button variant="secondary" size="md" href="/orders">
                  <span>Order Project</span>
                  <TbArrowUpRight className="w-4 h-4 stroke-[2.5]" />
                </Button>

                <Button
                  variant="primary"
                  size="md"
                  href={WHATSAPP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <TbBrandWhatsapp className="w-5 h-5" />
                  <span>Konsultasi Gratis</span>
                  <TbArrowUpRight className="w-4 h-4 stroke-[2.5]" />
                </Button>
              </div>

              {/* Mobile / Tablet Hamburger Button (Visible on screens < xl) */}
              <button
                onClick={() => setMobileMenuOpen(true)}
                className="xl:hidden flex items-center gap-1.5 h-10 px-3.5 bg-white border-2 border-brand-ink text-brand-ink font-heading font-extrabold text-xs rounded-xl shadow-neo-purple active:translate-x-[1px] active:translate-y-[1px] transition-all shrink-0 cursor-pointer"
                aria-label="Open navigation menu"
              >
                <TbMenu2 className="w-5 h-5 text-brand-purple stroke-[2.5]" />
                <span className="font-mono uppercase tracking-wider">MENU</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Clean Mobile Drawer Modal */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[100] bg-brand-bg-soft overflow-y-auto px-4 py-4 sm:px-6 flex flex-col justify-between"
          >
            {/* Background Grid Overlay */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(19,16,43,0.06)_1px,transparent_1px),linear-gradient(to_bottom,rgba(19,16,43,0.06)_1px,transparent_1px)] bg-[size:2.5rem_2.5rem] pointer-events-none" />

            <div className="relative z-10 space-y-6">
              {/* Drawer Top Bar Header */}
              <div className="flex items-center justify-between border-b-2 border-brand-ink pt-1 pb-4.5 gap-2">
                <Link
                  href="/"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center gap-2.5 h-10 px-3.5 rounded-xl bg-white border-2 border-brand-ink shadow-neo-purple shrink-0"
                >
                  <Image
                    src="/icons/logo_yotsulabs.png"
                    alt="Yotsulabs Logo"
                    width={28}
                    height={28}
                    className="w-7 h-7 object-contain"
                  />
                  <span className="font-heading font-black text-lg text-brand-ink">
                    Yotsulabs<span className="text-brand-purple">.</span>
                  </span>
                </Link>

                {/* Close Button */}
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center gap-1.5 h-10 px-3 bg-white border-2 border-brand-ink text-brand-ink font-heading font-extrabold text-xs rounded-xl shadow-neo-purple active:translate-x-[1px] active:translate-y-[1px] shrink-0 cursor-pointer"
                >
                  <TbX className="w-5 h-5 text-brand-purple stroke-[2.5]" />
                  <span className="font-mono uppercase tracking-wider">TUTUP</span>
                </button>
              </div>

              {/* Nav Items List */}
              <div className="space-y-2.5">
                {NAV_LINKS.map((link, idx) => {
                  const IconComp = link.icon;
                  return (
                    <motion.div
                      key={link.name}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: idx * 0.04 + 0.05, duration: 0.25 }}
                    >
                      <Link
                        href={link.href}
                        onClick={() => setMobileMenuOpen(false)}
                        className="group flex items-center justify-between p-3.5 bg-white border-2 border-brand-ink rounded-xl shadow-neo-purple active:translate-x-[1px] active:translate-y-[1px] active:shadow-neo-sm transition-all"
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 rounded-lg bg-brand-purple-light border border-brand-ink flex items-center justify-center text-brand-purple shrink-0 group-hover:bg-brand-purple group-hover:text-white transition-colors">
                            <IconComp className="w-5 h-5 stroke-[2.5]" />
                          </div>
                          <div>
                            <h3 className="font-heading font-black text-sm text-brand-ink group-hover:text-brand-purple transition-colors">
                              {link.name}
                            </h3>
                            <p className="text-[11px] font-sans text-slate-600 font-medium">
                              {link.sub}
                            </p>
                          </div>
                        </div>
                        <TbArrowUpRight className="w-4 h-4 text-slate-400 group-hover:text-brand-purple group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all stroke-[2.5]" />
                      </Link>
                    </motion.div>
                  );
                })}
              </div>
            </div>

            {/* Mobile Drawer Footer Actions */}
            <div className="relative z-10 mt-6 pt-5 border-t-2 border-brand-ink space-y-3">
              <Button
                variant="secondary"
                href="/orders"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full h-12 justify-center text-sm"
              >
                <span>Order Project</span>
              </Button>

              <Button
                variant="primary"
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full h-12 justify-center text-sm"
              >
                <TbBrandWhatsapp className="w-5 h-5" />
                <span>Konsultasi Gratis</span>
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
