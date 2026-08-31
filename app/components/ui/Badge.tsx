"use client";

import React from "react";

interface BadgeProps {
  variant?: "purple" | "white" | "soft" | "dark";
  icon?: React.ElementType;
  children: React.ReactNode;
  className?: string;
}

export default function Badge({
  variant = "purple",
  icon: Icon,
  children,
  className = "",
}: BadgeProps) {
  const baseClasses =
    "inline-flex items-center gap-2 px-3.5 py-1.5 font-mono font-extrabold text-xs uppercase tracking-widest rounded-xl border-2 border-[#13102b]";

  const variantClasses = {
    purple: "bg-[#7b42f5] text-white shadow-[3px_3px_0px_0px_#13102b]",
    white: "bg-white text-[#13102b] shadow-[3px_3px_0px_0px_#7b42f5]",
    soft: "bg-[#f3f0ff] text-purple-900 shadow-none border-2 border-[#13102b]",
    dark: "bg-[#13102b] text-white shadow-[3px_3px_0px_0px_#7b42f5]",
  };

  return (
    <div className={`${baseClasses} ${variantClasses[variant]} ${className}`}>
      {Icon && <Icon className="w-4 h-4 shrink-0 stroke-[2.5]" />}
      <span>{children}</span>
    </div>
  );
}
