"use client";

import { useState, useEffect } from "react";
import { searchProducts, ApiProduct, Pagination } from "@/lib/api";

interface UseProductSearchResult {
  products: ApiProduct[];
  pagination: Pagination | null;
  isLoading: boolean;
  error: string | null;
}

export function useProductSearch(
  query: string,
  page: number = 1
): UseProductSearchResult {
  const [products, setProducts] = useState<ApiProduct[]>([]);
  const [pagination, setPagination] = useState<Pagination | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      // Require at least 2 characters for search
      if (!query.trim() || query.trim().length < 2) {
        setProducts([]);
        setPagination(null);
        setError(null);
        return;
      }

      setIsLoading(true);
      setError(null);

      try {
        const response = await searchProducts({
          q: query,
          page,
          limit: 20,
        });

        setProducts(response.products);
        setPagination(response.pagination);
      } catch (err) {
        console.error("Error searching products:", err);
        setError("Error al buscar productos. Por favor, intenta de nuevo.");
        setProducts([]);
        setPagination(null);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, [query, page]);

  return { products, pagination, isLoading, error };
}
