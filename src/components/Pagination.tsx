import React from 'react';
import { useCassettes } from '../contexts/CassettesContext';

import '../styles/Pagination.scss';

const PAGE_RANGE = 5; 

const Pagination: React.FC = () => {
  const {
    filteredCassettes,
    currentPage,
    setCurrentPage,
    itemsPerPage,
  } = useCassettes();

  const totalPages = Math.ceil(filteredCassettes.length / itemsPerPage);

  function handlePageChange(arg0: number): void {
    setCurrentPage(arg0);
  }

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