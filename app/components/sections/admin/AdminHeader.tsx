"use client";

import React from "react";
import {
  TbFileText,
  TbBriefcase,
  TbLayoutDashboard,
  TbLogout,
} from "react-icons/tb";
import Button from "@/app/components/ui/Button";
import Card from "@/app/components/ui/Card";

interface AdminHeaderProps {
  activeAdmin: string;
  onLogout: () => void;
  activeTab: "orders" | "portfolios" | "services";
  setActiveTab: (tab: "orders" | "portfolios" | "services") => void;
  ordersCount: number;
  portfoliosCount: number;
  servicesCount: number;
}

export default function AdminHeader({
  activeAdmin,
  onLogout,
  activeTab,
  setActiveTab,
  ordersCount,
  portfoliosCount,
  servicesCount,
}: AdminHeaderProps) {
  return (
    <>
      {/* Top Header: Greeting & Logout */}
      <div className="flex items-center justify-between pb-6 mb-8 border-b-2 border-slate-200">
        <div>
          <h1 className="font-heading font-black text-2xl sm:text-3xl text-[#13102b] tracking-tight">
            Halo, {activeAdmin || "Admin"}! 👋
          </h1>
          <p className="text-slate-600 text-xs sm:text-sm font-medium mt-1">
            Selamat datang di Dashboard Kelola Yotsulabs
          </p>
        </div>

        <Button
          variant="outline"
          size="sm"
          onClick={onLogout}
          className="!bg-rose-50 hover:!bg-rose-100 !text-rose-700 cursor-pointer"
        >
          <TbLogout className="w-4 h-4 stroke-[2.5]" />
          <span>Logout</span>
        </Button>
      </div>

      {/* Tab Switcher & Title */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h2 className="font-heading font-black text-xl text-[#13102b]">
            Ringkasan Data &amp; Aktivitas
          </h2>
          <p className="text-slate-600 text-xs font-medium mt-0.5">
            Kelola pesanan masuk dari klien, portofolio proyek, dan daftar jasa layanan secara real-time.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2 bg-white p-1.5 rounded-xl border-2 border-[#13102b] shadow-[3px_3px_0px_0px_#13102b] self-start md:self-auto">
          <button
            onClick={() => setActiveTab("orders")}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-lg font-heading font-extrabold text-xs transition-all cursor-pointer ${
              activeTab === "orders"
                ? "bg-[#7b42f5] text-white border-2 border-[#13102b] shadow-[2px_2px_0px_0px_#13102b]"
                : "text-slate-700 hover:bg-[#f3f0ff]"
            }`}
          >
            <TbFileText className="w-4 h-4" />
            <span>Orders ({ordersCount})</span>
          </button>

          <button
            onClick={() => setActiveTab("portfolios")}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-lg font-heading font-extrabold text-xs transition-all cursor-pointer ${
              activeTab === "portfolios"
                ? "bg-[#7b42f5] text-white border-2 border-[#13102b] shadow-[2px_2px_0px_0px_#13102b]"
                : "text-slate-700 hover:bg-[#f3f0ff]"
            }`}
          >
            <TbBriefcase className="w-4 h-4" />
            <span>Portofolio ({portfoliosCount})</span>
          </button>

          <button
            onClick={() => setActiveTab("services")}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-lg font-heading font-extrabold text-xs transition-all cursor-pointer ${
              activeTab === "services"
                ? "bg-[#7b42f5] text-white border-2 border-[#13102b] shadow-[2px_2px_0px_0px_#13102b]"
                : "text-slate-700 hover:bg-[#f3f0ff]"
            }`}
          >
            <TbLayoutDashboard className="w-4 h-4" />
            <span>Layanan / Jasa ({servicesCount})</span>
          </button>
        </div>
      </div>

      {/* Metric Cards Summary */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        <Card
          variant="white"
          shadowVariant="purple"
          className="!p-4 flex items-center justify-between"
        >
          <div>
            <span className="text-xs font-mono font-bold text-slate-500 uppercase tracking-wider block">
              Total Order Masuk
            </span>
            <span className="font-heading font-black text-2xl text-[#13102b]">
              {ordersCount}
            </span>
          </div>
          <div className="w-10 h-10 rounded-xl bg-[#f3f0ff] border-2 border-[#13102b] flex items-center justify-center text-[#7b42f5]">
            <TbFileText className="w-5 h-5" />
          </div>
        </Card>

        <Card
          variant="white"
          shadowVariant="purple"
          className="!p-4 flex items-center justify-between"
        >
          <div>
            <span className="text-xs font-mono font-bold text-slate-500 uppercase tracking-wider block">
              Portofolio Aktif
            </span>
            <span className="font-heading font-black text-2xl text-[#13102b]">
              {portfoliosCount}
            </span>
          </div>
          <div className="w-10 h-10 rounded-xl bg-[#f3f0ff] border-2 border-[#13102b] flex items-center justify-center text-[#7b42f5]">
            <TbBriefcase className="w-5 h-5" />
          </div>
        </Card>

        <Card
          variant="white"
          shadowVariant="purple"
          className="!p-4 flex items-center justify-between"
        >
          <div>
            <span className="text-xs font-mono font-bold text-slate-500 uppercase tracking-wider block">
              Layanan / Jasa Kustom
            </span>
            <span className="font-heading font-black text-2xl text-[#13102b]">
              {servicesCount}
            </span>
          </div>
          <div className="w-10 h-10 rounded-xl bg-[#f3f0ff] border-2 border-[#13102b] flex items-center justify-center text-[#7b42f5]">
            <TbLayoutDashboard className="w-5 h-5" />
          </div>
        </Card>
      </div>
    </>
  );
}
