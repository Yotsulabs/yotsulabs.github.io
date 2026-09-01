/* eslint-disable @next/next/no-img-element */
"use client";

import { useState, useEffect } from "react";
import { collection, onSnapshot, query, orderBy } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { motion } from "motion/react";
import {
  TbTrendingUp,
  TbArrowUpRight,
  TbBuildingStore,
} from "react-icons/tb";
import SectionHeader from "../../ui/SectionHeader";
import Button from "../../ui/Button";
import EmptyState from "../../ui/EmptyState";
import { CardGridSkeleton } from "../../ui/Skeleton";

interface ProjectItem {
  id?: string;
  title: string;
  companyName?: string;
  category: string;
  tags: string[];
  imageUrl?: string;
  metric?: string;
  metricSub?: string;
  description: string;
  color?: string;
  shadow?: string;
}

export default function PortfolioSection() {
  const [projects, setProjects] = useState<ProjectItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Subscribe to dynamic portfolios collection in Firestore
  useEffect(() => {
    const q = query(collection(db, "portfolios"), orderBy("createdAt", "desc"));
    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        if (!snapshot.empty) {
          const dynamicList: ProjectItem[] = snapshot.docs.map((docSnap, idx) => {
            const data = docSnap.data();
            return {
              id: docSnap.id,
              title: data.title || "",
              companyName: data.companyName || "",
              category: data.category || "Digital Studio",
              tags: Array.isArray(data.tags) ? data.tags : [],
              imageUrl: data.imageUrl || "",
              metric: data.metric || "",
              metricSub: data.metricSub || "",
              description: data.description || "",
              color: "bg-[#7b42f5]",
              shadow:
                idx % 2 === 0
                  ? "shadow-[6px_6px_0px_0px_#7b42f5]"
                  : "shadow-[6px_6px_0px_0px_#13102b]",
            };
          });
          setProjects(dynamicList);
        } else {
          setProjects([]);
        }
        setIsLoading(false);
      },
      (err) => {
        console.error("Firestore portfolio fetch error:", err);
        setProjects([]);
        setIsLoading(false);
      }
    );
    return () => unsubscribe();
  }, []);

  const whatsappUrl = (projectName: string) =>
    `https://wa.me/62895339023888?text=Halo%20Yotsulabs!%20Saya%20tertarik%20dengan%20proyek%20serupa%20${encodeURIComponent(
      projectName
    )}.`;

  return (
    <section id="portofolio" className="py-24 bg-transparent relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header UI Component */}
        <SectionHeader
          title="Proyek Pilihan yang Menghasilkan Dampak Bisnis"
          description="Berikut adalah beberapa gambaran bagaimana pendekatan Technology, Creative, dan Digital Marketing Yotsulabs membantu klien mencapai hasil nyata."
        />

        {isLoading ? (
          <CardGridSkeleton count={3} columns="grid-cols-1 md:grid-cols-3" hasImage />
        ) : projects.length === 0 ? (
          /* Reusable EmptyState Component */
          <EmptyState
            title="Portofolio Proyek Sedang Diperbarui"
            description="Daftar proyek & studi kasus terbaru Yotsulabs sedang dalam proses kurasi. Hubungi tim kami langsung untuk melihat portofolio proyek lengkap!"
            actionText="Konsultasi Proyek via WA"
            actionHref="https://wa.me/62895339023888?text=Halo%20Yotsulabs!%20Saya%20ingin%20melihat%20studi%20kasus%20%26%20portofolio%20proyek%20terbaru."
            actionTarget="_blank"
            actionRel="noopener noreferrer"
            actionIcon={TbArrowUpRight}
          />
        ) : (
          /* Project Cards Grid */
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {projects.map((project, idx) => (
              <motion.div
                key={project.id || idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.15 }}
                className={`bg-white border-3 border-[#13102b] rounded-2xl p-6 sm:p-8 ${
                  project.shadow || "shadow-[6px_6px_0px_0px_#7b42f5]"
                } flex flex-col justify-between hover:-translate-y-1 transition-all group overflow-hidden`}
              >
                <div>
                  {/* Optional Preview Image */}
                  {project.imageUrl && (
                    <div className="-mx-6 -mt-6 sm:-mx-8 sm:-mt-8 mb-6 border-b-3 border-[#13102b] overflow-hidden bg-slate-100 h-48">
                      <img
                        src={project.imageUrl}
                        alt={project.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                  )}

                  {/* Category & Badge */}
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-[11px] font-mono font-extrabold text-purple-900 uppercase tracking-wider bg-[#f3f0ff] px-3 py-1 border-2 border-[#13102b] rounded-lg">
                      {project.category}
                    </span>
                    <div
                      className={`w-3.5 h-3.5 rounded-full ${
                        project.color || "bg-[#7b42f5]"
                      } border-2 border-[#13102b]`}
                    />
                  </div>

                  <h3 className="font-heading font-black text-2xl text-[#13102b] group-hover:text-[#7b42f5] transition-colors mb-1">
                    {project.title}
                  </h3>

                  {project.companyName && (
                    <div className="flex items-center gap-1.5 text-xs font-mono font-bold text-[#7b42f5] mb-3">
                      <TbBuildingStore className="w-4 h-4" />
                      <span>{project.companyName}</span>
                    </div>
                  )}

                  <p className="text-slate-700 text-sm leading-relaxed mb-6 font-sans font-medium">
                    {project.description}
                  </p>

                  {/* Metric Highlight Box */}
                  {project.metric && (
                    <div className="p-4 bg-[#f3f0ff] border-2 border-[#13102b] rounded-xl shadow-[3px_3px_0px_0px_#7b42f5] mb-6">
                      <div className="flex items-center gap-2 text-[#7b42f5] font-heading font-black text-lg">
                        <TbTrendingUp className="w-5 h-5 stroke-[2.5]" />
                        <span>{project.metric}</span>
                      </div>
                      {project.metricSub && (
                        <span className="text-xs font-mono font-bold text-slate-700 mt-0.5 block">
                          {project.metricSub}
                        </span>
                      )}
                    </div>
                  )}

                  {/* Tag Pills */}
                  {Array.isArray(project.tags) && project.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-8">
                      {project.tags.map((tag, tIdx) => (
                        <span
                          key={tIdx}
                          className="text-xs font-mono font-bold text-slate-800 bg-[#f9f8fd] px-2.5 py-1 rounded-md border border-slate-300"
                        >
                          #{tag}
                        </span>
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
                  className="w-full justify-between"
                >
                  <span>Diskusi Proyek Serupa</span>
                  <TbArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform stroke-[2.5]" />
                </Button>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
