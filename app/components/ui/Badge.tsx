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
    "inline-flex items-center gap-1.5 font-mono font-extrabold uppercase rounded-lg border border-brand-ink";

  const sizeClasses = {
    sm: "px-2.5 py-1 text-xs tracking-normal",
    md: "px-3.5 py-1.5 text-xs tracking-widest border-2 rounded-xl",
  };

  const variantClasses: Record<BadgeVariant, string> = {
    purple: "bg-brand-purple text-white shadow-neo-sm",
    white: "bg-white text-brand-ink shadow-neo-purple",
    soft: "bg-brand-purple-light text-purple-900 shadow-none border-2 border-brand-ink",
    dark: "bg-brand-ink text-white shadow-neo-purple",
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
