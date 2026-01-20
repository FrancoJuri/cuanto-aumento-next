import { getProducts } from "@/lib/api";
import { ProductsClient } from "./ProductsClient";

interface ProductsSectionProps {
  page: number;
}

export default async function ProductsSection({ page }: ProductsSectionProps) {
  // Fetch products on the server
  const initialData = await getProducts({ page, limit: 15 });

  return (
    <ProductsClient initialData={initialData} />
  );
}
