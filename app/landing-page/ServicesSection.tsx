"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "motion/react";
import { TbCode, TbShoppingCart, TbPalette, TbStack2, TbSparkles, TbSpeakerphone, TbTarget, TbCheck, TbArrowUpRight } from "react-icons/tb";
import SectionHeader from "../components/ui/SectionHeader";
import Button from "../components/ui/Button";

export default function ServicesSection() {
  const [activeTab, setActiveTab] = useState<"all" | "tech" | "creative" | "marketing">("all");

  const whatsappUrl = (serviceName: string) =>
    `https://wa.me/62895339023888?text=Halo%20Yotsulabs!%20Saya%20tertarik%20dengan%20layanan%20${encodeURIComponent(
      serviceName
    )}.`;

  const services = [
    {
      id: "web-dev",
      category: "tech",
      title: "Custom Web & App Development",
      description: "Pembuatan website studio, landing page conversion tinggi, dan aplikasi web modern berbasis Next.js & React.",
      icon: TbCode,
      badge: "Tech Pillar",
      color: "bg-[#7b42f5]",
      textColor: "text-white",
      shadow: "shadow-[6px_6px_0px_0px_#7b42f5]",
      features: [
        "Landing Page High Conversion",
        "Website Perusahaan & UMKM",
        "Toko Online / E-Commerce Custom",
        "Sistem Informasi & SaaS MVP",
      ],
    },
    {
      id: "brand-creative",
      category: "creative",
      title: "Brand Identity & UI/UX Design",
      description: "Desain visual yang memikat, elegan, dan membuat brand bisnis Anda terlihat menonjol dibanding kompetitor.",
      icon: TbPalette,
      badge: "Creative Pillar",
      color: "bg-[#7b42f5]",
      textColor: "text-white",
      shadow: "shadow-[6px_6px_0px_0px_#13102b]",
      features: [
        "Logo & Brand Guideline Lengkap",
        "Desain Interface Web & Mobile (UI/UX)",
        "Social Media Visual Kit",
        "Brosur & Profil Perusahaan Digital",
      ],
    },
    {
      id: "digital-marketing",
      category: "marketing",
      title: "Growth & Digital Marketing",
      description: "Strategi pemasaran digital berbasis data untuk mendatangkan traffic berkualitas, leads, dan konversi penjualan.",
      icon: TbTarget,
      badge: "Marketing Pillar",
      color: "bg-[#7b42f5]",
      textColor: "text-white",
      shadow: "shadow-[6px_6px_0px_0px_#7b42f5]",
      features: [
        "Optimisasi SEO (Peringkat Google)",
        "Iklan Meta (FB & IG Ads) + Google Ads",
        "Manajemen Konten Media Sosial",
        "Content Strategy & Copywriting",
      ],
    },
    {
      id: "ecommerce-system",
      category: "tech",
      title: "E-Commerce Solution",
      description: "Integrasi sistem toko online lengkap dengan payment gateway lokal, kurir otomatis, dan manajemen inventori.",
      icon: TbShoppingCart,
      badge: "Tech Pillar",
      color: "bg-white",
      textColor: "text-[#13102b]",
      shadow: "shadow-[6px_6px_0px_0px_#13102b]",
      features: [
        "Integrasi Payment Midtrans / Xendit",
        "Kalkulasi Ongkir Otomatis",
        "Dashboard Kelola Stok & Order",
        "Optimasi Kecepatan Loading",
      ],
    },
    {
      id: "uiux-prototype",
      category: "creative",
      title: "UI/UX Audit & Prototype",
      description: "Analisis pengalaman pengguna dan pembuatan prototipe interaktif sebelum tahap pengkodean aplikasi.",
      icon: TbStack2,
      badge: "Creative Pillar",
      color: "bg-white",
      textColor: "text-[#13102b]",
      shadow: "shadow-[6px_6px_0px_0px_#7b42f5]",
      features: [
        "User Flow & Wireframing",
        "High-Fidelity Interactive Prototype",
        "Design System & Component Library",
        "UX Conversion Optimization Audit",
      ],
    },
    {
      id: "performance-growth",
      category: "marketing",
      title: "Social Media & Ads Strategy",
      description: "Pengelolaan promosi digital terjadual dengan materi visual kreatif yang menarik calon pembeli potensial.",
      icon: TbSpeakerphone,
      badge: "Marketing Pillar",
      color: "bg-white",
      textColor: "text-[#13102b]",
      shadow: "shadow-[6px_6px_0px_0px_#13102b]",
      features: [
        "Perancangan Campaign Visual",
        "Targeting Audiens Bisnis Lokal",
        "Laporan Analitik & ROAS bulanan",
        "Copywriting Iklan Berorientasi Sales",
      ],
    },
  ];

  const filteredServices =
    activeTab === "all" ? services : services.filter((s) => s.category === activeTab);

  return (
    <section id="layanan" className="py-24 bg-transparent relative border-t-3 border-[#13102b] overflow-hidden">
      
      {/* Floating Decorative Assets */}
      <motion.div
        animate={{ y: [0, -6, 0], rotate: [-6, 6, -6] }}
        transition={{ repeat: Infinity, duration: 4.2, ease: "easeInOut" }}
        className="hidden lg:block absolute top-16 left-8 z-0 pointer-events-none opacity-80"
      >
        <Image
          src="/decorations/syntax.png"
          alt="Syntax Code Bracket"
          width={64}
          height={64}
          className="w-14 h-14 object-contain"
        />
      </motion.div>

      <motion.div
        animate={{ y: [0, 8, 0], rotate: [5, -5, 5] }}
        transition={{ repeat: Infinity, duration: 4.8, ease: "easeInOut" }}
        className="hidden lg:block absolute top-20 right-10 z-0 pointer-events-none opacity-85"
      >
        <Image
          src="/decorations/approved.png"
          alt="Approved Stamp Badge"
          width={72}
          height={72}
          className="w-16 h-16 object-contain"
        />
      </motion.div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header UI Component */}
        <SectionHeader
          badgeText="Solusi Komprehensif"
          badgeIcon={TbSparkles}
          title="Layanan Digital Terbaik untuk Mengakselerasi Bisnis Anda"
          description="Kami menggabungkan tiga pilar utama: Technology, Creative, dan Digital Marketing untuk memberikan ekosistem solusi utuh."
        >
          {/* Filter Tabs */}
          <div className="flex flex-wrap items-center justify-center gap-2 mt-8 bg-white p-2 rounded-2xl border-2 border-[#13102b] shadow-[4px_4px_0px_0px_#13102b]">
            {[
              { id: "all" as const, label: "Semua Solusi" },
              { id: "tech" as const, label: "🚀 Technology" },
              { id: "creative" as const, label: "🎨 Creative" },
              { id: "marketing" as const, label: "📈 Digital Marketing" },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 py-2 rounded-xl font-heading font-extrabold text-sm transition-all border-2 ${
                  activeTab === tab.id
                    ? "bg-[#7b42f5] text-white border-[#13102b] shadow-[2px_2px_0px_0px_#13102b]"
                    : "bg-transparent text-slate-700 border-transparent hover:text-[#13102b] hover:bg-[#f3f0ff]"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </SectionHeader>

        {/* Bento Grid */}
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence mode="popLayout">
            {filteredServices.map((service) => {
              const IconComp = service.icon;
              return (
                <motion.div
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3 }}
                  key={service.id}
                  className={`bg-white border-3 border-[#13102b] rounded-2xl p-6 sm:p-8 ${service.shadow} flex flex-col justify-between hover:-translate-y-1 transition-all duration-300 group`}
                >
                  <div>
                    {/* Header Item */}
                    <div className="flex items-center justify-between mb-6">
                      <div className={`p-3 rounded-xl border-2 border-[#13102b] ${service.color} ${service.textColor}`}>
                        <IconComp className="w-6 h-6 stroke-[2.5]" />
                      </div>
                      <span className="text-[11px] font-mono font-extrabold uppercase tracking-wider bg-[#f3f0ff] text-purple-900 px-3 py-1 border-2 border-[#13102b] rounded-lg">
                        {service.badge}
                      </span>
                    </div>

                    <h3 className="font-heading font-black text-xl text-[#13102b] group-hover:text-[#7b42f5] transition-colors mb-3">
                      {service.title}
                    </h3>
                    <p className="text-slate-700 text-sm leading-relaxed mb-6 font-sans font-medium">
                      {service.description}
                    </p>

                    {/* Features List */}
                    <ul className="space-y-2.5 mb-8 border-t-2 border-slate-200 pt-4">
                      {service.features.map((feat, idx) => (
                        <li key={idx} className="flex items-center gap-2.5 text-xs text-slate-800 font-sans font-semibold">
                          <div className="w-4 h-4 rounded bg-[#f3f0ff] border border-[#13102b] flex items-center justify-center shrink-0">
                            <TbCheck className="w-3.5 h-3.5 text-[#7b42f5] stroke-[3]" />
                          </div>
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Button CTA */}
                  <Button
                    variant="outline"
                    href={whatsappUrl(service.title)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full justify-between hover:bg-[#7b42f5] hover:text-white"
                  >
                    <span>Konsultasikan Layanan Ini</span>
                    <TbArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform stroke-[2.5]" />
                  </Button>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>

      </div>
    </section>
  );
}
