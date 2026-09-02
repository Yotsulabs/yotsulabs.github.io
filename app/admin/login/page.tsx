"use client";

import React, { useState, useSyncExternalStore, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { loginAdmin, isAdminLoggedIn } from "@/lib/auth";
import {
  TbLock,
  TbUser,
  TbEye,
  TbEyeOff,
  TbAlertTriangle,
  TbLoader2,
} from "react-icons/tb";
import Button from "@/app/components/ui/Button";
import Input from "@/app/components/ui/Input";

const emptySubscribe = () => () => {};

function useHasMounted() {
  return useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false
  );
}

export default function AdminLoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const router = useRouter();
  const isMounted = useHasMounted();

  useEffect(() => {
    if (!isMounted) return;
    if (isAdminLoggedIn()) {
      router.push("/admin");
    }
  }, [isMounted, router]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!username.trim() || !password.trim()) {
      setError("Username dan password harus diisi.");
      return;
    }

    setIsLoading(true);
    try {
      const success = await loginAdmin(username, password);
      if (success) {
        router.push("/admin");
      } else {
        setError("Username atau password salah!");
      }
    } catch (err) {
      console.error(err);
      setError("Terjadi kesalahan saat mencoba login.");
    } finally {
      setIsLoading(false);
    }
  };

  if (!isMounted) {
    return (
      <div className="min-h-screen bg-brand-bg-soft flex items-center justify-center font-sans">
        <div className="w-8 h-8 rounded-full border-4 border-brand-purple border-t-transparent animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-grid-pattern flex items-center justify-center p-4 sm:p-6 font-sans text-brand-ink relative overflow-hidden">
      <div className="w-full max-w-md bg-white border-3 border-brand-ink rounded-3xl p-8 sm:p-10 shadow-neo-purple-lg relative z-10 space-y-6">
        {/* Header Logo & Title */}
        <div className="flex flex-col items-center text-center">
          <h1 className="text-2xl font-heading font-black text-brand-ink tracking-tight">
            Admin Yotsulabs
          </h1>
          <p className="text-xs text-slate-600 font-medium mt-1">
            Login untuk mengakses dashboard admin
          </p>
        </div>

        {/* Error Alert */}
        {error && (
          <div className="p-3.5 rounded-xl bg-rose-50 border-2 border-rose-200 text-rose-700 text-xs font-semibold flex items-center gap-2.5">
            <TbAlertTriangle className="w-5 h-5 shrink-0 text-rose-600 stroke-[2.5]" />
            <span>{error}</span>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleLogin} className="space-y-4">
          <Input
            label="Username *"
            type="text"
            required
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Masukkan username..."
            icon={TbUser}
          />

          <div className="space-y-1 relative">
            <label className="block font-heading font-extrabold text-xs uppercase tracking-wider text-slate-700">
              Password *
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Masukkan password..."
                className="w-full h-11 pl-10 pr-10 bg-white border-2 border-brand-ink rounded-xl text-sm font-sans font-medium text-brand-ink placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-purple"
              />
              <TbLock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-500 hover:text-brand-ink transition-colors cursor-pointer"
                aria-label={showPassword ? "Sembunyikan password" : "Tampilkan password"}
                tabIndex={-1}
              >
                {showPassword ? (
                  <TbEyeOff className="w-4 h-4" />
                ) : (
                  <TbEye className="w-4 h-4" />
                )}
              </button>
            </div>
          </div>

          <Button
            variant="primary"
            type="submit"
            disabled={isLoading}
            className="w-full justify-center h-11 mt-2 text-sm font-extrabold"
          >
            {isLoading ? (
              <span className="flex items-center gap-2">
                <TbLoader2 className="w-5 h-5 animate-spin" /> Memeriksa Login...
              </span>
            ) : (
              "Masuk ke Dashboard"
            )}
          </Button>
        </form>

        <div className="text-center border-t-2 border-slate-100 pt-4">
          <Link
            href="/"
            className="text-xs font-bold text-slate-500 hover:text-brand-purple hover:underline transition-colors"
          >
            &larr; Kembali ke Website Utama
          </Link>
        </div>
      </div>
    </div>
  );
}
