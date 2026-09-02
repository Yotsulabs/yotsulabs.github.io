import React from "react";
import {
  TbBrandWhatsapp,
  TbBrandInstagram,
  TbBrandTiktok,
  TbBrandThreads,
  TbMail,
  TbCode,
  TbPalette,
  TbTarget,
  TbCompass,
  TbBriefcase,
  TbHelpCircle,
} from "react-icons/tb";

// WhatsApp Direct URL
export const WHATSAPP_URL =
  "https://wa.me/62895339023888?text=Halo%20Yotsulabs!%20Saya%20ingin%20konsultasi%20mengenai%20kebutuhan%20digital%20bisnis%20saya.";

// Navbar Header Links
export interface NavLinkItem {
  name: string;
  sub: string;
  href: string;
  icon: React.ElementType;
}

export const NAV_LINKS: NavLinkItem[] = [
  {
    name: "Layanan Utama",
    sub: "Technology, Creative & Marketing",
    href: "/#layanan",
    icon: TbCode,
  },
  {
    name: "Proses Kerja",
    sub: "5 Langkah Solutif Problem-First",
    href: "/#proses",
    icon: TbCompass,
  },
  {
    name: "Portofolio",
    sub: "Studi Kasus & Hasil Nyata Klien",
    href: "/#portofolio",
    icon: TbBriefcase,
  },
  {
    name: "FAQ & Pertanyaan",
    sub: "Jawaban Pertanyaan Umum Klien",
    href: "/#faq",
    icon: TbHelpCircle,
  },
];

// Footer Data Types & Items
export interface FooterNavLink {
  label: string;
  href: string;
}

export interface FooterSocialLink {
  name: string;
  href: string;
  icon: React.ElementType;
}

export const FOOTER_NAV_LINKS: FooterNavLink[] = [
  { label: "Layanan Utama", href: "#layanan" },
  { label: "Alur Proses Kerja", href: "#proses" },
  { label: "Portofolio Pilihan", href: "#portofolio" },
  { label: "Simulasi Estimator", href: "#estimator" },
  { label: "FAQ & Tanya Jawab", href: "#faq" },
];

export const FOOTER_SOCIAL_LINKS: FooterSocialLink[] = [
  { name: "WhatsApp", href: WHATSAPP_URL, icon: TbBrandWhatsapp },
  { name: "Instagram", href: "https://www.instagram.com/yotsulabs/", icon: TbBrandInstagram },
  { name: "TikTok", href: "https://www.tiktok.com/@yotsulabs/", icon: TbBrandTiktok },
  { name: "Threads", href: "https://www.threads.com/@yotsulabs", icon: TbBrandThreads },
  { name: "Email", href: "mailto:yotsulabs@gmail.com", icon: TbMail },
];

// FAQ Section Data
export interface FaqItem {
  q: string;
  a: string;
}

export const FAQ_DATA: FaqItem[] = [
  {
    q: "Solusi digital apa saja yang dapat dikembangkan Yotsulabs?",
    a: "Yotsulabs menyediakan solusi Technology, Creative, dan Digital Marketing. Mulai dari Website dan Business System, hingga UI/UX Design, Graphic Design, Illustration, Video Promotion, Content Marketing, dan SEO.",
  },
  {
    q: "Apakah Yotsulabs dapat mengembangkan solusi yang terintegrasi?",
    a: "Ya. Berbagai layanan dapat dikombinasikan sesuai kebutuhan, sehingga Technology, Creative, dan Digital Marketing dapat saling mendukung dalam satu solusi digital yang terpadu.",
  },
  {
    q: "Apakah solusi dapat disesuaikan dengan kebutuhan bisnis?",
    a: "Tentu. Kami tidak menggunakan pendekatan yang sama untuk setiap bisnis. Solusi dirancang berdasarkan kebutuhan, skala, tujuan, serta tantangan yang dihadapi masing-masing bisnis.",
  },
  {
    q: "Bagaimana jika kebutuhan bisnis saya belum memiliki solusi yang spesifik?",
    a: "Anda dapat memulai dengan konsultasi bersama Yotsulabs. Kami akan memahami kebutuhan dan permasalahan bisnis terlebih dahulu, kemudian menentukan solusi yang paling sesuai.",
  },
];

// Process Section Steps Data
export interface ProcessStep {
  num: string;
  title: string;
  rotation: string;
  bgColor: string;
  description: string;
}

export const PROCESS_STEPS: ProcessStep[] = [
  {
    num: "01",
    title: "Konsultasi & Audit",
    rotation: "-rotate-2 hover:rotate-0",
    bgColor: "bg-[#f3f0ff]",
    description:
      "Memahami bisnis, kebutuhan, dan tujuan Anda. Kami mengaudit tantangan riil sebelum menentukan arah strategi (Tech, Creative, & Marketing).",
  },
  {
    num: "02",
    title: "Penawaran & Scope",
    rotation: "rotate-2 hover:rotate-0",
    bgColor: "bg-[#f9f8fd]",
    description:
      "Menyusun skema solusi, scope pengerjaan, estimasi timeline, dan biaya secara transparan melalui Offering Letter resmi.",
  },
  {
    num: "03",
    title: "Kesepakatan Kerja Sama",
    rotation: "-rotate-1 hover:rotate-0",
    bgColor: "bg-[#f3f0ff]",
    description:
      "Menetapkan detail kerja sama, jadwal, dan kesepakatan resmi sebelum proyek dimulai agar seluruh tim berjalan selaras.",
  },
  {
    num: "04",
    title: "Eksekusi Pengerjaan",
    rotation: "rotate-2 hover:rotate-0",
    bgColor: "bg-[#f9f8fd]",
    description:
      "Pengembangan solusi sesuai scope disepakati: High-Performance Code (Tech), UI/UX (Creative), dan Campaign/SEO (Marketing).",
  },
  {
    num: "05",
    title: "Handover & Scaling",
    rotation: "-rotate-1 hover:rotate-0",
    bgColor: "bg-[#f3f0ff]",
    description:
      "Penyerahan penuh seluruh aset, source code, dan panduan. Kami juga siap mendampingi pengembangan skala bisnis selanjutnya.",
  },
];

// Services Section Pillar Tabs Data
export interface PillarTab {
  id: "tech" | "creative" | "marketing";
  label: string;
  icon: React.ElementType;
}

export const SERVICE_PILLAR_TABS: PillarTab[] = [
  { id: "tech", label: "Technology", icon: TbCode },
  { id: "creative", label: "Creative", icon: TbPalette },
  { id: "marketing", label: "Digital Marketing", icon: TbTarget },
];
