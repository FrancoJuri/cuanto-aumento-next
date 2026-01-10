"use client";

import { useCallback } from "react";

interface Category {
  name: string;
  slug: string;
  icon: string | null;
  color?: string;
}

interface CategoriesSectionProps {
  activeCategory: string;
  onCategoryChange?: (slug: string) => void;
  isSticky?: boolean;
}

const categories: Category[] = [
  { name: "Todos", slug: "todos", icon: null },
  { name: "Precios en baja", slug: "precios-en-baja", icon: "📉", color: "text-blue-600" },
  { name: "Precios en alza", slug: "precios-en-alza", icon: "📈", color: "text-orange-600" },
  { name: "Bebidas", slug: "bebidas", icon: null },
  { name: "Lacteos", slug: "lacteos", icon: null },
  { name: "Almacén", slug: "almacen", icon: null },
  { name: "Infusiones", slug: "infusiones", icon: null },
  { name: "Frutas y Verduras", slug: "frutas-y-verduras", icon: null },
  { name: "Panadería", slug: "panaderia", icon: null },
  { name: "Limpieza", slug: "limpieza", icon: null },
];

const CategoriesSection = ({
  activeCategory,
  onCategoryChange,
  isSticky = true,
}: CategoriesSectionProps) => {
  const handleCategoryClick = useCallback(
    (slug: string) => {
      onCategoryChange?.(slug);
    },
    [onCategoryChange]
  );

  return (
    <div
      className={`bg-white border-b border-gray-200 ${
        isSticky ? "sticky top-0 z-40" : ""
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex space-x-2 py-4 overflow-x-auto scrollbar-hide">
          {categories.map((category) => {
            const isActive =
              activeCategory === category.slug ||
              (!activeCategory && category.slug === "todos");

            return (
              <button
                key={category.slug}
                onClick={() => handleCategoryClick(category.slug)}
                className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors duration-200 ${
                  isActive
                    ? "bg-gray-900 text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                <span className="flex items-center gap-1">
                  {category.icon && <span>{category.icon}</span>}
                  <span className={category.color || ""}>{category.name}</span>
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default CategoriesSection;
