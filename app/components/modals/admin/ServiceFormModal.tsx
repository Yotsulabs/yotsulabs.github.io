"use client";

import React, { useState } from "react";
import { ServiceItemDoc, SubServiceItem } from "@/app/admin/types";
import { TbX, TbCheck, TbPlus, TbTrash } from "react-icons/tb";
import Button from "@/app/components/ui/Button";
import Input from "@/app/components/ui/Input";
import Textarea from "@/app/components/ui/Textarea";
import Select from "@/app/components/ui/Select";

interface ServiceFormModalProps {
  isOpen: boolean;
  editingService: ServiceItemDoc | null;
  onClose: () => void;
  onSave: (payload: {
    pillar: "technology" | "creative" | "marketing";
    title: string;
    description: string;
    items: SubServiceItem[];
    item1Title?: string;
    item2Title?: string;
    item3Title?: string;
  }) => Promise<void>;
}

export default function ServiceFormModal({
  isOpen,
  editingService,
  onClose,
  onSave,
}: ServiceFormModalProps) {
  const [pillar, setPillar] = useState<"technology" | "creative" | "marketing">(
    editingService?.pillar || "technology"
  );
  const [title, setTitle] = useState(editingService?.title || "");
  const [description, setDescription] = useState(editingService?.description || "");

  // Initialize dynamic sub-services list from editingService.items or item1/item2/item3
  const [items, setItems] = useState<SubServiceItem[]>(() => {
    if (editingService?.items && editingService.items.length > 0) {
      return editingService.items.map((it) => ({ title: it.title }));
    }
    const initial: SubServiceItem[] = [];
    if (editingService?.item1Title) {
      initial.push({ title: editingService.item1Title });
    }
    if (editingService?.item2Title) {
      initial.push({ title: editingService.item2Title });
    }
    if (editingService?.item3Title) {
      initial.push({ title: editingService.item3Title });
    }
    if (initial.length === 0) {
      initial.push({ title: "" });
    }
    return initial;
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  // Add new dynamic sub-service item
  const handleAddSubService = () => {
    setItems((prev) => [...prev, { title: "" }]);
  };

  // Remove dynamic sub-service item
  const handleRemoveSubService = (index: number) => {
    setItems((prev) => prev.filter((_, idx) => idx !== index));
  };

  // Update dynamic sub-service item
  const handleUpdateSubService = (index: number, value: string) => {
    setItems((prev) =>
      prev.map((item, idx) => (idx === index ? { title: value } : item))
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) {
      alert("Judul layanan wajib diisi.");
      return;
    }

    const filteredItems = items.filter((item) => item.title.trim().length > 0);

    const payload = {
      pillar,
      title: title.trim(),
      description: description.trim(),
      items: filteredItems,
      // Backward compatibility fields
      item1Title: filteredItems[0]?.title || "",
      item2Title: filteredItems[1]?.title || "",
      item3Title: filteredItems[2]?.title || "",
    };

    setIsSubmitting(true);
    try {
      await onSave(payload);
      onClose();
    } catch (err) {
      console.error("Error submitting service form:", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-[#13102b]/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto font-sans">
      <div className="bg-white border-3 border-[#13102b] rounded-2xl max-w-lg w-full p-6 sm:p-8 shadow-[6px_6px_0px_0px_#13102b] space-y-6 relative animate-in fade-in zoom-in-95 max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between border-b-2 border-[#13102b] pb-3">
          <h3 className="font-heading font-black text-xl text-[#13102b]">
            {editingService ? "Edit Layanan / Jasa" : "Tambah Jasa Baru Yotsulabs"}
          </h3>
          <button
            onClick={onClose}
            className="p-1 rounded-lg hover:bg-slate-100 cursor-pointer"
          >
            <TbX className="w-5 h-5 text-[#13102b]" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* 1. Pilar Utama */}
          <Select
            label="Pilar Utama *"
            options={[
              { value: "technology", label: "Technology" },
              { value: "creative", label: "Creative" },
              { value: "marketing", label: "Digital Marketing" },
            ]}
            value={pillar}
            onChange={(e) =>
              setPillar(e.target.value as "technology" | "creative" | "marketing")
            }
          />

          {/* 2. Judul Layanan */}
          <Input
            label="Judul Layanan *"
            placeholder="Contoh: Solusi Teknologi & Sistem Bisnis"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          {/* 3. Deskripsi Ringkas Layanan */}
          <Textarea
            label="Deskripsi Ringkas Layanan"
            placeholder="Jelaskan gambaran umum pilar layanan..."
            rows={3}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />

          {/* 4. Sub Layanan (Dinamis: Bisa Tambah & Hapus) */}
          <div className="border-t-2 border-slate-200 pt-4 space-y-4">
            <div className="flex items-center justify-between">
              <label className="block font-heading font-black text-xs uppercase tracking-wider text-[#13102b]">
                Sub-Layanan ({items.length})
              </label>
              <button
                type="button"
                onClick={handleAddSubService}
                className="inline-flex items-center gap-1 text-xs font-heading font-extrabold text-[#13102b] hover:underline cursor-pointer"
              >
                <TbPlus className="w-4 h-4 stroke-[2.5]" />
                <span>Tambah Sub-Layanan</span>
              </button>
            </div>

            <div className="space-y-3 max-h-60 overflow-y-auto pr-1">
              {items.map((item, idx) => (
                <div
                  key={idx}
                  className="bg-[#f9f8fd] p-3 rounded-xl border-2 border-[#13102b] space-y-2 relative group"
                >
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-[11px] font-mono font-bold text-slate-500">
                      #{idx + 1} Sub-Layanan
                    </span>
                    {items.length > 1 && (
                      <button
                        type="button"
                        onClick={() => handleRemoveSubService(idx)}
                        className="text-rose-600 hover:text-rose-800 p-1 rounded hover:bg-rose-50 cursor-pointer"
                        title="Hapus sub-layanan"
                      >
                        <TbTrash className="w-4 h-4" />
                      </button>
                    )}
                  </div>

                  <Input
                    placeholder="Judul (Contoh: Website Profil & E-Commerce)"
                    value={item.title}
                    onChange={(e) =>
                      handleUpdateSubService(idx, e.target.value)
                    }
                  />
                </div>
              ))}
            </div>
          </div>

          <div className="flex items-center justify-end gap-3 border-t-2 border-slate-200 pt-4">
            <Button variant="outline" type="button" onClick={onClose}>
              Batal
            </Button>
            <Button variant="primary" type="submit" disabled={isSubmitting}>
              <TbCheck className="w-5 h-5 stroke-[2.5]" />
              <span>{isSubmitting ? "Menyimpan..." : "Simpan Layanan"}</span>
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
