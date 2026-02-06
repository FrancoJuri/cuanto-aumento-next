import { ProductDetailClient } from "@/components";
import { getProductBySlug } from "@/lib/api";
import type { ProductDetail } from "@/types";
import { mapApiProductToProductDetail } from "@/lib/mappers";
import { Metadata } from "next";

interface ProductDetailPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: ProductDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  try {
    const product = await getProductBySlug(slug);
    return {
      title: `${product.name} | Cuánto Aumento`,
      description: `Mirá el precio de ${product.name} en diferentes supermercados.`,
    };
  } catch (error) {
    return {
      title: "Producto no encontrado | Cuánto Aumento",
    };
  }
}

export default async function ProductDetailPage({ params }: ProductDetailPageProps) {
  const { slug } = await params;
  let product: ProductDetail;

  try {
    const apiProduct = await getProductBySlug(slug);

    product = mapApiProductToProductDetail(apiProduct, slug);
  } catch (error) {
    console.error("Error fetching product:", error);
    // Use throw to trigger Next.js error boundary
    throw error;
  }

  return <ProductDetailClient product={product} />;
}

