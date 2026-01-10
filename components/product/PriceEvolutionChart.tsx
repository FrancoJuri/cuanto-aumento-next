"use client";

import { useState, useMemo } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import type { PriceHistory, TimeRange } from "@/types";

interface PriceEvolutionChartProps {
  priceHistory: PriceHistory[];
  title?: string;
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

const PriceEvolutionChart = ({
  priceHistory,
  title = "Evolución de Precios",
}: PriceEvolutionChartProps) => {
  const [selectedRange, setSelectedRange] = useState<TimeRange>("7D");

  const filteredData = useMemo(
    () => filterDataByTimeRange(priceHistory, selectedRange),
    [priceHistory, selectedRange]
  );

  const chartData = useMemo(
    () =>
      filteredData.map((item) => ({
        ...item,
        formattedDate: formatChartDate(item.date),
      })),
    [filteredData]
  );

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold text-gray-900">{title}</h2>

        {/* Time Range Filters */}
        <div className="flex gap-1">
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
      </div>

      {/* Chart */}
      <div className="h-64">
        {chartData.length > 0 ? (
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
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
              <Bar
                dataKey="price"
                fill="var(--brand-primary)"
                radius={[4, 4, 0, 0]}
                maxBarSize={50}
              />
            </BarChart>
          </ResponsiveContainer>
        ) : (
          <div className="h-full flex items-center justify-center text-gray-500">
            No hay datos disponibles para este período
          </div>
        )}
      </div>

      {/* X-axis Labels */}
      <div className="flex justify-between text-xs text-gray-400 mt-2">
        <span>Hace {selectedRange === "7D" ? "7 días" : selectedRange}</span>
        <span>Hoy</span>
      </div>
    </div>
  );
};

export default PriceEvolutionChart;
