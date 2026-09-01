import React from "react";
import { TbCode, TbPalette, TbTarget } from "react-icons/tb";

export type BidangKey = "technology" | "creative" | "marketing";

export interface JasaItem {
  id: string;
  name: string;
  desc: string;
}

export interface BidangItem {
  key: BidangKey;
  title: string;
  icon: React.ElementType;
}

export const BIDANG_LIST: BidangItem[] = [
  { key: "technology", title: "Technology", icon: TbCode },
  { key: "creative", title: "Creative", icon: TbPalette },
  { key: "marketing", title: "Digital Marketing", icon: TbTarget },
];

export const JASA_BY_BIDANG: Record<BidangKey, JasaItem[]> = {
  technology: [
    { id: "website", name: "Website", desc: "Landing page, company profile, atau e-commerce studio." },
    { id: "business-system", name: "Business System", desc: "Sistem aplikasi internal, portal manajemen & SaaS." },
    { id: "business-automation", name: "Business Automation", desc: "Otomasisasi alur kerja, integrasi API & bot." },
  ],
  creative: [
    { id: "graphic-design", name: "Graphic Design", desc: "Branding kit, logo, brosur & materi visual produk." },
    { id: "uiux-design", name: "UI/UX Design", desc: "Desain antarmuka aplikasi web/mobile & prototype." },
    { id: "illustration", name: "Illustrasi", desc: "Visual maskot, karakter, & ilustrasi digital kustom." },
  ],
  marketing: [
    { id: "video-promosi", name: "Video Promosi", desc: "Video konten iklan, reel/tiktok promosi & motion graphic." },
    { id: "konten-marketing", name: "Konten Marketing", desc: "Strategi konten media sosial, copywriting & perencanaan." },
    { id: "seo", name: "Optimasi Pencarian (SEO)", desc: "Riset kata kunci & optimasi peringkat Google." },
  ],
};

export const TARGET_TIME_OPTIONS = [
  { value: "1-2-weeks", label: "< 2 Minggu (Secepatnya / Urgent)" },
  { value: "2-4-weeks", label: "2 - 4 Minggu (Standar Pengerjaan)" },
  { value: "1-2-months", label: "1 - 2 Bulan" },
  { value: "flexible", label: "> 2 Bulan / Fleksibel" },
];
