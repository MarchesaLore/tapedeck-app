import React, { useState, useEffect } from 'react';
import Cassette from '../interfaces/Cassette';
import './Tapedeck.scss'; 
import FilterSection from './FilterSection';
import TapeList from './TapeList';
import Pagination from './Pagination';
import ErrorDisplay from './ErrorDisplay';
import Spinner from './Spinner';
import axios from 'axios';

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

  //const API_URL = '/cassettes.json'; // Will Update with your actual API URL
  const API_URL_real = 'https://tapedeck-api-fresk.vercel.app/api';
  const API_KEY = 'hoiierhkjhsjkherkhwhwe'; 

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);

        //was just slowing down testing the spinner
        //await new Promise(resolve => setTimeout(resolve, 2000));
        let formattedData: Cassette[] = [];
        
        
        const cachedData = sessionStorage.getItem('cassetteData');
        const cachedCassetteData = cachedData ? JSON.parse(cachedData) : [];
        
        if (cachedCassetteData.length) {
          formattedData = transformCassetteData(cachedCassetteData);
        }else{
          await axios.get(API_URL_real, { 
            headers: {
                'x-api-key': API_KEY        
            },
          }).then((response) => {
            const cassetteData = response.data;
            sessionStorage.setItem('cassetteData', JSON.stringify(cassetteData));
            formattedData = transformCassetteData(cassetteData);
          }).catch((error) => {
            console.log(error);
            seterrorMsg(`An error has occurred: ${(error as Error).message}`);
          });
        }

        setAllCassettes(formattedData);
        setFilteredCassettes(formattedData);
        setTotalPages(Math.ceil(formattedData.length / itemsPerPage));
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
    const totalCassettes = filteredCassettes.length;
    setTotalPages(Math.ceil(totalCassettes / itemsPerPage));
    setCurrentPage(1);
  }, [filteredCassettes, itemsPerPage]);
  
  
  useEffect(() => {
    const filteredCassettes = applyFilters(allCassettes);
    setFilteredCassettes(filteredCassettes);
    //[eslint-disable-next-line react-hooks/exhaustive-deps]
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

  const transformCassetteData = (cassetteData: any): Cassette[] => {
    // Extract cassette details from the unconventional structure
    const formattedCassettes = cassetteData.map(
      (cassetteObject: Record<string, Cassette[]>) => {
        const key = Object.keys(cassetteObject)[0];
        const cassetteDetailsArray = cassetteObject[key];
  
        const cassetteDetails: Cassette = cassetteDetailsArray.reduce(
          (acc, item): Cassette => ({ ...acc, ...item }),
          {} as Cassette
        );
  
        const { page = '', img = '', thumb = '', playingTime = '', brand = '', type = '', color = '' } = cassetteDetails;
  
        return { page, img, thumb, playingTime, brand, type, color };
      }
    );
    return formattedCassettes;
  };


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
          <label aria-label="itemsPerPage">Items per Page:</label>
          <input id="itemsPerPage"
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