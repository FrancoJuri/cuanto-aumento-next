import { PriceHistory } from "@/types";

export interface InflationIndex {
  fecha: string; 
  valor: number; 
}

let inflationCache: InflationIndex[] | null = null;

export async function fetchInflationIndexes(): Promise<InflationIndex[]> {
  if (inflationCache) return inflationCache;

  try {
    
    const response = await fetch("https://api.argentinadatos.com/v1/finanzas/indices/inflacion");
    if (!response.ok) {
      throw new Error("Failed to fetch inflation data");
    }
    const data: InflationIndex[] = await response.json();
    
    inflationCache = data.sort((a, b) => new Date(a.fecha).getTime() - new Date(b.fecha).getTime());
    return inflationCache;
  } catch (error) {
    console.error("Error loading inflation data:", error);
    return [];
  }
}

function getDaysInMonth(year: number, month: number): number {
  return new Date(year, month + 1, 0).getDate();
}


export function generatePriceHistory(
  currentPrice: number,
  daysBack: number,
  inflationData: InflationIndex[]
): PriceHistory[] {
  if (!inflationData || inflationData.length === 0) return [];

  const history: PriceHistory[] = [];
  const today = new Date();
  
  let runningPrice = currentPrice;
  
  const inflationMap = new Map<string, number>();
  inflationData.forEach(item => {
    const d = new Date(item.fecha);
    const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`;
    inflationMap.set(key, item.valor);
  });

  for (let i = 0; i < daysBack; i++) {
    const targetDate = new Date(today);
    targetDate.setDate(today.getDate() - i);
    
    const year = targetDate.getFullYear();
    const month = targetDate.getMonth(); // 0-11
    const monthKey = `${year}-${String(month + 1).padStart(2, '0')}`;
    
    const monthlyRatePercent = inflationMap.get(monthKey) || 0; 
    const monthlyRate = monthlyRatePercent / 100;
    
    const daysInMonth = getDaysInMonth(year, month);
    const dailyGrowthFactor = Math.pow(1 + monthlyRate, 1 / daysInMonth);
    
    history.push({
      date: targetDate.toISOString(),
      price: runningPrice
    });
    runningPrice = runningPrice / dailyGrowthFactor;
  }

  return history.reverse();
}
