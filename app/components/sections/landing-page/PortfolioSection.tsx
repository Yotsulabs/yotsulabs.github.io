"use client";

import Image from "next/image";
import { motion } from "motion/react";
import {
  TbTrendingUp,
  TbArrowUpRight,
  TbBuildingStore,
} from "react-icons/tb";
import SectionHeader from "../../ui/SectionHeader";
import Button from "../../ui/Button";
import Card from "../../ui/Card";
import Badge from "../../ui/Badge";
import EmptyState from "../../ui/EmptyState";
import { CardGridSkeleton } from "../../ui/Skeleton";
import { PortfolioDoc } from "@/types";
import { useFirestoreCollection } from "@/hooks/useFirestoreCollection";
import { getWhatsAppLink } from "@/lib/whatsapp";
import { WHATSAPP_URL } from "@/lib/siteData";

export default function PortfolioSection() {
  const { data: projects, isLoading } = useFirestoreCollection<PortfolioDoc>("portfolios");

  const whatsappUrl = (projectName: string) =>
    getWhatsAppLink(
      "62895339023888",
      `Halo Yotsulabs! Saya tertarik dengan proyek serupa ${projectName}.`
    );

  return (
    <section id="portofolio" className="py-24 bg-transparent relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header UI Component */}
        <SectionHeader
          title="Proyek Pilihan yang Menghasilkan Dampak Bisnis"
          description="Lihat bagaimana solusi Digital dari Yotsulabs diterapkan untuk membantu bisnis berkembang dan mencapai hasil yang nyata."
        />

        {isLoading ? (
          <CardGridSkeleton count={3} columns="grid-cols-1 md:grid-cols-3" hasImage />
        ) : projects.length === 0 ? (
          /* Reusable EmptyState Component */
          <EmptyState
            title="Portofolio Proyek Sedang Diperbarui"
            description="Daftar proyek & studi kasus terbaru Yotsulabs sedang dalam proses kurasi. Hubungi tim kami langsung untuk melihat portofolio proyek lengkap!"
            actionText="Konsultasi Proyek via WA"
            actionHref={WHATSAPP_URL}
            actionTarget="_blank"
            actionRel="noopener noreferrer"
            actionIcon={TbArrowUpRight}
          />
        ) : (
          /* Project Cards Grid using Card component */
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {projects.map((project, idx) => (
              <motion.div
                key={project.id || idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.15 }}
                className="hover:-translate-y-1 transition-all group flex flex-col h-full"
              >
                <Card
                  variant="white"
                  shadowVariant={idx % 2 === 0 ? "purple" : "dark"}
                  className="flex flex-col justify-between h-full overflow-hidden"
                >
                  <div>
                    {/* Preview Image Thumbnail using Next.js Image */}
                    {project.imageUrl && (
                      <div className="-mx-6 -mt-6 sm:-mx-8 sm:-mt-8 mb-6 border-b-3 border-brand-ink overflow-hidden bg-slate-100 relative h-48">
                        <Image
                          src={project.imageUrl}
                          alt={project.title}
                          fill
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                          className="object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                    )}

                    {/* Category Badge Component */}
                    <div className="mb-4">
                      <Badge variant="soft" size="sm">
                        {project.category}
                      </Badge>
                    </div>

                    <h3 className="font-heading font-black text-2xl text-brand-ink group-hover:text-brand-purple transition-colors mb-1">
                      {project.title}
                    </h3>

                    {project.companyName && (
                      <div className="flex items-center gap-1.5 text-xs font-sans font-bold text-brand-purple mb-3">
                        <TbBuildingStore className="w-4 h-4" />
                        <span>{project.companyName}</span>
                      </div>
                    )}

                    <p className="text-slate-700 text-sm leading-relaxed mb-6 font-sans font-medium">
                      {project.description}
                    </p>

                    {/* Metric Highlight Box */}
                    {project.metric && (
                      <div className="p-4 bg-brand-purple-light border-2 border-brand-ink rounded-xl shadow-neo-purple mb-6">
                        <div className="flex items-center gap-2 text-brand-purple font-heading font-black text-lg">
                          <TbTrendingUp className="w-5 h-5 stroke-[2.5]" />
                          <span>{project.metric}</span>
                        </div>
                        {project.metricSub && (
                          <span className="text-xs font-sans font-medium text-slate-600 mt-0.5 block">
                            {project.metricSub}
                          </span>
                        )}
                      </div>
                    )}

                    {/* Tech Stack Badges using Badge Component */}
                    {Array.isArray(project.tags) && project.tags.length > 0 && (
                      <div className="flex flex-wrap gap-2 mb-8">
                        {project.tags.map((tag, tIdx) => (
                          <Badge key={tIdx} variant="white" size="sm">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Action Button UI Component */}
                  <Button
                    variant="primary"
                    href={whatsappUrl(project.title)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full justify-between mt-auto"
                  >
                    <span>Diskusi Proyek Serupa</span>
                    <TbArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform stroke-[2.5]" />
                  </Button>
                </Card>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
