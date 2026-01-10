// Product-related types for the detail page and future API integration

export interface PriceHistory {
  date: string; // ISO date string
  price: number;
}

export interface SupermarketPrice {
  id: string;
  name: string;
  logoUrl?: string;
  currentPrice: number;
  previousPrice?: number;
  priceChange?: number; // percentage change
  lastUpdated: string; // relative time string or ISO date
  isBestPrice: boolean;
  priceHistory: PriceHistory[];
}

export interface ProductDetail {
  id: string;
  slug: string;
  name: string;
  brand: string;
  description?: string;
  imageUrl?: string;
  category: string;
  categorySlug: string;
  currentPrice: number;
  previousPrice?: number;
  priceChange?: number; // percentage change vs previous week
  lowestPrice: number;
  highestPrice: number;
  supermarkets: SupermarketPrice[];
  priceHistory: PriceHistory[];
}

// Time range filter options for charts
export type TimeRange = "7D" | "1M" | "3M" | "6M" | "1A";

// Category types for category pages
export interface Category {
  slug: string;
  name: string;
  description?: string;
  icon?: string;
  productCount?: number;
}

