import React from 'react';
import '../styles/Pagination.scss';

const PAGE_RANGE = 5; 

type PaginationProps = {
  currentPage: number;
  totalPages: number;
  handlePageChange: (newPage: number) => void;
};

const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, handlePageChange }) => {

  return (
      <div className="pagination">
        {/* Previous page button */}
        {currentPage > 1 && (
          <button onClick={() => handlePageChange(1)}>&lt;&lt;</button>
        )}
        {currentPage > 1 && (
          <button onClick={() => handlePageChange(currentPage - 1)}>&lt;</button>
        )}

        {/* Page buttons */}
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index + 1}
            onClick={() => handlePageChange(index + 1)}
            className={currentPage === index + 1 ? 'active' : 
            (currentPage >= index + 1 - PAGE_RANGE && currentPage <= index + 1 + PAGE_RANGE ? 'visible' : 'hidden')}>
            {index + 1}
          </button>
        ))}

        {/* Next page button */}
        {currentPage < totalPages && (
          <button onClick={() => handlePageChange(currentPage + 1)}>&gt;</button>
        )}
        {currentPage < totalPages && (
          <button onClick={() => handlePageChange(totalPages)}>&gt;&gt;</button>
        )}
      </div>
  );
};

export default Pagination;