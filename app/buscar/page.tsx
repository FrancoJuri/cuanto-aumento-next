"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useState, useCallback, useEffect, Suspense } from "react";
import {
  Header,
  CategoriesSection,
  ProductGrid,
  Footer,
  Product,
} from "@/components";

// Mock data - will be replaced with API
const mockProducts: Product[] = [
  { id: "1", name: "Casancrem 290 G", brand: "CASANCREM", supermarketCount: 7, slug: "casancrem-290g" },
  { id: "2", name: "Dulce De Leche Clásico La Serenísima Con Calcio 400 G", brand: "LA SERENÍSIMA", supermarketCount: 7, slug: "dulce-de-leche-clasico" },
  { id: "3", name: "Leche Descremada La Serenísima 1 L", brand: "LA SERENÍSIMA", supermarketCount: 6, slug: "leche-descremada-1l" },
  { id: "4", name: "Gaseosa Coca-Cola Sabor Original 2.25 Lt", brand: "COCA COLA", supermarketCount: 7, slug: "gaseosa-coca-cola-2-25lt" },
  { id: "5", name: "Leche En Polvo La Serenísima Descremada 400 G", brand: "LA SERENÍSIMA", supermarketCount: 4, slug: "leche-polvo-400g" },
  { id: "6", name: "Yerba Mate Playadito 1kg", brand: "PLAYADITO", supermarketCount: 7, slug: "yerba-mate-playadito-1kg" },
  { id: "7", name: "Manteca La Serenísima 200 G", brand: "LA SERENÍSIMA", supermarketCount: 6, slug: "manteca-200g" },
  { id: "8", name: "Cerveza Quilmes Clásica 1L", brand: "QUILMES", supermarketCount: 5, slug: "cerveza-quilmes-1l" },
];

function SearchPageContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  
  const queryFromUrl = searchParams.get("q") || "";
  const [inputValue, setInputValue] = useState(queryFromUrl);
  const [activeCategory, setActiveCategory] = useState("todos");
  const [currentPage, setCurrentPage] = useState(1);


  useEffect(() => {
    setInputValue(queryFromUrl);
  }, [queryFromUrl]);

  const updateSearchQuery = useCallback((value: string) => {
    const params = new URLSearchParams(searchParams);
    if (value.trim()) {
      params.set("q", value.trim());
    } else {
      params.delete("q");
    }
    router.push(`/buscar?${params.toString()}`, { scroll: false });
  }, [searchParams, router]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateSearchQuery(inputValue);
  };

  const handleCategoryChange = useCallback((slug: string) => {
    setActiveCategory(slug);
    setCurrentPage(1);
  }, []);

  const handlePageChange = useCallback((page: number) => {
    setCurrentPage(page);
  }, []);

  return (
    <div className="min-h-screen bg-bg-main">
      <Header />

      {/* Search Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <h1 className="font-[family-name:var(--font-outfit)] text-2xl sm:text-3xl font-bold text-gray-900 mb-6">
            {queryFromUrl ? `Resultados para "${queryFromUrl}"` : "Buscar productos"}
          </h1>
          
          {/* Search Input */}
          <form onSubmit={handleSearchSubmit} className="max-w-xl">
            <div className="relative">
              <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
                <svg
                  className="w-5 h-5 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>
              <input
                type="text"
                value={inputValue}
                onChange={handleInputChange}
                placeholder="Busca un producto..."
                className="w-full pl-12 pr-4 py-3 rounded-xl bg-gray-50 border border-gray-200 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-brand-primary/50 focus:border-brand-primary transition-all duration-200"
              />
              <button
                type="submit"
                className="absolute right-2 top-1/2 -translate-y-1/2 px-4 py-2 bg-brand-primary text-white rounded-lg text-sm font-medium hover:bg-brand-primary/90 transition-colors"
              >
                Buscar
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Categories */}
      <CategoriesSection
        activeCategory={activeCategory}
        onCategoryChange={handleCategoryChange}
        isSticky={true}
      />

      {/* Results */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ProductGrid
          products={mockProducts}
          currentPage={currentPage}
          totalPages={1}
          onPageChange={handlePageChange}
          searchQuery={queryFromUrl}
        />
      </div>

      <Footer />
    </div>
  );
}

export default function SearchPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-bg-main flex items-center justify-center">
        <div className="animate-pulse text-gray-500">Cargando...</div>
      </div>
    }>
      <SearchPageContent />
    </Suspense>
  );
}
