"use client";

import Image from "next/image";
import Button from "./ui/Button";
import { FOOTER_NAV_LINKS, FOOTER_SOCIAL_LINKS } from "@/lib/siteData";

export default function Footer() {
  return (
    <footer className="bg-[#f3f0ff]/60 border-t-3 border-[#13102b] text-[#13102b] py-16 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 pb-12 border-b-2 border-slate-300">
          {/* Brand Info */}
          <div className="md:col-span-5 space-y-4">
            <a
              href="#"
              className="inline-flex items-center gap-2.5 h-10 px-3.5 rounded-xl bg-white border-2 border-[#13102b] shadow-[3px_3px_0px_0px_#7b42f5]"
            >
              <Image
                src="/icons/logo_yotsulabs.png"
                alt="Yotsulabs Logo"
                width={28}
                height={28}
                className="w-7 h-7 object-contain"
              />
              <span className="font-heading font-black text-lg text-[#13102b]">
                Yotsulabs<span className="text-[#7b42f5]">.</span>
              </span>
            </a>

            <p className="text-slate-700 text-sm leading-relaxed max-w-md font-sans font-medium">
              Digital studio yang membantu UMKM, bisnis, dan organisasi membangun serta mengembangkan kebutuhan digital mereka.
            </p>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="font-heading font-black text-[#13102b] text-base uppercase tracking-wider">
              Navigasi Halaman
            </h4>
            <ul className="space-y-2 text-sm font-semibold font-sans">
              {FOOTER_NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-slate-700 hover:text-[#7b42f5] transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Social Media & Contact Icon Buttons */}
          <div className="md:col-span-4 space-y-4">
            <h4 className="font-heading font-black text-[#13102b] text-base uppercase tracking-wider">
              Media Sosial & Kontak
            </h4>
            <div className="flex flex-wrap items-center gap-3.5 pt-1">
              {FOOTER_SOCIAL_LINKS.map((social) => {
                const IconComponent = social.icon;
                return (
                  <Button
                    key={social.name}
                    variant="icon"
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    title={social.name}
                    aria-label={social.name}
                    className="w-14 h-14 sm:w-15 sm:h-15 rounded-2xl border-2 border-[#13102b] shadow-[4px_4px_0px_0px_#7b42f5] hover:shadow-[4px_4px_0px_0px_#13102b]"
                  >
                    <IconComponent className="w-7 h-7 sm:w-8 sm:h-8 stroke-[2.3] group-hover:scale-110 transition-transform" />
                  </Button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Bottom Copyright */}
        <div className="pt-8 flex justify-center text-xs font-mono font-bold text-slate-600">
          <p>© {new Date().getFullYear()} Yotsulabs. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
