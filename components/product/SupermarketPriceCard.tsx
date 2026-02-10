import { MapPin, TrendingUp, TrendingDown, ExternalLink } from "lucide-react";
import type { SupermarketPrice } from "@/types";
import { format } from "date-fns";
import { es } from "date-fns/locale";

interface SupermarketPriceCardProps {
  supermarket: SupermarketPrice;
  onClick?: () => void;
}

const formatPrice = (price: number): string => {
  return new Intl.NumberFormat("es-AR", {
    style: "currency",
    currency: "ARS",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price);
};

const SupermarketPriceCard = ({
  supermarket,
  onClick,
}: SupermarketPriceCardProps) => {
  const priceChange = supermarket.priceChange ?? 0;
  const isPositiveChange = priceChange > 0;
  const isNegativeChange = priceChange < 0;

  // Format date: "6 de febrero a las 22:18"
  const formattedDate = format(new Date(supermarket.lastUpdated), "d 'de' MMMM 'a las' HH:mm", {
    locale: es,
  });

  return (
    <div className="w-full flex items-stretch gap-2">
      <button
        onClick={onClick}
        className="flex-1 flex items-center gap-3 sm:gap-4 p-3 sm:p-4 rounded-xl border border-gray-100 hover:border-gray-200 hover:bg-gray-50/50 transition-all duration-200 text-left group cursor-pointer"
      >
        {/* Location Icon */}
        <div className="flex-shrink-0 w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-gray-100 flex items-center justify-center">
          <MapPin className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400" />
        </div>

        {/* Supermarket Info + Price */}
        <div className="flex-1 min-w-0 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 sm:gap-4">
          {/* Supermarket Info */}
          <div className="min-w-0">
            <p className="font-semibold text-gray-900 group-hover:text-brand-primary transition-colors truncate">
              {supermarket.name}
            </p>
            <p className="text-xs sm:text-sm text-gray-400 capitalize">{formattedDate}</p>
          </div>

          {/* Price & Badge */}
          <div className="flex-shrink-0 flex items-center gap-2 sm:flex-col sm:items-end">
            <div className="flex items-center gap-2">
              <span className="text-base sm:text-lg font-bold text-gray-900">
                {formatPrice(supermarket.currentPrice)}
              </span>
              {supermarket.isBestPrice && (
                <span className="px-1.5 py-0.5 text-[10px] sm:text-xs font-semibold bg-green-100 text-green-700 rounded-full whitespace-nowrap">
                  MEJOR PRECIO
                </span>
              )}
            </div>

            {/* Price Change */}
            {priceChange !== 0 && (
              <div className="flex items-center gap-1 sm:justify-end mt-0 sm:mt-0.5">
                {isNegativeChange ? (
                  <TrendingDown className="w-3 h-3 text-green-500" />
                ) : (
                  <TrendingUp className="w-3 h-3 text-red-500" />
                )}
                <span
                  className={`text-xs sm:text-sm font-medium ${
                    isPositiveChange ? "text-red-500" : "text-green-500"
                  }`}
                >
                  {isPositiveChange ? "+" : ""}
                  {priceChange.toFixed(2)}%
                </span>
              </div>
            )}
          </div>
        </div>
      </button>

      {/* External Link Button */}
      {supermarket.productUrl && (
        <a
          href={supermarket.productUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-shrink-0 w-12 flex items-center justify-center rounded-xl border border-gray-100 hover:border-gray-200 hover:bg-gray-50/50 hover:text-brand-primary text-gray-400 transition-all duration-200"
          title="Ver en supermercado"
        >
          <ExternalLink className="w-5 h-5" />
        </a>
      )}
    </div>
  );
};

export default SupermarketPriceCard;
