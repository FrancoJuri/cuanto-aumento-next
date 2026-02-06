import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { CATEGORY_CONFIG } from "@/lib/categories";

interface ProductDetailHeaderProps {
  categoryName: string;
  categorySlug: string;
  productName: string;
}

const ProductDetailHeader = ({
  categoryName,
  categorySlug,
  productName,
}: ProductDetailHeaderProps) => {
  const isKnownCategory = categorySlug in CATEGORY_CONFIG;
  const categoryLink = isKnownCategory 
    ? `/categoria/${categorySlug}` 
    : `/buscar?q=${encodeURIComponent(categoryName)}`;

  return (
    <nav className="mb-6">
      <ol className="flex items-center gap-2 text-sm flex-wrap">
        <li>
          <Link
            href="/"
            className="flex items-center gap-1 text-gray-500 hover:text-brand-primary transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Volver
          </Link>
        </li>
        <li className="text-gray-300">/</li>
        <li>
          <Link
            href={categoryLink}
            className="text-gray-500 hover:text-brand-primary transition-colors"
          >
            {categoryName}
          </Link>
        </li>
        <li className="text-gray-300">/</li>
        <li className="text-gray-800 font-medium truncate max-w-xs">
          {productName}
        </li>
      </ol>
    </nav>
  );
};

export default ProductDetailHeader;
