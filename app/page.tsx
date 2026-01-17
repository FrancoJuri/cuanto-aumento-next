"use client";

import { useState, useCallback, useEffect } from "react";
import {
  HeroSection,
  CategoriesSection,
  ProductGrid,
  Footer,
  Product,
} from "@/components";
import { getProducts, getProductsByCategory, ApiProduct, Pagination } from "@/lib/api";

// Función para transformar ApiProduct a Product del componente
function transformApiProduct(apiProduct: ApiProduct): Product {
  return {
    id: apiProduct.ean,
    name: apiProduct.name,
    brand: apiProduct.brand || "SIN MARCA",
    supermarketCount: apiProduct.prices?.length || 0,
    slug: apiProduct.ean, // Usamos EAN como slug por ahora
    imageUrl: apiProduct.image_url || undefined,
    minPrice: apiProduct.min_price || undefined,
  };
}

export default function Home() {
  const [activeCategory, setActiveCategory] = useState("todos");
  const [currentPage, setCurrentPage] = useState(1);
  const [products, setProducts] = useState<Product[]>([]);
  const [pagination, setPagination] = useState<Pagination | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch products
  useEffect(() => {
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
        
        const transformedProducts = response.products.map(transformApiProduct);
        setProducts(transformedProducts);
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
  }, []);

  const handlePageChange = useCallback((page: number) => {
    setCurrentPage(page);
  }, []);

  return (
    <div className="min-h-screen bg-bg-main">
      {/* Hero Section */}
      <HeroSection />

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

      {/* Footer */}
      <Footer />
    </div>
  );
}

