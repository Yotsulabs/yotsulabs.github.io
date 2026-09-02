"use client";

import React, { useId } from "react";

interface Option {
  value: string;
  label: string;
}

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  options: Option[];
  helperText?: string;
  errorText?: string;
  icon?: React.ElementType;
  className?: string;
}

export default function Select({
  label,
  options,
  helperText,
  errorText,
  icon: Icon,
  className = "",
  id,
  disabled,
  ...props
}: SelectProps) {
  const generatedId = useId();
  const selectId = id || generatedId;

  return (
    <div className="w-full space-y-1.5">
      {label && (
        <label
          htmlFor={selectId}
          className="block font-heading font-black text-sm text-brand-ink"
        >
          {label}
        </label>
      )}

      <div className="relative flex items-center">
        {Icon && (
          <div className="absolute left-3.5 text-slate-500 pointer-events-none z-10">
            <Icon className="w-5 h-5 stroke-[2.2]" />
          </div>
        )}

        <select
          id={selectId}
          disabled={disabled}
          className={`w-full bg-white text-brand-ink text-sm font-sans font-semibold rounded-xl border-2 border-brand-ink px-3.5 py-2.5 shadow-neo-sm focus:outline-none focus:border-brand-purple focus:shadow-neo-purple transition-all appearance-none cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed ${
            Icon ? "pl-11" : ""
          } ${errorText ? "border-red-500 shadow-[3px_3px_0px_0px_#ef4444]" : ""} ${className}`}
          {...props}
        >
          {options.map((opt) => (
            <option key={opt.value} value={opt.value} className="bg-white text-brand-ink">
              {opt.label}
            </option>
          ))}
        </select>

        {/* Custom Chevron Arrow */}
        <div className="absolute right-3.5 pointer-events-none text-brand-ink">
          <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20">
            <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
          </svg>
        </div>
      </div>

      {errorText ? (
        <p className="text-xs font-sans font-bold text-red-600 mt-1">{errorText}</p>
      ) : helperText ? (
        <p className="text-xs font-sans text-slate-600 mt-1">{helperText}</p>
      ) : null}
    </div>
  );
}
