import type { Metadata } from "next";
import { CategoryPageContent, NotFoundContent } from "@/components";
import type { Product } from "@/components";
import type { Category } from "@/types";

// Mock categories data - will be replaced with API
const categoriesData: Record<string, Category> = {
  bebidas: {
    slug: "bebidas",
    name: "Bebidas",
    description: "Gaseosas, aguas, jugos, cervezas y más bebidas de supermercados argentinos.",
    icon: "🥤",
    productCount: 156,
  },
  lacteos: {
    slug: "lacteos",
    name: "Lácteos",
    description: "Leches, yogures, quesos, manteca y productos lácteos frescos.",
    icon: "🥛",
    productCount: 203,
  },
  almacen: {
    slug: "almacen",
    name: "Almacén",
    description: "Productos de almacén, conservas, pastas, arroz y más.",
    icon: "🏪",
    productCount: 421,
  },
  infusiones: {
    slug: "infusiones",
    name: "Infusiones",
    description: "Yerba mate, café, té y todas las infusiones.",
    icon: "🧉",
    productCount: 89,
  },
  "frutas-y-verduras": {
    slug: "frutas-y-verduras",
    name: "Frutas y Verduras",
    description: "Frutas y verduras frescas de temporada.",
    icon: "🍎",
    productCount: 134,
  },
  panaderia: {
    slug: "panaderia",
    name: "Panadería",
    description: "Pan, facturas, galletitas y productos de panadería.",
    icon: "🥖",
    productCount: 78,
  },
  limpieza: {
    slug: "limpieza",
    name: "Limpieza",
    description: "Productos de limpieza para el hogar.",
    icon: "🧹",
    productCount: 167,
  },
  "precios-en-baja": {
    slug: "precios-en-baja",
    name: "Precios en Baja",
    description: "Productos con precios que bajaron recientemente.",
    icon: "📉",
    productCount: 45,
  },
  "precios-en-alza": {
    slug: "precios-en-alza",
    name: "Precios en Alza",
    description: "Productos con aumentos de precio recientes.",
    icon: "📈",
    productCount: 312,
  },
};

// Mock products by category - will be replaced with API
const productsByCategory: Record<string, Product[]> = {
  bebidas: [
    { id: "1", name: "Gaseosa Coca-Cola Sabor Original 2.25 Lt", brand: "COCA COLA", supermarketCount: 7, slug: "gaseosa-coca-cola-2-25lt" },
    { id: "2", name: "Agua Mineral Villavicencio 1.5 Lt", brand: "VILLAVICENCIO", supermarketCount: 6, slug: "agua-villavicencio-1-5lt" },
    { id: "3", name: "Cerveza Quilmes Clásica 1L", brand: "QUILMES", supermarketCount: 5, slug: "cerveza-quilmes-1l" },
    { id: "4", name: "Gaseosa Sprite Lima Limón 2.25 Lt", brand: "SPRITE", supermarketCount: 7, slug: "gaseosa-sprite-2-25lt" },
    { id: "5", name: "Jugo de Naranja Cepita 1 Lt", brand: "CEPITA", supermarketCount: 5, slug: "jugo-cepita-naranja-1lt" },
    { id: "6", name: "Agua Saborizada Levité Pomelo 1.5 Lt", brand: "LEVITÉ", supermarketCount: 6, slug: "agua-levite-pomelo-1-5lt" },
    { id: "7", name: "Cerveza Brahma Chopp 1L", brand: "BRAHMA", supermarketCount: 5, slug: "cerveza-brahma-1l" },
    { id: "8", name: "Gaseosa Fanta Naranja 2.25 Lt", brand: "FANTA", supermarketCount: 7, slug: "gaseosa-fanta-naranja-2-25lt" },
  ],
  lacteos: [
    { id: "1", name: "Leche Descremada La Serenísima 1 L", brand: "LA SERENÍSIMA", supermarketCount: 6, slug: "leche-descremada-1l" },
    { id: "2", name: "Yogur Bebible Frutilla Yogurísimo 900 G", brand: "YOGURÍSIMO", supermarketCount: 4, slug: "yogur-bebible-frutilla-900g" },
    { id: "3", name: "Manteca La Serenísima 200 G", brand: "LA SERENÍSIMA", supermarketCount: 6, slug: "manteca-la-serenisima-200g" },
    { id: "4", name: "Casancrem 290 G", brand: "CASANCREM", supermarketCount: 7, slug: "casancrem-290g" },
    { id: "5", name: "Dulce De Leche Clásico La Serenísima 400 G", brand: "LA SERENÍSIMA", supermarketCount: 7, slug: "dulce-de-leche-clasico" },
    { id: "6", name: "Queso Reggianito Rallado 130 G", brand: "LA SERENÍSIMA", supermarketCount: 5, slug: "queso-reggianito-rallado-130g" },
  ],
  almacen: [
    { id: "1", name: "Fideos Marolio Mostachol 500g", brand: "MAROLIO", supermarketCount: 6, slug: "fideos-marolio-mostachol-500g" },
    { id: "2", name: "Arroz Gallo Oro Largo Fino 1kg", brand: "GALLO", supermarketCount: 7, slug: "arroz-gallo-1kg" },
    { id: "3", name: "Aceite de Girasol Cocinero 1.5 Lt", brand: "COCINERO", supermarketCount: 6, slug: "aceite-cocinero-1-5lt" },
    { id: "4", name: "Sal Fina Dos Anclas 500g", brand: "DOS ANCLAS", supermarketCount: 7, slug: "sal-dos-anclas-500g" },
    { id: "5", name: "Puré de Tomate Arcor 520g", brand: "ARCOR", supermarketCount: 6, slug: "pure-tomate-arcor-520g" },
  ],
  infusiones: [
    { id: "1", name: "Yerba Mate Playadito 1kg", brand: "PLAYADITO", supermarketCount: 7, slug: "yerba-mate-playadito-1kg" },
    { id: "2", name: "Yerba Mate Taragüí 1kg", brand: "TARAGÜÍ", supermarketCount: 7, slug: "yerba-mate-taragui-1kg" },
    { id: "3", name: "Café Molido La Virginia 250g", brand: "LA VIRGINIA", supermarketCount: 6, slug: "cafe-la-virginia-250g" },
    { id: "4", name: "Té Negro La Virginia 25 Saquitos", brand: "LA VIRGINIA", supermarketCount: 5, slug: "te-la-virginia-25" },
  ],
  "frutas-y-verduras": [
    { id: "1", name: "Banana X Kg", brand: "SIN MARCA", supermarketCount: 6, slug: "banana-x-kg" },
    { id: "2", name: "Pepino X Kg", brand: "SIN MARCA", supermarketCount: 7, slug: "pepino-x-kg" },
    { id: "3", name: "Manzana Roja X Kg", brand: "SIN MARCA", supermarketCount: 6, slug: "manzana-roja-x-kg" },
    { id: "4", name: "Tomate Redondo X Kg", brand: "SIN MARCA", supermarketCount: 7, slug: "tomate-redondo-x-kg" },
  ],
};

// Fallback for categories without specific products
const defaultProducts: Product[] = [
  { id: "1", name: "Producto de ejemplo 1", brand: "MARCA", supermarketCount: 5, slug: "producto-ejemplo-1" },
  { id: "2", name: "Producto de ejemplo 2", brand: "MARCA", supermarketCount: 4, slug: "producto-ejemplo-2" },
];

interface CategoryPageProps {
  params: Promise<{ slug: string }>;
}

// Generate static params for known categories
export async function generateStaticParams() {
  return Object.keys(categoriesData).map((slug) => ({
    slug,
  }));
}

// Generate dynamic metadata for SEO
export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
  const { slug } = await params;
  const category = categoriesData[slug];

  if (!category) {
    return {
      title: "Categoría no encontrada | ¿Cuánto Aumento?",
      description: "La categoría que buscas no existe.",
    };
  }

  return {
    title: `${category.name} - Precios de Supermercados | ¿Cuánto Aumento?`,
    description: category.description || `Compara precios de ${category.name.toLowerCase()} en supermercados de Argentina. Encuentra las mejores ofertas y rastrea la evolución de precios.`,
    keywords: [
      category.name.toLowerCase(),
      "precios",
      "supermercado",
      "Argentina",
      "inflación",
      "comparador",
      "ofertas",
    ],
    openGraph: {
      title: `${category.name} - Precios de Supermercados`,
      description: category.description,
      type: "website",
    },
  };
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { slug } = await params;
  const category = categoriesData[slug];
  const products = productsByCategory[slug] || defaultProducts;

  // Handle category not found
  if (!category) {
    return (
      <NotFoundContent
        title="Categoría no encontrada"
        message="La categoría que buscas no existe o fue removida."
      />
    );
  }

  return <CategoryPageContent category={category} products={products} />;
}
