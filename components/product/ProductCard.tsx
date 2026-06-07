import { Bookmark } from "lucide-react";
import Link from "next/link";
import { ApiProduct, getEffectiveMinPrice } from "@/lib/api";
import { useFavorites } from "@/context/FavoritesContext";

interface ProductCardProps {
  product: ApiProduct;
}

const ProductCard = ({ product }: ProductCardProps) => {
  // Count every supermarket that lists the product, regardless of availability.
  const supermarketCount = product.prices?.length ?? 0;
  const { toggleFavorite, checkIsFavorite } = useFavorites();
  const isFavorite = checkIsFavorite(product.ean);

  const handleToggleFavorite = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    toggleFavorite({
      slug: product.ean,
      name: product.name,
      imageUrl: product.image_url || "",
      brand: product.brand,
      category: product.category,
      currentPrice: getEffectiveMinPrice(product.min_price, product.prices || []),
    });
  };

  return (
    <Link href={`/producto/${product.ean}`} className="block group">
      <article className="bg-white rounded-xl border border-gray-200 overflow-hidden transition-all duration-300 hover:shadow-lg hover:border-gray-300 hover:-translate-y-1">
        {/* Image Section */}
        <div className="relative aspect-[4/3] sm:aspect-[4/5] bg-gradient-to-br from-gray-50 to-gray-100">
          {/* Bookmark Button */}
          <button
            className={`absolute top-3 right-3 p-2 rounded-lg backdrop-blur-sm border transition-colors cursor-pointer z-10 ${
              isFavorite
                ? "bg-brand-primary text-white border-brand-primary"
                : "bg-white/80 border-gray-200 text-gray-400 hover:text-brand-primary hover:bg-white"
            }`}
            onClick={handleToggleFavorite}
            aria-label={isFavorite ? "Quitar de favoritos" : "Guardar en favoritos"}
          >
            <Bookmark className={`w-4 h-4 ${isFavorite ? "fill-current" : ""}`} />
          </button>

          {/* Product Image or Name Overlay */}
          {product.image_url ? (
            <img
              src={product.image_url}
              alt={product.name}
              className="absolute inset-0 w-full h-full object-contain p-4"
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center p-4">
              <p className="text-gray-600 text-center font-medium line-clamp-3">
                {product.name}
              </p>
            </div>
          )}
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
            Precios en {supermarketCount} supermercado
            {supermarketCount !== 1 ? "s" : ""}
          </p>
        </div>
      </article>
    </Link>
  );
};

export default ProductCard;
