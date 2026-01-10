"use client";

import {
  Header,
  CategoryHero,
  ProductGrid,
  Footer,
} from "@/components";
import type { Product } from "@/components";
import type { Category } from "@/types";

interface CategoryPageContentProps {
  category: Category;
  products: Product[];
}

export default function CategoryPageContent({
  category,
  products,
}: CategoryPageContentProps) {
  return (
    <div className="min-h-screen bg-bg-main">
      {/* Header */}
      <Header />

      {/* Category Hero with Particles */}
      <CategoryHero category={category} />

      {/* Breadcrumb */}
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4" aria-label="Breadcrumb">
        <ol className="flex items-center space-x-2 text-sm text-gray-500">
          <li>
            <a href="/" className="hover:text-brand-primary transition-colors">
              Inicio
            </a>
          </li>
          <li>
            <span className="mx-2">/</span>
          </li>
          <li>
            <span className="text-gray-900 font-medium">{category.name}</span>
          </li>
        </ol>
      </nav>

      {/* Products Section */}
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
          currentPage={1}
          totalPages={Math.ceil(products.length / 15) || 1}
        />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
