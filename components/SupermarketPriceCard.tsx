import { MapPin, TrendingUp, TrendingDown } from "lucide-react";
import type { SupermarketPrice } from "@/types";

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

  return (
    <button
      onClick={onClick}
      className="w-full flex items-center gap-4 p-4 rounded-xl border border-gray-100 hover:border-gray-200 hover:bg-gray-50/50 transition-all duration-200 text-left group"
    >
      {/* Location Icon */}
      <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center">
        <MapPin className="w-5 h-5 text-gray-400" />
      </div>

      {/* Supermarket Info */}
      <div className="flex-1 min-w-0">
        <p className="font-semibold text-gray-900 group-hover:text-brand-primary transition-colors">
          {supermarket.name}
        </p>
        <p className="text-sm text-gray-400">{supermarket.lastUpdated}</p>
      </div>

      {/* Price & Badge */}
      <div className="flex-shrink-0 text-right">
        <div className="flex items-center gap-2 justify-end">
          <span className="text-lg font-bold text-gray-900">
            {formatPrice(supermarket.currentPrice)}
          </span>
          {supermarket.isBestPrice && (
            <span className="px-2 py-0.5 text-xs font-semibold bg-green-100 text-green-700 rounded-full whitespace-nowrap">
              MEJOR PRECIO
            </span>
          )}
        </div>

        {/* Price Change */}
        {priceChange !== 0 && (
          <div className="flex items-center gap-1 justify-end mt-0.5">
            {isNegativeChange ? (
              <TrendingDown className="w-3 h-3 text-green-500" />
            ) : (
              <TrendingUp className="w-3 h-3 text-red-500" />
            )}
            <span
              className={`text-sm font-medium ${
                isPositiveChange ? "text-red-500" : "text-green-500"
              }`}
            >
              {isPositiveChange ? "+" : ""}
              {priceChange.toFixed(2)}%
            </span>
          </div>
        )}
      </div>
    </button>
  );
};

export default SupermarketPriceCard;
