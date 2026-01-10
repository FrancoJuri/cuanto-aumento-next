"use client";

import { memo } from "react";
import ParticlesBackground from "../common/ParticlesBackground";

export interface CategoryInfo {
  name: string;
  slug: string;
  description?: string;
  icon?: string;
  productCount?: number;
}

interface CategoryHeroProps {
  category: CategoryInfo;
}

const CategoryHero = memo(function CategoryHero({ category }: CategoryHeroProps) {
  return (
    <section className="relative min-h-[25vh] md:min-h-[30vh] py-12 md:py-16 flex items-center justify-center overflow-hidden">
      {/* Base Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-100 via-blue-50/50 to-slate-100 -z-30" />

      {/* Background Gradient Blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none -z-20">
        <div className="absolute -top-[10%] -left-[10%] w-72 h-72 bg-gradient-to-br from-sky-400/40 to-blue-400/40 rounded-full blur-3xl opacity-80" />
        <div className="absolute top-[20%] -right-[5%] w-64 h-64 bg-gradient-to-bl from-amber-300/30 to-yellow-400/30 rounded-full blur-3xl opacity-80" />
        <div className="absolute -bottom-[10%] left-[30%] w-96 h-96 bg-gradient-to-tr from-blue-300/40 to-sky-300/40 rounded-full blur-3xl opacity-80" />
      </div>

      <ParticlesBackground />

      {/* Category Content */}
      <div className="relative z-10 w-full max-w-2xl mx-4 sm:mx-6 lg:mx-8 text-center">
        <div className="liquid-glass-container rounded-2xl p-6 sm:p-8 bg-white/80 backdrop-blur-xl border border-white/50 shadow-xl">
          {/* Icon */}
          {category.icon && (
            <span className="text-4xl mb-3 block">{category.icon}</span>
          )}

          {/* Category Name */}
          <h1 className="font-[family-name:var(--font-outfit)] text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-3">
            {category.name}
          </h1>

          {/* Description */}
          {category.description && (
            <p className="text-gray-600 text-sm sm:text-base max-w-md mx-auto">
              {category.description}
            </p>
          )}

          {/* Product Count Badge */}
          {category.productCount !== undefined && (
            <div className="mt-4 inline-flex items-center px-3 py-1 rounded-full bg-brand-primary/10 text-brand-primary text-sm font-medium">
              {category.productCount} producto{category.productCount !== 1 ? "s" : ""}
            </div>
          )}
        </div>
      </div>
    </section>
  );
});

export default CategoryHero;
