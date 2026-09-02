"use client";

import React, { useState } from "react";
import {
  TbBrandWhatsapp,
  TbArrowRight,
  TbUser,
  TbBuilding,
  TbPhone,
  TbMail,
  TbClock,
} from "react-icons/tb";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Button from "../components/ui/Button";
import Card from "../components/ui/Card";
import Input from "../components/ui/Input";
import Textarea from "../components/ui/Textarea";
import Select from "../components/ui/Select";
import { db } from "@/lib/firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import {
  BIDANG_LIST,
  JASA_BY_BIDANG,
  TARGET_TIME_OPTIONS,
  BidangKey,
} from "@/lib/orderData";
import {
  getBidangTitle,
  getJasaName,
  getTargetTimeLabel,
  generateWhatsAppMessage,
} from "@/lib/orderUtils";
import { getWhatsAppLink } from "@/lib/whatsapp";

interface OrderFormData {
  fullName: string;
  companyName: string;
  phone: string;
  email: string;
  bidang: BidangKey;
  jasa: string;
  background: string;
  goal: string;
  targetTime: string;
  notes: string;
}

export default function OrderPage() {
  // Unified Form State Object
  const [formData, setFormData] = useState<OrderFormData>({
    fullName: "",
    companyName: "",
    phone: "",
    email: "",
    bidang: "technology",
    jasa: "website",
    background: "",
    goal: "",
    targetTime: "2-4-weeks",
    notes: "",
  });

  // Validation State
  const [errors, setErrors] = useState<{ fullName?: string; phone?: string }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const updateFormField = <K extends keyof OrderFormData>(field: K, value: OrderFormData[K]) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  // Handle Bidang change & set first default Jasa
  const handleBidangChange = (newBidang: BidangKey) => {
    const firstJasa = JASA_BY_BIDANG[newBidang]?.[0]?.id || "";
    setFormData((prev) => ({
      ...prev,
      bidang: newBidang,
      jasa: firstJasa,
    }));
  };

  const handleOrderSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const newErrors: { fullName?: string; phone?: string } = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = "Nama lengkap wajib diisi";
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "Nomor WhatsApp wajib diisi";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    setIsSubmitting(true);

    const currentBidangTitle = getBidangTitle(formData.bidang);
    const currentJasaName = getJasaName(formData.bidang, formData.jasa);
    const currentTargetTimeLabel = getTargetTimeLabel(formData.targetTime);

    // Save document to Firestore collection 'orders'
    try {
      await addDoc(collection(db, "orders"), {
        fullName: formData.fullName.trim(),
        companyName: formData.companyName.trim(),
        phone: formData.phone.trim(),
        email: formData.email.trim(),
        bidang: currentBidangTitle,
        bidangKey: formData.bidang,
        jasa: currentJasaName,
        jasaKey: formData.jasa,
        background: formData.background.trim(),
        goal: formData.goal.trim(),
        targetTime: currentTargetTimeLabel,
        targetTimeKey: formData.targetTime,
        notes: formData.notes.trim(),
        status: "pending",
        createdAt: serverTimestamp(),
      });
    } catch (err) {
      console.error("Gagal menyimpan ke Firestore:", err);
    }

    const messageLines = generateWhatsAppMessage({
      fullName: formData.fullName,
      companyName: formData.companyName,
      phone: formData.phone,
      email: formData.email,
      bidang: formData.bidang,
      jasa: formData.jasa,
      background: formData.background,
      goal: formData.goal,
      targetTime: formData.targetTime,
      notes: formData.notes,
    });

    const waUrl = getWhatsAppLink("62895339023888", messageLines);

    window.open(waUrl, "_blank", "noopener,noreferrer");
    setIsSubmitting(false);
  };

  return (
    <main className="min-h-screen bg-grid-pattern text-brand-ink flex flex-col font-sans selection:bg-brand-purple selection:text-white">
      <Navbar />

      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full flex-grow">
        {/* Page Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h1 className="font-heading font-black text-3xl sm:text-4xl lg:text-5xl text-brand-ink tracking-tight">
            Formulir Order Layanan Digital
          </h1>

          <p className="mt-4 text-slate-700 text-base sm:text-lg font-medium leading-relaxed">
            Isi rincian kebutuhan proyek Anda di bawah ini. Brief akan langsung terhubung ke tim Yotsulabs via WhatsApp untuk estimasi resmi.
          </p>
        </div>

        {/* Order Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Main Form */}
          <form onSubmit={handleOrderSubmit} className="lg:col-span-7 space-y-8">
            {/* 1. Informasi Client */}
            <Card variant="white" shadowVariant="purple" className="space-y-5">
              <div className="flex items-center gap-3 border-b-2 border-slate-200 pb-3">
                <span className="w-7 h-7 rounded-lg bg-brand-purple text-white text-xs font-mono font-extrabold flex items-center justify-center border-2 border-brand-ink">
                  1
                </span>
                <h2 className="font-heading font-black text-lg text-brand-ink">
                  Informasi Client
                </h2>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Input
                  label="Nama Lengkap *"
                  placeholder="Contoh: Budi Santoso"
                  icon={TbUser}
                  value={formData.fullName}
                  onChange={(e) => updateFormField("fullName", e.target.value)}
                  errorText={errors.fullName}
                />

                <Input
                  label="Nama Usaha / Organisasi"
                  placeholder="Contoh: Kopi Studio ID"
                  icon={TbBuilding}
                  value={formData.companyName}
                  onChange={(e) => updateFormField("companyName", e.target.value)}
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Input
                  label="Nomor WhatsApp *"
                  placeholder="Contoh: 08123456789"
                  type="tel"
                  icon={TbPhone}
                  value={formData.phone}
                  onChange={(e) => updateFormField("phone", e.target.value)}
                  errorText={errors.phone}
                />

                <Input
                  label="Email (Opsional)"
                  placeholder="nama@email.com"
                  type="email"
                  icon={TbMail}
                  value={formData.email}
                  onChange={(e) => updateFormField("email", e.target.value)}
                />
              </div>
            </Card>

            {/* 2. Kebutuhan (Bidang, Jasa, Latar Belakang, Tujuan) */}
            <Card variant="white" shadowVariant="dark" className="space-y-6">
              <div className="flex items-center gap-3 border-b-2 border-slate-200 pb-3">
                <span className="w-7 h-7 rounded-lg bg-brand-purple text-white text-xs font-mono font-extrabold flex items-center justify-center border-2 border-brand-ink">
                  2
                </span>
                <h2 className="font-heading font-black text-lg text-brand-ink">
                  Kebutuhan Layanan
                </h2>
              </div>

              {/* Bidang Selector */}
              <div>
                <label className="block font-heading font-extrabold text-xs uppercase tracking-wider text-slate-700 mb-2.5">
                  Pilih Bidang Utama:
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {BIDANG_LIST.map((b) => {
                    const isSelected = formData.bidang === b.key;
                    const IconComp = b.icon;
                    return (
                      <button
                        type="button"
                        key={b.key}
                        onClick={() => handleBidangChange(b.key)}
                        className={`flex items-center gap-2.5 p-3.5 rounded-xl border-2 transition-all cursor-pointer ${
                          isSelected
                            ? "bg-brand-purple text-white border-brand-ink shadow-neo-sm"
                            : "bg-white text-brand-ink border-brand-ink hover:bg-brand-purple-light"
                        }`}
                      >
                        <IconComp className="w-5 h-5 stroke-[2.2] shrink-0" />
                        <span className="font-heading font-extrabold text-xs">
                          {b.title}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Jasa Selector */}
              <div>
                <label className="block font-heading font-extrabold text-xs uppercase tracking-wider text-slate-700 mb-2.5">
                  Pilih Jasa spesifik ({getBidangTitle(formData.bidang)}):
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {JASA_BY_BIDANG[formData.bidang].map((jItem) => {
                    const isSelected = formData.jasa === jItem.id;
                    return (
                      <button
                        type="button"
                        key={jItem.id}
                        onClick={() => updateFormField("jasa", jItem.id)}
                        className={`text-left p-3.5 rounded-xl border-2 transition-all cursor-pointer ${
                          isSelected
                            ? "bg-brand-purple-light border-brand-purple shadow-neo-purple"
                            : "bg-white border-brand-ink hover:bg-slate-50"
                        }`}
                      >
                        <div className="flex items-center justify-between mb-1">
                          <h4 className="font-heading font-black text-xs text-brand-ink">
                            {jItem.name}
                          </h4>
                          <div
                            className={`w-3.5 h-3.5 rounded-full border border-brand-ink flex items-center justify-center ${
                              isSelected ? "bg-brand-purple" : "bg-white"
                            }`}
                          >
                            {isSelected && (
                              <span className="w-1 h-1 rounded-full bg-white" />
                            )}
                          </div>
                        </div>
                        <p className="text-[11px] text-slate-600 font-medium leading-snug">
                          {jItem.desc}
                        </p>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Latar Belakang & Tujuan Project */}
              <div className="grid grid-cols-1 gap-4">
                <Textarea
                  label="Latar Belakang Proyek (Singkat)"
                  placeholder="Ceritakan latar belakang singkat tentang bisnis atau tantangan yang dihadapi..."
                  rows={3}
                  value={formData.background}
                  onChange={(e) => updateFormField("background", e.target.value)}
                />

                <Textarea
                  label="Tujuan Project (Singkat)"
                  placeholder="Apa hasil utama yang ingin dicapai melalui proyek ini..."
                  rows={3}
                  value={formData.goal}
                  onChange={(e) => updateFormField("goal", e.target.value)}
                />
              </div>
            </Card>

            {/* 3. Detail Project (Target Waktu, Budget, Catatan) */}
            <Card variant="white" shadowVariant="purple" className="space-y-5">
              <div className="flex items-center gap-3 border-b-2 border-slate-200 pb-3">
                <span className="w-7 h-7 rounded-lg bg-brand-purple text-white text-xs font-mono font-extrabold flex items-center justify-center border-2 border-brand-ink">
                  3
                </span>
                <h2 className="font-heading font-black text-lg text-brand-ink">
                  Detail Project
                </h2>
              </div>

              <Select
                label="Target Waktu Pengerjaan *"
                options={TARGET_TIME_OPTIONS}
                value={formData.targetTime}
                onChange={(e) => updateFormField("targetTime", e.target.value)}
                icon={TbClock}
              />

              <Textarea
                label="Referensi / Catatan Tambahan"
                placeholder="Sertakan link referensi website/desain yang disukai atau catatan teknis tambahan jika ada..."
                rows={3}
                value={formData.notes}
                onChange={(e) => updateFormField("notes", e.target.value)}
              />
            </Card>

            {/* Mobile Submit Button inside form */}
            <div className="lg:hidden">
              <Button
                variant="primary"
                size="lg"
                type="submit"
                disabled={isSubmitting}
                className="w-full h-12"
              >
                <TbBrandWhatsapp className="w-5 h-5" />
                <span>
                  {isSubmitting ? "Mengalihkan ke WA..." : "Kirim Order via WhatsApp"}
                </span>
                <TbArrowRight className="w-5 h-5 stroke-[2.5]" />
              </Button>
            </div>
          </form>

          {/* Right Sticky Order Summary Card */}
          <div className="lg:col-span-5 sticky top-28 space-y-4">
            <div className="bg-brand-purple text-white border-3 border-brand-ink rounded-2xl p-6 sm:p-8 shadow-neo-lg space-y-6">
              <div className="flex items-center justify-between border-b-2 border-white/20 pb-4">
                <span className="font-mono font-extrabold text-xs uppercase tracking-widest text-white/90">
                  Ringkasan Brief
                </span>
              </div>

              {/* Service & Category Summary */}
              <div className="space-y-4">
                <div>
                  <span className="text-xs font-mono font-bold text-white/70 uppercase tracking-wider block">
                    Bidang & Jasa Terpilih:
                  </span>
                  <div className="font-heading font-black text-xl text-white mt-1">
                    {getBidangTitle(formData.bidang)} &bull; {getJasaName(formData.bidang, formData.jasa)}
                  </div>
                </div>

                <div className="space-y-2 text-xs font-sans bg-white/10 p-3.5 rounded-xl border border-white/20">
                  <div className="flex justify-between">
                    <span className="text-white/70 font-medium">Pemesan:</span>
                    <span className="font-bold text-white truncate max-w-[170px]">
                      {formData.fullName.trim() || "-"}
                    </span>
                  </div>
                  {formData.companyName.trim() && (
                    <div className="flex justify-between">
                      <span className="text-white/70 font-medium">Usaha/Org:</span>
                      <span className="font-bold text-white truncate max-w-[170px]">
                        {formData.companyName.trim()}
                      </span>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span className="text-white/70 font-medium">WhatsApp:</span>
                    <span className="font-bold text-white">
                      {formData.phone.trim() || "-"}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-white/70 font-medium">Target Waktu:</span>
                    <span className="font-bold text-white truncate max-w-[170px]">
                      {getTargetTimeLabel(formData.targetTime)}
                    </span>
                  </div>
                </div>
              </div>

              {/* Desktop Submit Button */}
              <div className="hidden lg:block">
                <Button
                  variant="secondary"
                  size="lg"
                  onClick={handleOrderSubmit}
                  disabled={isSubmitting}
                  className="w-full h-13"
                >
                  <TbBrandWhatsapp className="w-5 h-5 text-brand-purple" />
                  <span>
                    {isSubmitting
                      ? "Mengalihkan ke WA..."
                      : "Kirim Order via WhatsApp"}
                  </span>
                  <TbArrowRight className="w-5 h-5 stroke-[2.5]" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
