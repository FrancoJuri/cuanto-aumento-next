"use client";

import { useState, useCallback, useEffect } from "react";
import {
  CategoriesSection,
  ProductGrid,
} from "@/components";
import { getProducts, getProductsByCategory, ApiProduct, Pagination, ProductsResponse } from "@/lib/api";

interface ProductsClientProps {
  initialData: ProductsResponse;
}

export function ProductsClient({ initialData }: ProductsClientProps) {
  const [activeCategory, setActiveCategory] = useState("todos");
  const [currentPage, setCurrentPage] = useState(1);
  const [products, setProducts] = useState<ApiProduct[]>(initialData.products);
  const [pagination, setPagination] = useState<Pagination | null>(initialData.pagination);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  
  useEffect(() => {
    
    if (activeCategory === "todos" && currentPage === 1) {
      return;
    }

    async function fetchProducts() {
      setIsLoading(true);
      setError(null);

      try {
        let response;

        if (activeCategory === "todos") {
          response = await getProducts({ page: currentPage, limit: 15 });
        } else {
          response = await getProductsByCategory({
            category: activeCategory,
            page: currentPage,
            limit: 15,
          });
        }

        setProducts(response.products);
        setPagination(response.pagination);
      } catch (err) {
        console.error("Error fetching products:", err);
        setError("Error al cargar los productos. Verifica que el servidor esté corriendo.");
        setProducts([]);
      } finally {
        setIsLoading(false);
      }
    }

    fetchProducts();
  }, [activeCategory, currentPage]);

  const handleCategoryChange = useCallback((slug: string) => {
    setActiveCategory(slug);
    setCurrentPage(1);
    
    if (slug === "todos") {
      setProducts(initialData.products);
      setPagination(initialData.pagination);
    }
  }, [initialData]);

  const handlePageChange = useCallback((page: number) => {
    setCurrentPage(page);
  }, []);

  return (
    <>
      {/* Categories Section */}
      <CategoriesSection
        activeCategory={activeCategory}
        onCategoryChange={handleCategoryChange}
        isSticky={true}
      />

      {/* Products Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {error && (
          <div className="my-8 p-4 bg-red-500/20 border border-red-500/50 rounded-lg text-red-200 text-center">
            {error}
          </div>
        )}

        {isLoading ? (
          <div className="my-8 flex justify-center items-center min-h-[400px]">
            <div className="flex flex-col items-center gap-4">
              <div className="w-12 h-12 border-4 border-accent-primary border-t-transparent rounded-full animate-spin"></div>
              <p className="text-text-secondary">Cargando productos...</p>
            </div>
          </div>
        ) : (
          <ProductGrid
            products={products}
            currentPage={currentPage}
            totalPages={pagination?.totalPages || 1}
            onPageChange={handlePageChange}
          />
        )}
      </div>
    </>
  );
}
