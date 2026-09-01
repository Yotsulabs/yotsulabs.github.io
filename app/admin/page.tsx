"use client";

import React, { useState, useEffect, useSyncExternalStore, useCallback } from "react";
import { useRouter } from "next/navigation";
import { getAdminUser, isAdminLoggedIn, logoutAdmin } from "@/lib/auth";
import AdminHeader from "../components/sections/admin/AdminHeader";
import OrdersSection from "../components/sections/admin/OrdersSection";
import PortfoliosSection from "../components/sections/admin/PortfoliosSection";
import ServicesSection from "../components/sections/admin/ServicesSection";
import { Skeleton, TableSkeleton } from "../components/ui/Skeleton";

const emptySubscribe = () => () => { };

function useHasMounted() {
  return useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false
  );
}

export default function AdminDashboardPage() {
  const router = useRouter();
  const isMounted = useHasMounted();

  const [isAuthenticated] = useState<boolean | null>(() => {
    if (typeof window === "undefined") return null;
    return isAdminLoggedIn();
  });

  const [activeAdmin] = useState<string>(() => {
    if (typeof window === "undefined") return "";
    return getAdminUser() || "";
  });

  const [activeTab, setActiveTab] = useState<"orders" | "portfolios" | "services">("orders");
  const [ordersCount, setOrdersCount] = useState(0);
  const [portfoliosCount, setPortfoliosCount] = useState(0);
  const [servicesCount, setServicesCount] = useState(0);

  const handleOrdersCountChange = useCallback((count: number) => {
    setOrdersCount(count);
  }, []);

  const handlePortfoliosCountChange = useCallback((count: number) => {
    setPortfoliosCount(count);
  }, []);

  const handleServicesCountChange = useCallback((count: number) => {
    setServicesCount(count);
  }, []);

  // Redirect if unauthenticated after mount
  useEffect(() => {
    if (isMounted && isAuthenticated === false) {
      router.push("/admin/login");
    }
  }, [isMounted, isAuthenticated, router]);

  const handleLogout = () => {
    logoutAdmin();
    router.push("/admin/login");
  };

  // Render Skeleton Loader until mounted & authenticated on client
  if (!isMounted || isAuthenticated === null || !isAuthenticated) {
    return (
      <main className="min-h-screen bg-grid-pattern text-[#13102b] flex flex-col font-sans">
        <section className="py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full flex-grow space-y-6">
          <div className="bg-white border-3 border-[#13102b] rounded-2xl p-6 shadow-[6px_6px_0px_0px_#13102b] space-y-4">
            <div className="flex items-center justify-between">
              <Skeleton className="h-8 w-48" />
              <Skeleton className="h-10 w-28 rounded-xl" />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
              <Skeleton className="h-20 w-full" />
              <Skeleton className="h-20 w-full" />
              <Skeleton className="h-20 w-full" />
            </div>
          </div>
          <TableSkeleton rows={4} />
        </section>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-grid-pattern text-[#13102b] flex flex-col font-sans selection:bg-[#7b42f5] selection:text-white">
      <section className="py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full flex-grow">
        <AdminHeader
          activeAdmin={activeAdmin}
          onLogout={handleLogout}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          ordersCount={ordersCount}
          portfoliosCount={portfoliosCount}
          servicesCount={servicesCount}
        />

        {activeTab === "orders" && (
          <OrdersSection
            isAuthenticated={!!isAuthenticated}
            onCountChange={handleOrdersCountChange}
          />
        )}

        {activeTab === "portfolios" && (
          <PortfoliosSection
            isAuthenticated={!!isAuthenticated}
            onCountChange={handlePortfoliosCountChange}
          />
        )}

        {activeTab === "services" && (
          <ServicesSection
            isAuthenticated={!!isAuthenticated}
            onCountChange={handleServicesCountChange}
          />
        )}
      </section>
    </main>
  );
}
