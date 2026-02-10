"use client";

import { useFavorites } from "@/context/FavoritesContext";
import { X, Trash2, ShoppingCart } from "lucide-react";
import Link from "next/link";
import { useEffect, useRef } from "react";

export default function FavoritesSidebar() {
  const { favorites, isSidebarOpen, toggleSidebar, removeFavorite } = useFavorites();
  const sidebarRef = useRef<HTMLDivElement>(null);

  // Close when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        sidebarRef.current &&
        !sidebarRef.current.contains(event.target as Node) &&
        isSidebarOpen
      ) {
        toggleSidebar();
      }
    };

    if (isSidebarOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      // Prevent scrolling when sidebar is open
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.body.style.overflow = "unset";
    };
  }, [isSidebarOpen, toggleSidebar]);

  return (
    <>
      {/* Overlay */}
      <div
        className={`fixed inset-0 bg-black/50 z-50 transition-opacity duration-300 ${
          isSidebarOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        aria-hidden="true"
      />

      {/* Sidebar */}
      <div
        ref={sidebarRef}
        className={`fixed inset-y-0 right-0 z-50 w-full sm:max-w-md bg-white shadow-xl transform transition-transform duration-300 ease-in-out ${
          isSidebarOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="h-full flex flex-col">
          {/* Header */}
          <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between bg-white">
            <h2 className="text-xl font-semibold text-gray-900 flex items-center gap-2">
              <ShoppingCart className="w-5 h-5 text-brand-primary" />
              Mis Favoritos
              <span className="text-sm font-normal text-gray-500 ml-2">
                ({favorites.length})
              </span>
            </h2>
            <button
              onClick={toggleSidebar}
              className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-colors"
              aria-label="Cerrar favoritos"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* List */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {favorites.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center p-6 text-gray-500 space-y-4">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center">
                  <ShoppingCart className="w-8 h-8 text-gray-400" />
                </div>
                <p className="text-lg font-medium text-gray-900">
                  Tu lista está vacía
                </p>
                <p className="text-sm max-w-xs mx-auto">
                  Agregá productos para seguir sus precios y verlos aquí.
                </p>
                <button
                  onClick={toggleSidebar}
                  className="mt-4 px-6 py-2 bg-brand-primary text-white rounded-full font-medium hover:bg-brand-primary-dark transition-colors cursor-pointer"
                >
                  Explorar productos
                </button>
              </div>
            ) : (
              favorites.map((product) => (
                <div
                  key={product.slug}
                  className="group flex gap-4 p-4 bg-white border border-gray-100 rounded-xl hover:border-brand-primary/30 hover:shadow-sm transition-all duration-200"
                >
                  {/* Image */}
                  <Link
                    href={`/producto/${product.slug}`}
                    onClick={toggleSidebar}
                    className="w-20 h-20 bg-gray-50 rounded-lg flex items-center justify-center p-2 flex-shrink-0 hover:opacity-80 transition-opacity"
                  >
                    {product.imageUrl ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={product.imageUrl}
                        alt={product.name}
                        className="w-full h-full object-contain mix-blend-multiply"
                      />
                    ) : (
                      <span className="text-xs text-gray-400 text-center">
                        Sin imagen
                      </span>
                    )}
                  </Link>

                  {/* Info */}
                  <div className="flex-1 min-w-0 flex flex-col justify-between">
                    <div>
                      <p className="text-xs font-medium text-brand-primary uppercase tracking-wide mb-1">
                        {product.brand}
                      </p>
                      <Link
                        href={`/producto/${product.slug}`}
                        onClick={toggleSidebar}
                        className="text-sm font-medium text-gray-900 hover:text-brand-primary transition-colors line-clamp-2"
                      >
                        {product.name}
                      </Link>
                    </div>
                    <div className="flex items-end justify-between mt-2">
                       <p className="text-lg font-bold text-gray-900">
                        ${product.currentPrice.toLocaleString("es-AR")}
                      </p>
                    </div>
                  </div>

                  {/* Remove Button */}
                  <button
                    onClick={() => removeFavorite(product.slug)}
                    className="self-start p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors opacity-0 group-hover:opacity-100 focus:opacity-100"
                    aria-label={`Eliminar ${product.name}`}
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))
            )}
          </div>

          {/* Footer (Optional actions) */}
          {favorites.length > 0 && (
            <div className="p-6 border-t border-gray-100 bg-gray-50">
               <button
                onClick={toggleSidebar}
                className="w-full py-3 bg-white border border-gray-300 text-gray-700 font-medium rounded-xl hover:bg-gray-50 transition-colors cursor-pointer"
              >
                Seguir navegando
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
