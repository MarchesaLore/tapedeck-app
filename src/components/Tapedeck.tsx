import React, { useState, useEffect } from 'react';
import Cassette from '../interfaces/Cassette';
import './Tapedeck.scss'; 
import FilterSection from './FilterSection';
import TapeList from './TapeList';
import Pagination from './Pagination';
import { fetchCassetteData } from '../services/CassetteService.js';
import ErrorDisplay from './ErrorDisplay';
import Spinner from './Spinner';

const Tapedeck: React.FC = () => {
  const [allCassettes, setAllCassettes] = useState<Cassette[]>([]);
  const [filteredCassettes, setFilteredCassettes] = useState<Cassette[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(15);

  const [brandFilter, setBrandFilter] = useState<string>('');
  const [colorFilter, setColorFilter] = useState<string>('');
  const [playTimeFilter, setPlayTimeFilter] = useState<string>('');
  const [typeFilter, setTypeFilter] = useState<string>('');

  const brandOptions = Array.from(new Set(allCassettes.map((cassette) => cassette.brand)))
  .filter((brand) => brand !== '')
  .sort((a, b) => a.localeCompare(b));

  const colorOptions = Array.from(new Set(allCassettes.map((cassette) => cassette.color)))
  .filter((color) => color !== '')
  .sort((a, b) => a.localeCompare(b));

  const playTimeOptions = Array.from(new Set(allCassettes.map((cassette) => cassette.playingTime)))
  .filter((playingTime) => playingTime !== '')
  .sort((a, b) => a.localeCompare(b));

  const typeOptions = Array.from(new Set(allCassettes.map((cassette) => cassette.type)))
  .filter((type) => type !== '')
  .sort((a, b) => a.localeCompare(b));

  const totalResults = filteredCassettes.length;
  const [errorMsg, seterrorMsg] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isFilterVisible, setFilterVisible] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);

        //was just slowing down testing the spinner
        //await new Promise(resolve => setTimeout(resolve, 2000));
    
        const cassetteData = await fetchCassetteData();
        setAllCassettes(cassetteData);
        setFilteredCassettes(cassetteData);
        setTotalPages(Math.ceil(cassetteData.length / itemsPerPage));
      } catch (error) {        
        console.log(error);
        seterrorMsg(`An error has occurred: ${(error as Error).message}`);
      }finally{
        setIsLoading(false);
      }
    };

    fetchData();
  }, [itemsPerPage]);


  
  useEffect(() => {
    // Calculate total pages based on the number of items and items per page
    const totalCassettes = filteredCassettes.length;
    setTotalPages(Math.ceil(totalCassettes / itemsPerPage));
  
    // Reset to the first page when filters change
    setCurrentPage(1);
  }, [filteredCassettes, itemsPerPage]);
  
  
  useEffect(() => {
    //console.log('Filters changed');
    // Apply filters
    const filteredCassettes = applyFilters(allCassettes);
    setFilteredCassettes(filteredCassettes);

    // Calculate total pages based on the number of items and items per page
    const totalCassettes = filteredCassettes.length;
    setTotalPages(Math.ceil(totalCassettes / itemsPerPage));

    // Reset to the first page when filters change
    setCurrentPage(1);
  }, [allCassettes, brandFilter, colorFilter, playTimeFilter, typeFilter]);

  const applyFilters = (cassettes: Cassette[]): Cassette[] => {
    //console.log('filters ',brandFilter, colorFilter, playTimeFilter, typeFilter);
    return cassettes.filter((cassette) => {
      const brandMatches = brandFilter ? cassette.brand === brandFilter : true;
      const colorMatches = colorFilter ? cassette.color === colorFilter : true;
      const playTimeMatches = playTimeFilter ? cassette.playingTime === playTimeFilter : true;
      const typeMatches = typeFilter ? cassette.type === typeFilter : true;

      return brandMatches && colorMatches && playTimeMatches && typeMatches;
    });
  };

  const onFilterChange = (filterType: string, value: string) => {
    switch (filterType) {
      case 'brand':
        setBrandFilter(value);
        break;
      case 'color':
        setColorFilter(value);
        break;
      case 'playTime':
        setPlayTimeFilter(value);
        break;
      case 'type':
        setTypeFilter(value);
        break;
      default:
        break;
    }
  
    // Reset to the first page when filters change
    setCurrentPage(1);
  };
  
  
  const handlePageChange = (newPage: number) => {
    const lastPage = Math.ceil(filteredCassettes.length / itemsPerPage);
    const newCurrentPage = Math.min(Math.max(newPage, 1), lastPage);
    setCurrentPage(newCurrentPage);
  };

  const firstResultIndex = (currentPage - 1) * itemsPerPage + 1;
  const lastResultIndex = Math.min(currentPage * itemsPerPage, totalResults);


  return (
    <div className="cassette-list">
      <h1>Tapedeck</h1>

      {/* Filter section */}
      {isFilterVisible && 
      <FilterSection 
      brandOptions={brandOptions} 
      colorOptions={colorOptions} 
      typeOptions={typeOptions} 
      playTimeOptions={playTimeOptions} 
      onFilterChange={onFilterChange}
      />}
      <button className="showFilters" onClick={() => setFilterVisible(!isFilterVisible)}> {isFilterVisible?'hide':'show'} filters</button>
      
      {/* Items per page section */}            
      <div className="item-per-page-div">
        <div>
          <label>Items per Page:</label>
          <input
            type="number"
            min="1"
            value={itemsPerPage}
            onChange={(e) => setItemsPerPage(parseInt(e.target.value, 10))}
          /> 
        </div>
      </div>

      {/* Total results and clear filters section */}
      <div className="result-summary">
        <div>
          <p>Total Results: {totalResults}</p>
        </div>
        <div>
          <p>Showing results: {firstResultIndex} - {lastResultIndex}</p>   
        </div>
      </div>


      {/* Error display */}
      <ErrorDisplay message={errorMsg} />

      {isLoading ? <Spinner /> : null}

      {/* Cassette list */}
      {!isLoading && errorMsg === '' && (
        <TapeList
          filteredCassettes={filteredCassettes.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)}
        />
      )}

       {/* Pagination */}
       {!isLoading && errorMsg === '' && ( <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        handlePageChange={handlePageChange} />)}
    </div>
  );
};

export default Tapedeck;