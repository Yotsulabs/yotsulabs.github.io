"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { TbSearch, TbCompass, TbCpu, TbRocket, TbChevronRight, TbCircleCheck } from "react-icons/tb";
import SectionHeader from "../components/ui/SectionHeader";

export default function ProcessSection() {
  const [activeStep, setActiveStep] = useState(0);

  const steps = [
    {
      num: "01",
      title: "Konsultasi & Audit Kebutuhan",
      tagline: "Problem-First Approach",
      icon: TbSearch,
      color: "bg-[#7b42f5]",
      textColor: "text-white",
      shadow: "shadow-[5px_5px_0px_0px_#7b42f5]",
      description:
        "Kami berdiskusi secara mendalam untuk memahami tantangan bisnis, target audiens, dan tujuan spesifik Anda. Kami tidak langsung menjual template generic, tetapi menganalisis masalah riil Anda.",
      deliverables: [
        "Analisis Masalah & Peluang Digital",
        "Pemetaan Target Audiens & Kompetitor",
        "Rekomendasi Spesifikasi Layanan Tepat Guna",
      ],
    },
    {
      num: "02",
      title: "Strategi & Desain Arsitektur",
      tagline: "Wireframe & Brand Concept",
      icon: TbCompass,
      color: "bg-[#f3f0ff]",
      textColor: "text-purple-950",
      shadow: "shadow-[5px_5px_0px_0px_#13102b]",
      description:
        "Menyusun blueprint arsitektur sistem, struktur navigasi web, serta konsep visual brand. Anda dapat melihat dan mencoba prototipe awal sebelum tahap pengkodean dimulai.",
      deliverables: [
        "Interactive UI/UX Prototype",
        "Struktur Konten & Copywriting Concept",
        "Persetujuan Timeline & Key Milestones",
      ],
    },
    {
      num: "03",
      title: "Eksekusi & High-Performance Build",
      tagline: "Clean Code & Quality Check",
      icon: TbCpu,
      color: "bg-[#7b42f5]",
      textColor: "text-white",
      shadow: "shadow-[5px_5px_0px_0px_#7b42f5]",
      description:
        "Tahap pengembangan dengan framework Next.js 16, TypeScript, dan Tailwind CSS. Memastikan performa cepat, tampilan responsif di layar mobile, dan integrasi fitur yang aman.",
      deliverables: [
        "Kodingan Web Staging (Bisa Diuji Langsung)",
        "Optimasi Kecepatan Loading & Mobile Responsiveness",
        "Integrasi Form Kontak & API WhatsApp Direct",
      ],
    },
    {
      num: "04",
      title: "Peluncuran & Monitoring Scalability",
      tagline: "Live Deployment & Support",
      icon: TbRocket,
      color: "bg-[#f3f0ff]",
      textColor: "text-purple-950",
      shadow: "shadow-[5px_5px_0px_0px_#13102b]",
      description:
        "Peluncuran resmi proyek ke domain utama bisnis Anda (`yotsulabs.web.id` / domain klien). Kami mendampingi proses testing akhir dan menyediakan dukungan teknis pasca-launch.",
      deliverables: [
        "Penyiapan Domain & Hosting SSL Publik",
        "Panduan Pemeliharaan & Handover Aset",
        "Dukungan Garansi Pasca Launching",
      ],
    },
  ];

  return (
    <section id="proses" className="py-24 bg-transparent relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Section Header UI Component */}
        <SectionHeader
          title="4 Langkah Sederhana dari Ide Hingga Hasil Nyata"
          description="Proses kolaborasi transparan, tanpa istilah teknis yang membingungkan, berfokus penuh pada penyelesaian masalah bisnis Anda."
        />

        {/* Timeline Desktop Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

          {/* Step Selector List */}
          <div className="lg:col-span-5 flex flex-col gap-4">
            {steps.map((step, idx) => {
              const isSelected = activeStep === idx;
              return (
                <button
                  key={step.num}
                  onClick={() => setActiveStep(idx)}
                  className={`text-left p-5 rounded-2xl border-3 border-[#13102b] transition-all duration-300 flex items-center justify-between ${isSelected
                    ? `bg-white ${step.shadow} translate-x-1`
                    : "bg-[#f9f8fd] hover:bg-white border-slate-300 opacity-80"
                    }`}
                >
                  <div className="flex items-center gap-4">
                    <div
                      className={`w-12 h-12 rounded-xl border-2 border-[#13102b] ${step.color} ${step.textColor} flex items-center justify-center font-heading font-black text-lg shadow-sm`}
                    >
                      {step.num}
                    </div>
                    <div>
                      <span className="text-[11px] font-mono font-extrabold text-[#7b42f5] uppercase tracking-wider">
                        {step.tagline}
                      </span>
                      <h3 className="font-heading font-black text-base text-[#13102b]">
                        {step.title}
                      </h3>
                    </div>
                  </div>
                  <TbChevronRight
                    className={`w-5 h-5 text-slate-500 transition-transform ${isSelected ? "translate-x-1 text-[#7b42f5]" : ""
                      }`}
                  />
                </button>
              );
            })}
          </div>

          {/* Step Detail Display Box */}
          <div className="lg:col-span-7">
            <motion.div
              key={activeStep}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3 }}
              className="bg-white border-3 border-[#13102b] rounded-2xl p-6 sm:p-10 shadow-[8px_8px_0px_0px_#7b42f5] space-y-6"
            >
              <div className="flex items-center justify-between border-b-2 border-slate-200 pb-4">
                <div className="flex items-center gap-3">
                  <div
                    className={`w-10 h-10 rounded-xl border-2 border-[#13102b] ${steps[activeStep].color} ${steps[activeStep].textColor} flex items-center justify-center font-extrabold`}
                  >
                    {steps[activeStep].num}
                  </div>
                  <div>
                    <span className="text-xs font-mono font-bold text-slate-500 uppercase tracking-wider">Tahap {activeStep + 1} dari 4</span>
                    <h3 className="font-heading font-black text-2xl text-[#13102b]">
                      {steps[activeStep].title}
                    </h3>
                  </div>
                </div>
              </div>

              <p className="text-slate-700 text-base leading-relaxed font-sans font-medium">
                {steps[activeStep].description}
              </p>

              <div className="bg-[#f9f8fd] border-2 border-[#13102b] rounded-xl p-5 shadow-[3px_3px_0px_0px_#13102b]">
                <h4 className="font-heading font-black text-sm text-[#7b42f5] uppercase tracking-wider mb-3">
                  Deliverables Utama pada Tahap Ini:
                </h4>
                <ul className="space-y-3">
                  {steps[activeStep].deliverables.map((item, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm text-slate-900 font-sans font-semibold">
                      <TbCircleCheck className="w-5 h-5 text-[#7b42f5] shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-2 flex items-center justify-between text-xs font-mono font-bold text-slate-600">
                <span>Komunikasi Langsung via WhatsApp</span>
                <span>Progres Real-Time</span>
              </div>
            </motion.div>
          </div>

        </div>

      </div>
    </section>
  );
}
