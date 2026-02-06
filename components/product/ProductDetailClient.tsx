"use client";

import { useState } from "react";
import {
  Header,
  ProductDetailHeader,
  ProductInfoCard,
  PriceEvolutionChart,
  SupermarketPriceCard,
  SupermarketChartModal,
  ProductDescription,
  Footer,
} from "@/components";
import type { ProductDetail, SupermarketPrice } from "@/types";

interface ProductDetailClientProps {
  product: ProductDetail;
}

export default function ProductDetailClient({ product }: ProductDetailClientProps) {
  const [selectedSupermarket, setSelectedSupermarket] =
    useState<SupermarketPrice | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSupermarketClick = (supermarket: SupermarketPrice) => {
    setSelectedSupermarket(supermarket);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedSupermarket(null);
  };



  const handleShare = () => {
    // TODO: Implement share functionality
    if (navigator.share) {
      navigator.share({
        title: product.name,
        text: `Mira el precio de ${product.name}`,
        url: window.location.href,
      });
    }
  };

  return (
    <div className="min-h-screen bg-bg-main">
      {/* Header */}
      <Header />

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <ProductDetailHeader
          categoryName={product.category}
          categorySlug={product.categorySlug}
          productName={product.name}
        />

        {/* Two Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Sidebar - Product Info */}
          <aside className="lg:col-span-4">
            <ProductInfoCard
              product={product}
              onShare={handleShare}
            />
          </aside>

          {/* Right Content - Charts & Prices */}
          <div className="lg:col-span-8 space-y-6">
            {/* Price Evolution Chart */}
            <PriceEvolutionChart currentPrice={product.lowestPrice} />

            {/* Supermarket Prices */}
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">
                Precios por Tienda
              </h2>
              <div className="space-y-2">
                {product.supermarkets.map((supermarket) => (
                  <SupermarketPriceCard
                    key={supermarket.id}
                    supermarket={supermarket}
                    onClick={() => handleSupermarketClick(supermarket)}
                  />
                ))}
              </div>
            </div>

            {/* Product Description */}
            <ProductDescription description={product.description} />
          </div>
        </div>
      </main>

      {/* Footer */}
      <Footer />

      {/* Supermarket Chart Modal */}
      {selectedSupermarket && (
        <SupermarketChartModal
          supermarket={selectedSupermarket}
          isOpen={isModalOpen}
          onClose={handleCloseModal}
        />
      )}
    </div>
  );
}
