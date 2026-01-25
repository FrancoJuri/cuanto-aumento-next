"use client";

import { useCallback, useEffect, useRef } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import {
  CategoriesSection,
  ProductGrid,
} from "@/components";
import { ProductsResponse } from "@/lib/api";

interface ProductsClientProps {
  initialData: ProductsResponse | null;
  error?: string | null;
}

export function ProductsClient({ initialData, error, activeCategory = "todos" }: ProductsClientProps & { activeCategory?: string }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentPage = Number(searchParams.get("page")) || 1;

  const products = initialData?.products || [];
  const pagination = initialData?.pagination;
  const productsSectionRef = useRef<HTMLDivElement>(null);
  
  // Use a ref to track if it's the first render to avoid scrolling on initial load
  const isFirstRender = useRef(true);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    if (productsSectionRef.current) {
      // Small timeout to ensure DOM is ready and layout is stable
      setTimeout(() => {
        productsSectionRef.current?.scrollIntoView({ behavior: "smooth" });
      }, 100);
    }
  }, [currentPage]);

  const handleCategoryChange = useCallback((slug: string) => {
    if (slug === "todos") {
      router.push("/");
    } else {
      router.push(`/categoria/${slug}`);
    }
  }, [router]);

  const handlePageChange = useCallback((page: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", page.toString());
    
    router.push(`/?${params.toString()}`, { scroll: false });
  }, [router, searchParams]);

  return (
    <div ref={productsSectionRef} className="scroll-mt-24">
      {/* Categories Section */}
      <CategoriesSection
        activeCategory={activeCategory}
        onCategoryChange={handleCategoryChange}
        isSticky={true}
      />

      {/* Products Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {error ? (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <div className="bg-red-50 text-red-600 p-4 rounded-lg max-w-md">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 mx-auto mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
              <h3 className="text-lg font-medium mb-1">Error de conexión</h3>
              <p className="text-sm opacity-90">{error}</p>
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
    </div>
  );
}
