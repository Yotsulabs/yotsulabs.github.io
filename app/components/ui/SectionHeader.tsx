"use client";

import React from "react";
import Badge from "./Badge";

interface SectionHeaderProps {
  badgeText?: string;
  badgeIcon?: React.ElementType;
  title: React.ReactNode;
  description?: string;
  className?: string;
  children?: React.ReactNode;
}

export default function SectionHeader({
  badgeText,
  badgeIcon,
  title,
  description,
  className = "",
  children,
}: SectionHeaderProps) {
  return (
    <div className={`flex flex-col items-center text-center mb-16 relative ${className}`}>
      {badgeText && (
        <div className="mb-4">
          <Badge variant="purple" icon={badgeIcon}>
            {badgeText}
          </Badge>
        </div>
      )}

      <h2 className="font-heading font-black text-3xl sm:text-4xl lg:text-5xl text-[#13102b] tracking-tight max-w-3xl">
        {title}
      </h2>

      {description && (
        <p className="mt-4 text-slate-700 max-w-2xl text-base sm:text-lg font-sans font-medium">
          {description}
        </p>
      )}

      {children}
    </div>
  );
}
