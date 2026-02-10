import { MetadataRoute } from "next";
import { getProducts } from "@/lib/api";
import { CATEGORY_CONFIG } from "@/lib/categories";

export const revalidate = 86400; // Cache for 24 hours (1 day)

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://cuantoaumento.com.ar";

  // 1. Static Routes
  const routes: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1,
    },
  ];

  // 2. Categories (from Config to ensure consistency)
  const categoryRoutes: MetadataRoute.Sitemap = Object.keys(CATEGORY_CONFIG).map((slug) => ({
    url: `${baseUrl}/categoria/${slug}`,
    lastModified: new Date(),
    changeFrequency: "daily",
    priority: 0.9,
  }));

  // 3. Products
  // Fetch products in batches to respect API limits and ensure we get enough unique items
  const MAX_PRODUCTS = 5000;
  const BATCH_SIZE = 100; // Assume backend limit might be around 100
  let productRoutes: MetadataRoute.Sitemap = [];

  try {
    // Initial fetch to get total count
    const initialData = await getProducts({ page: 1, limit: BATCH_SIZE });
    const totalProducts = initialData.pagination.total;
    const totalPagesToFetch = Math.min(
      Math.ceil(MAX_PRODUCTS / BATCH_SIZE),
      Math.ceil(totalProducts / BATCH_SIZE)
    );

    // Process first page
    productRoutes.push(...initialData.products.map((product) => ({
      url: `${baseUrl}/producto/${product.ean}`,
      lastModified: new Date(),
      changeFrequency: "daily" as const,
      priority: 0.8,
    })));

    // Fetch remaining pages in parallel chunks to avoid overwhelming the API
    // We'll do chunks of 10 pages at a time
    const CONCURRENCY_LIMIT = 10;
    
    for (let i = 2; i <= totalPagesToFetch; i += CONCURRENCY_LIMIT) {
      const promises = [];
      for (let j = 0; j < CONCURRENCY_LIMIT && i + j <= totalPagesToFetch; j++) {
        promises.push(getProducts({ page: i + j, limit: BATCH_SIZE }));
      }
      
      const results = await Promise.all(promises);
      
      results.forEach(data => {
        productRoutes.push(...data.products.map((product) => ({
          url: `${baseUrl}/producto/${product.ean}`,
          lastModified: new Date(),
          changeFrequency: "daily" as const,
          priority: 0.8,
        })));
      });
    }

  } catch (error) {
    console.error("Failed to generate product sitemap:", error);
  }

  return [...routes, ...categoryRoutes, ...productRoutes];
}
