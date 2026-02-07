"use client";

import { useState, useEffect, useMemo } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Brush,
} from "recharts";
import { fetchInflationIndexes, generatePriceHistory, type InflationIndex } from "@/lib/inflation";
import type { PriceHistory } from "@/types";
import { format } from "date-fns";
import { es } from "date-fns/locale";

interface PriceEvolutionChartProps {
  currentPrice: number;
  title?: string;
}

// Extended time range options including "Historico"
const timeRangeOptions: { value: string; label: string; days?: number }[] = [
  { value: "1M", label: "1 Mes", days: 30 },
  { value: "3M", label: "3 Meses", days: 90 },
  { value: "6M", label: "6 Meses", days: 180 },
  { value: "1Y", label: "1 Año", days: 365 },
  { value: "5Y", label: "5 Años", days: 365 * 5 },
];

const formatChartDate = (dateStr: string, formatStr: string = "dd MMM yy"): string => {
  return format(new Date(dateStr), formatStr, { locale: es });
};

const formatPrice = (price: number): string => {
  if (price === 0) return "$0";
  if (price < 0.01) {
    return new Intl.NumberFormat("es-AR", {
      style: "currency",
      currency: "ARS",
      minimumFractionDigits: 4,
      maximumFractionDigits: 6,
    }).format(price);
  }
  if (price < 1) {
    return new Intl.NumberFormat("es-AR", {
      style: "currency",
      currency: "ARS",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(price);
  }
  return new Intl.NumberFormat("es-AR", {
    style: "currency",
    currency: "ARS",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price);
};

const PriceEvolutionChart = ({
  currentPrice,
  title = "Evolución de Precios (Por inflación)",
}: PriceEvolutionChartProps) => {
  const [inflationData, setInflationData] = useState<InflationIndex[]>([]);
  const [historyData, setHistoryData] = useState<PriceHistory[]>([]);
  const [loading, setLoading] = useState(true);
  
  // Brush state for controlled zooming
  const [brushState, setBrushState] = useState<{ startIndex: number; endIndex: number }>({ startIndex: 0, endIndex: 0 });
  const [activeRange, setActiveRange] = useState<string>("1Y");

  useEffect(() => {
    async function loadData() {
      try {
        const data = await fetchInflationIndexes();
        setInflationData(data);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  useEffect(() => {
    if (inflationData.length > 0 && currentPrice) {
      const start1990 = new Date('1990-01-01');
      const now = new Date();
      const diffTime = Math.abs(now.getTime() - start1990.getTime());
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 100; // +100 margin

      const history = generatePriceHistory(currentPrice, diffDays, inflationData);
      setHistoryData(history);
      
      // Default view: Last 1 Year
    }
  }, [inflationData, currentPrice]);

  const chartData = useMemo(() => {
    if (!historyData.length) return [];
    
    const targetPoints = 500;
    const totalPoints = historyData.length;
    const step = Math.ceil(totalPoints / targetPoints);
    
    const downsampled = historyData.filter((_, index) => index % step === 0 || index === totalPoints - 1);
    
    return downsampled.map((item) => ({
      ...item,
      formattedDate: formatChartDate(item.date),
      fullDate: formatChartDate(item.date, "dd MMMM yyyy"),
      displayPrice: item.price, 
    }));
  }, [historyData]);

  // Update Brush when chartData changes (e.g. initial load)
  useEffect(() => {
    if (chartData.length > 0 && activeRange === '1Y') {
       const oneYearAgo = new Date();
       oneYearAgo.setFullYear(oneYearAgo.getFullYear() - 1);
       
       const startIndex = chartData.findIndex(d => new Date(d.date) >= oneYearAgo);
       const validStart = startIndex >= 0 ? startIndex : Math.max(0, chartData.length - 50); // Fallback
       setBrushState({ startIndex: validStart, endIndex: chartData.length - 1 });
    }
  }, [chartData]); // Only depends on chartData reconstruction

  const handleRangeChange = (rangeValue: string, days?: number) => {
    setActiveRange(rangeValue);
    if (!chartData.length) return;

    const endIndex = chartData.length - 1;
    let startIndex = 0;

    if (days) {
        // We need to find the index corresponding to 'days' ago
        const targetDate = new Date();
        targetDate.setDate(targetDate.getDate() - days);
        const idx = chartData.findIndex(d => new Date(d.date) >= targetDate);
        startIndex = idx >= 0 ? idx : 0;
    }

    setBrushState({ startIndex, endIndex });
  };

  const handleBrushChange = (newBrush: any) => {
    if (newBrush && newBrush.startIndex !== undefined && newBrush.endIndex !== undefined) {
      setBrushState({ startIndex: newBrush.startIndex, endIndex: newBrush.endIndex });
      setActiveRange(""); 
    }
  };

  if (loading) {
    return (
      <div className="h-[450px] flex items-center justify-center text-gray-400 bg-white rounded-xl border border-gray-200">
        Cargando datos históricos...
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-4 sm:p-6">
      {/* Header */}
      <div className="flex flex-col gap-4 mb-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <h2 className="text-lg font-semibold text-gray-900">{title}</h2>
          
          {/* Filters */}
          <div className="flex flex-wrap gap-1.5">
            {timeRangeOptions.map((option) => (
              <button
                key={option.value}
                onClick={() => handleRangeChange(option.value, option.days)}
                className={`px-3 py-1.5 text-xs sm:text-sm font-medium rounded-lg transition-colors border ${
                  activeRange === option.value
                    ? "bg-brand-primary text-white border-brand-primary"
                    : "bg-white text-gray-600 border-gray-200 hover:bg-gray-50 hover:text-gray-900"
                }`}
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Chart */}
      <div className="h-[400px] w-full" style={{ touchAction: "none" }}> 
        {chartData.length > 0 ? (
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={chartData}
              margin={{ top: 10, right: 10, left: 0, bottom: 20 }}
            >
              <CartesianGrid
                strokeDasharray="3 3"
                vertical={false}
                stroke="#f3f4f6"
              />
              <XAxis
                dataKey="formattedDate"
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 11, fill: "#9ca3af" }}
                minTickGap={50}
              />
              <YAxis
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 11, fill: "#9ca3af" }}
                tickFormatter={(value) => {
                  if (value >= 1000000) return `$${(value / 1000000).toFixed(1).replace(/\.0$/, '')}M`;
                  if (value >= 1000) return `$${(value / 1000).toFixed(1).replace(/\.0$/, '')}k`;
                  return `$${Math.round(value)}`;
                }}
                width={45}
                domain={['auto', 'auto']}
              />
              <Tooltip
                formatter={(value) => [formatPrice(value as number), "Precio"]}
                labelFormatter={(label, payload) => {
                    if (payload && payload[0] && payload[0].payload) {
                        return `Fecha: ${payload[0].payload.fullDate}`;
                    }
                    return `Fecha: ${label}`;
                }}
                contentStyle={{
                  backgroundColor: "rgba(255, 255, 255, 0.95)",
                  border: "1px solid #e5e7eb",
                  borderRadius: "8px",
                  boxShadow: "0 10px 15px -3px rgb(0 0 0 / 0.1)",
                  fontSize: "13px",
                  padding: "8px 12px"
                }}
              />
              <Line
                type="monotone"
                dataKey="displayPrice"
                stroke="var(--brand-primary)"
                strokeWidth={2}
                dot={false}
                activeDot={{ r: 4, strokeWidth: 0, fill: "var(--brand-primary-dark)" }}
                animationDuration={300}
                isAnimationActive={true}
              />
               <Brush 
                dataKey="formattedDate" 
                height={40} 
                stroke="#cbd5e1"
                fill="#f8fafc"
                startIndex={brushState.startIndex}
                endIndex={brushState.endIndex}
                onChange={handleBrushChange}
                tickFormatter={() => ""}
                alwaysShowText={false}
              >
                  <LineChart>
                       <Line 
                          type="monotone" 
                          dataKey="displayPrice" 
                          stroke="#94a3b8" 
                          strokeWidth={1} 
                          dot={false} 
                          isAnimationActive={false}
                        />
                  </LineChart>
              </Brush>
            </LineChart>
          </ResponsiveContainer>
        ) : (
          <div className="h-full flex items-center justify-center text-gray-500 text-sm">
            No hay datos de inflación suficientes para generar el histórico.
          </div>
        )}
      </div>

      {/* Disclaimer Banner */}
      <div className="mt-6 p-4 bg-brand-primary/5 border border-brand-primary/10 rounded-xl flex items-start gap-3">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5 text-brand-primary mt-0.5 flex-shrink-0">
          <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
        </svg>
        <div className="text-sm text-gray-600 space-y-1">
            <p><strong className="text-gray-900">Nota importante:</strong> Este gráfico es una <strong>estimación teórica</strong>.</p>
            <p>Se calcula proyectando el precio actual hacia el pasado utilizando los índices de inflación oficiales (IPC) de Argentina. No representa el precio real histórico del producto en góndola, sino cuánto habría costado ajustado por inflación.</p>
        </div>
      </div>
    </div>
  );
};

export default PriceEvolutionChart;
