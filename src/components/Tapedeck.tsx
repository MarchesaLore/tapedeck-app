import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Cassette from '../interfaces/Cassette';
import './Tapedeck.scss'; 
import FilterSection from './FilterSection';
import TapeList from './TapeList';
import Pagination from './Pagination';

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
  
  useEffect(() => {
    // Fetch cassette data from the provided API
    const fetchData = async () => {

      try {
        // const response = await axios.get('API_URL', { //to do: add API URL
        //     headers: {
        //         'Content-Type': 'application/json',
        //         'Accept': 'application/json',
        //         'key': 'API_KEY' //to do: add API key            
        //     },
        // }); 

        const response = await axios.get('/cassettes.json');
        const cassetteData = response.data;
        console.log(cassetteData);

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

        setAllCassettes(formattedCassettes);
        setFilteredCassettes(formattedCassettes);

        // Calculate total pages based on the number of items and items per page
        const totalCassettes = formattedCassettes.length;
        console.log(totalCassettes);
        setTotalPages(Math.ceil(totalCassettes / itemsPerPage));
      } catch (error) {
        console.error('Error fetching cassette data:', error);
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
    console.log('Filters changed');
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
    console.log('filters ',brandFilter, colorFilter, playTimeFilter, typeFilter);
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
      <FilterSection 
      brandOptions={brandOptions} 
      colorOptions={colorOptions} 
      typeOptions={typeOptions} 
      playTimeOptions={playTimeOptions} 
      onFilterChange={onFilterChange}
      />

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


      {/* Cassette list */}
       <TapeList
        filteredCassettes={filteredCassettes.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)}
      />


       {/* Pagination */}
        <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        handlePageChange={handlePageChange} />
    </div>
  );
};

export default Tapedeck;