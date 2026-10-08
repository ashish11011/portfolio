import {
  Pagination, PaginationContent, PaginationItem, PaginationLink,
  PaginationNext, PaginationPrevious,
} from "@/components/ui/pagination";

export const blogPageUrl = (page: number) => page === 1 ? "/blog" : `/blog/page/${page}`;

export function BlogPagination({ page, totalPages }: { page: number; totalPages: number }) {
  if (totalPages <= 1) return null;
  // Keep pagination usable on mobile even when the archive grows.
  const numbers = Array.from(new Set([1, page - 1, page, page + 1, totalPages]))
    .filter((number) => number >= 1 && number <= totalPages).sort((a, b) => a - b);
  return (
    <Pagination>
      <PaginationContent className="flex-wrap">
        <PaginationItem>
          <PaginationPrevious href={blogPageUrl(Math.max(1, page - 1))} rel={page > 1 ? "prev" : undefined}
            aria-disabled={page === 1} tabIndex={page === 1 ? -1 : undefined}
            className={page === 1 ? "pointer-events-none opacity-50" : ""} />
        </PaginationItem>
        {numbers.map((number, index) => <PaginationItem key={number} className="flex items-center">
          {index > 0 && number - numbers[index - 1] > 1 && <span aria-hidden="true" className="px-2">…</span>}
          <PaginationLink href={blogPageUrl(number)} isActive={number === page} aria-label={`Page ${number}`}>{number}</PaginationLink>
        </PaginationItem>)}
        <PaginationItem>
          <PaginationNext href={blogPageUrl(Math.min(totalPages, page + 1))} rel={page < totalPages ? "next" : undefined}
            aria-disabled={page === totalPages} tabIndex={page === totalPages ? -1 : undefined}
            className={page === totalPages ? "pointer-events-none opacity-50" : ""} />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
