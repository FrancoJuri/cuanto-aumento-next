import { Category } from "@/types";

export const CATEGORY_CONFIG: Record<string, Omit<Category, "slug">> = {
  bebidas: {
    name: "Bebidas",
    description: "Gaseosas, aguas, jugos, cervezas y más bebidas.",
    icon: "🥤",
  },
  lacteos: {
    name: "Lácteos",
    description: "Leches, yogures, quesos, manteca y productos lácteos.",
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
  congelados: {
    name: "Congelados",
    description: "Alimentos congelados, helados y comidas preparadas.",
    icon: "❄️",
  },
  "quesos-y-fiambres": {
    name: "Quesos y Fiambres",
    description: "Picadas, quesos de todo tipo y fiambres.",
    icon: "🧀",
  },
  perfumeria: {
    name: "Perfumería",
    description: "Cuidado personal, higiene y cosmética.",
    icon: "🧴",
  },
  mascotas: {
    name: "Mascotas",
    description: "Alimentos y accesorios para tus mascotas.",
    icon: "🐾",
  },
  "hogar-y-textil": {
    name: "Hogar y Textil",
    description: "Artículos para el hogar, decoración y textil.",
    icon: "🏠",
  },
};

export function normalizeCategorySlug(rawCategory: string | undefined): string | null {
  if (!rawCategory) return null;

  // e.g. "/Bebidas/Gaseosas/" -> "Bebidas"
  const parts = rawCategory.split('/').filter(p => p.trim() !== '');
  const mainCategory = parts.length > 0 ? parts[0] : rawCategory;

  const slug = mainCategory
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "") // Remove accents
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9-]/g, "");

  return CATEGORY_CONFIG[slug] ? slug : null;
}
