import { Bookmark } from "lucide-react";
import Link from "next/link";

export interface Product {
  id: string;
  name: string;
  brand: string;
  supermarketCount: number;
  imageUrl?: string;
  slug: string;
  minPrice?: number;
}

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  return (
    <Link href={`/producto/${product.slug}`} className="block group">
      <article className="bg-white rounded-xl border border-gray-200 overflow-hidden transition-all duration-300 hover:shadow-lg hover:border-gray-300 hover:-translate-y-1">
        {/* Image Section */}
        <div className="relative aspect-[4/5] bg-gradient-to-br from-gray-50 to-gray-100">
          {/* Bookmark Button */}
          <button
            className="absolute top-3 right-3 p-2 rounded-lg bg-white/80 backdrop-blur-sm border border-gray-200 text-gray-400 hover:text-brand-primary hover:bg-white transition-colors z-10"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              // TODO: Implement bookmark functionality
            }}
            aria-label="Guardar producto"
          >
            <Bookmark className="w-4 h-4" />
          </button>

          {/* Product Name Overlay */}
          <div className="absolute inset-0 flex items-center justify-center p-4">
            <p className="text-gray-600 text-center font-medium line-clamp-3">
              {product.name}
            </p>
          </div>
        </div>

        {/* Content Section */}
        <div className="p-4">
          {/* Brand */}
          <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">
            {product.brand}
          </p>

          {/* Product Name */}
          <h3 className="font-medium text-gray-900 text-sm line-clamp-2 mb-2 group-hover:text-brand-primary transition-colors">
            {product.name}
          </h3>

          {/* Supermarket Count */}
          <p className="text-xs text-brand-primary font-medium">
            Precios en {product.supermarketCount} supermercado
            {product.supermarketCount !== 1 ? "s" : ""}
          </p>
        </div>
      </article>
    </Link>
  );
};

export default ProductCard;
