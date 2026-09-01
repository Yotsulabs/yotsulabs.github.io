"use client";

import React from "react";
import { TbArrowLeft } from "react-icons/tb";
import Button from "./components/ui/Button";

export default function NotFound() {
  return (
    <main className="min-h-screen bg-grid-pattern text-[#13102b] flex items-center justify-center p-4 font-sans selection:bg-[#7b42f5] selection:text-white">
      <div className="bg-white border-3 border-[#13102b] rounded-3xl p-8 sm:p-12 shadow-[8px_8px_0px_0px_#13102b] text-center max-w-md w-full space-y-6 animate-in fade-in zoom-in-95 font-sans">
        
        {/* Big 404 Text */}
        <h1 className="font-heading font-black text-7xl sm:text-8xl text-[#13102b] tracking-tighter">
          404
        </h1>

        {/* Text Details */}
        <div className="space-y-2">
          <h2 className="font-heading font-black text-xl sm:text-2xl text-[#13102b]">
            Halaman Tidak Ditemukan
          </h2>
          <p className="text-slate-600 text-xs sm:text-sm font-medium leading-relaxed">
            Halaman yang Anda cari tidak ada atau telah dipindahkan.
          </p>
        </div>

        {/* Simple Back Button */}
        <div className="pt-2 flex justify-center">
          <Button variant="primary" size="md" href="/">
            <TbArrowLeft className="w-4 h-4 stroke-[2.5]" />
            <span>Kembali ke Beranda</span>
          </Button>
        </div>
      </div>
    </main>
  );
}
