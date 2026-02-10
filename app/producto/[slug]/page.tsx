import { ProductDetailClient } from "@/components";
import { getProductBySlug } from "@/lib/api";
import type { ProductDetail } from "@/types";
import { mapApiProductToProductDetail } from "@/lib/mappers";
import { Metadata } from "next";
import { JsonLd } from "@/components/common/JsonLd";
import type { Product, BreadcrumbList, WithContext } from "schema-dts";

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

  const jsonLd: WithContext<Product> = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    image: product.imageUrl || undefined,
    description: `Precio actual de ${product.name} en supermercados de Argentina.`,
    brand: {
      "@type": "Brand",
      name: product.brand,
    },
    offers: {
      "@type": "Offer",
      price: product.lowestPrice,
      priceCurrency: "ARS",
      availability: "https://schema.org/InStock",
      url: `https://cuantoaumento.com.ar/producto/${slug}`,
    },
  };

  const breadcrumbJsonLd: WithContext<BreadcrumbList> = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Inicio",
        item: "https://cuantoaumento.com.ar",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: product.category,
        item: `https://cuantoaumento.com.ar/categoria/${product.categorySlug}`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: product.name,
        item: `https://cuantoaumento.com.ar/producto/${slug}`,
      },
    ],
  };

  return (
    <>
      <JsonLd data={jsonLd} />
      <JsonLd data={breadcrumbJsonLd} />
      <ProductDetailClient product={product} />
    </>
  );
}
