"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "motion/react";
import { TbCalculator, TbCheck, TbArrowRight, TbShieldCheck, TbBrandWhatsapp } from "react-icons/tb";
import SectionHeader from "../components/ui/SectionHeader";
import Button from "../components/ui/Button";

export default function EstimatorSection() {
  const [selectedService, setSelectedService] = useState<string>("web");
  const [scale, setScale] = useState<string>("umkm");
  const [addons, setAddons] = useState<string[]>(["seo"]);

  const serviceOptions = [
    { id: "web", name: "Web & App Development", estDays: "7-14 Hari", basePrice: "Cocok untuk Landing Page & Web UMKM" },
    { id: "brand", name: "Brand & Creative Design", estDays: "5-10 Hari", basePrice: "Cocok untuk Branding Kit & Visual UI" },
    { id: "marketing", name: "Digital Growth & Ads Strategy", estDays: "Bulanan / Event", basePrice: "Cocok untuk Iklan & Social Media" },
    { id: "all-in-one", name: "Bundle All-in-One Studio", estDays: "14-21 Hari", basePrice: "Solusi Lengkap Tech + Creative + Marketing" },
  ];

  const scaleOptions = [
    { id: "umkm", label: "UMKM & Startup Lokal", desc: "Skala usaha fleksibel dengan fokus percepatan konversi" },
    { id: "growing", label: "Bisnis Menengah / Growing", desc: "Kebutuhan sistem kustom & identitas brand lebih luas" },
    { id: "corporate", label: "Perusahaan & Organisasi", desc: "Arsitektur skala besar dengan integrasi khusus" },
  ];

  const addonOptions = [
    { id: "seo", label: "Optimasi SEO & Keyword Research" },
    { id: "payment", label: "Integrasi Payment Gateway & Auto Courier" },
    { id: "social-kit", label: "Social Media Design Template Kit" },
    { id: "wa-bot", label: "Integrasi WhatsApp Auto-Responder" },
  ];

  const toggleAddon = (id: string) => {
    if (addons.includes(id)) {
      setAddons(addons.filter((item) => item !== id));
    } else {
      setAddons([...addons, id]);
    }
  };

  const getActiveServiceDays = () => {
    const found = serviceOptions.find((s) => s.id === selectedService);
    return found ? found.estDays : "7-14 Hari";
  };

  const selectedServiceName = serviceOptions.find((s) => s.id === selectedService)?.name;
  const selectedScaleName = scaleOptions.find((s) => s.id === scale)?.label;
  const addonNames = addons
    .map((aId) => addonOptions.find((a) => a.id === aId)?.label)
    .filter(Boolean)
    .join(", ");

  const waMessage = `Halo Yotsulabs! Saya mengestimasi proyek digital saya dengan rincian:%0A- Layanan: ${encodeURIComponent(
    selectedServiceName || ""
  )}%0A- Skala Bisnis: ${encodeURIComponent(
    selectedScaleName || ""
  )}%0A- Fitur Tambahan: ${encodeURIComponent(
    addonNames || "Tidak ada"
  )}.%0AMohon bantuan penawaran dan waktu diskusi teknis.`;

  const waUrl = `https://wa.me/62895339023888?text=${waMessage}`;

  return (
    <section id="estimator" className="py-24 bg-transparent relative border-t-3 border-[#13102b] overflow-hidden">
      
      {/* Decorative Let's Talk & Dots Stickers */}
      <motion.div
        animate={{ y: [0, -7, 0], rotate: [-4, 4, -4] }}
        transition={{ repeat: Infinity, duration: 4.3, ease: "easeInOut" }}
        className="hidden lg:block absolute top-16 left-10 z-0 pointer-events-none opacity-85"
      >
        <Image
          src="/decorations/lets_talk.png"
          alt="Let's Talk Speech Bubble"
          width={80}
          height={80}
          className="w-18 h-18 object-contain"
        />
      </motion.div>

      <motion.div
        animate={{ y: [0, 6, 0] }}
        transition={{ repeat: Infinity, duration: 3.5, ease: "easeInOut" }}
        className="hidden lg:block absolute top-20 right-10 z-0 pointer-events-none opacity-80"
      >
        <Image
          src="/decorations/dots.png"
          alt="Dots Accent"
          width={64}
          height={64}
          className="w-14 h-14 object-contain"
        />
      </motion.div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header UI Component */}
        <SectionHeader
          badgeText="Kalkulator Kebutuhan"
          badgeIcon={TbCalculator}
          title="Simulasi Estimasi Proyek Digital Anda"
          description="Pilih komponen kebutuhan proyek Anda di bawah ini untuk mendapatkan gambaran waktu pengerjaan dan mengirimkan brief langsung via WhatsApp."
        />

        {/* Interactive Estimator Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Options Column */}
          <div className="lg:col-span-7 space-y-8 bg-white border-3 border-[#13102b] rounded-2xl p-6 sm:p-8 shadow-[6px_6px_0px_0px_#7b42f5]">
            
            {/* Step 1: Layanan Utama */}
            <div>
              <label className="font-heading font-black text-[#13102b] text-lg block mb-3 flex items-center gap-2">
                <span className="w-6 h-6 rounded-lg bg-[#7b42f5] text-white text-xs font-mono font-extrabold flex items-center justify-center border-2 border-[#13102b]">1</span>
                Pilih Pilar Layanan Utama:
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {serviceOptions.map((opt) => (
                  <button
                    key={opt.id}
                    onClick={() => setSelectedService(opt.id)}
                    className={`text-left p-4 rounded-xl border-2 transition-all ${
                      selectedService === opt.id
                        ? "bg-[#f3f0ff] border-[#7b42f5] shadow-[3px_3px_0px_0px_#7b42f5]"
                        : "bg-[#f9f8fd] border-slate-300 hover:border-slate-500 opacity-85"
                    }`}
                  >
                    <h4 className="font-heading font-black text-[#13102b] text-sm mb-1">{opt.name}</h4>
                    <p className="text-xs text-slate-600 font-sans font-medium">{opt.basePrice}</p>
                  </button>
                ))}
              </div>
            </div>

            {/* Step 2: Skala Bisnis */}
            <div>
              <label className="font-heading font-black text-[#13102b] text-lg block mb-3 flex items-center gap-2">
                <span className="w-6 h-6 rounded-lg bg-[#7b42f5] text-white text-xs font-mono font-extrabold flex items-center justify-center border-2 border-[#13102b]">2</span>
                Skala Organisasi / Bisnis:
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {scaleOptions.map((sOpt) => (
                  <button
                    key={sOpt.id}
                    onClick={() => setScale(sOpt.id)}
                    className={`text-left p-3.5 rounded-xl border-2 transition-all ${
                      scale === sOpt.id
                        ? "bg-[#f3f0ff] border-[#7b42f5] shadow-[3px_3px_0px_0px_#7b42f5]"
                        : "bg-[#f9f8fd] border-slate-300 hover:border-slate-500 opacity-85"
                    }`}
                  >
                    <h4 className="font-heading font-extrabold text-[#13102b] text-xs mb-1">{sOpt.label}</h4>
                    <p className="text-[11px] text-slate-600 leading-tight font-sans font-medium">{sOpt.desc}</p>
                  </button>
                ))}
              </div>
            </div>

            {/* Step 3: Addons */}
            <div>
              <label className="font-heading font-black text-[#13102b] text-lg block mb-3 flex items-center gap-2">
                <span className="w-6 h-6 rounded-lg bg-[#7b42f5] text-white text-xs font-mono font-extrabold flex items-center justify-center border-2 border-[#13102b]">3</span>
                Fitur Tambahan Opsional:
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {addonOptions.map((addon) => {
                  const isChecked = addons.includes(addon.id);
                  return (
                    <button
                      key={addon.id}
                      onClick={() => toggleAddon(addon.id)}
                      className={`text-left p-3 rounded-xl border-2 transition-all flex items-center gap-3 ${
                        isChecked
                          ? "bg-[#f3f0ff] border-[#7b42f5] shadow-[2px_2px_0px_0px_#7b42f5]"
                          : "bg-[#f9f8fd] border-slate-300 opacity-85"
                      }`}
                    >
                      <div className={`w-5 h-5 rounded border border-[#13102b] flex items-center justify-center ${isChecked ? "bg-[#7b42f5] text-white" : "bg-white"}`}>
                        {isChecked && <TbCheck className="w-3.5 h-3.5 stroke-[3]" />}
                      </div>
                      <span className="text-xs font-extrabold text-slate-900 font-sans">{addon.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

          </div>

          {/* Result Summary Box */}
          <div className="lg:col-span-5 sticky top-28">
            <div className="bg-[#7b42f5] text-white border-3 border-[#13102b] rounded-2xl p-6 sm:p-8 shadow-[8px_8px_0px_0px_#13102b] space-y-6">
              
              <div className="flex items-center justify-between border-b-2 border-white/20 pb-4">
                <span className="font-mono font-extrabold text-xs uppercase tracking-widest text-white/90">
                  Ringkasan Estimasi
                </span>
                <span className="px-3 py-1 bg-white text-[#7b42f5] border border-[#13102b] font-mono font-bold text-xs rounded-md shadow-sm">
                  FREE CONSULTATION
                </span>
              </div>

              <div>
                <span className="text-xs font-mono font-bold text-white/80 block uppercase tracking-wider">
                  Estimasi Waktu Pengerjaan:
                </span>
                <div className="font-heading font-black text-3xl sm:text-4xl text-white mt-1">
                  {getActiveServiceDays()}
                </div>
              </div>

              <div className="space-y-2 bg-white/10 p-4 rounded-xl border border-white/20 text-xs font-mono">
                <div className="flex justify-between font-bold">
                  <span className="text-white/80">Pilar Terpilih:</span>
                  <span className="text-white">{selectedServiceName}</span>
                </div>
                <div className="flex justify-between font-bold">
                  <span className="text-white/80">Skala:</span>
                  <span className="text-[#13102b] bg-white px-1.5 py-0.5 rounded">{selectedScaleName}</span>
                </div>
                <div className="flex justify-between font-bold">
                  <span className="text-white/80">Addon:</span>
                  <span className="text-white">{addons.length} Fitur Tambahan</span>
                </div>
              </div>

              <div className="flex items-center gap-2 text-xs font-semibold text-white/90">
                <TbShieldCheck className="w-4 h-4 stroke-[2.5]" />
                <span>Tanpa komitmen tersembunyi. Tim Yotsulabs akan merespons dalam 1x24 jam.</span>
              </div>

              {/* Submit Button UI Component */}
              <Button
                variant="secondary"
                size="lg"
                href={waUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full"
              >
                <TbBrandWhatsapp className="w-5 h-5 text-[#7b42f5]" />
                <span>Kirim Ringkasan Brief via WA</span>
                <TbArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform stroke-[2.5]" />
              </Button>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
