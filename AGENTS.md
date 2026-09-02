# Yotsulabs - AI Agent & Project Guidelines

Dokumen ini adalah acuan aturan kerja (*rules & guidelines*) untuk AI agent dan developer dalam mengembangkan codebase **Yotsulabs** (`yotsulabs.github.io`).

---

## 1. Project Overview & Brand Identity

* **Nama Brand**: Yotsulabs
* **Tagline/Konsep**: Digital studio yang membantu UMKM, bisnis, dan organisasi membangun serta mengembangkan kebutuhan digital mereka dengan pendekatan Technology, Creative, dan Digital Marketing.
* **Domain / URL**: `www.yotsulabs.web.id`
* **Official Contact**:
  * WhatsApp: `+62 895 3390 23888`
  * Email: `yotsulabs@gmail.com`
* **Brand Colors**:
  * Background Soft Light: `#f9f8fd` (Soft Purple Off-White) / `#f3f0ff`
  * Primary Accent: `#7b42f5` (Electric Violet / Purple)
  * Accent Purple Tones: `#8b5cf6`, `#6b21a8`, `#f3f0ff` (Purple Shades Only - No Cyan, Pink, Lime, etc.)
  * Surface Cards: `#ffffff` (Crisp White)
  * Borders, Shadows & Dark Accents: `#13102b` (Deep Midnight Ink)
  * Typography: Heading Font: **Rubik**, Body Font: **Plus Jakarta Sans**
* **Icon Provider**: `react-icons/tb` (Tabler Icons) & `react-icons/fa6` (Font Awesome 6) for bold Neobrutalism aesthetics.

---

## 2. Tech Stack & Engineering Standards

* **Framework**: Next.js 16 (App Router)
* **UI Library**: React 19, TypeScript (Strict Mode)
* **Styling**: Tailwind CSS v4 (`@import "tailwindcss";` & `@theme`)
* **Design Aesthetic**: Professional Neobrutalism UI
* **Icons**: `lucide-react`
* **Animation**: `motion` (Framer Motion)
* **Package Manager**: `pnpm`

### Conventions:
1. **Server vs Client Components**:
   * Komponen default adalah Server Components.
   * Gunakan directive `"use client";` hanya ketika komponen membutuhkan React state, event listener, browser API, atau animasi interaktif `motion`.
2. **Deterministic Validation**:
   * Setiap perubahan kode harus lolos `pnpm build` dan `pnpm lint` tanpa type error atau missing imports.
3. **No Dead Code**:
   * Jangan tinggalkan unused variables, placeholder imports, atau console logs yang tidak perlu.

---

## 3. Anti-Slop UI & Design System Rules (Neobrutalism UI)

1. **Aesthetics & Atmosphere**:
   * Tampilan bernuansa *Modern Dark Studio Neobrutalism* dengan palet Midnight Indigo (`#0d0b1e`) dipadukan dengan Electric Violet (`#7b42f5`) dan Neon Lime (`#c0ff31`).
   * Gunakan hard borders, tactile card surfaces, dan solid drop-shadow offsets (`shadow-[4px_4px_0px_0px_#000000]` / `shadow-[5px_5px_0px_0px_#7b42f5]`).
2. **Typographic Hierarchy**:
   * Judul/Heading menggunakan font **Rubik** dengan weight tebal (font-bold / font-black) dan tracking rapat (`tracking-tight`).
   * Teks deskripsi menggunakan font **Plus Jakarta Sans** dengan line height yang nyaman dibaca (`leading-relaxed`, color slate-300).
3. **Layout & Composition**:
   * Layout Bento grid dinamis, interactive step timelines, filterable tabs, dan kalkulator estimasi kustom.
4. **Micro-Interactions**:
   * Gunakan spring physics & tactile press down feedback (`active:translate-x-[2px] active:translate-y-[2px] active:shadow-[1px_1px_0px_0px_#000]`).
   * Selalu sediakan state interaksi lengkap: `hover`, `active`, `focus-visible`, dan `disabled`.

---

## 4. Copywriting & Tone of Voice

* **Bahasa**: Bahasa Indonesia yang profesional, ramah, meyakinkan, dan relevan dengan realitas bisnis lokal serta UMKM di Indonesia.
* **Fokus Solusi**: Pendekatan konsultatif (*Problem-First Solution*). Tekankan bahwa Yotsulabs memahami tantangan bisnis terlebih dahulu sebelum menawarkan solusi teknologi, kreatif, atau marketing.
* **Direct Call to Action**: Arahkan interaksi langsung ke konsultasi gratis via WhatsApp resmi (`+62 895 3390 23888`).
