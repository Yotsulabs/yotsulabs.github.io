"use client";

import { useState, useEffect } from "react";
import {
  TbBrandWhatsapp,
  TbMenu2,
  TbX,
  TbArrowUpRight,
  TbCode,
  TbCompass,
  TbBriefcase,
  TbCalculator,
  TbHelpCircle,
  TbMail,
} from "react-icons/tb";
import { motion, AnimatePresence } from "motion/react";
import Button from "./ui/Button";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const whatsappUrl =
    "https://wa.me/62895339023888?text=Halo%20Yotsulabs!%20Saya%20ingin%20konsultasi%20mengenai%20kebutuhan%20digital%20bisnis%20saya.";

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

  const navLinks = [
    {
      name: "Layanan Utama",
      sub: "Technology, Creative & Marketing",
      href: "#layanan",
      icon: TbCode,
    },
    {
      name: "Proses Kerja",
      sub: "4 Langkah Solutif Problem-First",
      href: "#proses",
      icon: TbCompass,
    },
    {
      name: "Portofolio",
      sub: "Studi Kasus & Hasil Nyata Klien",
      href: "#portofolio",
      icon: TbBriefcase,
    },
    {
      name: "Simulasi Estimator",
      sub: "Hitung Waktu & Dapatkan Brief WA",
      href: "#estimator",
      icon: TbCalculator,
    },
    {
      name: "FAQ & Pertanyaan",
      sub: "Jawaban Pertanyaan Umum Klien",
      href: "#faq",
      icon: TbHelpCircle,
    },
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? "py-3 bg-[#f9f8fd]/95 backdrop-blur-md border-b-3 border-[#13102b] shadow-sm"
            : "py-5 bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Logo Button */}
            <a
              href="#"
              className="group flex items-center gap-2.5 h-10 px-3.5 rounded-xl bg-white border-2 border-[#13102b] shadow-[3px_3px_0px_0px_#7b42f5] hover:shadow-[4px_4px_0px_0px_#13102b] transition-all"
            >
              <div className="w-6 h-6 rounded-md bg-[#7b42f5] border-2 border-[#13102b] flex items-center justify-center font-extrabold text-white font-heading text-xs shadow-sm">
                Y
              </div>
              <span className="font-heading font-black text-lg tracking-tight text-[#13102b] group-hover:text-[#7b42f5] transition-colors">
                Yotsulabs<span className="text-[#7b42f5]">.</span>
              </span>
            </a>

            {/* Desktop Nav Links */}
            <nav className="hidden md:flex items-center gap-1.5 h-10 bg-white border-2 border-[#13102b] px-3 py-1 rounded-xl shadow-[4px_4px_0px_0px_#13102b]">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="px-3.5 py-1 text-sm font-bold text-slate-700 hover:text-[#13102b] hover:bg-[#f3f0ff] rounded-lg border border-transparent hover:border-[#13102b] transition-all"
                >
                  {link.name}
                </a>
              ))}
            </nav>

            {/* CTA & Mobile Toggle UI Components */}
            <div className="flex items-center gap-3">
              <Button
                variant="primary"
                size="md"
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="hidden sm:inline-flex"
              >
                <TbBrandWhatsapp className="w-5 h-5" />
                <span>Konsultasi Gratis</span>
                <TbArrowUpRight className="w-4 h-4 stroke-[2.5]" />
              </Button>

              {/* Mobile Hamburger Button */}
              <button
                onClick={() => setMobileMenuOpen(true)}
                className="md:hidden flex items-center gap-2 h-10 px-3.5 bg-white border-2 border-[#13102b] text-[#13102b] font-heading font-extrabold text-xs rounded-xl shadow-[3px_3px_0px_0px_#7b42f5] active:translate-x-[1px] active:translate-y-[1px] transition-all"
                aria-label="Open navigation menu"
              >
                <TbMenu2 className="w-5 h-5 text-[#7b42f5] stroke-[2.5]" />
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
            className="fixed inset-0 z-[100] bg-[#f9f8fd] overflow-y-auto px-4 py-5 sm:px-6 flex flex-col justify-between"
          >
            {/* Background Grid Overlay */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(19,16,43,0.06)_1px,transparent_1px),linear-gradient(to_bottom,rgba(19,16,43,0.06)_1px,transparent_1px)] bg-[size:2.5rem_2.5rem] pointer-events-none" />

            <div className="relative z-10 space-y-6">
              {/* Drawer Top Bar Header */}
              <div className="flex items-center justify-between border-b-2 border-[#13102b] pb-4">
                <a
                  href="#"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center gap-2.5 h-10 px-3.5 rounded-xl bg-white border-2 border-[#13102b] shadow-[3px_3px_0px_0px_#7b42f5]"
                >
                  <div className="w-6 h-6 rounded-md bg-[#7b42f5] border-2 border-[#13102b] flex items-center justify-center font-extrabold text-white font-heading text-xs shadow-sm">
                    Y
                  </div>
                  <span className="font-heading font-black text-lg text-[#13102b]">
                    Yotsulabs<span className="text-[#7b42f5]">.</span>
                  </span>
                </a>

                {/* Close Button */}
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center gap-2 h-10 px-3.5 bg-white border-2 border-[#13102b] text-[#13102b] font-heading font-extrabold text-xs rounded-xl shadow-[3px_3px_0px_0px_#7b42f5] active:translate-x-[1px] active:translate-y-[1px]"
                >
                  <TbX className="w-5 h-5 text-[#7b42f5] stroke-[2.5]" />
                  <span className="font-mono uppercase tracking-wider">TUTUP</span>
                </button>
              </div>

              {/* Nav Items List */}
              <div className="space-y-2.5">
                {navLinks.map((link, idx) => {
                  const IconComp = link.icon;
                  return (
                    <motion.a
                      key={link.name}
                      href={link.href}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: idx * 0.04 + 0.05, duration: 0.25 }}
                      onClick={() => setMobileMenuOpen(false)}
                      className="group flex items-center justify-between p-3.5 bg-white border-2 border-[#13102b] rounded-xl shadow-[3px_3px_0px_0px_#7b42f5] active:translate-x-[1px] active:translate-y-[1px] active:shadow-[1px_1px_0px_0px_#13102b] transition-all"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-lg bg-[#f3f0ff] border border-[#13102b] flex items-center justify-center text-[#7b42f5] shrink-0 group-hover:bg-[#7b42f5] group-hover:text-white transition-colors">
                          <IconComp className="w-5 h-5 stroke-[2.5]" />
                        </div>
                        <div>
                          <h3 className="font-heading font-black text-sm text-[#13102b] group-hover:text-[#7b42f5] transition-colors">
                            {link.name}
                          </h3>
                          <p className="text-[11px] font-sans text-slate-600 font-medium">
                            {link.sub}
                          </p>
                        </div>
                      </div>
                      <TbArrowUpRight className="w-4 h-4 text-slate-400 group-hover:text-[#7b42f5] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all stroke-[2.5]" />
                    </motion.a>
                  );
                })}
              </div>
            </div>

            {/* Mobile Drawer Footer Actions */}
            <div className="relative z-10 mt-6 pt-5 border-t-2 border-[#13102b] space-y-3">
              <Button
                variant="primary"
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full h-12"
              >
                <TbBrandWhatsapp className="w-5 h-5" />
                <span>Konsultasi WA (+62 895 3390 23888)</span>
                <TbArrowUpRight className="w-4 h-4 stroke-[2.5]" />
              </Button>

              <div className="flex items-center justify-between px-3.5 py-2.5 bg-white border border-[#13102b] rounded-lg text-xs font-mono font-bold">
                <a
                  href="mailto:yotsulabs@gmail.com"
                  className="flex items-center gap-1.5 text-slate-800 hover:text-[#7b42f5]"
                >
                  <TbMail className="w-4 h-4 text-[#7b42f5]" />
                  <span>yotsulabs@gmail.com</span>
                </a>
                <div className="flex items-center gap-1.5 text-[#13102b]">
                  <span className="w-2 h-2 rounded-full bg-[#7b42f5] animate-pulse" />
                  <span>Accepting Projects</span>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
