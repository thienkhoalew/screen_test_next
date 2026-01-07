import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

export function Pagination({
  page,
  totalPages,
  onChange,
}: {
  page: number;
  totalPages: number;
  onChange: (page: number) => void;
}) {
  const renderPageNumbers = () => {
    const pages = [];
    const maxVisiblePages = 5;

    if (totalPages <= maxVisiblePages + 2) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      // Always show first page
      pages.push(1);

      if (page > 3) {
        pages.push("...");
      }

      const start = Math.max(2, page - 1);
      const end = Math.min(totalPages - 1, page + 1);

      // Adjust if close to beginning
      if (page < 4) {
        for (let i = 2; i <= maxVisiblePages; i++) {
          pages.push(i);
        }
      }
      // Adjust if close to end
      else if (page > totalPages - 3) {
        for (let i = totalPages - maxVisiblePages + 1; i < totalPages; i++) {
          pages.push(i);
        }
      } else {
        for (let i = start; i <= end; i++) {
          pages.push(i);
        }
      }

      if (page < totalPages - 2) {
        pages.push("...");
      }

      // Always show last page
      pages.push(totalPages);
    }

    return pages.map((p, index) => {
      if (p === "...") {
        return (
          <span key={`ellipsis-${index}`} className="flex items-center justify-center w-8 h-8 text-gray-400 pb-2">
            ...
          </span>
        );
      }

      const pageNum = p as number;
      return (
        <button
          key={pageNum}
          onClick={() => onChange(pageNum)}
          className={cn(
            "w-8 h-8 flex items-center justify-center rounded-md text-[15px] font-medium transition-colors",
            pageNum === page
              ? "bg-[#2563EB] text-white shadow-sm"
              : "text-gray-600 hover:bg-gray-100"
          )}
        >
          {pageNum}
        </button>
      );
    });
  };

  return (
    <div className="flex items-center justify-center gap-2 mt-4 select-none">
      <button
        onClick={() => onChange(page - 1)}
        disabled={page === 1}
        className={cn(
          "w-8 h-8 flex items-center justify-center rounded-md transition-colors focus:outline-none",
          page === 1
            ? "text-gray-300 cursor-not-allowed"
            : "text-gray-500 hover:bg-gray-100"
        )}
      >
        <ChevronLeft className="h-5 w-5" />
      </button>

      <div className="flex items-center gap-1">
        {renderPageNumbers()}
      </div>

      <button
        onClick={() => onChange(page + 1)}
        disabled={page === totalPages}
        className={cn(
          "w-8 h-8 flex items-center justify-center rounded-md transition-colors focus:outline-none",
          page === totalPages
            ? "text-gray-300 cursor-not-allowed"
            : "text-gray-500 hover:bg-gray-100"
        )}
      >
        <ChevronRight className="h-5 w-5" />
      </button>
    </div>
  );
}
