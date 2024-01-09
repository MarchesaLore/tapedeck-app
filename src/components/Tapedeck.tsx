import React, { useEffect } from 'react';
import { useCassettes } from '../contexts/CassettesContext';
import FilterSection from './FilterSection';
import TapeList from './TapeList';
import Pagination from './Pagination';
import ErrorDisplay from './ErrorDisplay';
import Spinner from './Spinner';
import '../styles/Tapedeck.scss';
import { getCassettes } from '../services/CassettesService';

const Tapedeck: React.FC = () => {
  const {
    filteredCassettes,
    setOriginalCassettes,
    setFilteredCassettes,
    currentPage,
    itemsPerPage,
    setItemsPerPage,
    errorMsg,
    setErrorMsg,
    isLoading,
    setIsLoading
  } = useCassettes();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const formattedData = await getCassettes().catch((error) => { setErrorMsg(error.message); return []; });
        formattedData.sort((a, b) => a.brand.localeCompare(b.brand));

        // Set both original and filtered cassettes initially
        setOriginalCassettes(formattedData);
        setFilteredCassettes(formattedData);

        setIsLoading(false);
      } catch (error) {
        console.log(error);
        // Handle error
      }
    };

    fetchData();
  }, [setOriginalCassettes, setFilteredCassettes]);

  return (
    <div className="cassette-list">
      <h1>Tapedeck</h1>

      {/* Filter section */}
      <FilterSection />

      {/* Items per page section */}
      <div className="item-per-page-div">
        <div>
          <label id="itemsPerPage">Items per Page:</label>
          <input
            aria-labelledby="itemsPerPage"
            type="number"
            min="1"
            value={itemsPerPage}
            onChange={(e) =>
              setItemsPerPage(
                e.target.value ? parseInt(e.target.value, 10) : 1
              )
            }
          />
        </div>
      </div>

      {/* Total results and clear filters section */}
      <div className="result-summary">
        <div>
          <p aria-label="total-results">Total Results: {filteredCassettes.length}</p>
        </div>
        <div>
        {filteredCassettes.length > 0 && (
          <p aria-label="showing-results">
            Showing results: {Math.min((currentPage - 1) * itemsPerPage + 1, filteredCassettes.length)} - {Math.min(currentPage * itemsPerPage, filteredCassettes.length)}
          </p>
        )}
        </div>
      </div>

      {/* Error display */}
      <ErrorDisplay message={errorMsg} />

      {isLoading ? <Spinner /> : null}

      {/* Cassette list */}
      {!isLoading && errorMsg === '' && (
        <TapeList />
      )}

      {/* Pagination */}
      {!isLoading && errorMsg === '' && (
        <Pagination/>
      )}
    </div>
  );
};

export default Tapedeck;
