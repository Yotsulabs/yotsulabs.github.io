"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import {
  collection,
  doc,
  updateDoc,
  deleteDoc,
  addDoc,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "@/lib/firebase";
import { PortfolioDoc } from "@/types";
import {
  TbBriefcase,
  TbTrash,
  TbEdit,
  TbPlus,
  TbBuildingStore,
  TbExternalLink,
} from "react-icons/tb";
import Button from "@/app/components/ui/Button";
import Card from "@/app/components/ui/Card";
import Badge from "@/app/components/ui/Badge";
import EmptyState from "@/app/components/ui/EmptyState";
import { CardGridSkeleton } from "@/app/components/ui/Skeleton";
import PortfolioFormModal from "@/app/components/modals/admin/PortfolioFormModal";
import { useFirestoreCollection } from "@/hooks/useFirestoreCollection";

interface PortfoliosSectionProps {
  isAuthenticated: boolean;
  onCountChange?: (count: number) => void;
}

export default function PortfoliosSection({
  isAuthenticated,
  onCountChange,
}: PortfoliosSectionProps) {
  const { data: portfolios, isLoading: isLoadingPortfolios } = useFirestoreCollection<PortfolioDoc>(
    "portfolios",
    { enabled: isAuthenticated }
  );

  const [isPortfolioModalOpen, setIsPortfolioModalOpen] = useState(false);
  const [editingPortfolio, setEditingPortfolio] = useState<PortfolioDoc | null>(null);
  const [portfolioToDelete, setPortfolioToDelete] = useState<PortfolioDoc | null>(null);

  useEffect(() => {
    if (onCountChange) {
      onCountChange(portfolios.length);
    }
  }, [portfolios, onCountChange]);

  // Open Portfolio Modal for Add or Edit
  const openPortfolioModal = (pf?: PortfolioDoc) => {
    if (pf) {
      setEditingPortfolio(pf);
    } else {
      setEditingPortfolio(null);
    }
    setIsPortfolioModalOpen(true);
  };

  // Save Portfolio to Firestore
  const handleSavePortfolio = async (payload: {
    title: string;
    companyName: string;
    category: string;
    tags: string[];
    imageUrl: string;
    description: string;
  }) => {
    const dataToSave = {
      ...payload,
      createdAt: serverTimestamp(),
    };

    try {
      if (editingPortfolio) {
        await updateDoc(doc(db, "portfolios", editingPortfolio.id), dataToSave);
      } else {
        await addDoc(collection(db, "portfolios"), dataToSave);
      }
    } catch (err) {
      console.error("Error saving portfolio to Firestore:", err);
      alert("Gagal menyimpan portofolio ke Firestore.");
      throw err;
    }
  };

  // Delete Portfolio
  const handleDeletePortfolio = async () => {
    if (!portfolioToDelete) return;
    try {
      await deleteDoc(doc(db, "portfolios", portfolioToDelete.id));
      setPortfolioToDelete(null);
    } catch (err) {
      console.error("Error deleting portfolio:", err);
      alert("Gagal menghapus portofolio.");
    }
  };

  return (
    <div className="space-y-6">
      {/* Controls Bar */}
      <div className="flex items-center justify-between bg-white p-4 rounded-2xl border-3 border-brand-ink shadow-neo-purple">
        <div>
          <h3 className="font-heading font-black text-lg text-brand-ink">
            Portofolio Yotsulabs
          </h3>
        </div>

        <Button
          variant="primary"
          size="md"
          onClick={() => openPortfolioModal()}
          className="cursor-pointer"
        >
          <TbPlus className="w-5 h-5 stroke-[2.5]" />
          <span>Tambah Portofolio</span>
        </Button>
      </div>

      {isLoadingPortfolios ? (
        <CardGridSkeleton count={3} columns="grid-cols-1 md:grid-cols-2 lg:grid-cols-3" hasImage />
      ) : portfolios.length === 0 ? (
        <EmptyState
          icon={TbBriefcase}
          title="Belum Ada Portofolio di Firestore"
          description="Tambahkan item portofolio proyek baru untuk menyimpannya di Firebase Firestore secara langsung."
          actionText="Tambah Portofolio Pertama"
          onActionClick={() => openPortfolioModal()}
          actionIcon={TbPlus}
          shadowVariant="black"
          fullWidth
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {portfolios.map((pf, idx) => (
            <Card
              key={pf.id}
              variant="white"
              shadowVariant={idx % 2 === 0 ? "purple" : "dark"}
              className="flex flex-col justify-between overflow-hidden"
            >
              <div>
                {/* Preview Image Thumbnail if available using Next.js Image */}
                {pf.imageUrl && (
                  <div className="-mx-6 -mt-6 sm:-mx-8 sm:-mt-8 mb-6 border-b-3 border-brand-ink overflow-hidden bg-slate-100 relative h-48">
                    <Image
                      src={pf.imageUrl}
                      alt={pf.title}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="object-cover"
                    />
                    <a
                      href={pf.imageUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="absolute top-3 right-3 p-1.5 bg-white/90 hover:bg-white text-brand-ink rounded-lg border-2 border-brand-ink shadow-neo-sm z-10"
                      title="Buka Gambar Cloudinary"
                    >
                      <TbExternalLink className="w-4 h-4 stroke-[2.5]" />
                    </a>
                  </div>
                )}

                {/* Top Header: Badge & Actions */}
                <div className="flex items-center justify-between mb-4">
                  <Badge variant="soft" size="sm">
                    {pf.category}
                  </Badge>

                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => openPortfolioModal(pf)}
                      className="p-1.5 text-slate-700 hover:bg-brand-purple-light rounded-lg border border-transparent hover:border-brand-ink transition-colors cursor-pointer"
                      title="Edit Portofolio"
                    >
                      <TbEdit className="w-4 h-4 text-brand-purple" />
                    </button>
                    <button
                      onClick={() => setPortfolioToDelete(pf)}
                      className="p-1.5 text-rose-600 hover:bg-rose-100 rounded-lg border border-transparent hover:border-brand-ink transition-colors cursor-pointer"
                      title="Hapus Portofolio"
                    >
                      <TbTrash className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <h3 className="font-heading font-black text-2xl text-brand-ink mb-1">
                  {pf.title}
                </h3>

                {pf.companyName && (
                  <div className="flex items-center gap-1.5 text-xs font-sans font-bold text-brand-purple mb-3">
                    <TbBuildingStore className="w-4 h-4" />
                    <span>{pf.companyName}</span>
                  </div>
                )}

                <p className="text-slate-700 text-sm leading-relaxed mb-6 font-sans font-medium">
                  {pf.description}
                </p>

                {/* Tech Stack Badges using Badge Component */}
                {Array.isArray(pf.tags) && pf.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-4">
                    {pf.tags.map((t, tIdx) => (
                      <Badge key={tIdx} variant="white" size="sm">
                        {t}
                      </Badge>
                    ))}
                  </div>
                )}
              </div>
            </Card>
          ))}
        </div>
      )}

      {/* MODAL: PORTFOLIO FORM (ADD / EDIT) */}
      <PortfolioFormModal
        key={editingPortfolio?.id || (isPortfolioModalOpen ? "open" : "closed")}
        isOpen={isPortfolioModalOpen}
        editingPortfolio={editingPortfolio}
        onClose={() => setIsPortfolioModalOpen(false)}
        onSave={handleSavePortfolio}
      />

      {/* MODAL: CONFIRM DELETE PORTFOLIO */}
      {portfolioToDelete && (
        <div className="fixed inset-0 z-50 bg-brand-ink/60 backdrop-blur-xs flex items-center justify-center p-4 font-sans">
          <div className="bg-white border-3 border-brand-ink rounded-2xl max-w-md w-full p-6 shadow-neo-lg space-y-4 animate-in fade-in zoom-in-95">
            <h3 className="font-heading font-black text-xl text-brand-ink">
              Konfirmasi Hapus Portofolio
            </h3>
            <p className="text-slate-600 text-xs font-medium">
              Apakah Anda yakin ingin menghapus portofolio <strong>{portfolioToDelete.title}</strong>?
            </p>
            <div className="flex items-center justify-end gap-3 border-t-2 border-slate-200 pt-4">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setPortfolioToDelete(null)}
              >
                Batal
              </Button>
              <Button
                variant="primary"
                size="sm"
                onClick={handleDeletePortfolio}
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
