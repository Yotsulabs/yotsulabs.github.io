"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { TbPlus, TbMinus } from "react-icons/tb";
import SectionHeader from "../components/ui/SectionHeader";

export default function FaqSection() {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  const faqs = [
    {
      q: "Apa yang membedakan Yotsulabs dengan agency digital biasa?",
      a: "Yotsulabs mengadopsi pendekatan Problem-First Consultative. Kami tidak sekadar menjual templat visual atau kodingan instant. Kami menganalisis masalah bisnis Anda terlebih dahulu, lalu merancang solusi terpadu yang menggabungkan Technology, Creative, dan Digital Marketing secara utuh.",
    },
    {
      q: "Berapa lama estimasi waktu pengerjaan sebuah landing page atau website?",
      a: "Untuk landing page atau website bisnis standar UMKM, waktu pengerjaan berkisar antara 7 hingga 14 hari kerja. Untuk sistem web app custom atau toko online lengkap, waktu pengerjaan disesuaikan dengan skala fitur (sekitar 14-21 hari kerja).",
    },
    {
      q: "Apakah saya perlu menyiapkan aset gambar dan copywriting sendiri?",
      a: "Tidak harus! Tim Creative Yotsulabs siap membantu menyusun ide konten, copywriting yang menjual, serta mengolah aset visual visual sesuai karakter brand Anda.",
    },
    {
      q: "Apakah website buatan Yotsulabs mudah diakses dari perangkat handphone?",
      a: "Tentu saja! Setiap produk web buatan Yotsulabs dibangun dengan standar Mobile-First responsive, loading super cepat (dikompilasi dengan Next.js & Turbopack), dan aman dari sisi keamanan SSL.",
    },
    {
      q: "Bagaimana proses pembayaran dan garansi pasca-peluncuran?",
      a: "Pembayaran dilakukan secara bertahap (sistem DP dan Termin Milestone). Setelah launching, kami memberikan garansi pemeliharaan teknis bebas biaya untuk memastikan website Anda berjalan tanpa hambatan.",
    },
  ];

  const toggleFaq = (idx: number) => {
    setOpenIdx(openIdx === idx ? null : idx);
  };

  return (
    <section id="faq" className="py-24 bg-transparent relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section Header UI Component */}
        <SectionHeader
          // badgeText="Tanya Jawab"
          // badgeIcon={TbHelpCircle}
          title="Pertanyaan yang Sering Diajukan Klien"
          description="Temukan jawaban atas pertanyaan umum seputar proses kerja, garansi, dan teknis kolaborasi bersama Yotsulabs."
        />

        {/* FAQ Accordion List */}
        <div className="space-y-4">
          {faqs.map((faq, idx) => {
            const isOpen = openIdx === idx;
            return (
              <div
                key={idx}
                className={`bg-white border-3 border-[#13102b] rounded-2xl transition-all ${isOpen
                  ? "shadow-[6px_6px_0px_0px_#7b42f5]"
                  : "shadow-[4px_4px_0px_0px_#13102b] hover:shadow-[5px_5px_0px_0px_#13102b]"
                  }`}
              >
                <button
                  onClick={() => toggleFaq(idx)}
                  className="w-full p-6 text-left flex items-center justify-between gap-4 font-heading font-black text-lg text-[#13102b] focus:outline-none"
                >
                  <span>{faq.q}</span>
                  <div
                    className={`w-8 h-8 rounded-lg border-2 border-[#13102b] flex items-center justify-center shrink-0 transition-all ${isOpen ? "bg-[#7b42f5] text-white rotate-180" : "bg-[#f3f0ff] text-[#13102b]"
                      }`}
                  >
                    {isOpen ? <TbMinus className="w-4 h-4 stroke-[3]" /> : <TbPlus className="w-4 h-4 stroke-[3]" />}
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
