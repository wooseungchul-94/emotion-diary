import React from "react";
import "./Pagination.css"; // 선택사항

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  return (
    <div className="pagination">
      {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
        <button
          key={pageNum}
          onClick={() => onPageChange(pageNum)}
          className={currentPage === pageNum ? "active" : ""}
        >
          {pageNum}
        </button>
      ))}
    </div>
  );
};

export default Pagination;
