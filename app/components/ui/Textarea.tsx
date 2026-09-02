"use client";

import React, { useId } from "react";

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  helperText?: string;
  errorText?: string;
  className?: string;
}

export default function Textarea({
  label,
  helperText,
  errorText,
  className = "",
  id,
  rows = 4,
  disabled,
  ...props
}: TextareaProps) {
  const generatedId = useId();
  const textareaId = id || generatedId;

  return (
    <div className="w-full space-y-1.5">
      {label && (
        <label
          htmlFor={textareaId}
          className="block font-heading font-black text-sm text-brand-ink"
        >
          {label}
        </label>
      )}

      <textarea
        id={textareaId}
        rows={rows}
        disabled={disabled}
        className={`w-full bg-white text-brand-ink placeholder:text-slate-400 text-sm font-sans font-medium rounded-xl border-2 border-brand-ink px-3.5 py-2.5 shadow-neo-sm focus:outline-none focus:border-brand-purple focus:shadow-neo-purple transition-all disabled:opacity-60 disabled:cursor-not-allowed resize-y ${
          errorText ? "border-red-500 shadow-[3px_3px_0px_0px_#ef4444]" : ""
        } ${className}`}
        {...props}
      />

      {errorText ? (
        <p className="text-xs font-sans font-bold text-red-600 mt-1">{errorText}</p>
      ) : helperText ? (
        <p className="text-xs font-sans text-slate-600 mt-1">{helperText}</p>
      ) : null}
    </div>
  );
}
