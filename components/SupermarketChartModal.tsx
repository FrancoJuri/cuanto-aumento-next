"use client";

import { X } from "lucide-react";
import { useEffect, useCallback, useState, useMemo } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import type { SupermarketPrice, TimeRange, PriceHistory } from "@/types";

interface SupermarketChartModalProps {
  supermarket: SupermarketPrice;
  isOpen: boolean;
  onClose: () => void;
}

const timeRangeOptions: { value: TimeRange; label: string }[] = [
  { value: "7D", label: "7D" },
  { value: "1M", label: "1M" },
  { value: "3M", label: "3M" },
  { value: "6M", label: "6M" },
  { value: "1A", label: "1A" },
];

const filterDataByTimeRange = (
  data: PriceHistory[],
  range: TimeRange
): PriceHistory[] => {
  const now = new Date();
  let startDate: Date;

  switch (range) {
    case "7D":
      startDate = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
      break;
    case "1M":
      startDate = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
      break;
    case "3M":
      startDate = new Date(now.getTime() - 90 * 24 * 60 * 60 * 1000);
      break;
    case "6M":
      startDate = new Date(now.getTime() - 180 * 24 * 60 * 60 * 1000);
      break;
    case "1A":
      startDate = new Date(now.getTime() - 365 * 24 * 60 * 60 * 1000);
      break;
    default:
      startDate = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
  }

  return data.filter((item) => new Date(item.date) >= startDate);
};

const formatChartDate = (dateStr: string): string => {
  const date = new Date(dateStr);
  return date.toLocaleDateString("es-AR", { day: "2-digit", month: "short" });
};

const formatPrice = (price: number): string => {
  return new Intl.NumberFormat("es-AR", {
    style: "currency",
    currency: "ARS",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price);
};

const SupermarketChartModal = ({
  supermarket,
  isOpen,
  onClose,
}: SupermarketChartModalProps) => {
  const [selectedRange, setSelectedRange] = useState<TimeRange>("7D");

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    },
    [onClose]
  );

  useEffect(() => {
    if (isOpen) {
      document.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, handleKeyDown]);

  const filteredData = useMemo(
    () => filterDataByTimeRange(supermarket.priceHistory, selectedRange),
    [supermarket.priceHistory, selectedRange]
  );

  const chartData = useMemo(
    () =>
      filteredData.map((item) => ({
        ...item,
        formattedDate: formatChartDate(item.date),
      })),
    [filteredData]
  );

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-2xl mx-4 max-h-[90vh] overflow-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-100">
          <div>
            <h2 className="text-xl font-semibold text-gray-900">
              {supermarket.name}
            </h2>
            <p className="text-sm text-gray-500 mt-1">
              Historial de precios
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
            aria-label="Cerrar"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Time Range Filters */}
          <div className="flex gap-1 mb-6">
            {timeRangeOptions.map((option) => (
              <button
                key={option.value}
                onClick={() => setSelectedRange(option.value)}
                className={`px-3 py-1.5 text-sm font-medium rounded-lg transition-colors ${
                  selectedRange === option.value
                    ? "bg-brand-primary text-white"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                {option.label}
              </button>
            ))}
          </div>

          {/* Chart */}
          <div className="h-72">
            {chartData.length > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={chartData}
                  margin={{ top: 10, right: 10, left: 10, bottom: 20 }}
                >
                  <CartesianGrid
                    strokeDasharray="3 3"
                    vertical={false}
                    stroke="#e5e7eb"
                  />
                  <XAxis
                    dataKey="formattedDate"
                    axisLine={false}
                    tickLine={false}
                    tick={{ fontSize: 12, fill: "#6b7280" }}
                  />
                  <YAxis
                    axisLine={false}
                    tickLine={false}
                    tick={{ fontSize: 12, fill: "#6b7280" }}
                    tickFormatter={(value) =>
                      `$${(value / 1000).toFixed(1)}k`
                    }
                  />
                  <Tooltip
                    formatter={(value) => [formatPrice(value as number), "Precio"]}
                    labelFormatter={(label) => `Fecha: ${label}`}
                    contentStyle={{
                      backgroundColor: "white",
                      border: "1px solid #e5e7eb",
                      borderRadius: "8px",
                      boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
                    }}
                  />
                  <Line
                    type="monotone"
                    dataKey="price"
                    stroke="var(--brand-primary)"
                    strokeWidth={2}
                    dot={{ fill: "var(--brand-primary)", strokeWidth: 0, r: 4 }}
                    activeDot={{ r: 6, fill: "var(--brand-primary-dark)" }}
                  />
                </LineChart>
              </ResponsiveContainer>
            ) : (
              <div className="h-full flex items-center justify-center text-gray-500">
                No hay datos disponibles para este período
              </div>
            )}
          </div>

          {/* Current Price Info */}
          <div className="mt-6 p-4 bg-gray-50 rounded-xl">
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Precio actual</span>
              <span className="text-2xl font-bold text-gray-900">
                {formatPrice(supermarket.currentPrice)}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SupermarketChartModal;
