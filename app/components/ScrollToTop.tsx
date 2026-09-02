"use client";

import { useState, useEffect } from "react";
import { TbArrowUp } from "react-icons/tb";
import { motion, AnimatePresence } from "motion/react";

export default function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          initial={{ opacity: 0, scale: 0.8, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 20 }}
          transition={{ duration: 0.2 }}
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 z-40 w-12 h-12 bg-brand-purple hover:bg-brand-purple-dark text-white rounded-xl border-2 border-brand-ink shadow-neo-sm flex items-center justify-center active:translate-x-[1px] active:translate-y-[1px] transition-all group cursor-pointer"
          aria-label="Scroll to top"
        >
          <TbArrowUp className="w-6 h-6 stroke-[3] group-hover:-translate-y-0.5 transition-transform" />
        </motion.button>
      )}
    </AnimatePresence>
  );
}
