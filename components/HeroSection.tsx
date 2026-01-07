"use client";

import { Search } from "lucide-react";
import { useState, useEffect, useCallback } from "react";

interface FloatingCircle {
  id: number;
  x: number;
  y: number;
  size: number;
  color: string;
  delay: number;
}

interface HeroSectionProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

const generateCircles = (): FloatingCircle[] => {
  const colors = [
    "bg-blue-400/30",
    "bg-purple-400/30",
    "bg-pink-400/30",
    "bg-cyan-400/30",
    "bg-indigo-400/30",
  ];

  return Array.from({ length: 6 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 80 + 40,
    color: colors[i % colors.length],
    delay: i * 1.5,
  }));
};

const HeroSection = ({ searchQuery, setSearchQuery }: HeroSectionProps) => {
  const [circles, setCircles] = useState<FloatingCircle[]>([]);

  useEffect(() => {
    setCircles(generateCircles());
  }, []);

  const handleSearchChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setSearchQuery(e.target.value);
    },
    [setSearchQuery]
  );

  return (
    <section className="relative min-h-[60vh] md:min-h-[70vh] flex items-center justify-center overflow-hidden bg-gradient-to-br from-slate-100 via-blue-50/50 to-slate-100">
      {/* Floating Circles Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {circles.map((circle) => (
          <div
            key={circle.id}
            className={`floating-circle absolute rounded-full blur-2xl ${circle.color}`}
            style={{
              left: `${circle.x}%`,
              top: `${circle.y}%`,
              width: `${circle.size}px`,
              height: `${circle.size}px`,
              animationDelay: `${circle.delay}s`,
            }}
          />
        ))}
      </div>

      {/* Main Hero Card */}
      <div className="relative z-10 w-full max-w-xl mx-4 sm:mx-6 lg:mx-8">
        <div className="liquid-glass-container rounded-3xl p-8 sm:p-10 md:p-12 bg-white/80 shadow-xl">
          {/* Title */}
          <h1 className="font-[family-name:var(--font-outfit)] text-4xl sm:text-5xl md:text-6xl font-bold text-center text-gray-900 mb-6">
            ¿Cuanto Aumento?
          </h1>

          {/* Search Input */}
          <div className="relative mb-6">
            <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
              <Search className="w-5 h-5 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Busca un producto..."
              value={searchQuery}
              onChange={handleSearchChange}
              className="w-full pl-12 pr-4 py-4 rounded-xl bg-white/90 border border-gray-200 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-brand-primary/50 focus:border-brand-primary transition-all duration-200"
            />
          </div>

          {/* Subtitle */}
          <p className="text-center text-gray-600 text-sm sm:text-base">
            Descubre cuánto subieron los
            <br />
            precios de cada producto cada día.
          </p>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
