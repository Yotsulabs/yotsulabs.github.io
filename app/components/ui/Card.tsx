"use client";

import React from "react";

interface CardProps {
  variant?: "white" | "purple" | "soft";
  shadowVariant?: "purple" | "dark" | "soft";
  children: React.ReactNode;
  className?: string;
}

export default function Card({
  variant = "white",
  shadowVariant = "purple",
  children,
  className = "",
}: CardProps) {
  const baseClasses = "border-3 border-[#13102b] rounded-2xl p-6 sm:p-8 transition-all";

  const variantClasses = {
    white: "bg-white text-[#13102b]",
    purple: "bg-[#7b42f5] text-white",
    soft: "bg-[#f3f0ff] text-[#13102b]",
  };

  const shadowClasses = {
    purple: "shadow-[6px_6px_0px_0px_#7b42f5]",
    dark: "shadow-[6px_6px_0px_0px_#13102b]",
    soft: "shadow-[4px_4px_0px_0px_#13102b]",
  };

  return (
    <div
      className={`${baseClasses} ${variantClasses[variant]} ${shadowClasses[shadowVariant]} ${className}`}
    >
      {children}
    </div>
  );
}
