"use client";

import {
  TbBrandWhatsapp,
  TbBrandInstagram,
  TbBrandTiktok,
  TbBrandThreads,
  TbMail,
} from "react-icons/tb";
import Button from "./ui/Button";

export default function Footer() {
  const whatsappUrl =
    "https://wa.me/62895339023888?text=Halo%20Yotsulabs!%20Saya%20ingin%20konsultasi.";

  const socialLinks = [
    {
      name: "WhatsApp",
      href: whatsappUrl,
      icon: TbBrandWhatsapp,
    },
    {
      name: "Instagram",
      href: "https://www.instagram.com/yotsulabs/",
      icon: TbBrandInstagram,
    },
    {
      name: "TikTok",
      href: "https://www.tiktok.com/@yotsulabs/",
      icon: TbBrandTiktok,
    },
    {
      name: "Threads",
      href: "https://www.threads.com/@yotsulabs",
      icon: TbBrandThreads,
    },
    {
      name: "Email",
      href: "mailto:yotsulabs@gmail.com",
      icon: TbMail,
    },
  ];

  return (
    <footer className="bg-[#f3f0ff]/60 border-t-3 border-[#13102b] text-[#13102b] py-16 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 pb-12 border-b-2 border-slate-300">

          {/* Brand Info */}
          <div className="md:col-span-5 space-y-4">
            <a href="#" className="inline-flex items-center gap-2.5 h-10 px-3.5 rounded-xl bg-white border-2 border-[#13102b] shadow-[3px_3px_0px_0px_#7b42f5]">
              <div className="w-6 h-6 rounded-md bg-[#7b42f5] border-2 border-[#13102b] flex items-center justify-center font-extrabold text-white font-heading text-xs shadow-sm">
                Y
              </div>
              <span className="font-heading font-black text-lg text-[#13102b]">
                Yotsulabs<span className="text-[#7b42f5]">.</span>
              </span>
            </a>

            <p className="text-slate-700 text-sm leading-relaxed max-w-md font-sans font-medium">
              Digital studio yang membantu UMKM, bisnis, dan organisasi membangun serta mengembangkan kebutuhan digital mereka dengan pendekatan Technology, Creative, dan Digital Marketing.
            </p>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="font-heading font-black text-[#13102b] text-base uppercase tracking-wider">
              Navigasi Halaman
            </h4>
            <ul className="space-y-2 text-sm font-semibold font-sans">
              <li>
                <a href="#layanan" className="text-slate-700 hover:text-[#7b42f5] transition-colors">Layanan Utama</a>
              </li>
              <li>
                <a href="#proses" className="text-slate-700 hover:text-[#7b42f5] transition-colors">Alur Proses Kerja</a>
              </li>
              <li>
                <a href="#portofolio" className="text-slate-700 hover:text-[#7b42f5] transition-colors">Portofolio Pilihan</a>
              </li>
              <li>
                <a href="#estimator" className="text-slate-700 hover:text-[#7b42f5] transition-colors">Simulasi Estimator</a>
              </li>
              <li>
                <a href="#faq" className="text-slate-700 hover:text-[#7b42f5] transition-colors">FAQ & Tanya Jawab</a>
              </li>
            </ul>
          </div>

          {/* Social Media & Contact Icon Buttons */}
          <div className="md:col-span-4 space-y-4">
            <h4 className="font-heading font-black text-[#13102b] text-base uppercase tracking-wider">
              Media Sosial & Kontak
            </h4>
            <p className="text-slate-700 text-xs font-sans font-medium">
              Terhubung dengan kami di seluruh platform media sosial dan saluran kontak resmi:
            </p>
            <div className="flex flex-wrap items-center gap-3 pt-1">
              {socialLinks.map((social) => {
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
                  >
                    <IconComponent className="w-5 h-5 stroke-[2.2] group-hover:scale-110 transition-transform" />
                  </Button>
                );
              })}
            </div>
          </div>

        </div>

        {/* Bottom Copyright */}
        <div className="pt-8 flex justify-center text-xs font-mono font-bold text-slate-600">
          <p>© {new Date().getFullYear()} Yotsulabs Digital Studio. All rights reserved.</p>
        </div>

      </div>
    </footer>
  );
}
