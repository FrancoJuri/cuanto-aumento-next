"use client";

import { Search } from "lucide-react";
import { useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import ParticlesBackground from "../common/ParticlesBackground";

const HeroSection = () => {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearchChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setSearchQuery(e.target.value);
    },
    []
  );

  const handleSearchSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      if (searchQuery.trim()) {
        router.push(`/buscar?q=${encodeURIComponent(searchQuery.trim())}`);
      }
    },
    [searchQuery, router]
  );

  return (
    <section className="relative min-h-[60vh] md:min-h-[70vh] flex items-center justify-center overflow-hidden">
      {/* Base Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-100 via-blue-50/50 to-slate-100 -z-30" />

      {/* Background Gradient Blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none -z-20">
        <div className="absolute -top-[10%] -left-[10%] w-96 h-96 bg-gradient-to-br from-sky-400/40 to-blue-400/40 rounded-full blur-3xl opacity-80" />
        <div className="absolute top-[20%] -right-[5%] w-80 h-80 bg-gradient-to-bl from-amber-300/30 to-yellow-400/30 rounded-full blur-3xl opacity-80" />
        <div className="absolute -bottom-[10%] left-[30%] w-[35rem] h-[35rem] bg-gradient-to-tr from-blue-300/40 to-sky-300/40 rounded-full blur-3xl opacity-80" />
      </div>

      <ParticlesBackground />

      {/* Main Hero Card */}
      <div className="relative z-10 w-full max-w-xl mx-4 sm:mx-6 lg:mx-8 pointer-events-none">
        <div className="liquid-glass-container rounded-3xl p-8 sm:p-10 md:p-12 bg-white/80 backdrop-blur-xl border border-white/50 shadow-2xl pointer-events-auto transition-all duration-300">
          {/* Title */}
          <h1 className="font-[family-name:var(--font-outfit)] text-4xl sm:text-5xl md:text-6xl font-bold text-center text-gray-900 mb-6">
            ¿Cuanto Aumento?
          </h1>

          {/* Search Input */}
          <form onSubmit={handleSearchSubmit} className="relative mb-6">
            <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
              <Search className="w-5 h-5 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Busca un producto..."
              value={searchQuery}
              onChange={handleSearchChange}
              className="w-full pl-12 pr-4 py-4 rounded-xl bg-white/90 border border-gray-200 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-brand-primary/50 focus:border-brand-primary transition-all duration-200"
            />
          </form>

          {/* Subtitle */}
          <p className="text-center text-gray-600 text-sm sm:text-base">
            Descubre cuánto subieron los
            <br />
            precios de cada producto cada día.
          </p>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
