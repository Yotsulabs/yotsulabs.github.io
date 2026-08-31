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
          className="block font-heading font-black text-sm text-[#13102b]"
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
          className={`w-full bg-white text-[#13102b] placeholder:text-slate-400 text-sm font-sans font-medium rounded-xl border-2 border-[#13102b] px-3.5 py-2.5 shadow-[3px_3px_0px_0px_#13102b] focus:outline-none focus:border-[#7b42f5] focus:shadow-[3px_3px_0px_0px_#7b42f5] transition-all disabled:opacity-60 disabled:cursor-not-allowed ${
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
