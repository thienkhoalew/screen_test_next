import { cn } from "@/lib/utils"

export function Pagination({
  page,
  totalPages,
  onChange,
}: {
  page: number
  totalPages: number
  onChange: (page: number) => void
}) {
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1)

  return (
    <div className="flex items-center justify-center space-x-2 py-4">

      <button
        onClick={() => onChange(page - 1)}
        disabled={page === 1}
        className={cn(
          "px-2 py-1 text-gray-600 rounded hover:bg-gray-100 border",
          page === 1 && "opacity-30 cursor-not-allowed"
        )}
      >
        ‹
      </button>

      {pages.map((p) => (
        <button
          key={p}
          onClick={() => onChange(p)}
          className={cn(
            "w-7 h-7 flex items-center justify-center rounded border text-sm",
            p === page
              ? "bg-blue-600 text-white border-blue-600"
              : "hover:bg-gray-100"
          )}
        >
          {p}
        </button>
      ))}

      <button
        onClick={() => onChange(page + 1)}
        disabled={page === totalPages}
        className={cn(
          "px-2 py-1 text-gray-600 rounded hover:bg-gray-100 border",
          page === totalPages && "opacity-30 cursor-not-allowed"
        )}
      >
        ›
      </button>
    </div>
  )
}
