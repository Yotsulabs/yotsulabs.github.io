"use client";

import React, { useState, useEffect } from "react";
import {
  collection,
  onSnapshot,
  doc,
  updateDoc,
  deleteDoc,
  query,
  orderBy,
  Timestamp,
} from "firebase/firestore";
import { db } from "@/lib/firebase";
import { OrderDoc } from "@/app/admin/types";
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

interface OrdersSectionProps {
  isAuthenticated: boolean;
  onCountChange?: (count: number) => void;
}

export default function OrdersSection({
  isAuthenticated,
  onCountChange,
}: OrdersSectionProps) {
  const [orders, setOrders] = useState<OrderDoc[]>([]);
  const [orderFilter, setOrderFilter] = useState<string>("all");
  const [orderSearch, setOrderSearch] = useState("");
  const [selectedOrder, setSelectedOrder] = useState<OrderDoc | null>(null);
  const [orderToDelete, setOrderToDelete] = useState<OrderDoc | null>(null);
  const [isLoadingOrders, setIsLoadingOrders] = useState(true);

  // Subscribe to Orders Collection
  useEffect(() => {
    if (!isAuthenticated) return;
    const q = query(collection(db, "orders"), orderBy("createdAt", "desc"));
    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const orderList: OrderDoc[] = snapshot.docs.map((docSnap) => ({
          id: docSnap.id,
          ...(docSnap.data() as Omit<OrderDoc, "id">),
        }));
        setOrders(orderList);
        setIsLoadingOrders(false);
        if (onCountChange) {
          onCountChange(orderList.length);
        }
      },
      (err) => {
        console.error("Error subscribing to orders:", err);
        setIsLoadingOrders(false);
      }
    );
    return () => unsubscribe();
  }, [isAuthenticated, onCountChange]);

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

  const formatDate = (ts: Timestamp | Date | null | undefined) => {
    if (!ts) return "-";
    const dateObj =
      typeof (ts as Timestamp).toDate === "function"
        ? (ts as Timestamp).toDate()
        : new Date(ts as Date);
    return dateObj.toLocaleDateString("id-ID", {
      day: "numeric",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="space-y-6">
      {/* Controls Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-4 rounded-2xl border-3 border-[#13102b] shadow-[5px_5px_0px_0px_#7b42f5]">
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
                  ? "bg-[#7b42f5] text-white border-[#13102b]"
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
        <div className="bg-white border-3 border-[#13102b] rounded-2xl overflow-hidden shadow-[6px_6px_0px_0px_#13102b]">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-[#13102b] text-white font-heading text-xs uppercase tracking-wider">
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
                      <div className="font-heading font-black text-[#13102b]">
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
                        href={`https://wa.me/${o.phone.replace(/[^0-9]/g, "")}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 font-mono text-xs font-bold text-emerald-700 hover:text-emerald-900 underline"
                      >
                        <TbBrandWhatsapp className="w-4 h-4 text-emerald-600" />
                        <span>{o.phone}</span>
                      </a>
                    </td>

                    <td className="py-3.5 px-4">
                      <div className="font-bold text-xs text-[#13102b]">
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
                      {formatDate(o.createdAt)}
                    </td>

                    <td className="py-3.5 px-4">
                      <Badge status={o.status} size="sm" />
                    </td>

                    <td className="py-3.5 px-4 text-right space-x-1.5">
                      <button
                        onClick={() => setSelectedOrder(o)}
                        className="px-2.5 py-1 bg-[#f3f0ff] hover:bg-[#7b42f5] hover:text-white border border-[#13102b] text-[#13102b] font-heading font-extrabold text-xs rounded-lg transition-colors cursor-pointer"
                        title="Lihat Detail Brief"
                      >
                        Detail
                      </button>

                      <button
                        onClick={() => setOrderToDelete(o)}
                        className="p-1.5 text-rose-600 hover:bg-rose-100 rounded-lg border border-transparent hover:border-[#13102b] transition-colors cursor-pointer"
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
        formatDate={formatDate}
      />

      {/* MODAL 2: CONFIRM DELETE ORDER */}
      {orderToDelete && (
        <div className="fixed inset-0 z-50 bg-[#13102b]/60 backdrop-blur-xs flex items-center justify-center p-4 font-sans">
          <div className="bg-white border-3 border-[#13102b] rounded-2xl max-w-md w-full p-6 shadow-[8px_8px_0px_0px_#13102b] space-y-4 animate-in fade-in zoom-in-95">
            <h3 className="font-heading font-black text-xl text-[#13102b]">
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
