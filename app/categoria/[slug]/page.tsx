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
import type { Category } from "@/types";

interface CategoryPageProps {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

// Map category slug to display info
const categoryInfo: Record<string, Omit<Category, "slug">> = {
  bebidas: {
    name: "Bebidas",
    description: "Gaseosas, aguas, jugos, cervezas y más bebidas de supermercados argentinos.",
    icon: "🥤",
  },
  lacteos: {
    name: "Lácteos",
    description: "Leches, yogures, quesos, manteca y productos lácteos frescos.",
    icon: "🥛",
  },
  almacen: {
    name: "Almacén",
    description: "Productos de almacén, conservas, pastas, arroz y más.",
    icon: "🏪",
  },
  infusiones: {
    name: "Infusiones",
    description: "Yerba mate, café, té y todas las infusiones.",
    icon: "🧉",
  },
  "frutas-y-verduras": {
    name: "Frutas y Verduras",
    description: "Frutas y verduras frescas de temporada.",
    icon: "🍎",
  },
  panaderia: {
    name: "Panadería",
    description: "Pan, facturas, galletitas y productos de panadería.",
    icon: "🥖",
  },
  limpieza: {
    name: "Limpieza",
    description: "Productos de limpieza para el hogar.",
    icon: "🧹",
  },
};

// Generate static params for known categories
export async function generateStaticParams() {
  try {
    const { categories } = await getCategories();
    return categories.map((cat) => ({
      slug: cat.category.toLowerCase().replace(/\s+/g, "-"),
    }));
  } catch {
    return Object.keys(categoryInfo).map((slug) => ({ slug }));
  }
}

// Generate dynamic metadata for SEO
export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
  const { slug } = await params;
  const info = categoryInfo[slug];

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

  const info = categoryInfo[slug];

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

  return (
    <div className="min-h-screen bg-bg-main">
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
