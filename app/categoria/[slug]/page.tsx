import type { Metadata } from "next";
import { Suspense } from "react";
import { 
  Header, 
  Footer, 
  CategoryHero, 
  CategoryProductsSection, 
  NotFoundContent, 
  LoadingSpinner 
} from "@/components";
import { getCategories } from "@/lib/api";
import { CATEGORY_CONFIG } from "@/lib/categories";
import { JsonLd } from "@/components/common/JsonLd";
import type { CollectionPage, BreadcrumbList, WithContext } from "schema-dts";

interface CategoryPageProps {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

// Generate static params for known categories
export async function generateStaticParams() {
  // Use the keys from CATEGORY_CONFIG as the source of truth
  return Object.keys(CATEGORY_CONFIG).map((slug) => ({ slug }));
}

// Generate dynamic metadata for SEO
export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
  const { slug } = await params;
  const info = CATEGORY_CONFIG[slug];

  if (!info) {
    return {
      title: "Categoría no encontrada | ¿Cuánto Aumento?",
      description: "La categoría que buscas no existe.",
    };
  }

  return {
    title: `${info.name} - Precios de Supermercados | ¿Cuánto Aumento?`,
    description: info.description || `Compara precios de ${info.name.toLowerCase()} en supermercados de Argentina.`,
    keywords: [
      info.name.toLowerCase(),
      "precios",
      "supermercado",
      "Argentina",
      "inflación",
      "comparador",
    ],
    openGraph: {
      title: `${info.name} - Precios de Supermercados`,
      description: info.description,
      type: "website",
    },
  };
}

export default async function CategoryPage({ params, searchParams }: CategoryPageProps) {
  const { slug } = await params;
  const { page } = await searchParams;
  const currentPage = typeof page === "string" ? parseInt(page) : 1;
  const pageNumber = isNaN(currentPage) || currentPage < 1 ? 1 : currentPage;

  const info = CATEGORY_CONFIG[slug];

  if (!info) {
    return (
      <NotFoundContent
        title="Categoría no encontrada"
        message="La categoría que buscas no existe o fue removida."
      />
    );
  }

  const categoryForHero = {
    slug,
    ...info,
    // productCount is undefined initially, loaded via Suspense
  };

  const jsonLd: WithContext<CollectionPage> = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: info.name,
    description: info.description,
    url: `https://cuantoaumento.com.ar/categoria/${slug}`,
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
        name: info.name,
        item: `https://cuantoaumento.com.ar/categoria/${slug}`,
      },
    ],
  };

  return (
    <div className="min-h-screen bg-bg-main">
      <JsonLd data={jsonLd} />
      <JsonLd data={breadcrumbJsonLd} />
      {/* Header */}
      <Header />

      {/* Category Hero (Static Content) */}
      <CategoryHero category={categoryForHero} />

      {/* Breadcrumb */}
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4" aria-label="Breadcrumb">
        <ol className="flex items-center space-x-2 text-sm text-gray-500">
          <li>
            <a href="/" className="hover:text-brand-primary transition-colors">
              Inicio
            </a>
          </li>
          <li>
            <span className="mx-2">/</span>
          </li>
          <li>
            <span className="text-gray-900 font-medium">{info.name}</span>
          </li>
        </ol>
      </nav>

      {/* Products Section with Suspense */}
      <Suspense fallback={<LoadingSpinner />} key={pageNumber}>
        <CategoryProductsSection 
          categoryName={info.name}
          categorySlug={slug}
          categoryInfo={info}
          page={pageNumber} 
        />
      </Suspense>

      {/* Footer */}
      <Footer />
    </div>
  );
}
