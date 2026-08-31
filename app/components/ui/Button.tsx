"use client";

import React from "react";

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
    "inline-flex items-center justify-center font-heading font-extrabold rounded-xl border-2 border-[#13102b] active:translate-x-[1px] active:translate-y-[1px] transition-all group";

  const sizeClasses = {
    sm: "h-9 px-3 text-xs gap-1.5",
    md: "h-10 px-4 text-sm gap-2",
    lg: "px-6 py-3.5 text-base gap-3",
  };

  const variantClasses = {
    primary:
      "bg-[#7b42f5] hover:bg-[#6b21a8] text-white shadow-[3px_3px_0px_0px_#13102b] active:shadow-[1px_1px_0px_0px_#13102b]",
    secondary:
      "bg-white hover:bg-[#f3f0ff] text-[#13102b] shadow-[3px_3px_0px_0px_#7b42f5] active:shadow-[1px_1px_0px_0px_#7b42f5]",
    outline:
      "bg-white hover:bg-slate-50 text-[#13102b] shadow-[3px_3px_0px_0px_#13102b]",
    ghost:
      "bg-transparent hover:bg-[#f3f0ff] text-slate-700 hover:text-[#13102b] border-transparent shadow-none",
    icon:
      "w-11 h-11 p-0 bg-white hover:bg-[#7b42f5] hover:text-white text-[#13102b] shadow-[3px_3px_0px_0px_#7b42f5] hover:shadow-[3px_3px_0px_0px_#13102b]",
  };

  const combinedClasses = `${baseClasses} ${sizeClasses[size]} ${variantClasses[variant]} ${className}`;

  if (href) {
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
