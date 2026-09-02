"use client";

import React from "react";
import Link from "next/link";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost" | "icon";
  size?: "sm" | "md" | "lg";
  href?: string;
  target?: string;
  rel?: string;
  children: React.ReactNode;
  className?: string;
}

export default function Button({
  variant = "primary",
  size = "md",
  href,
  target,
  rel,
  children,
  className = "",
  ...props
}: ButtonProps) {
  const baseClasses =
    "inline-flex items-center justify-center font-heading font-extrabold rounded-xl border-2 border-brand-ink active:translate-x-[1px] active:translate-y-[1px] transition-all group cursor-pointer";

  const sizeClasses = {
    sm: "h-9 px-3 text-xs gap-1.5",
    md: "h-10 px-4 text-sm gap-2",
    lg: "px-6 py-3.5 text-base gap-3",
  };

  const variantClasses = {
    primary:
      "bg-brand-purple hover:bg-brand-purple-dark text-white shadow-neo-sm active:shadow-neo-sm",
    secondary:
      "bg-white hover:bg-brand-purple-light text-brand-ink shadow-neo-purple active:shadow-neo-purple",
    outline:
      "bg-white hover:bg-slate-50 text-brand-ink shadow-neo-sm",
    ghost:
      "bg-transparent hover:bg-brand-purple-light text-slate-700 hover:text-brand-ink border-transparent shadow-none",
    icon:
      "w-11 h-11 p-0 bg-white hover:bg-brand-purple hover:text-white text-brand-ink shadow-neo-purple hover:shadow-neo-sm",
  };

  const combinedClasses = `${baseClasses} ${sizeClasses[size]} ${variantClasses[variant]} ${className}`;

  if (href) {
    if (href.startsWith("/")) {
      return (
        <Link href={href} className={combinedClasses}>
          {children}
        </Link>
      );
    }
    return (
      <a href={href} target={target} rel={rel} className={combinedClasses}>
        {children}
      </a>
    );
  }

  return (
    <button className={combinedClasses} {...props}>
      {children}
    </button>
  );
}
