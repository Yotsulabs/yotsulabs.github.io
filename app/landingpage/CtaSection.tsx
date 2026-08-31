"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { TbBrandWhatsapp, TbArrowRight, TbBolt } from "react-icons/tb";
import Button from "../components/ui/Button";
import Badge from "../components/ui/Badge";

export default function CtaSection() {
  const whatsappUrl =
    "https://wa.me/62895339023888?text=Halo%20Yotsulabs!%20Saya%20siap%20konsultasi%20untuk%20mengembangkan%20kebutuhan%20digital%20bisnis%20saya.";

  return (
    <section className="py-20 bg-transparent relative border-t-3 border-[#13102b] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative bg-[#7b42f5] border-3 border-[#13102b] rounded-3xl p-8 sm:p-14 shadow-[10px_10px_0px_0px_#13102b] overflow-hidden">
          
          {/* Decorative Spark Banner Asset */}
          <motion.div
            animate={{ scale: [1, 1.15, 1], rotate: [0, 20, 0] }}
            transition={{ repeat: Infinity, duration: 4.5, ease: "easeInOut" }}
            className="hidden sm:block absolute top-6 right-8 z-0 pointer-events-none opacity-90"
          >
            <Image
              src="/decorations/spark.png"
              alt="Sparkle Accent"
              width={72}
              height={72}
              className="w-16 h-16 object-contain drop-shadow-md"
            />
          </motion.div>

          <div className="relative z-10 max-w-3xl space-y-6">
            
            <Badge variant="white" icon={TbBolt}>
              Mulai Kolaborasi Hari Ini
            </Badge>

            <h2 className="font-heading font-black text-3xl sm:text-5xl text-white tracking-tight leading-tight">
              Siap Membawa Bisnis Anda ke Tingkat Digital Berikutnya?
            </h2>

            <p className="text-white/90 text-base sm:text-lg leading-relaxed font-sans font-medium">
              Konsultasikan ide, tantangan, atau rencana proyek Anda bersama tim Yotsulabs. Kami siap merancang solusi Technology, Creative, dan Digital Marketing yang tepat sasaran.
            </p>

            <div className="pt-4 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
              <Button
                variant="secondary"
                size="lg"
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                <TbBrandWhatsapp className="w-6 h-6 text-[#7b42f5]" />
                <span>Mulai Konsultasi Gratis Sekarang</span>
                <TbArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform stroke-[2.5]" />
              </Button>
            </div>

            <div className="pt-2 text-xs font-mono font-bold text-white/80 flex flex-wrap items-center gap-4">
              <span>✓ WhatsApp: +62 895 3390 23888</span>
              <span>✓ Email: yotsulabs@gmail.com</span>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
