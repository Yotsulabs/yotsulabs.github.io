import type { Metadata } from "next";
import { Rubik, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const rubik = Rubik({
  variable: "--font-rubik",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  display: "swap",
});

const plusJakartaSans = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Yotsulabs - Digital Studio Technology, Creative & Marketing UMKM & Bisnis",
  description:
    "Digital studio yang membantu UMKM, bisnis, dan organisasi membangun serta mengembangkan kebutuhan digital mereka dengan pendekatan Technology, Creative, dan Digital Marketing.",
  keywords: [
    "Yotsulabs",
    "Digital Studio Indonesia",
    "Jasa Pembuatan Website UMKM",
    "Digital Marketing UMKM",
    "UI UX Design Studio",
    "Software Development Indonesia",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="id"
      className={`${rubik.variable} ${plusJakartaSans.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-grid-pattern text-brand-ink font-sans selection:bg-brand-purple selection:text-white">
        {children}
      </body>
    </html>
  );
}
