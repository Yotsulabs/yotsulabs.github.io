"use client";

import React, { useId } from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  helperText?: string;
  errorText?: string;
  icon?: React.ElementType;
  className?: string;
}

export default function Input({
  label,
  helperText,
  errorText,
  icon: Icon,
  className = "",
  id,
  disabled,
  ...props
}: InputProps) {
  const generatedId = useId();
  const inputId = id || generatedId;

  return (
    <div className="w-full space-y-1.5">
      {label && (
        <label
          htmlFor={inputId}
          className="block font-heading font-black text-sm text-brand-ink"
        >
          {label}
        </label>
      )}

      <div className="relative flex items-center">
        {Icon && (
          <div className="absolute left-3.5 text-slate-500 pointer-events-none">
            <Icon className="w-5 h-5 stroke-[2.2]" />
          </div>
        )}

        <input
          id={inputId}
          disabled={disabled}
          className={`w-full bg-white text-brand-ink placeholder:text-slate-400 text-sm font-sans font-medium rounded-xl border-2 border-brand-ink px-3.5 py-2.5 shadow-neo-sm focus:outline-none focus:border-brand-purple focus:shadow-neo-purple transition-all disabled:opacity-60 disabled:cursor-not-allowed ${
            Icon ? "pl-11" : ""
          } ${errorText ? "border-red-500 shadow-[3px_3px_0px_0px_#ef4444]" : ""} ${className}`}
          {...props}
        />
      </div>

      {errorText ? (
        <p className="text-xs font-sans font-bold text-red-600 mt-1">{errorText}</p>
      ) : helperText ? (
        <p className="text-xs font-sans text-slate-600 mt-1">{helperText}</p>
      ) : null}
    </div>
  );
}
