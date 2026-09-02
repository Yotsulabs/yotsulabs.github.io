"use client";

import React from "react";
import { motion } from "motion/react";
import Button from "./Button";

interface EmptyStateProps {
  icon?: React.ElementType;
  title: string;
  description: string;
  actionText?: string;
  actionHref?: string;
  actionTarget?: string;
  actionRel?: string;
  onActionClick?: () => void;
  actionIcon?: React.ElementType;
  className?: string;
  shadowVariant?: "purple" | "black";
  fullWidth?: boolean;
}

export default function EmptyState({
  icon: Icon,
  title,
  description,
  actionText,
  actionHref,
  actionTarget,
  actionRel,
  onActionClick,
  actionIcon: ActionIcon,
  className = "",
  shadowVariant = "purple",
  fullWidth = false,
}: EmptyStateProps) {
  const shadowClass =
    shadowVariant === "black"
      ? "shadow-neo-lg"
      : "shadow-[6px_6px_0px_0px_var(--color-brand-purple)]";

  const widthClass = fullWidth ? "w-full" : "max-w-2xl mx-auto";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`bg-white border-3 border-brand-ink rounded-2xl p-8 sm:p-12 ${shadowClass} ${widthClass} text-center space-y-4 font-sans ${className}`}
    >
      {Icon && (
        <div className="w-14 h-14 rounded-2xl bg-brand-purple-light border-2 border-brand-ink shadow-neo-sm flex items-center justify-center text-brand-purple mx-auto">
          <Icon className="w-7 h-7 stroke-[2.5]" />
        </div>
      )}

      <h3 className="font-heading font-black text-2xl text-brand-ink">
        {title}
      </h3>

      <p className="text-slate-600 text-sm font-medium leading-relaxed max-w-md mx-auto">
        {description}
      </p>

      {actionText && (
        <div className="pt-2 flex justify-center">
          <Button
            variant="primary"
            href={actionHref}
            target={actionTarget}
            rel={actionRel}
            onClick={onActionClick}
          >
            <span>{actionText}</span>
            {ActionIcon && <ActionIcon className="w-4 h-4 stroke-[2.5]" />}
          </Button>
        </div>
      )}
    </motion.div>
  );
}
