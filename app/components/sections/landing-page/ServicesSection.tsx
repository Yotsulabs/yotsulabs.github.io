"use client";

import React, { useState, useEffect } from "react";
import { collection, onSnapshot, query, orderBy } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { motion } from "motion/react";
import {
  TbCode,
  TbPalette,
  TbTarget,
  TbCheck,
  TbArrowRight,
} from "react-icons/tb";
import SectionHeader from "../../ui/SectionHeader";
import Button from "../../ui/Button";
import EmptyState from "../../ui/EmptyState";
import { CardGridSkeleton } from "../../ui/Skeleton";

interface ServiceItem {
  id: string;
  category: "tech" | "creative" | "marketing";
  title: string;
  description: string;
  icon: React.ElementType;
  badge: string;
  color: string;
  textColor: string;
  shadow: string;
  features: string[];
}

export default function ServicesSection() {
  const [activeTab, setActiveTab] = useState<"all" | "tech" | "creative" | "marketing">("all");
  const [services, setServices] = useState<ServiceItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Subscribe to dynamic services collection in Firestore
  useEffect(() => {
    const q = query(collection(db, "services"), orderBy("createdAt", "desc"));
    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        if (!snapshot.empty) {
          const dynamicList: ServiceItem[] = snapshot.docs.map((docSnap, idx) => {
            const data = docSnap.data();
            const p = data.pillar || "technology";
            const catMap: Record<string, "tech" | "creative" | "marketing"> = {
              technology: "tech",
              tech: "tech",
              creative: "creative",
              marketing: "marketing",
            };
            const category = catMap[p] || "tech";

            const iconMap: Record<string, React.ElementType> = {
              tech: TbCode,
              creative: TbPalette,
              marketing: TbTarget,
            };

            const badgeMap: Record<string, string> = {
              tech: "Tech Pillar",
              creative: "Creative Pillar",
              marketing: "Marketing Pillar",
            };

            let features: string[] = [];
            if (Array.isArray(data.items) && data.items.length > 0) {
              features = data.items
                .map((it: { title?: string }) => it.title || null)
                .filter(Boolean) as string[];
            } else {
              features = [
                data.item1Title || null,
                data.item2Title || null,
                data.item3Title || null,
              ].filter(Boolean) as string[];
            }

            return {
              id: docSnap.id,
              category: category,
              title: data.title || "Layanan Kustom",
              description: data.description || "Solusi digital sesuai kebutuhan bisnis.",
              icon: iconMap[category] || TbCode,
              badge: badgeMap[category] || "Digital Pillar",
              color: idx % 2 === 0 ? "bg-[#7b42f5]" : "bg-white",
              textColor: idx % 2 === 0 ? "text-white" : "text-[#13102b]",
              shadow: idx % 2 === 0 ? "shadow-[6px_6px_0px_0px_#7b42f5]" : "shadow-[6px_6px_0px_0px_#13102b]",
              features: features.length > 0 ? features : ["Konsultasi Problem-First", "Desain & Implementasi"],
            };
          });
          setServices(dynamicList);
        } else {
          setServices([]);
        }
        setIsLoading(false);
      },
      (err) => {
        console.error("Firestore service fetch error:", err);
        setServices([]);
        setIsLoading(false);
      }
    );
    return () => unsubscribe();
  }, []);

  const filteredServices =
    activeTab === "all"
      ? services
      : services.filter((item) => item.category === activeTab);

  const orderUrl = (serviceTitle: string) =>
    `/orders?service=${encodeURIComponent(serviceTitle)}`;

  return (
    <section id="layanan" className="py-24 bg-transparent relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header UI Component */}
        <SectionHeader
          title="Ekosistem Solusi Digital Terintegrasi"
          description="Pilih salah satu dari 3 pilar layanan utama Yotsulabs atau gabungkan ketiganya untuk akselerasi pertumbuhan bisnis Anda secara menyeluruh."
        />

        {/* Pillar Filter Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-3 mb-16">
          {[
            { id: "all", label: "Semua Layanan", icon: null },
            { id: "tech", label: "Technology", icon: TbCode },
            { id: "creative", label: "Creative", icon: TbPalette },
            { id: "marketing", label: "Digital Marketing", icon: TbTarget },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() =>
                  setActiveTab(tab.id as "all" | "tech" | "creative" | "marketing")
                }
                className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-heading font-extrabold text-sm border-2 transition-all cursor-pointer ${
                  isActive
                    ? "bg-[#7b42f5] text-white border-[#13102b] shadow-[3px_3px_0px_0px_#13102b]"
                    : "bg-white text-slate-800 border-[#13102b] hover:bg-[#f3f0ff] shadow-[2px_2px_0px_0px_#13102b]"
                }`}
              >
                {Icon && <Icon className="w-4 h-4 stroke-[2.5]" />}
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {isLoading ? (
          <CardGridSkeleton count={3} columns="grid-cols-1 md:grid-cols-3" />
        ) : filteredServices.length === 0 ? (
          /* Reusable EmptyState Component */
          <EmptyState
            title="Solusi & Layanan Kustom On-Demand"
            description="Daftar paket layanan sedang diselaraskan. Kami siap membantu kebutuhan proyek unik bisnis Anda melalui konsultasi langsung!"
            actionText="Konsultasi & Order Kustom"
            actionHref="/orders"
            actionIcon={TbArrowRight}
          />
        ) : (
          /* Services Grid */
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {filteredServices.map((service, idx) => {
              const IconComponent = service.icon;
              const isPurpleBg = service.color === "bg-[#7b42f5]";

              return (
                <motion.div
                  key={service.id || idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: idx * 0.1 }}
                  className={`border-3 border-[#13102b] rounded-2xl p-6 sm:p-8 ${service.color} ${service.shadow} flex flex-col justify-between hover:-translate-y-1 transition-all group`}
                >
                  <div>
                    {/* Top Badge & Icon */}
                    <div className="flex items-center justify-between mb-6">
                      <span
                        className={`text-xs font-mono font-extrabold uppercase tracking-wider px-3 py-1 border-2 border-[#13102b] rounded-lg ${
                          isPurpleBg
                            ? "bg-white text-[#13102b]"
                            : "bg-[#f3f0ff] text-purple-900"
                        }`}
                      >
                        {service.badge}
                      </span>

                      <div
                        className={`w-12 h-12 rounded-xl border-2 border-[#13102b] flex items-center justify-center ${
                          isPurpleBg
                            ? "bg-white text-[#7b42f5]"
                            : "bg-[#7b42f5] text-white"
                        } shadow-[2px_2px_0px_0px_#13102b]`}
                      >
                        <IconComponent className="w-6 h-6 stroke-[2.5]" />
                      </div>
                    </div>

                    {/* Title & Description */}
                    <h3
                      className={`font-heading font-black text-2xl mb-3 tracking-tight ${service.textColor}`}
                    >
                      {service.title}
                    </h3>

                    <p
                      className={`text-sm leading-relaxed mb-6 font-sans font-medium ${
                        isPurpleBg ? "text-purple-100" : "text-slate-700"
                      }`}
                    >
                      {service.description}
                    </p>

                    {/* Sub-services / Features List */}
                    <div className="space-y-3 mb-8 pt-4 border-t-2 border-[#13102b]/20">
                      {service.features.map((feature, fIdx) => (
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
                            {feature}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* CTA Button UI Component */}
                  <Button
                    variant={isPurpleBg ? "secondary" : "primary"}
                    href={orderUrl(service.title)}
                    className="w-full justify-between"
                  >
                    <span>Pesan Jasa Ini</span>
                    <TbArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform stroke-[2.5]" />
                  </Button>
                </motion.div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
