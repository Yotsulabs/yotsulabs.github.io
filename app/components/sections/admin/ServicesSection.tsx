"use client";

import React, { useState, useEffect } from "react";
import {
  collection,
  onSnapshot,
  doc,
  updateDoc,
  deleteDoc,
  addDoc,
  serverTimestamp,
  query,
  orderBy,
} from "firebase/firestore";
import { db } from "@/lib/firebase";
import { ServiceItemDoc, SubServiceItem } from "@/app/admin/types";
import {
  TbLayoutDashboard,
  TbTrash,
  TbEdit,
  TbPlus,
  TbCheck,
} from "react-icons/tb";
import Button from "@/app/components/ui/Button";
import Card from "@/app/components/ui/Card";
import Badge from "@/app/components/ui/Badge";
import EmptyState from "@/app/components/ui/EmptyState";
import { CardGridSkeleton } from "@/app/components/ui/Skeleton";
import ServiceFormModal from "@/app/components/modals/admin/ServiceFormModal";

interface ServicesSectionProps {
  isAuthenticated: boolean;
  onCountChange?: (count: number) => void;
}

export default function ServicesSection({
  isAuthenticated,
  onCountChange,
}: ServicesSectionProps) {
  const [services, setServices] = useState<ServiceItemDoc[]>([]);
  const [isServiceModalOpen, setIsServiceModalOpen] = useState(false);
  const [editingService, setEditingService] = useState<ServiceItemDoc | null>(null);
  const [serviceToDelete, setServiceToDelete] = useState<ServiceItemDoc | null>(null);
  const [isLoadingServices, setIsLoadingServices] = useState(true);

  // Subscribe to Services Collection
  useEffect(() => {
    if (!isAuthenticated) return;
    const q = query(collection(db, "services"), orderBy("createdAt", "desc"));
    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const svcList: ServiceItemDoc[] = snapshot.docs.map((docSnap) => ({
          id: docSnap.id,
          ...(docSnap.data() as Omit<ServiceItemDoc, "id">),
        }));
        setServices(svcList);
        setIsLoadingServices(false);
        if (onCountChange) {
          onCountChange(svcList.length);
        }
      },
      (err) => {
        console.error("Error subscribing to services:", err);
        setIsLoadingServices(false);
      }
    );
    return () => unsubscribe();
  }, [isAuthenticated, onCountChange]);

  // Open Service Modal for Add or Edit
  const openServiceModal = (svc?: ServiceItemDoc) => {
    if (svc) {
      setEditingService(svc);
    } else {
      setEditingService(null);
    }
    setIsServiceModalOpen(true);
  };

  // Save Service to Firestore
  const handleSaveService = async (payload: {
    pillar: "technology" | "creative" | "marketing";
    title: string;
    description: string;
    items: SubServiceItem[];
    item1Title?: string;
    item2Title?: string;
    item3Title?: string;
  }) => {
    const dataToSave = {
      ...payload,
      createdAt: serverTimestamp(),
    };

    try {
      if (editingService) {
        await updateDoc(doc(db, "services", editingService.id), dataToSave);
      } else {
        await addDoc(collection(db, "services"), dataToSave);
      }
    } catch (err) {
      console.error("Error saving service to Firestore:", err);
      alert("Gagal menyimpan layanan ke Firestore.");
      throw err;
    }
  };

  // Delete Service
  const handleDeleteService = async () => {
    if (!serviceToDelete) return;
    try {
      await deleteDoc(doc(db, "services", serviceToDelete.id));
      setServiceToDelete(null);
    } catch (err) {
      console.error("Error deleting service:", err);
      alert("Gagal menghapus layanan.");
    }
  };

  return (
    <div className="space-y-6">
      {/* Controls Bar */}
      <div className="flex items-center justify-between bg-white p-4 rounded-2xl border-3 border-[#13102b] shadow-[5px_5px_0px_0px_#7b42f5]">
        <div>
          <h3 className="font-heading font-black text-lg text-[#13102b]">
            Jasa Yotsulabs
          </h3>
        </div>

        <Button
          variant="primary"
          size="md"
          onClick={() => openServiceModal()}
          className="cursor-pointer"
        >
          <TbPlus className="w-5 h-5 stroke-[2.5]" />
          <span>Tambah Layanan / Jasa</span>
        </Button>
      </div>

      {isLoadingServices ? (
        <CardGridSkeleton count={2} columns="grid-cols-1 md:grid-cols-2" />
      ) : services.length === 0 ? (
        <EmptyState
          icon={TbLayoutDashboard}
          title="Belum Ada Layanan Kustom di Firestore"
          description="Tambahkan item layanan baru untuk menyimpannya di Firebase Firestore secara langsung."
          actionText="Tambah Layanan Pertama"
          onActionClick={() => openServiceModal()}
          actionIcon={TbPlus}
          shadowVariant="black"
          fullWidth
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {services.map((svc, idx) => {
            const isPurpleBg = idx % 2 === 0;
            const subItems: SubServiceItem[] =
              Array.isArray(svc.items) && svc.items.length > 0
                ? svc.items
                : [
                    svc.item1Title ? { title: svc.item1Title } : null,
                    svc.item2Title ? { title: svc.item2Title } : null,
                    svc.item3Title ? { title: svc.item3Title } : null,
                  ].filter(Boolean) as SubServiceItem[];

            return (
              <Card
                key={svc.id}
                variant={isPurpleBg ? "purple" : "white"}
                shadowVariant={isPurpleBg ? "dark" : "purple"}
                className="flex flex-col justify-between"
              >
                <div>
                  {/* Top Header: Pillar Badge & Action buttons */}
                  <div className="flex items-center justify-between mb-4 border-b-2 border-white/20 pb-3">
                    <Badge variant={isPurpleBg ? "white" : "soft"} size="sm">
                      {svc.pillar}
                    </Badge>

                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => openServiceModal(svc)}
                        className={`p-1.5 rounded-lg border transition-colors cursor-pointer ${
                          isPurpleBg
                            ? "text-white hover:bg-white/20 border-transparent hover:border-white"
                            : "text-slate-700 hover:bg-[#f3f0ff] border-transparent hover:border-[#13102b]"
                        }`}
                        title="Edit Layanan"
                      >
                        <TbEdit className={`w-4 h-4 ${isPurpleBg ? "text-white" : "text-[#7b42f5]"}`} />
                      </button>
                      <button
                        onClick={() => setServiceToDelete(svc)}
                        className={`p-1.5 rounded-lg border transition-colors cursor-pointer ${
                          isPurpleBg
                            ? "text-rose-200 hover:bg-rose-900/40 border-transparent hover:border-white"
                            : "text-rose-600 hover:bg-rose-100 border-transparent hover:border-[#13102b]"
                        }`}
                        title="Hapus Layanan"
                      >
                        <TbTrash className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  {/* Title & Description */}
                  <h3
                    className={`font-heading font-black text-2xl mb-3 tracking-tight ${
                      isPurpleBg ? "text-white" : "text-[#13102b]"
                    }`}
                  >
                    {svc.title}
                  </h3>

                  <p
                    className={`text-sm leading-relaxed mb-6 font-sans font-medium ${
                      isPurpleBg ? "text-purple-100" : "text-slate-700"
                    }`}
                  >
                    {svc.description}
                  </p>

                  {/* Sub-services / Features List matching Landing Page style */}
                  {subItems.length > 0 && (
                    <div
                      className={`space-y-3 pt-4 border-t-2 ${
                        isPurpleBg ? "border-white/20" : "border-slate-200"
                      }`}
                    >
                      {subItems.map((item, fIdx) => (
                        <div key={fIdx} className="flex items-start gap-2.5">
                          <div
                            className={`w-5 h-5 rounded-full border-2 border-[#13102b] flex items-center justify-center shrink-0 mt-0.5 ${
                              isPurpleBg
                                ? "bg-white text-[#7b42f5]"
                                : "bg-[#7b42f5] text-white"
                            }`}
                          >
                            <TbCheck className="w-3.5 h-3.5 stroke-[3]" />
                          </div>
                          <span
                            className={`text-xs sm:text-sm font-sans font-bold ${
                              isPurpleBg ? "text-white" : "text-[#13102b]"
                            }`}
                          >
                            {item.title}
                          </span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </Card>
            );
          })}
        </div>
      )}

      {/* MODAL: SERVICE FORM (ADD / EDIT) */}
      <ServiceFormModal
        key={editingService?.id || (isServiceModalOpen ? "open" : "closed")}
        isOpen={isServiceModalOpen}
        editingService={editingService}
        onClose={() => setIsServiceModalOpen(false)}
        onSave={handleSaveService}
      />

      {/* MODAL: CONFIRM DELETE SERVICE */}
      {serviceToDelete && (
        <div className="fixed inset-0 z-50 bg-[#13102b]/60 backdrop-blur-xs flex items-center justify-center p-4 font-sans">
          <div className="bg-white border-3 border-[#13102b] rounded-2xl max-w-md w-full p-6 shadow-[8px_8px_0px_0px_#13102b] space-y-4 animate-in fade-in zoom-in-95">
            <h3 className="font-heading font-black text-xl text-[#13102b]">
              Konfirmasi Hapus Layanan
            </h3>
            <p className="text-slate-600 text-xs font-medium">
              Apakah Anda yakin ingin menghapus layanan <strong>{serviceToDelete.title}</strong>?
            </p>
            <div className="flex items-center justify-end gap-3 border-t-2 border-slate-200 pt-4">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setServiceToDelete(null)}
              >
                Batal
              </Button>
              <Button
                variant="primary"
                size="sm"
                onClick={handleDeleteService}
                className="!bg-rose-600 hover:!bg-rose-700"
              >
                Hapus
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
