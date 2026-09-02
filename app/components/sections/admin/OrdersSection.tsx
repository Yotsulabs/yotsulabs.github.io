"use client";

import React, { useState, useEffect } from "react";
import { doc, updateDoc, deleteDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { OrderDoc } from "@/types";
import {
  TbFileText,
  TbBrandWhatsapp,
  TbTrash,
  TbSearch,
} from "react-icons/tb";
import Button from "@/app/components/ui/Button";
import Input from "@/app/components/ui/Input";
import Badge from "@/app/components/ui/Badge";
import EmptyState from "@/app/components/ui/EmptyState";
import { TableSkeleton } from "@/app/components/ui/Skeleton";
import OrderDetailModal from "@/app/components/modals/admin/OrderDetailModal";
import { useFirestoreCollection } from "@/hooks/useFirestoreCollection";
import { getWhatsAppLink } from "@/lib/whatsapp";
import { formatFirestoreDate } from "@/lib/formatters";

interface OrdersSectionProps {
  isAuthenticated: boolean;
  onCountChange?: (count: number) => void;
}

export default function OrdersSection({
  isAuthenticated,
  onCountChange,
}: OrdersSectionProps) {
  const { data: orders, isLoading: isLoadingOrders } = useFirestoreCollection<OrderDoc>(
    "orders",
    { enabled: isAuthenticated }
  );

  const [orderFilter, setOrderFilter] = useState<string>("all");
  const [orderSearch, setOrderSearch] = useState("");
  const [selectedOrder, setSelectedOrder] = useState<OrderDoc | null>(null);
  const [orderToDelete, setOrderToDelete] = useState<OrderDoc | null>(null);

  useEffect(() => {
    if (onCountChange) {
      onCountChange(orders.length);
    }
  }, [orders, onCountChange]);

  // Update Order Status
  const handleUpdateOrderStatus = async (
    orderId: string,
    newStatus: "pending" | "in-progress" | "completed" | "cancelled"
  ) => {
    try {
      await updateDoc(doc(db, "orders", orderId), {
        status: newStatus,
      });
      if (selectedOrder && selectedOrder.id === orderId) {
        setSelectedOrder({ ...selectedOrder, status: newStatus });
      }
    } catch (err) {
      console.error("Error updating order status:", err);
      alert("Gagal memperbarui status order.");
    }
  };

  // Delete Order
  const handleDeleteOrder = async () => {
    if (!orderToDelete) return;
    try {
      await deleteDoc(doc(db, "orders", orderToDelete.id));
      if (selectedOrder?.id === orderToDelete.id) {
        setSelectedOrder(null);
      }
      setOrderToDelete(null);
    } catch (err) {
      console.error("Error deleting order:", err);
      alert("Gagal menghapus order.");
    }
  };

  // Filter Orders
  const filteredOrders = orders.filter((o) => {
    const matchesFilter = orderFilter === "all" || o.status === orderFilter;
    const matchesSearch =
      !orderSearch.trim() ||
      o.fullName?.toLowerCase().includes(orderSearch.toLowerCase()) ||
      o.companyName?.toLowerCase().includes(orderSearch.toLowerCase()) ||
      o.phone?.includes(orderSearch) ||
      o.jasa?.toLowerCase().includes(orderSearch.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="space-y-6">
      {/* Controls Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-4 rounded-2xl border-3 border-brand-ink shadow-neo-purple">
        <div className="flex flex-wrap items-center gap-1.5">
          {[
            { id: "all", label: "Semua" },
            { id: "pending", label: "Pending" },
            { id: "in-progress", label: "Diproses" },
            { id: "completed", label: "Selesai" },
            { id: "cancelled", label: "Batal" },
          ].map((f) => (
            <button
              key={f.id}
              onClick={() => setOrderFilter(f.id)}
              className={`px-3 py-1.5 rounded-lg text-xs font-heading font-extrabold border-2 transition-all cursor-pointer ${
                orderFilter === f.id
                  ? "bg-brand-purple text-white border-brand-ink"
                  : "bg-transparent text-slate-700 border-transparent hover:bg-slate-100"
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>

        <div className="w-full sm:w-64">
          <Input
            placeholder="Cari nama, WA, jasa..."
            icon={TbSearch}
            value={orderSearch}
            onChange={(e) => setOrderSearch(e.target.value)}
            className="!py-1.5 text-xs"
          />
        </div>
      </div>

      {isLoadingOrders ? (
        <TableSkeleton rows={4} />
      ) : filteredOrders.length === 0 ? (
        <EmptyState
          icon={TbFileText}
          title="Belum Ada Data Order"
          description="Pesanan baru yang dikirimkan oleh klien melalui form order akan muncul di sini secara otomatis."
          shadowVariant="black"
          fullWidth
        />
      ) : (
        <div className="bg-white border-3 border-brand-ink rounded-2xl overflow-hidden shadow-neo-lg">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-brand-ink text-white font-heading text-xs uppercase tracking-wider">
                  <th className="py-3.5 px-4">Client / Brand</th>
                  <th className="py-3.5 px-4">Kontak WA</th>
                  <th className="py-3.5 px-4">Bidang &amp; Jasa</th>
                  <th className="py-3.5 px-4">Target Waktu</th>
                  <th className="py-3.5 px-4">Tanggal</th>
                  <th className="py-3.5 px-4">Status</th>
                  <th className="py-3.5 px-4 text-right">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y-2 divide-slate-100 text-sm font-sans font-medium">
                {filteredOrders.map((o) => (
                  <tr key={o.id} className="hover:bg-slate-50 transition-colors">
                    <td className="py-3.5 px-4">
                      <div className="font-heading font-black text-brand-ink">
                        {o.fullName}
                      </div>
                      {o.companyName && (
                        <div className="text-xs text-slate-500 font-bold">
                          {o.companyName}
                        </div>
                      )}
                    </td>

                    <td className="py-3.5 px-4">
                      <a
                        href={getWhatsAppLink(o.phone)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 font-mono text-xs font-bold text-emerald-700 hover:text-emerald-900 underline"
                      >
                        <TbBrandWhatsapp className="w-4 h-4 text-emerald-600" />
                        <span>{o.phone}</span>
                      </a>
                    </td>

                    <td className="py-3.5 px-4">
                      <div className="font-bold text-xs text-brand-ink">
                        {o.jasa}
                      </div>
                      <div className="text-[11px] text-slate-500 font-mono uppercase">
                        {o.bidang}
                      </div>
                    </td>

                    <td className="py-3.5 px-4 text-xs font-mono">
                      {o.targetTime}
                    </td>

                    <td className="py-3.5 px-4 text-xs font-mono text-slate-600">
                      {formatFirestoreDate(o.createdAt)}
                    </td>

                    <td className="py-3.5 px-4">
                      <Badge status={o.status} size="sm" />
                    </td>

                    <td className="py-3.5 px-4 text-right space-x-1.5">
                      <button
                        onClick={() => setSelectedOrder(o)}
                        className="px-2.5 py-1 bg-brand-purple-light hover:bg-brand-purple hover:text-white border border-brand-ink text-brand-ink font-heading font-extrabold text-xs rounded-lg transition-colors cursor-pointer"
                        title="Lihat Detail Brief"
                      >
                        Detail
                      </button>

                      <button
                        onClick={() => setOrderToDelete(o)}
                        className="p-1.5 text-rose-600 hover:bg-rose-100 rounded-lg border border-transparent hover:border-brand-ink transition-colors cursor-pointer"
                        title="Hapus Order"
                      >
                        <TbTrash className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* MODAL 1: ORDER DETAIL DRAWER */}
      <OrderDetailModal
        order={selectedOrder}
        onClose={() => setSelectedOrder(null)}
        onUpdateStatus={handleUpdateOrderStatus}
        formatDate={formatFirestoreDate}
      />

      {/* MODAL 2: CONFIRM DELETE ORDER */}
      {orderToDelete && (
        <div className="fixed inset-0 z-50 bg-brand-ink/60 backdrop-blur-xs flex items-center justify-center p-4 font-sans">
          <div className="bg-white border-3 border-brand-ink rounded-2xl max-w-md w-full p-6 shadow-neo-lg space-y-4 animate-in fade-in zoom-in-95">
            <h3 className="font-heading font-black text-xl text-brand-ink">
              Konfirmasi Hapus Order
            </h3>
            <p className="text-slate-600 text-xs font-medium">
              Apakah Anda yakin ingin menghapus order dari <strong>{orderToDelete.fullName}</strong>?
            </p>
            <div className="flex items-center justify-end gap-3 border-t-2 border-slate-200 pt-4">
              <Button variant="outline" size="sm" onClick={() => setOrderToDelete(null)}>
                Batal
              </Button>
              <Button
                variant="primary"
                size="sm"
                onClick={handleDeleteOrder}
                className="!bg-rose-600 hover:!bg-rose-700"
              >
                Hapus Order
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
