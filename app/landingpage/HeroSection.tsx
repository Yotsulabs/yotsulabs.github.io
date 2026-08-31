"use client";

import Image from "next/image";
import { motion } from "motion/react";
import {
  TbBrandWhatsapp,
  TbArrowRight,
  TbCode,
  TbPalette,
  TbTrendingUp,
  TbCircleCheck,
  TbRocket,
  TbSparkles,
} from "react-icons/tb";
import Button from "../components/ui/Button";
import Badge from "../components/ui/Badge";

export default function HeroSection() {
  const whatsappUrl =
    "https://wa.me/62895339023888?text=Halo%20Yotsulabs!%20Saya%20ingin%20diskusi%20kebutuhan%20digital%20bisnis%20saya.";

  return (
    <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden">
      
      {/* Decorative Floating Assets */}
      <motion.div
        animate={{ y: [0, -8, 0], rotate: [-4, 4, -4] }}
        transition={{ repeat: Infinity, duration: 4.5, ease: "easeInOut" }}
        className="hidden md:block absolute top-24 left-10 z-0 pointer-events-none opacity-80"
      >
        <Image
          src="/decorations/clover.png"
          alt="Clover Sticker"
          width={64}
          height={64}
          className="w-14 h-14 object-contain"
        />
      </motion.div>

      <motion.div
        animate={{ scale: [1, 1.12, 1], rotate: [0, 15, 0] }}
        transition={{ repeat: Infinity, duration: 3.8, ease: "easeInOut" }}
        className="hidden md:block absolute top-20 right-12 z-0 pointer-events-none opacity-85"
      >
        <Image
          src="/decorations/spark.png"
          alt="Sparkle Sticker"
          width={56}
          height={56}
          className="w-12 h-12 object-contain"
        />
      </motion.div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Headline & Action */}
          <div className="lg:col-span-7 flex flex-col items-start relative">
            
            {/* Top Badge UI Component */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="mb-6"
            >
              <Badge variant="white" icon={TbRocket}>
                Technology, Creative & Marketing
              </Badge>
            </motion.div>

            {/* Main Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="font-heading font-black text-4xl sm:text-5xl lg:text-6xl text-[#13102b] tracking-tight leading-[1.15] mb-6 relative"
            >
              Skalakan Bisnis Anda dengan{" "}
              <span className="relative inline-block text-white bg-[#7b42f5] px-3 py-0.5 border-2 border-[#13102b] shadow-[4px_4px_0px_0px_#13102b] rounded-md">
                Sentuhan Digital.
              </span>
            </motion.h1>

            {/* Sub-headline */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-lg sm:text-xl text-slate-700 leading-relaxed mb-8 max-w-2xl font-sans font-medium"
            >
              Kami mengubah tantangan bisnis Anda menjadi peluang omzet melalui website berkecepatan tinggi dan visual brand yang tepat sasaran.
            </motion.p>

            {/* CTA Buttons UI Components */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full sm:w-auto relative"
            >
              <Button
                variant="primary"
                size="lg"
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                <TbBrandWhatsapp className="w-5 h-5" />
                <span>Mulai Diskusi via WA</span>
                <TbArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform stroke-[2.5]" />
              </Button>

              <Button variant="secondary" size="lg" href="#proses">
                <span>Pelajari Alur Kerja</span>
              </Button>

              {/* Decorative Click Pointer Cursor Sticker */}
              <motion.div
                animate={{ x: [0, 5, 0], y: [0, -5, 0] }}
                transition={{ repeat: Infinity, duration: 2.5, ease: "easeInOut" }}
                className="hidden sm:block absolute -bottom-7 right-4 z-20 pointer-events-none"
              >
                <Image
                  src="/decorations/cursor.png"
                  alt="Cursor Pointer"
                  width={40}
                  height={40}
                  className="w-9 h-9 object-contain drop-shadow-md rotate-[-12deg]"
                />
              </motion.div>
            </motion.div>

            {/* Value Trust Tags */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="flex flex-wrap items-center gap-4 mt-10 pt-6 border-t-2 border-slate-300 w-full text-xs font-mono text-slate-700 font-bold"
            >
              <div className="flex items-center gap-1.5">
                <TbCircleCheck className="w-4 h-4 text-[#7b42f5]" />
                <span>Konsultasi Bebas Biaya</span>
              </div>
              <div className="flex items-center gap-1.5">
                <TbCircleCheck className="w-4 h-4 text-[#7b42f5]" />
                <span>Garansi Pengerjaan Tepat Waktu</span>
              </div>
              <div className="flex items-center gap-1.5">
                <TbCircleCheck className="w-4 h-4 text-[#7b42f5]" />
                <span>Support Responsif</span>
              </div>
            </motion.div>
          </div>

          {/* Right Column: Duo Mascot Showcase */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-5 relative flex items-center justify-center py-4"
          >
            {/* Mascot Container */}
            <div className="relative w-full max-w-[380px] sm:max-w-[440px] flex items-center justify-center">
              
              {/* Main Mascot Image with Floating Bobbing Animation */}
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
                className="relative z-10 w-full flex items-center justify-center"
              >
                <Image
                  src="/mascot/duo_maskot.png"
                  alt="Yotsulabs Duo Mascot - Yuto & Yotsuba"
                  width={420}
                  height={420}
                  priority
                  className="w-full max-w-[340px] sm:max-w-[400px] h-auto object-contain drop-shadow-[0_16px_32px_rgba(19,16,43,0.18)]"
                />
              </motion.div>

              {/* Floating Orbit Badge 1: Tech / Code */}
              <motion.div
                animate={{ y: [-5, 5, -5], rotate: [-2, 2, -2] }}
                transition={{ repeat: Infinity, duration: 3.2, ease: "easeInOut" }}
                className="absolute top-4 -left-2 sm:-left-4 z-20 bg-white border-2 border-[#13102b] shadow-[3px_3px_0px_0px_#7b42f5] px-3 py-1.5 rounded-xl flex items-center gap-2"
              >
                <div className="w-6 h-6 rounded-lg bg-[#7b42f5] text-white flex items-center justify-center border border-[#13102b] shrink-0">
                  <TbCode className="w-3.5 h-3.5 stroke-[2.5]" />
                </div>
                <div className="flex flex-col">
                  <span className="font-heading font-black text-xs text-[#13102b]">Tech & Web</span>
                  <span className="text-[9px] font-mono font-bold text-slate-500 -mt-0.5">Next.js 16</span>
                </div>
              </motion.div>

              {/* Floating Orbit Badge 2: Creative Design */}
              <motion.div
                animate={{ y: [5, -5, 5], rotate: [2, -2, 2] }}
                transition={{ repeat: Infinity, duration: 3.6, ease: "easeInOut" }}
                className="absolute top-6 -right-2 sm:-right-4 z-20 bg-white border-2 border-[#13102b] shadow-[3px_3px_0px_0px_#13102b] px-3 py-1.5 rounded-xl flex items-center gap-2"
              >
                <div className="w-6 h-6 rounded-lg bg-[#f3f0ff] text-[#7b42f5] flex items-center justify-center border border-[#13102b] shrink-0">
                  <TbPalette className="w-3.5 h-3.5 stroke-[2.5]" />
                </div>
                <div className="flex flex-col">
                  <span className="font-heading font-black text-xs text-[#13102b]">Creative UI/UX</span>
                  <span className="text-[9px] font-mono font-bold text-[#7b42f5] -mt-0.5">Brand Identity</span>
                </div>
              </motion.div>

              {/* Floating Orbit Badge 3: Growth Marketing */}
              <motion.div
                animate={{ y: [-4, 6, -4], rotate: [1.5, -1.5, 1.5] }}
                transition={{ repeat: Infinity, duration: 4.1, ease: "easeInOut" }}
                className="absolute bottom-6 -left-2 sm:-left-4 z-20 bg-white border-2 border-[#13102b] shadow-[3px_3px_0px_0px_#13102b] px-3 py-1.5 rounded-xl flex items-center gap-2"
              >
                <div className="w-6 h-6 rounded-lg bg-[#7b42f5] text-white flex items-center justify-center border border-[#13102b] shrink-0">
                  <TbTrendingUp className="w-3.5 h-3.5 stroke-[2.5]" />
                </div>
                <div className="flex flex-col">
                  <span className="font-heading font-black text-xs text-[#13102b]">Digital Growth</span>
                  <span className="text-[9px] font-mono font-bold text-slate-500 -mt-0.5">+Sales Conversion</span>
                </div>
              </motion.div>

              {/* Floating Orbit Badge 4: Mascot Studio Tag */}
              <motion.div
                animate={{ y: [6, -4, 6], rotate: [-1.5, 1.5, -1.5] }}
                transition={{ repeat: Infinity, duration: 3.8, ease: "easeInOut" }}
                className="absolute bottom-6 -right-2 sm:-right-4 z-20 bg-[#7b42f5] text-white border-2 border-[#13102b] shadow-[3px_3px_0px_0px_#13102b] px-3 py-1.5 rounded-xl flex items-center gap-2"
              >
                <TbSparkles className="w-3.5 h-3.5 text-white stroke-[2.5] shrink-0" />
                <div className="flex flex-col">
                  <span className="font-heading font-black text-xs text-white">Problem-First</span>
                  <span className="text-[9px] font-mono font-extrabold text-purple-200 -mt-0.5">Yotsulabs Studio</span>
                </div>
              </motion.div>

            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
