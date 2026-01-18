import ProductCard from "./ProductCard";
import Pagination from "../common/Pagination";
import { ApiProduct } from "@/lib/api";

interface ProductGridProps {
  products: ApiProduct[];
  currentPage?: number;
  totalPages?: number;
  onPageChange?: (page: number) => void;
}

const ProductGrid = ({
  products,
  currentPage = 1,
  totalPages = 1,
  onPageChange,
}: ProductGridProps) => {
  if (products.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16">
        <div className="text-6xl mb-4">🔍</div>
        <h3 className="text-xl font-semibold text-gray-900 mb-2">
          No se encontraron productos
        </h3>
        <p className="text-gray-500">
          Intenta con otros términos de búsqueda
        </p>
      </div>
    );
  }

  return (
    <div className="py-8">
      {/* Products Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6">
        {products.map((product) => (
          <ProductCard key={product.ean} product={product} />
        ))}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={onPageChange}
        />
      )}
    </div>
  );
};

export default ProductGrid;
