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

// Generate mock price history for the last 30 days
const generatePriceHistory = (basePrice: number, days: number = 30) => {
  const history = [];
  const now = new Date();

  for (let i = days - 1; i >= 0; i--) {
    const date = new Date(now.getTime() - i * 24 * 60 * 60 * 1000);
    // Add some variation to prices
    const variation = (Math.random() - 0.5) * basePrice * 0.1;
    history.push({
      date: date.toISOString(),
      price: Math.round(basePrice + variation),
    });
  }

  return history;
};

// Mock product data - this will be replaced with API data
const mockProduct: ProductDetail = {
  id: "1",
  slug: "gaseosa-coca-cola-2-25lt",
  name: "Gaseosa Coca-Cola Sabor Original 2.25 Lt",
  brand: "COCA COLA",
  description:
    "Gaseosa Coca-Cola Original de 2.25 litros. La bebida refrescante más popular del mundo con su sabor único e inconfundible.",
  category: "Bebidas",
  categorySlug: "bebidas",
  currentPrice: 3984,
  previousPrice: 3740,
  priceChange: 6.5,
  lowestPrice: 3300,
  highestPrice: 4740,
  priceHistory: generatePriceHistory(3900, 365),
  supermarkets: [
    {
      id: "carrefour",
      name: "Carrefour",
      currentPrice: 3300,
      previousPrice: 3300,
      priceChange: -25,
      lastUpdated: "Precio estable hace 2 días",
      isBestPrice: true,
      priceHistory: generatePriceHistory(3300, 365),
    },
    {
      id: "jumbo",
      name: "Jumbo",
      currentPrice: 3300,
      previousPrice: 3400,
      priceChange: -25,
      lastUpdated: "Precio estable hace 2 días",
      isBestPrice: true,
      priceHistory: generatePriceHistory(3350, 365),
    },
    {
      id: "la-anonima",
      name: "La Anónima",
      currentPrice: 3550,
      previousPrice: 3200,
      priceChange: 17.65,
      lastUpdated: "Precio estable hace 2 días",
      isBestPrice: false,
      priceHistory: generatePriceHistory(3500, 365),
    },
  ],
};

interface ProductDetailPageProps {
  params: Promise<{ slug: string }>;
}

export default function ProductDetailPage({ params }: ProductDetailPageProps) {
  const [selectedSupermarket, setSelectedSupermarket] =
    useState<SupermarketPrice | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // In the future, fetch product data based on slug
  // const { slug } = await params;
  // const product = await fetchProduct(slug);

  const product = mockProduct;

  const handleSupermarketClick = (supermarket: SupermarketPrice) => {
    setSelectedSupermarket(supermarket);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedSupermarket(null);
  };

  const handleCreateAlert = () => {
    // TODO: Implement alert creation
    console.log("Create alert for:", product.name);
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
              onCreateAlert={handleCreateAlert}
              onShare={handleShare}
            />
          </aside>

          {/* Right Content - Charts & Prices */}
          <div className="lg:col-span-8 space-y-6">
            {/* Price Evolution Chart */}
            <PriceEvolutionChart priceHistory={product.priceHistory} />

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
