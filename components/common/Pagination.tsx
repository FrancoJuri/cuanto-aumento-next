"use client";

import { ChevronRight } from "lucide-react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange?: (page: number) => void;
}

const Pagination = ({
  currentPage = 1,
  totalPages = 6,
  onPageChange,
}: PaginationProps) => {
  const pages: (number | string)[] = [];

  // Generate page numbers with ellipsis logic
  for (let i = 1; i <= totalPages; i++) {
    if (
      i === 1 ||
      i === totalPages ||
      (i >= currentPage - 1 && i <= currentPage + 1)
    ) {
      pages.push(i);
    } else if (i === currentPage - 2 || i === currentPage + 2) {
      pages.push("...");
    }
  }

  // Remove duplicate ellipsis
  const uniquePages = pages.filter((page, index) => {
    if (page === "...") {
      return pages[index - 1] !== "...";
    }
    return true;
  });

  return (
    <div className="flex items-center justify-center space-x-2 py-8">
      {uniquePages.map((page, index) => (
        <button
          key={index}
          onClick={() => typeof page === "number" && onPageChange?.(page)}
          disabled={page === "..." || page === currentPage}
          className={`px-3 py-2 text-sm font-medium rounded-md transition-colors ${
            page === currentPage
              ? "bg-gray-900 text-white"
              : page === "..."
                ? "text-gray-400 cursor-default"
                : "text-gray-700 hover:bg-gray-100"
          }`}
        >
          {page}
        </button>
      ))}

      {currentPage < totalPages && (
        <button
          onClick={() => onPageChange?.(currentPage + 1)}
          className="flex items-center space-x-1 px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-md transition-colors"
        >
          <span>Siguiente</span>
          <ChevronRight className="w-4 h-4" />
        </button>
      )}
    </div>
  );
};

export default Pagination;
