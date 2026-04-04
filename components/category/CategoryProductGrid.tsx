"use client";

import { useCallback, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { ProductGrid } from "@/components";
import { getProductsByCategory } from "@/lib/api";
import type { ApiProduct, Pagination } from "@/lib/api";
import type { Category } from "@/types";

interface CategoryProductGridProps {
  category: Category;
  products: ApiProduct[];
  pagination: Pagination;
}

export default function CategoryProductGrid({
  category,
  products: initialProducts,
  pagination: initialPagination,
}: CategoryProductGridProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentPage = Number(searchParams.get("page")) || 1;

  const [products, setProducts] = useState(initialProducts);
  const [pagination, setPagination] = useState(initialPagination);
  const [isLoading, setIsLoading] = useState(false);

  // Page 1 uses server-provided data (ISR cached), page 2+ fetches client-side
  useEffect(() => {
    if (currentPage <= 1) {
      setProducts(initialProducts);
      setPagination(initialPagination);
      return;
    }

    const fetchPage = async () => {
      setIsLoading(true);
      try {
        const data = await getProductsByCategory({
          category: category.name,
          page: currentPage,
          limit: 15,
        });
        setProducts(data.products);
        setPagination(data.pagination);
      } catch (e) {
        console.error("Error fetching category products:", e);
      } finally {
        setIsLoading(false);
      }
    };
    fetchPage();
  }, [currentPage, category.name, initialProducts, initialPagination]);

  const handlePageChange = useCallback((page: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", page.toString());
    router.push(`/categoria/${category.slug}?${params.toString()}`, { scroll: false });
  }, [router, searchParams, category.slug]);

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Section Header */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-gray-900">
          Productos en {category.name}
        </h2>
        {category.productCount && (
          <span className="text-sm text-gray-500">
            {category.productCount} productos
          </span>
        )}
      </div>

      {/* Product Grid */}
      {isLoading ? (
        <div className="flex flex-col items-center justify-center py-16">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-primary mb-4" />
          <p className="text-gray-500">Cargando productos...</p>
        </div>
      ) : (
        <ProductGrid
          products={products}
          currentPage={currentPage}
          totalPages={pagination.totalPages}
          onPageChange={handlePageChange}
        />
      )}
    </main>
  );
}
