import type { Metadata } from "next";
import { CategoryPageContent, NotFoundContent } from "@/components";
import { getProductsByCategory, getCategories } from "@/lib/api";
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

  // Convert slug back to category name for API
  const categoryName = info.name;

  try {
    const { products, pagination } = await getProductsByCategory({
      category: categoryName,
      page: pageNumber,
      limit: 15,
    });

    const category: Category = {
      slug,
      ...info,
      productCount: pagination.total,
    };

    return <CategoryPageContent category={category} products={products} pagination={pagination} />;
  } catch (error) {
    console.error("Error fetching category products:", error);
    
    // Return empty state on error
    const category: Category = {
      slug,
      ...info,
    };

    return <CategoryPageContent category={category} products={[]} pagination={{ page: 1, limit: 15, total: 0, totalPages: 1 }} />;
  }
}
