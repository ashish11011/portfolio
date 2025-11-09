"use client";

import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { useRouter, useSearchParams } from "next/navigation";

export function BlogPagination({ page, totalPages, limit }: any) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

  const handlePageChange = (direction: any) => {
    let newPage = page;

    if (direction === "prev" && page > 1) {
      newPage = page - 1;
    } else if (direction === "next" && page < totalPages) {
      newPage = page + 1;
    } else {
      newPage = direction;
    }

    const params = new URLSearchParams(searchParams.toString());

    params.set("page", newPage.toString());
    params.set("limit", limit.toString());

    router.push(`?${params.toString()}`);
  };

  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            onClick={() => handlePageChange("prev")}
            className={page === 1 ? "pointer-events-none opacity-50" : ""}
          />
        </PaginationItem>

        {pageNumbers.map((pagenum) => {
          return (
            <PaginationItem onClick={() => handlePageChange(pagenum)}>
              <div
                className={
                  pagenum === page
                    ? "pointer-events-none px-4 py-2 text-red-700 opacity-50"
                    : "px-4 py-2 text-sm"
                }
              >
                {pagenum}
              </div>
            </PaginationItem>
          );
        })}

        <PaginationItem>
          <PaginationNext
            onClick={() => handlePageChange("next")}
            className={
              page === totalPages ? "pointer-events-none opacity-50" : ""
            }
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
