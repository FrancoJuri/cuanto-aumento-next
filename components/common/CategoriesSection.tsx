"use client";

import { useCallback, useState } from "react";


import { useFavorites } from "@/context/FavoritesContext";
import { CATEGORY_CONFIG } from "@/lib/categories";
import Modal from "@/components/common/Modal";

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
  ...Object.entries(CATEGORY_CONFIG).map(([slug, config]) => ({
    name: config.name,
    slug,
    icon: config.icon || null,
  })),
];

const CategoriesSection = ({
  activeCategory,
  onCategoryChange,
  isSticky = true,
}: CategoriesSectionProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { favorites, toggleSidebar } = useFavorites();

  const handleCategoryClick = useCallback(
    (slug: string) => {
      onCategoryChange?.(slug);
      setIsModalOpen(false);
    },
    [onCategoryChange]
  );

  // Show "Todos" + first 5 categories directly
  const visibleCategories = categories.slice(0, 8);

  return (
    <>
      <div
        className={`bg-white border-b border-gray-200 ${
          isSticky ? "sticky top-0 z-40" : ""
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          <div className="flex space-x-2 py-4 overflow-x-auto scrollbar-hide flex-1">
            {visibleCategories.map((category) => {
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

            <button
              onClick={() => setIsModalOpen(true)}
              className="px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap bg-gray-100 text-gray-700 hover:bg-gray-200 transition-colors duration-200"
            >
              Ver más...
            </button>
          </div>

          <button
            onClick={toggleSidebar}
            className="flex-shrink-0 p-2 text-gray-500 hover:text-brand-primary transition-colors duration-200 hover:bg-gray-50 rounded-lg relative ml-2"
            aria-label="Ver favoritos"
          >
            {favorites.length > 0 && (
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-brand-primary rounded-full"></span>
            )}
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"
              />
            </svg>
          </button>
        </div>
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Todas las categorías"
      >
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {categories.map((category) => {
            const isActive =
              activeCategory === category.slug ||
              (!activeCategory && category.slug === "todos");

            return (
              <button
                key={category.slug}
                onClick={() => handleCategoryClick(category.slug)}
                className={`p-3 rounded-xl border text-sm font-medium transition-all duration-200 flex flex-col items-center gap-2 text-center cursor-pointer ${
                  isActive
                    ? "bg-gray-900 border-gray-900 text-white shadow-md ring-2 ring-gray-900 ring-offset-2"
                    : "bg-white border-gray-200 text-gray-700 hover:border-gray-300 hover:bg-gray-50"
                } ${category.slug === 'todos' ? 'justify-center h-full' : ''}`}
              >
                {category.icon && <span className="text-2xl">{category.icon}</span>}
                <span className={category.color || ""}>{category.name}</span>
              </button>
            );
          })}
        </div>
      </Modal>
    </>
  );
};

export default CategoriesSection;
