import { ApiProductDetail } from "./api";
import { ProductDetail, SupermarketPrice } from "@/types";
import { normalizeCategorySlug, CATEGORY_CONFIG } from "./categories";

export function mapApiProductToProductDetail(apiProduct: ApiProductDetail, slug: string): ProductDetail {
  const currentPrice = apiProduct.min_price || 0;

  let supermarkets: SupermarketPrice[] = (apiProduct.supermarkets || []).map((s) => ({
    id: (s.name || "unknown").toLowerCase().replace(/\s+/g, '-'),
    name: s.name || "Supermercado",
    currentPrice: s.price || 0,
    previousPrice: s.list_price || s.price || 0,
    priceChange: 0,
    lastUpdated: new Date().toISOString(),
    isBestPrice: s.price === apiProduct.min_price,
    productUrl: s.product_url,
    priceHistory: (s.price_history || []).map(h => ({
      date: h.date,
      price: h.price
    })),
  }));

  // Sort supermarkets by price (lowest first)
  supermarkets.sort((a, b) => a.currentPrice - b.currentPrice);

  const bestSupermarket = supermarkets.find(s => s.isBestPrice) || supermarkets[0];
  const globalPriceHistory = bestSupermarket ? bestSupermarket.priceHistory : [];

  // Determine category slug
  const normalizedSlug = normalizeCategorySlug(apiProduct.category);
  
  let categorySlug = "otros"; 
  if (normalizedSlug) {
      categorySlug = normalizedSlug;
  } else if (apiProduct.category) {
       const parts = apiProduct.category.split('/').filter(p => p.trim() !== '');
       const mainCategory = parts.length > 0 ? parts[0] : apiProduct.category;
       categorySlug = mainCategory;
  }

  return {
    id: apiProduct.ean || slug,
    slug: slug,
    name: apiProduct.name,
    brand: apiProduct.brand,
    description: apiProduct.description || `Precio de ${apiProduct.name} en varios supermercados.`,
    category: normalizedSlug ? CATEGORY_CONFIG[normalizedSlug].name : (apiProduct.category?.split('/').filter(p=>p)[0] || "Otros"),
    categorySlug: categorySlug,
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
