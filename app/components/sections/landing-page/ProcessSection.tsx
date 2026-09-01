"use client";

import { motion } from "motion/react";
import { TbPin } from "react-icons/tb";
import SectionHeader from "../../ui/SectionHeader";
import { PROCESS_STEPS } from "@/lib/siteData";

export default function ProcessSection() {
  return (
    <section id="proses" className="py-24 bg-transparent relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Section Header UI Component */}
        <SectionHeader
          title="5 Langkah Kolaborasi dari Ide Hingga Hasil Nyata"
          description="Proses kerja transparan dan terstruktur dari Yotsulabs yang mencakup solusi Technology, Creative, dan Digital Marketing bisnis Anda."
        />

        {/* Pinned Cards Timeline Container */}
        <div className="relative pt-6 max-w-5xl mx-auto">

          {/* SVG Seamless Connected Dashed Arrows Path for Desktop */}
          <div className="hidden md:block absolute inset-0 pointer-events-none z-0">
            <svg
              className="w-full h-full"
              viewBox="0 0 800 680"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              preserveAspectRatio="none"
            >
              <defs>
                <marker
                  id="process-arrowhead"
                  viewBox="0 0 10 10"
                  refX="6"
                  refY="5"
                  markerWidth="8"
                  markerHeight="8"
                  orient="auto-start-reverse"
                >
                  <path d="M 0 1 L 10 5 L 0 9 z" fill="#7b42f5" />
                </marker>
              </defs>

              {/* 01 -> 02 (Top Left -> Top Right) */}
              <path
                d="M 340 100 Q 420 100, 460 130"
                stroke="#13102b"
                strokeWidth="2.5"
                strokeDasharray="6 6"
                markerEnd="url(#process-arrowhead)"
                className="opacity-60"
              />

              {/* 02 -> 03 (Top Right -> Mid Left) */}
              <path
                d="M 460 220 Q 380 280, 340 300"
                stroke="#13102b"
                strokeWidth="2.5"
                strokeDasharray="6 6"
                markerEnd="url(#process-arrowhead)"
                className="opacity-60"
              />

              {/* 03 -> 04 (Mid Left -> Mid Right) */}
              <path
                d="M 340 340 Q 420 340, 460 380"
                stroke="#13102b"
                strokeWidth="2.5"
                strokeDasharray="6 6"
                markerEnd="url(#process-arrowhead)"
                className="opacity-60"
              />

              {/* 04 -> 05 (Mid Right -> Bottom Left) */}
              <path
                d="M 460 460 Q 380 520, 340 550"
                stroke="#13102b"
                strokeWidth="2.5"
                strokeDasharray="6 6"
                markerEnd="url(#process-arrowhead)"
                className="opacity-60"
              />
            </svg>
          </div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 items-stretch relative z-10">
            {PROCESS_STEPS.map((step, idx) => {
              const isEven = idx % 2 === 1;

              return (
                <motion.div
                  key={step.num}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.35, delay: idx * 0.08 }}
                  className={`flex flex-col h-full ${isEven ? "md:mt-10" : ""}`}
                >
                  {/* Card Container with Slightly Enlarged Padding & Typography */}
                  <div
                    className={`${step.bgColor} border-3 border-[#13102b] rounded-3xl p-5 sm:p-6 shadow-[5px_5px_0px_0px_#13102b] hover:shadow-[7px_7px_0px_0px_#7b42f5] transition-all duration-300 transform ${step.rotation} relative group h-full flex flex-col justify-start space-y-2 max-w-md w-full mx-auto`}
                  >
                    {/* Top Center Pushpin Icon Badge */}
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-[#13102b] text-white border-2 border-white shadow-[2px_2px_0px_0px_#7b42f5] flex items-center justify-center z-20 group-hover:scale-110 transition-transform">
                      <TbPin className="w-4 h-4 text-[#7b42f5] rotate-45" />
                    </div>

                    {/* Step Number */}
                    <div className="pt-1">
                      <span className="font-heading font-black text-3xl sm:text-4xl text-[#7b42f5]">
                        {step.num}
                      </span>
                    </div>

                    {/* Title */}
                    <h3 className="font-heading font-black text-lg sm:text-xl text-[#13102b] tracking-tight">
                      {step.title}
                    </h3>

                    {/* Description */}
                    <p className="text-slate-700 text-xs sm:text-sm font-sans font-medium leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>

        </div>

      </div>
    </section>
  );
}
