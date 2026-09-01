"use client";

import Image from "next/image";
import { motion, useMotionValue, useSpring, useTransform } from "motion/react";
import { TbBrandWhatsapp, TbArrowRight } from "react-icons/tb";
import Button from "../../ui/Button";

export default function HeroSection() {
  const whatsappUrl =
    "https://wa.me/62895339023888?text=Halo%20Yotsulabs!%20Saya%20ingin%20diskusi%20kebutuhan%20digital%20bisnis%20saya.";

  // Mouse position tracking values for interactive parallax physics
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth spring physics for fluid movement
  const springConfig = { damping: 25, stiffness: 150 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  // Mascot position & rotation tracking cursor
  const mascotX = useTransform(smoothX, [-0.5, 0.5], [-22, 22]);
  const mascotY = useTransform(smoothY, [-0.5, 0.5], [-22, 22]);
  const mascotRotate = useTransform(smoothX, [-0.5, 0.5], [-4.5, 4.5]);

  // Image decoration stickers parallax layers
  const decoSparkX = useTransform(smoothX, [-0.5, 0.5], [-35, 35]);
  const decoSparkY = useTransform(smoothY, [-0.5, 0.5], [-35, 35]);

  const decoLightningX = useTransform(smoothX, [-0.5, 0.5], [32, -32]);
  const decoLightningY = useTransform(smoothY, [-0.5, 0.5], [-28, 28]);

  const decoApprovedX = useTransform(smoothX, [-0.5, 0.5], [-40, 40]);
  const decoApprovedY = useTransform(smoothY, [-0.5, 0.5], [32, -32]);

  const decoTalkX = useTransform(smoothX, [-0.5, 0.5], [38, -38]);
  const decoTalkY = useTransform(smoothY, [-0.5, 0.5], [38, -38]);

  const decoCloverX = useTransform(smoothX, [-0.5, 0.5], [-18, 18]);
  const decoCloverY = useTransform(smoothY, [-0.5, 0.5], [-42, 42]);

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <section
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden select-none"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">

          {/* Left Column: Headline & Action */}
          <div className="lg:col-span-7 flex flex-col items-start relative">

            {/* Main Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="font-heading font-black text-4xl sm:text-5xl lg:text-6xl text-[#13102b] tracking-tight leading-[1.15] mb-6 relative"
            >
              Skalakan Bisnis Anda dengan{" "}
              <span className="relative inline-block text-white bg-[#7b42f5] px-3 py-0.5 border-2 border-[#13102b] shadow-[4px_4px_0px_0px_#13102b] rounded-md">
                Sentuhan Digital.
              </span>
            </motion.h1>

            {/* Sub-headline */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-lg sm:text-xl text-slate-700 leading-relaxed mb-8 max-w-2xl font-sans font-medium"
            >
              Kami mengubah tantangan bisnis Anda menjadi peluang omzet melalui digitalisasi dan branding yang tepat sasaran.
            </motion.p>

            {/* CTA Buttons UI Components */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full sm:w-auto relative"
            >
              <Button
                variant="primary"
                size="lg"
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                <TbBrandWhatsapp className="w-5 h-5" />
                <span>Mulai Diskusi via WA</span>
                <TbArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform stroke-[2.5]" />
              </Button>

              <Button variant="secondary" size="lg" href="#proses">
                <span>Pelajari Alur Kerja</span>
              </Button>

              {/* Decorative Click Pointer Cursor Sticker */}
              <motion.div
                animate={{ x: [0, 5, 0], y: [0, -5, 0] }}
                transition={{ repeat: Infinity, duration: 2.5, ease: "easeInOut" }}
                className="hidden sm:block absolute -bottom-7 right-4 z-20 pointer-events-none"
              >
                <Image
                  src="/decorations/cursor.png"
                  alt="Cursor Pointer"
                  width={40}
                  height={40}
                  className="w-12 h-12 object-contain drop-shadow-md rotate-[-12deg]"
                />
              </motion.div>
            </motion.div>
          </div>

          {/* Right Column: Duo Mascot Showcase with Cursor Tracking & Image Decorations */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-5 relative flex items-center justify-center py-6"
          >
            {/* Mascot Container */}
            <div className="relative w-full max-w-[380px] sm:max-w-[440px] flex items-center justify-center">

              {/* Main Mascot Image with Cursor Tracking & Floating Bobbing Animation */}
              <motion.div
                style={{ x: mascotX, y: mascotY, rotate: mascotRotate }}
                animate={{ y: [0, -8, 0] }}
                transition={{
                  y: { repeat: Infinity, duration: 4, ease: "easeInOut" },
                }}
                className="relative z-10 w-full flex items-center justify-center cursor-grab active:cursor-grabbing"
              >
                <Image
                  src="/mascot/duo_maskot.png"
                  alt="Yotsulabs Duo Mascot - Yuto & Yotsuba"
                  width={420}
                  height={420}
                  priority
                  className="w-full max-w-[340px] sm:max-w-[400px] h-auto object-contain drop-shadow-[0_18px_36px_rgba(19,16,43,0.22)] hover:scale-105 transition-transform duration-300"
                />
              </motion.div>

              {/* Image Decoration Sticker 1: Top-Left Sparkle */}
              <motion.div
                style={{ x: decoSparkX, y: decoSparkY }}
                animate={{ rotate: [-6, 6, -6], y: [0, -6, 0] }}
                transition={{
                  rotate: { repeat: Infinity, duration: 3.5, ease: "easeInOut" },
                  y: { repeat: Infinity, duration: 4.2, ease: "easeInOut" },
                }}
                className="absolute top-0 -left-4 sm:-left-8 z-20 pointer-events-none drop-shadow-lg"
              >
                <Image
                  src="/decorations/spark.png"
                  alt="Sparkle Decoration Sticker"
                  width={64}
                  height={64}
                  className="w-14 h-14 sm:w-16 sm:h-16 object-contain rotate-[-10deg]"
                />
              </motion.div>

              {/* Image Decoration Sticker 2: Top-Right Lightning */}
              <motion.div
                style={{ x: decoLightningX, y: decoLightningY }}
                animate={{ rotate: [8, -4, 8], scale: [1, 1.08, 1] }}
                transition={{
                  rotate: { repeat: Infinity, duration: 3.8, ease: "easeInOut" },
                  scale: { repeat: Infinity, duration: 3.2, ease: "easeInOut" },
                }}
                className="absolute top-2 -right-4 sm:-right-8 z-20 pointer-events-none drop-shadow-lg"
              >
                <Image
                  src="/decorations/lightning.png"
                  alt="Lightning Energy Sticker"
                  width={64}
                  height={64}
                  className="w-14 h-14 sm:w-16 sm:h-16 object-contain rotate-[14deg]"
                />
              </motion.div>

              {/* Image Decoration Sticker 3: Top-Center Lucky Clover */}
              <motion.div
                style={{ x: decoCloverX, y: decoCloverY }}
                animate={{ rotate: [-8, 8, -8], y: [0, 6, 0] }}
                transition={{
                  rotate: { repeat: Infinity, duration: 4.0, ease: "easeInOut" },
                  y: { repeat: Infinity, duration: 3.8, ease: "easeInOut" },
                }}
                className="absolute -top-10 left-1/2 -translate-x-1/2 z-20 pointer-events-none drop-shadow-md"
              >
                <Image
                  src="/decorations/clover.png"
                  alt="Lucky Clover Sticker"
                  width={56}
                  height={56}
                  className="w-12 h-12 sm:w-14 sm:h-14 object-contain rotate-[4deg]"
                />
              </motion.div>

              {/* Image Decoration Sticker 4: Bottom-Left Approved Quality Badge */}
              <motion.div
                style={{ x: decoApprovedX, y: decoApprovedY }}
                animate={{ rotate: [-5, 5, -5], y: [0, 8, 0] }}
                transition={{
                  rotate: { repeat: Infinity, duration: 4.5, ease: "easeInOut" },
                  y: { repeat: Infinity, duration: 3.6, ease: "easeInOut" },
                }}
                className="absolute -bottom-4 -left-4 sm:-left-8 z-20 pointer-events-none drop-shadow-lg"
              >
                <Image
                  src="/decorations/approved.png"
                  alt="Approved Quality Badge Sticker"
                  width={76}
                  height={76}
                  className="w-16 h-16 sm:w-20 sm:h-20 object-contain rotate-[-12deg]"
                />
              </motion.div>

              {/* Image Decoration Sticker 5: Bottom-Right Let's Talk Badge */}
              <motion.div
                style={{ x: decoTalkX, y: decoTalkY }}
                animate={{ rotate: [6, -6, 6], scale: [1, 1.05, 1] }}
                transition={{
                  rotate: { repeat: Infinity, duration: 4.0, ease: "easeInOut" },
                  scale: { repeat: Infinity, duration: 3.5, ease: "easeInOut" },
                }}
                className="absolute -bottom-4 -right-4 sm:-right-8 z-20 pointer-events-none drop-shadow-lg"
              >
                <Image
                  src="/decorations/lets_talk.png"
                  alt="Let's Talk Badge Sticker"
                  width={84}
                  height={84}
                  className="w-18 h-18 sm:w-22 sm:h-22 object-contain rotate-[8deg]"
                />
              </motion.div>

            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
