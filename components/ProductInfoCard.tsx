import { TrendingUp, TrendingDown, Share2, Bell } from "lucide-react";
import type { ProductDetail } from "@/types";

interface ProductInfoCardProps {
  product: ProductDetail;
  onCreateAlert?: () => void;
  onShare?: () => void;
}

const formatPrice = (price: number): string => {
  return new Intl.NumberFormat("es-AR", {
    style: "currency",
    currency: "ARS",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price);
};

const ProductInfoCard = ({
  product,
  onCreateAlert,
  onShare,
}: ProductInfoCardProps) => {
  const priceChange = product.priceChange ?? 0;
  const isPositiveChange = priceChange > 0;

  return (
    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden sticky top-4">
      {/* Product Image Placeholder */}
      <div className="aspect-square bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center p-6">
        {product.imageUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={product.imageUrl}
            alt={product.name}
            className="w-full h-full object-contain"
          />
        ) : (
          <p className="text-gray-500 text-center font-medium text-lg leading-relaxed">
            {product.name}
          </p>
        )}
      </div>

      {/* Product Info */}
      <div className="p-6">
        {/* Brand */}
        <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">
          {product.brand}
        </p>

        {/* Product Name */}
        <h1 className="text-xl font-semibold text-gray-900 mb-4 leading-tight">
          {product.name}
        </h1>

        {/* Current Price */}
        <div className="mb-4">
          <p className="text-3xl font-bold text-gray-900">
            {formatPrice(product.currentPrice)}
          </p>
          {priceChange !== 0 && (
            <div className="flex items-center gap-1 mt-1">
              {isPositiveChange ? (
                <TrendingUp className="w-4 h-4 text-red-500" />
              ) : (
                <TrendingDown className="w-4 h-4 text-green-500" />
              )}
              <span
                className={`text-sm font-medium ${
                  isPositiveChange ? "text-red-500" : "text-green-500"
                }`}
              >
                {isPositiveChange ? "+" : ""}
                {priceChange.toFixed(1)}% vs semana anterior
              </span>
            </div>
          )}
        </div>

        {/* Price Range */}
        <div className="space-y-2 mb-6 text-sm">
          <div className="flex justify-between">
            <span className="text-gray-500">Precio más bajo:</span>
            <span className="font-semibold text-green-600">
              {formatPrice(product.lowestPrice)}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500">Precio más alto:</span>
            <span className="font-semibold text-red-500">
              {formatPrice(product.highestPrice)}
            </span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3">
          <button
            onClick={onCreateAlert}
            className="flex-1 flex items-center justify-center gap-2 bg-brand-secondary hover:bg-brand-secondary-dark text-white font-semibold py-3 px-4 rounded-xl transition-colors"
          >
            <Bell className="w-4 h-4" />
            Crear Alerta
          </button>
          <button
            onClick={onShare}
            className="p-3 border border-gray-200 rounded-xl text-gray-500 hover:text-gray-700 hover:border-gray-300 transition-colors"
            aria-label="Compartir"
          >
            <Share2 className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductInfoCard;
