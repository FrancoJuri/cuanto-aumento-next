"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";

export interface FavoriteProduct {
  slug: string;
  name: string;
  imageUrl: string;
  brand: string;
  category: string;
  currentPrice: number;
}

interface FavoritesContextType {
  favorites: FavoriteProduct[];
  isSidebarOpen: boolean;
  toggleSidebar: () => void;
  toggleFavorite: (product: FavoriteProduct) => void;
  checkIsFavorite: (slug: string) => boolean;
  removeFavorite: (slug: string) => void;
}

const FavoritesContext = createContext<FavoritesContextType | undefined>(
  undefined
);

export function FavoritesProvider({ children }: { children: ReactNode }) {
  const [favorites, setFavorites] = useState<FavoriteProduct[]>([]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);

  // Load from localStorage on mount
  useEffect(() => {
    const savedFavorites = localStorage.getItem("favorites");
    if (savedFavorites) {
      try {
        setFavorites(JSON.parse(savedFavorites));
      } catch (error) {
        console.error("Error parsing favorites from localStorage:", error);
      }
    }
    setIsInitialized(true);
  }, []);

  // Save to localStorage whenever favorites change
  useEffect(() => {
    if (isInitialized) {
      localStorage.setItem("favorites", JSON.stringify(favorites));
    }
  }, [favorites, isInitialized]);

  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };

  const toggleFavorite = (product: FavoriteProduct) => {
    setFavorites((prev) => {
      const exists = prev.some((p) => p.slug === product.slug);
      if (exists) {
        return prev.filter((p) => p.slug !== product.slug);
      } else {
        return [...prev, product];
      }
    });
  };

  const removeFavorite = (slug: string) => {
    setFavorites((prev) => prev.filter((p) => p.slug !== slug));
  };

  const checkIsFavorite = (slug: string) => {
    return favorites.some((p) => p.slug === slug);
  };

  return (
    <FavoritesContext.Provider
      value={{
        favorites,
        isSidebarOpen,
        toggleSidebar,
        toggleFavorite,
        checkIsFavorite,
        removeFavorite,
      }}
    >
      {children}
    </FavoritesContext.Provider>
  );
}

export function useFavorites() {
  const context = useContext(FavoritesContext);
  if (context === undefined) {
    throw new Error("useFavorites must be used within a FavoritesProvider");
  }
  return context;
}
