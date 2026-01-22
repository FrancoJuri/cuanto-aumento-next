"use client";

import { useCallback, useEffect, useRef } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import {
  CategoriesSection,
  ProductGrid,
} from "@/components";
import { ProductsResponse } from "@/lib/api";

interface ProductsClientProps {
  initialData: ProductsResponse;
}

export function ProductsClient({ initialData, activeCategory = "todos" }: ProductsClientProps & { activeCategory?: string }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentPage = Number(searchParams.get("page")) || 1;

  const { products, pagination } = initialData;
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
        <ProductGrid
            products={products}
            currentPage={currentPage}
            totalPages={pagination?.totalPages || 1}
            onPageChange={handlePageChange}
        />
      </div>
    </div>
  );
}
