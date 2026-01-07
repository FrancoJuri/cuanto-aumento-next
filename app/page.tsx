"use client";

import { useState, useCallback } from "react";
import {
  HeroSection,
  CategoriesSection,
  ProductGrid,
  Footer,
  Product,
} from "@/components";

// Mock data for products
const mockProducts: Product[] = [
  {
    id: "1",
    name: "Casancrem 290 G",
    brand: "CASANCREM",
    supermarketCount: 7,
    slug: "casancrem-290g",
  },
  {
    id: "2",
    name: "Dulce De Leche Clásico La Serenísima Con Calcio 400 G",
    brand: "LA SERENÍSIMA",
    supermarketCount: 7,
    slug: "dulce-de-leche-clasico-la-serenisima-400g",
  },
  {
    id: "3",
    name: "Leche Descremada La Serenísima 1 L",
    brand: "LA SERENÍSIMA",
    supermarketCount: 6,
    slug: "leche-descremada-la-serenisima-1l",
  },
  {
    id: "4",
    name: "Leche Descremada La Serenísima Protein Larga Vida 1l",
    brand: "LA SERENÍSIMA",
    supermarketCount: 5,
    slug: "leche-descremada-protein-1l",
  },
  {
    id: "5",
    name: "Leche En Polvo La Serenísima Descremada 400 G",
    brand: "LA SERENÍSIMA",
    supermarketCount: 4,
    slug: "leche-en-polvo-descremada-400g",
  },
  {
    id: "6",
    name: "Leche En Polvo Svelty Descremada Extra Calcio 750 G",
    brand: "SVELTY",
    supermarketCount: 7,
    slug: "leche-en-polvo-svelty-750g",
  },
  {
    id: "7",
    name: "Leche Larga Vida Parcialmente Descremada Liviana 1% 1l",
    brand: "LA SERENÍSIMA",
    supermarketCount: 6,
    slug: "leche-larga-vida-descremada-1l",
  },
  {
    id: "8",
    name: "Manteca La Serenísima 200 G",
    brand: "LA SERENÍSIMA",
    supermarketCount: 6,
    slug: "manteca-la-serenisima-200g",
  },
  {
    id: "9",
    name: "Queso Reggianito Rallado La Serenísima 130 G",
    brand: "LA SERENÍSIMA",
    supermarketCount: 5,
    slug: "queso-reggianito-rallado-130g",
  },
  {
    id: "10",
    name: "Yogur Bebible Frutilla Yogurísimo 900 G",
    brand: "YOGURÍSIMO",
    supermarketCount: 4,
    slug: "yogur-bebible-frutilla-900g",
  },
  {
    id: "11",
    name: "Cerveza Quilmes Clásica 1L",
    brand: "QUILMES",
    supermarketCount: 5,
    slug: "cerveza-quilmes-clasica-1l",
  },
  {
    id: "12",
    name: "Pepino X Kg",
    brand: "SIN MARCA",
    supermarketCount: 7,
    slug: "pepino-x-kg",
  },
  {
    id: "13",
    name: "Banana X Kg",
    brand: "SIN MARCA",
    supermarketCount: 6,
    slug: "banana-x-kg",
  },
  {
    id: "14",
    name: "Yerba Mate Playadito 1kg",
    brand: "PLAYADITO",
    supermarketCount: 7,
    slug: "yerba-mate-playadito-1kg",
  },
  {
    id: "15",
    name: "Fideos Marolio Mostachol 500g",
    brand: "MAROLIO",
    supermarketCount: 6,
    slug: "fideos-marolio-mostachol-500g",
  },
];

export default function Home() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("todos");
  const [currentPage, setCurrentPage] = useState(1);

  const handleCategoryChange = useCallback((slug: string) => {
    setActiveCategory(slug);
    setCurrentPage(1);
  }, []);

  const handlePageChange = useCallback((page: number) => {
    setCurrentPage(page);
  }, []);

  return (
    <div className="min-h-screen bg-bg-main">
      {/* Hero Section */}
      <HeroSection searchQuery={searchQuery} setSearchQuery={setSearchQuery} />

      {/* Categories Section */}
      <CategoriesSection
        activeCategory={activeCategory}
        onCategoryChange={handleCategoryChange}
        isSticky={true}
      />

      {/* Products Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ProductGrid
          products={mockProducts}
          currentPage={currentPage}
          totalPages={2}
          onPageChange={handlePageChange}
          searchQuery={searchQuery}
        />
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
}
