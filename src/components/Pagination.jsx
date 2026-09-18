export default function Pagination({
  currentPage,
  totalPages,
  onPageChange,
}) {
  if (totalPages <= 1) return null;

  return (
    <div className="flex items-center justify-center gap-2 py-6">
      <button
        disabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}
        className="rounded-lg border border-slate-200 px-3 py-2 text-sm disabled:cursor-not-allowed disabled:opacity-40"
      >
        ←
      </button>

      {Array.from({ length: totalPages }, (_, index) => {
        const page = index + 1;

        return (
          <button
            key={page}
            onClick={() => onPageChange(page)}
            className={`h-9 min-w-9 rounded-lg px-3 text-sm font-medium ${
              page === currentPage
                ? "bg-slate-900 text-white"
                : "border border-slate-200 bg-white text-slate-700 hover:bg-slate-50"
            }`}
          >
            {page}
          </button>
        );
      })}

      <button
        disabled={currentPage === totalPages}
        onClick={() => onPageChange(currentPage + 1)}
        className="rounded-lg border border-slate-200 px-3 py-2 text-sm disabled:cursor-not-allowed disabled:opacity-40"
      >
        →
      </button>
    </div>
  );
}