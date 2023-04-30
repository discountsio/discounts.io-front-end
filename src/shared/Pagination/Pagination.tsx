import { current } from "@reduxjs/toolkit";
import { CustomLink } from "data/types";
import React, { FC, useEffect } from "react";
import { Link } from "react-router-dom";
import twFocusClass from "utils/twFocusClass";

const PAGINATION: CustomLink[] = [
];

export interface PaginationProps {
  className?: string;
  currentPage?: number;
  setCurrentPage?: any;
  totalPages?: number;
}

const Pagination: FC<PaginationProps> = ({ className = "", currentPage, setCurrentPage, totalPages }) => {

  useEffect(() => {
    while (PAGINATION.length > 0) {
      PAGINATION.pop();
    }
    if (totalPages == undefined) {
      totalPages = 1;
    }
    for (let i = 0; i < totalPages; i++) {
      let t: CustomLink = {
        label: (i + 1).toString(),
        href: "#"
      }
      PAGINATION.push(t)
    }
  }, [totalPages])

  const handlePageChange = (index: number) => {
    setCurrentPage(index)
  }

  const renderItem = (pag: CustomLink, index: number) => {
    if (index === currentPage) {
      // RETURN ACTIVE PAGINATION
      return (
        <span
          onClick={() => { handlePageChange(index) }}
          key={index}
          className={`inline-flex w-11 h-11 items-center justify-center rounded-full bg-primary-6000 text-white ${twFocusClass()}`}
        >
          {pag.label}
        </span>
      );
    }
    // RETURN UNACTIVE PAGINATION
    return (
      <Link
        onClick={(e) => { e.preventDefault(); handlePageChange(index) }}
        key={index}
        className={`inline-flex w-11 h-11 items-center justify-center rounded-full bg-white hover:bg-neutral-100 border border-neutral-200 text-neutral-6000 dark:text-neutral-400 dark:bg-neutral-900 dark:hover:bg-neutral-800 dark:border-neutral-700 ${twFocusClass()}`}
        to={pag.href}
      >
        {pag.label}
      </Link>
    );
  };

  return (
    <nav
      className={`nc-Pagination inline-flex space-x-1 text-base font-medium ${className}`}
    >
      {PAGINATION.map(renderItem)}
    </nav>
  );
};

export default Pagination;
