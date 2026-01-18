import axios from "axios";

// Base URL de la API - cambiar en producción
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000/api";

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

export interface SupermarketPrice {
  supermarket: string;
  price: number;
  list_price: number | null;
}

export interface ApiProduct {
  ean: string;
  name: string;
  brand: string;
  category: string;
  image_url: string | null;
  prices: SupermarketPrice[];
  min_price: number | null;
}

export interface Pagination {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export interface ProductsResponse {
  products: ApiProduct[];
  pagination: Pagination;
}

export interface ApiCategory {
  category: string;
  count: number;
}

export interface CategoriesResponse {
  categories: ApiCategory[];
  total: number;
}

// Funciones de la API
export async function getProducts(params?: {
  page?: number;
  limit?: number;
  sort?: "name" | "price";
}): Promise<ProductsResponse> {
  const response = await api.get<ProductsResponse>("/products", {
    params: {
      page: params?.page || 1,
      limit: params?.limit || 20,
      sort: params?.sort || "name",
    },
  });
  return response.data;
}

export async function searchProducts(params: {
  q: string;
  page?: number;
  limit?: number;
}): Promise<ProductsResponse> {
  const response = await api.get<ProductsResponse>("/products/search", {
    params: {
      q: params.q,
      page: params.page || 1,
      limit: params.limit || 20,
    },
  });
  return response.data;
}

export async function getProductsByCategory(params: {
  category: string;
  page?: number;
  limit?: number;
}): Promise<ProductsResponse> {
  const response = await api.get<ProductsResponse>(
    `/products/category/${encodeURIComponent(params.category)}`,
    {
      params: {
        page: params.page || 1,
        limit: params.limit || 20,
      },
    }
  );
  return response.data;
}

export async function getCategories(): Promise<CategoriesResponse> {
  const response = await api.get<CategoriesResponse>("/categories");
  return response.data;
}

export async function getProductByEan(ean: string) {
  const response = await api.get(`/products/${ean}`);
  return response.data;
}

export async function getCheapestForProduct(ean: string) {
  const response = await api.get(`/products/${ean}/cheapest`);
  return response.data;
}

export default api;
