"use client";

import { useCallback } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { ProductGrid } from "@/components";
import type { ApiProduct, Pagination } from "@/lib/api";
import type { Category } from "@/types";

interface CategoryProductGridProps {
  category: Category;
  products: ApiProduct[];
  pagination: Pagination;
}

export default function CategoryProductGrid({
  category,
  products,
  pagination,
}: CategoryProductGridProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentPage = pagination.page;

  const handlePageChange = useCallback((page: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", page.toString());
    router.push(`/categoria/${category.slug}?${params.toString()}`);
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
      <ProductGrid
        products={products}
        currentPage={currentPage}
        totalPages={pagination.totalPages}
        onPageChange={handlePageChange}
      />
    </main>
  );
}
