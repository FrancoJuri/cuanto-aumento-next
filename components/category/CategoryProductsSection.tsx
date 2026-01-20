import { getProductsByCategory } from "@/lib/api";
import CategoryProductGrid from "./CategoryProductGrid";
import type { Category } from "@/types";

interface CategoryProductsSectionProps {
  categorySlug: string;
  categoryName: string;
  categoryInfo: Omit<Category, "slug" | "productCount">;
  page: number;
}

export default async function CategoryProductsSection({
  categorySlug,
  categoryName,
  categoryInfo,
  page,
}: CategoryProductsSectionProps) {
  try {
    const { products, pagination } = await getProductsByCategory({
      category: categoryName,
      page: page,
      limit: 15,
    });

    const category: Category = {
      slug: categorySlug,
      ...categoryInfo,
      productCount: pagination.total,
    };

    return (
      <CategoryProductGrid
        category={category}
        products={products}
        pagination={pagination}
      />
    );
  } catch (error) {
    console.error("Error fetching category products:", error);
    
    // Fallback error state
    const category: Category = {
      slug: categorySlug,
      ...categoryInfo,
    };

    return (
      <CategoryProductGrid
        category={category}
        products={[]}
        pagination={{ page: 1, limit: 15, total: 0, totalPages: 1 }}
      />
    );
  }
}
