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
  const baseClasses = "border-3 border-brand-ink rounded-2xl p-6 sm:p-8 transition-all";

  const variantClasses = {
    white: "bg-white text-brand-ink",
    purple: "bg-brand-purple text-white",
    soft: "bg-brand-purple-light text-brand-ink",
  };

  const shadowClasses = {
    purple: "shadow-[6px_6px_0px_0px_var(--color-brand-purple)]",
    dark: "shadow-neo-lg",
    soft: "shadow-neo",
  };

  return (
    <div
      className={`${baseClasses} ${variantClasses[variant]} ${shadowClasses[shadowVariant]} ${className}`}
    >
      {children}
    </div>
  );
}
