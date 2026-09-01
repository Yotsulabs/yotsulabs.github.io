"use client";

import React from "react";

export type BadgeVariant =
  | "purple"
  | "white"
  | "soft"
  | "dark"
  | "pending"
  | "in-progress"
  | "completed"
  | "cancelled";

interface BadgeProps {
  variant?: BadgeVariant;
  status?: string;
  size?: "sm" | "md";
  icon?: React.ElementType;
  children?: React.ReactNode;
  className?: string;
}

export default function Badge({
  variant,
  status,
  size = "md",
  icon: Icon,
  children,
  className = "",
}: BadgeProps) {
  let effectiveVariant: BadgeVariant = variant || "purple";
  let content = children;

  // Auto-determine variant & content if status prop is provided
  if (status) {
    switch (status) {
      case "pending":
        effectiveVariant = "pending";
        content = content || "Pending";
        break;
      case "in-progress":
        effectiveVariant = "in-progress";
        content = content || "Diproses";
        break;
      case "completed":
        effectiveVariant = "completed";
        content = content || "Selesai";
        break;
      case "cancelled":
        effectiveVariant = "cancelled";
        content = content || "Batal";
        break;
      default:
        effectiveVariant = "soft";
        content = content || status;
        break;
    }
  }

  const baseClasses =
    "inline-flex items-center gap-1.5 font-mono font-extrabold uppercase rounded-lg border border-[#13102b]";

  const sizeClasses = {
    sm: "px-2.5 py-1 text-xs tracking-normal",
    md: "px-3.5 py-1.5 text-xs tracking-widest border-2 rounded-xl",
  };

  const variantClasses: Record<BadgeVariant, string> = {
    purple: "bg-[#7b42f5] text-white shadow-[3px_3px_0px_0px_#13102b]",
    white: "bg-white text-[#13102b] shadow-[3px_3px_0px_0px_#7b42f5]",
    soft: "bg-[#f3f0ff] text-purple-900 shadow-none border-2 border-[#13102b]",
    dark: "bg-[#13102b] text-white shadow-[3px_3px_0px_0px_#7b42f5]",
    pending: "bg-amber-200 text-amber-900",
    "in-progress": "bg-sky-200 text-sky-900",
    completed: "bg-emerald-200 text-emerald-900",
    cancelled: "bg-rose-200 text-rose-900",
  };

  const activeSizeClass = status && size === "md" ? sizeClasses.sm : sizeClasses[size];

  return (
    <span
      className={`${baseClasses} ${activeSizeClass} ${variantClasses[effectiveVariant]} ${className}`}
    >
      {Icon && <Icon className="w-4 h-4 shrink-0 stroke-[2.5]" />}
      <span>{content}</span>
    </span>
  );
}
