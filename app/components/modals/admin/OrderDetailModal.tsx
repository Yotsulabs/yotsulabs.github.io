"use client";

import React from "react";
import { Timestamp } from "firebase/firestore";
import { OrderDoc } from "@/app/admin/types";
import { TbBrandWhatsapp, TbX } from "react-icons/tb";
import Button from "@/app/components/ui/Button";
import Badge from "@/app/components/ui/Badge";

interface OrderDetailModalProps {
  order: OrderDoc | null;
  onClose: () => void;
  onUpdateStatus: (
    orderId: string,
    newStatus: "pending" | "in-progress" | "completed" | "cancelled"
  ) => void;
  formatDate: (ts: Timestamp | Date | null | undefined) => string;
}

export default function OrderDetailModal({
  order,
  onClose,
  onUpdateStatus,
  formatDate,
}: OrderDetailModalProps) {
  if (!order) return null;

  return (
    <div className="fixed inset-0 z-50 bg-brand-ink/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white border-3 border-brand-ink rounded-2xl max-w-2xl w-full p-6 sm:p-8 shadow-neo-lg max-h-[90vh] overflow-y-auto space-y-6 relative animate-in fade-in zoom-in-95 font-sans">
        <div className="flex items-center justify-between border-b-2 border-brand-ink pb-4">
          <div className="flex items-center gap-2">
            <span className="font-heading font-black text-xl text-brand-ink">
              Detail Brief Order
            </span>
            <Badge status={order.status} size="sm" />
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-xl bg-slate-100 border border-brand-ink hover:bg-slate-200 cursor-pointer"
          >
            <TbX className="w-5 h-5 text-brand-ink" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-brand-bg-soft p-4 rounded-xl border-2 border-brand-ink">
          <div>
            <span className="text-xs font-mono font-bold text-slate-500 block">
              Nama Pemesan:
            </span>
            <span className="font-heading font-black text-base text-brand-ink">
              {order.fullName}
            </span>
          </div>
          <div>
            <span className="text-xs font-mono font-bold text-slate-500 block">
              Usaha / Organisasi:
            </span>
            <span className="font-heading font-bold text-sm text-brand-ink">
              {order.companyName || "-"}
            </span>
          </div>
          <div>
            <span className="text-xs font-mono font-bold text-slate-500 block">
              WhatsApp:
            </span>
            <a
              href={`https://wa.me/${order.phone.replace(/[^0-9]/g, "")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono text-sm font-bold text-emerald-700 underline flex items-center gap-1"
            >
              <TbBrandWhatsapp className="w-4 h-4" />
              <span>{order.phone}</span>
            </a>
          </div>
          <div>
            <span className="text-xs font-mono font-bold text-slate-500 block">
              Email:
            </span>
            <span className="text-sm font-medium text-slate-800">
              {order.email || "-"}
            </span>
          </div>
        </div>

        <div className="space-y-4 text-sm font-sans">
          <div className="grid grid-cols-2 gap-3 bg-white p-3 rounded-xl border border-slate-300 font-mono text-xs">
            <div>
              <span className="text-slate-500 block">Bidang:</span>
              <span className="font-bold text-brand-purple">{order.bidang}</span>
            </div>
            <div>
              <span className="text-slate-500 block">Jasa:</span>
              <span className="font-bold text-brand-ink">{order.jasa}</span>
            </div>
            <div>
              <span className="text-slate-500 block">Target Waktu:</span>
              <span className="font-bold text-slate-800">{order.targetTime}</span>
            </div>
            <div>
              <span className="text-slate-500 block">Tanggal Masuk:</span>
              <span className="font-bold text-slate-800">
                {formatDate(order.createdAt)}
              </span>
            </div>
          </div>

          {order.background && (
            <div>
              <h4 className="font-heading font-black text-xs uppercase tracking-wider text-slate-600 mb-1">
                Latar Belakang Proyek:
              </h4>
              <p className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs font-medium leading-relaxed">
                {order.background}
              </p>
            </div>
          )}

          {order.goal && (
            <div>
              <h4 className="font-heading font-black text-xs uppercase tracking-wider text-slate-600 mb-1">
                Tujuan Proyek:
              </h4>
              <p className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs font-medium leading-relaxed">
                {order.goal}
              </p>
            </div>
          )}

          {order.notes && (
            <div>
              <h4 className="font-heading font-black text-xs uppercase tracking-wider text-slate-600 mb-1">
                Referensi / Catatan Tambahan:
              </h4>
              <p className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs font-medium leading-relaxed whitespace-pre-wrap">
                {order.notes}
              </p>
            </div>
          )}
        </div>

        <div className="border-t-2 border-slate-200 pt-4 space-y-3">
          <span className="font-heading font-black text-xs uppercase tracking-wider text-slate-700 block">
            Ubah Status Order:
          </span>
          <div className="flex flex-wrap items-center gap-2">
            {[
              {
                status: "pending" as const,
                label: "Pending",
                bg: "hover:bg-amber-100 text-amber-900",
              },
              {
                status: "in-progress" as const,
                label: "Diproses",
                bg: "hover:bg-sky-100 text-sky-900",
              },
              {
                status: "completed" as const,
                label: "Selesai",
                bg: "hover:bg-emerald-100 text-emerald-900",
              },
              {
                status: "cancelled" as const,
                label: "Batal",
                bg: "hover:bg-rose-100 text-rose-900",
              },
            ].map((st) => (
              <button
                key={st.status}
                onClick={() => onUpdateStatus(order.id, st.status)}
                className={`px-3 py-1.5 rounded-lg border-2 border-brand-ink font-heading font-extrabold text-xs transition-all cursor-pointer ${order.status === st.status
                    ? "bg-brand-purple text-white shadow-neo-sm"
                    : `bg-white ${st.bg}`
                  }`}
              >
                {st.label}
              </button>
            ))}
          </div>
        </div>

        <div className="flex items-center justify-between border-t-2 border-slate-200 pt-4">
          <a
            href={`https://wa.me/${order.phone.replace(/[^0-9]/g, "")}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-heading font-extrabold text-xs rounded-xl border-2 border-brand-ink shadow-neo-sm transition-all"
          >
            <TbBrandWhatsapp className="w-4 h-4" />
            <span>Hubungi Client via WA</span>
          </a>

          <Button variant="outline" size="sm" onClick={onClose}>
            Tutup
          </Button>
        </div>
      </div>
    </div>
  );
}
