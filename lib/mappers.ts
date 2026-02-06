import { ApiProductDetail } from "./api";
import { ProductDetail, SupermarketPrice } from "@/types";

export function mapApiProductToProductDetail(apiProduct: ApiProductDetail, slug: string): ProductDetail {
  const currentPrice = apiProduct.min_price || 0;

  const supermarkets: SupermarketPrice[] = (apiProduct.supermarkets || []).map((s) => ({
    id: (s.name || "unknown").toLowerCase().replace(/\s+/g, '-'),
    name: s.name || "Supermercado",
    currentPrice: s.price || 0,
    previousPrice: s.list_price || s.price || 0,
    priceChange: 0,
    lastUpdated: new Date().toISOString(),
    isBestPrice: s.price === apiProduct.min_price,
    priceHistory: (s.price_history || []).map(h => ({
      date: h.date,
      price: h.price
    })),
  }));

  const bestSupermarket = supermarkets.find(s => s.isBestPrice) || supermarkets[0];
  const globalPriceHistory = bestSupermarket ? bestSupermarket.priceHistory : [];

  return {
    id: apiProduct.ean || slug,
    slug: slug,
    name: apiProduct.name,
    brand: apiProduct.brand,
    description: apiProduct.description || `Precio de ${apiProduct.name} en varios supermercados.`,
    category: apiProduct.category,
    categorySlug: apiProduct.category?.toLowerCase().replace(/\s+/g, '-') || "otros",
    currentPrice: currentPrice,
    previousPrice: 0,
    priceChange: 0,
    lowestPrice: apiProduct.min_price || 0,
    highestPrice: supermarkets.length > 0 ? Math.max(...supermarkets.map((s) => s.currentPrice)) : currentPrice,
    priceHistory: globalPriceHistory,
    supermarkets: supermarkets,
    imageUrl: apiProduct.image_url || undefined,
  };
}
