"use client";

import { useState, useEffect } from "react";
import styles from "./Pagination.module.css";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export default function Pagination({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationProps) {
  const [visiblePages, setVisiblePages] = useState<number[]>([]);

  useEffect(() => {
    // Calculate visible page numbers
    const calculateVisiblePages = () => {
      const pages: number[] = [];

      // Always show first page
      if (currentPage > 3) {
        pages.push(1);

        // Add ellipsis if needed
        if (currentPage > 4) {
          pages.push(-1); // -1 represents ellipsis
        }
      }

      // Calculate range around current page
      const startPage = Math.max(1, currentPage - 1);
      const endPage = Math.min(totalPages, currentPage + 1);

      for (let i = startPage; i <= endPage; i++) {
        pages.push(i);
      }

      // Add ellipsis and last page if needed
      if (currentPage < totalPages - 2) {
        if (currentPage < totalPages - 3) {
          pages.push(-1); // -1 represents ellipsis
        }
        pages.push(totalPages);
      }

      setVisiblePages(pages);
    };

    calculateVisiblePages();
  }, [currentPage, totalPages]);

  const handlePrevious = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  if (totalPages <= 1) return null;

  return (
    <div className={styles.pagination}>
      <button
        className={`${styles.pageButton} ${styles.navButton} ${
          currentPage === 1 ? styles.disabled : ""
        }`}
        onClick={handlePrevious}
        disabled={currentPage === 1}
      >
        Prev
      </button>

      <div className={styles.pageNumbers}>
        {visiblePages.map((page, index) =>
          page === -1 ? (
            <span key={`ellipsis-${index}`} className={styles.ellipsis}>
              ...
            </span>
          ) : (
            <button
              key={page}
              className={`${styles.pageButton} ${
                currentPage === page ? styles.active : ""
              }`}
              onClick={() => onPageChange(page)}
            >
              {page}
            </button>
          )
        )}
      </div>

      <button
        className={`${styles.pageButton} ${styles.navButton} ${
          currentPage === totalPages ? styles.disabled : ""
        }`}
        onClick={handleNext}
        disabled={currentPage === totalPages}
      >
        Next
      </button>
    </div>
  );
}
