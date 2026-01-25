import { getProducts } from "@/lib/api";
import { ProductsClient } from "./ProductsClient";

interface ProductsSectionProps {
  page: number;
}

export default async function ProductsSection({ page }: ProductsSectionProps) {
  let initialData = null;
  let error = null;

  try {
    // Fetch products on the server
    initialData = await getProducts({ page, limit: 15 });
  } catch (e) {
    console.error("Error fetching products:", e);
    error = "No se pudieron cargar los productos. Por favor intenta nuevamente más tarde.";
  }

  return (
    <ProductsClient initialData={initialData} error={error} />
  );
}
