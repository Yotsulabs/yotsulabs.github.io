"use client";

/* eslint-disable @next/next/no-img-element */
import React, { useState } from "react";
import { PortfolioDoc } from "@/app/admin/types";
import { TbX, TbCheck, TbPhoto, TbBuildingStore } from "react-icons/tb";
import Button from "@/app/components/ui/Button";
import Input from "@/app/components/ui/Input";
import Textarea from "@/app/components/ui/Textarea";

interface PortfolioFormModalProps {
  isOpen: boolean;
  editingPortfolio: PortfolioDoc | null;
  onClose: () => void;
  onSave: (payload: {
    title: string;
    companyName: string;
    category: string;
    tags: string[];
    imageUrl: string;
    description: string;
  }) => Promise<void>;
}

export default function PortfolioFormModal({
  isOpen,
  editingPortfolio,
  onClose,
  onSave,
}: PortfolioFormModalProps) {
  const [title, setTitle] = useState(editingPortfolio?.title || "");
  const [companyName, setCompanyName] = useState(editingPortfolio?.companyName || "");
  const [category, setCategory] = useState(editingPortfolio?.category || "");
  const [tags, setTags] = useState(
    Array.isArray(editingPortfolio?.tags) ? editingPortfolio.tags.join(", ") : ""
  );
  const [imageUrl, setImageUrl] = useState(editingPortfolio?.imageUrl || "");
  const [description, setDescription] = useState(editingPortfolio?.description || "");
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !category.trim()) {
      alert("Judul proyek dan Kategori wajib diisi.");
      return;
    }

    const tagArray = tags
      .split(",")
      .map((t) => t.trim())
      .filter((t) => t.length > 0);

    setIsSubmitting(true);
    try {
      await onSave({
        title: title.trim(),
        companyName: companyName.trim(),
        category: category.trim(),
        tags: tagArray,
        imageUrl: imageUrl.trim(),
        description: description.trim(),
      });
      onClose();
    } catch (err) {
      console.error("Error submitting portfolio form:", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-brand-ink/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto font-sans">
      <div className="bg-white border-3 border-brand-ink rounded-2xl max-w-lg w-full p-6 sm:p-8 shadow-neo-lg space-y-6 relative animate-in fade-in zoom-in-95 max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between border-b-2 border-brand-ink pb-3">
          <h3 className="font-heading font-black text-xl text-brand-ink">
            {editingPortfolio ? "Edit Portofolio" : "Tambah Portofolio Yotsulabs"}
          </h3>
          <button
            onClick={onClose}
            className="p-1 rounded-lg hover:bg-slate-100 cursor-pointer"
          >
            <TbX className="w-5 h-5 text-brand-ink" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* 1. Judul Proyek */}
          <Input
            label="Judul Proyek *"
            placeholder="Contoh: Kopi Lokal Indonesia"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          {/* 2. Nama Usaha / Client */}
          <Input
            label="Nama Usaha / Client"
            placeholder="Contoh: PT Kopi Nusantara / Brand Kopi Lokal"
            icon={TbBuildingStore}
            value={companyName}
            onChange={(e) => setCompanyName(e.target.value)}
          />

          {/* 3. Kategori */}
          <Input
            label="Kategori *"
            placeholder="Contoh: E-Commerce & Digital Marketing"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          />

          {/* 4. Tech Stack */}
          <Input
            label="Tech Stack / Tags (Pisahkan dengan koma)"
            placeholder="Contoh: Web Next.js, Payment Gateway, FB Ads"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
          />

          {/* 5. Preview Project (Link Cloudinary / Gambar) */}
          <div className="space-y-1.5">
            <Input
              label="Preview Project (Link Gambar Cloudinary)"
              placeholder="https://res.cloudinary.com/your-cloud/image/upload/v1234/sample.jpg"
              icon={TbPhoto}
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
            />
            {imageUrl.trim() && (
              <div className="mt-2 p-2 bg-slate-50 border-2 border-brand-ink rounded-xl overflow-hidden">
                <span className="text-[10px] font-mono font-bold text-slate-500 block mb-1">
                  Preview Gambar:
                </span>
                <img
                  src={imageUrl.trim()}
                  alt="Preview Proyek"
                  className="w-full h-36 object-cover rounded-lg border border-slate-200"
                  onError={(e) => {
                    (e.target as HTMLImageElement).style.display = "none";
                  }}
                />
              </div>
            )}
          </div>

          {/* 6. Deskripsi */}
          <Textarea
            label="Deskripsi Proyek"
            placeholder="Jelaskan ringkas mengenai proyek & solusi yang dikerjakan..."
            rows={4}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />

          <div className="flex items-center justify-end gap-3 border-t-2 border-slate-200 pt-4">
            <Button variant="outline" type="button" onClick={onClose}>
              Batal
            </Button>
            <Button variant="primary" type="submit" disabled={isSubmitting}>
              <TbCheck className="w-5 h-5 stroke-[2.5]" />
              <span>{isSubmitting ? "Menyimpan..." : "Simpan Portofolio"}</span>
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
