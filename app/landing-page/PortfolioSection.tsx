"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { TbTrendingUp, TbSparkles, TbArrowUpRight } from "react-icons/tb";
import SectionHeader from "../components/ui/SectionHeader";
import Button from "../components/ui/Button";

export default function PortfolioSection() {
  const whatsappUrl = (projectName: string) =>
    `https://wa.me/62895339023888?text=Halo%20Yotsulabs!%20Saya%20tertarik%20dengan%20proyek%20serupa%20${encodeURIComponent(
      projectName
    )}.`;

  const projects = [
    {
      title: "Kopi Lokal Indonesia",
      category: "E-Commerce & Digital Marketing",
      tags: ["Web Next.js", "Payment Gateway", "FB & IG Ads"],
      metric: "+250% Order Penjualan",
      metricSub: "Dalam 60 Hari Pasca Launching",
      color: "bg-[#7b42f5]",
      shadow: "shadow-[6px_6px_0px_0px_#7b42f5]",
      description:
        "Redesain total platform e-commerce lokal dengan sistem checkout 1-klik via WhatsApp & Midtrans, dikombinasikan dengan strategi iklan targeted.",
    },
    {
      title: "Nusantara Logistics",
      category: "Corporate Web App & Tech",
      tags: ["Web App", "Custom Tracking", "SEO Strategy"],
      metric: "Rank 1 Google Keyword",
      metricSub: "Layanan Ekspedisi Bisnis",
      color: "bg-[#7b42f5]",
      shadow: "shadow-[6px_6px_0px_0px_#13102b]",
      description:
        "Pengembangan portal website perusahaan dengan sistem cek resi otomatis dan kalkulator biaya kirim kargo antar kota.",
    },
    {
      title: "Aura Creative Studio",
      category: "Brand Identity & UI/UX",
      tags: ["Logo Design", "Design System", "Social Kit"],
      metric: "100% Brand Consistency",
      metricSub: "Across All Marketing Touchpoints",
      color: "bg-[#7b42f5]",
      shadow: "shadow-[6px_6px_0px_0px_#7b42f5]",
      description:
        "Penyusunan panduan identitas merek komprehensif, desain logo modern, dan komponen antarmuka untuk aplikasi interior design studio.",
    },
  ];

  return (
    <section id="portofolio" className="py-24 bg-transparent relative border-t-3 border-[#13102b] overflow-hidden">
      
      {/* Decorative Quality Sticker */}
      <motion.div
        animate={{ y: [0, -8, 0], rotate: [-5, 5, -5] }}
        transition={{ repeat: Infinity, duration: 4.6, ease: "easeInOut" }}
        className="hidden lg:block absolute top-14 right-12 z-0 pointer-events-none opacity-85"
      >
        <Image
          src="/decorations/quality.png"
          alt="Quality Seal Sticker"
          width={68}
          height={68}
          className="w-16 h-16 object-contain"
        />
      </motion.div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header UI Component */}
        <SectionHeader
          badgeText="Studi Kasus & Hasil Nyata"
          badgeIcon={TbSparkles}
          title="Proyek Pilihan yang Menghasilkan Dampak Bisnis"
          description="Berikut adalah beberapa gambaran bagaimana pendekatan Technology, Creative, dan Digital Marketing Yotsulabs membantu klien mencapai hasil nyata."
        />

        {/* Project Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {projects.map((project, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.15 }}
              className={`bg-white border-3 border-[#13102b] rounded-2xl p-6 sm:p-8 ${project.shadow} flex flex-col justify-between hover:-translate-y-1 transition-all group`}
            >
              <div>
                {/* Category & Badge */}
                <div className="flex items-center justify-between mb-4">
                  <span className="text-[11px] font-mono font-extrabold text-purple-900 uppercase tracking-wider bg-[#f3f0ff] px-3 py-1 border-2 border-[#13102b] rounded-lg">
                    {project.category}
                  </span>
                  <div className={`w-3.5 h-3.5 rounded-full ${project.color} border-2 border-[#13102b]`} />
                </div>

                <h3 className="font-heading font-black text-2xl text-[#13102b] group-hover:text-[#7b42f5] transition-colors mb-3">
                  {project.title}
                </h3>

                <p className="text-slate-700 text-sm leading-relaxed mb-6 font-sans font-medium">
                  {project.description}
                </p>

                {/* Metric Highlight Box */}
                <div className="p-4 bg-[#f3f0ff] border-2 border-[#13102b] rounded-xl shadow-[3px_3px_0px_0px_#7b42f5] mb-6">
                  <div className="flex items-center gap-2 text-[#7b42f5] font-heading font-black text-lg">
                    <TbTrendingUp className="w-5 h-5 stroke-[2.5]" />
                    <span>{project.metric}</span>
                  </div>
                  <span className="text-xs font-mono font-bold text-slate-700 mt-0.5 block">
                    {project.metricSub}
                  </span>
                </div>

                {/* Tag Pills */}
                <div className="flex flex-wrap gap-2 mb-8">
                  {project.tags.map((tag, tIdx) => (
                    <span
                      key={tIdx}
                      className="text-xs font-mono font-bold text-slate-800 bg-[#f9f8fd] px-2.5 py-1 rounded-md border border-slate-300"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Action Button UI Component */}
              <Button
                variant="primary"
                href={whatsappUrl(project.title)}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full justify-between"
              >
                <span>Diskusi Proyek Serupa</span>
                <TbArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform stroke-[2.5]" />
              </Button>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
