"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useState, useCallback, useEffect, Suspense } from "react";
import { Header, CategoriesSection, ProductGrid, Footer } from "@/components";
import { useProductSearch } from "@/hooks/useProductSearch";

function SearchPageContent() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const queryFromUrl = searchParams.get("q") || "";
  const pageFromUrl = parseInt(searchParams.get("page") || "1", 10);

  const [inputValue, setInputValue] = useState(queryFromUrl);
  const [activeCategory, setActiveCategory] = useState("todos");

  const { products, pagination, isLoading, error } = useProductSearch(
    queryFromUrl,
    pageFromUrl
  );

  // Sync input value with URL query
  useEffect(() => {
    setInputValue(queryFromUrl);
  }, [queryFromUrl]);

  const navigateToSearch = useCallback(
    (query: string, page: number = 1) => {
      const params = new URLSearchParams();
      if (query.trim()) {
        params.set("q", query.trim());
      }
      if (page > 1) {
        params.set("page", page.toString());
      }
      router.push(`/buscar?${params.toString()}`, { scroll: false });
    },
    [router]
  );

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    navigateToSearch(inputValue);
  };

  const handleCategoryChange = useCallback((slug: string) => {
    setActiveCategory(slug);
  }, []);

  const handlePageChange = useCallback(
    (page: number) => {
      navigateToSearch(queryFromUrl, page);
    },
    [queryFromUrl, navigateToSearch]
  );

  return (
    <div className="min-h-screen bg-bg-main">
      <Header />

      {/* Search Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <h1 className="font-[family-name:var(--font-outfit)] text-2xl sm:text-3xl font-bold text-gray-900 mb-6">
            {queryFromUrl
              ? `Resultados para "${queryFromUrl}"`
              : "Buscar productos"}
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
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Busca un producto..."
                className="w-full pl-12 pr-24 py-3 rounded-xl bg-gray-50 border border-gray-200 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-brand-primary/50 focus:border-brand-primary transition-all duration-200"
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
        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-16">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-primary mb-4" />
            <p className="text-gray-500">Buscando productos...</p>
          </div>
        ) : error ? (
          <div className="flex flex-col items-center justify-center py-16">
            <div className="text-6xl mb-4">⚠️</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              Error en la búsqueda
            </h3>
            <p className="text-gray-500">{error}</p>
          </div>
        ) : (
          <ProductGrid
            products={products}
            currentPage={pagination?.page || 1}
            totalPages={pagination?.totalPages || 1}
            onPageChange={handlePageChange}
          />
        )}
      </div>

      <Footer />
    </div>
  );
}

export default function SearchPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-bg-main flex items-center justify-center">
          <div className="animate-pulse text-gray-500">Cargando...</div>
        </div>
      }
    >
      <SearchPageContent />
    </Suspense>
  );
}
