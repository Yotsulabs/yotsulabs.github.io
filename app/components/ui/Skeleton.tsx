"use client";

import React from "react";

interface SkeletonProps {
  className?: string;
}

export function Skeleton({ className = "" }: SkeletonProps) {
  return (
    <div
      className={`animate-pulse bg-slate-200 border-2 border-slate-300/80 rounded-xl ${className}`}
    />
  );
}

// Table Skeleton Loader for Admin Orders Table
export function TableSkeleton({ rows = 4 }: { rows?: number }) {
  return (
    <div className="bg-white border-3 border-brand-ink rounded-2xl overflow-hidden shadow-neo-lg">
      <div className="bg-brand-ink p-4 flex items-center justify-between">
        <Skeleton className="h-4 w-32 bg-slate-700 border-slate-600" />
        <Skeleton className="h-4 w-20 bg-slate-700 border-slate-600" />
      </div>
      <div className="p-4 space-y-4">
        {Array.from({ length: rows }).map((_, i) => (
          <div
            key={i}
            className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-3 border-2 border-slate-100 rounded-xl"
          >
            <div className="space-y-2 w-full sm:w-1/4">
              <Skeleton className="h-5 w-3/4" />
              <Skeleton className="h-3.5 w-1/2" />
            </div>
            <div className="w-full sm:w-1/5">
              <Skeleton className="h-4 w-28" />
            </div>
            <div className="w-full sm:w-1/4 space-y-1">
              <Skeleton className="h-4 w-2/3" />
              <Skeleton className="h-3 w-1/3" />
            </div>
            <div className="w-full sm:w-1/6">
              <Skeleton className="h-6 w-20 rounded-lg" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// Card Grid Skeleton Loader for Portfolio & Services Grid
export function CardGridSkeleton({
  count = 3,
  columns = "grid-cols-1 md:grid-cols-3",
  hasImage = false,
}: {
  count?: number;
  columns?: string;
  hasImage?: boolean;
}) {
  return (
    <div className={`grid ${columns} gap-6`}>
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          className="bg-white border-3 border-brand-ink rounded-2xl p-6 shadow-neo-lg space-y-4"
        >
          {hasImage && <Skeleton className="h-40 w-full -mt-2 mb-4" />}
          <div className="flex items-center justify-between">
            <Skeleton className="h-5 w-24 rounded-lg" />
            <Skeleton className="h-4 w-12 rounded-full" />
          </div>
          <Skeleton className="h-6 w-3/4" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-5/6" />
          <div className="pt-2 flex gap-2">
            <Skeleton className="h-6 w-16 rounded-md" />
            <Skeleton className="h-6 w-20 rounded-md" />
          </div>
        </div>
      ))}
    </div>
  );
}
