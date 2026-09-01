"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { TbPlus, TbMinus } from "react-icons/tb";
import SectionHeader from "../../ui/SectionHeader";
import { FAQ_DATA } from "@/lib/siteData";

export default function FaqSection() {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  const toggleFaq = (idx: number) => {
    setOpenIdx(openIdx === idx ? null : idx);
  };

  return (
    <section id="faq" className="py-24 bg-transparent relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header UI Component */}
        <SectionHeader
          title="Pertanyaan yang Sering Diajukan"
          description="Temukan jawaban atas pertanyaan umum seputar proses kerja, garansi, dan teknis kolaborasi bersama Yotsulabs."
        />

        {/* FAQ Accordion List */}
        <div className="space-y-4">
          {FAQ_DATA.map((faq, idx) => {
            const isOpen = openIdx === idx;
            return (
              <div
                key={idx}
                className={`bg-white border-3 border-[#13102b] rounded-2xl transition-all ${
                  isOpen
                    ? "shadow-[6px_6px_0px_0px_#7b42f5]"
                    : "shadow-[4px_4px_0px_0px_#13102b] hover:shadow-[5px_5px_0px_0px_#13102b]"
                }`}
              >
                <button
                  onClick={() => toggleFaq(idx)}
                  className="w-full p-6 text-left flex items-center justify-between gap-4 font-heading font-black text-lg text-[#13102b] focus:outline-none cursor-pointer"
                >
                  <span>{faq.q}</span>
                  <div
                    className={`w-8 h-8 rounded-lg border-2 border-[#13102b] flex items-center justify-center shrink-0 transition-all ${
                      isOpen
                        ? "bg-[#7b42f5] text-white rotate-180"
                        : "bg-[#f3f0ff] text-[#13102b]"
                    }`}
                  >
                    {isOpen ? (
                      <TbMinus className="w-4 h-4 stroke-[3]" />
                    ) : (
                      <TbPlus className="w-4 h-4 stroke-[3]" />
                    )}
                  </div>
                </button>

                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.2 }}
                      className="overflow-hidden"
                    >
                      <div className="px-6 pb-6 pt-0 text-slate-700 text-sm leading-relaxed font-sans font-medium border-t-2 border-slate-200 mt-2">
                        <p className="pt-4">{faq.a}</p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
