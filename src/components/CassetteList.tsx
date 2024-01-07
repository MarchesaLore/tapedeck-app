import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Cassette from '../interfaces/Cassette';
import './CassetteList.scss'; 

const PAGE_RANGE = 5; 

const CassetteList: React.FC = () => {
  const [allCassettes, setAllCassettes] = useState<Cassette[]>([]);
  const [filteredCassettes, setFilteredCassettes] = useState<Cassette[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(15);

  const totalResults = filteredCassettes.length;
  
  // Filters state
  const [brandFilter, setBrandFilter] = useState<string>('');
  const [colorFilter, setColorFilter] = useState<string>('');
  const [playTimeFilter, setPlayTimeFilter] = useState<string>('');
  const [typeFilter, setTypeFilter] = useState<string>('');


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
        //console.log(cassetteData);

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
        setTotalPages(Math.ceil(totalCassettes / itemsPerPage));
      } catch (error) {
        console.error('Error fetching cassette data:', error);
      }
    };

    fetchData();
  }, [itemsPerPage]);

  useEffect(() => {
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
    return cassettes.filter((cassette) => {
      const brandMatches = brandFilter ? cassette.brand === brandFilter : true;
      const colorMatches = colorFilter ? cassette.color === colorFilter : true;
      const playTimeMatches = playTimeFilter ? cassette.playingTime === playTimeFilter : true;
      const typeMatches = typeFilter ? cassette.type === typeFilter : true;

      return brandMatches && colorMatches && playTimeMatches && typeMatches;
    });
  };

  const handleFilterChange = (filterType: string, value: string) => {
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

  const clearFilters = () => {
    setBrandFilter('');
    setColorFilter('');
    setPlayTimeFilter('');
    setTypeFilter('');
  };
  const firstResultIndex = (currentPage - 1) * itemsPerPage + 1;
  const lastResultIndex = Math.min(currentPage * itemsPerPage, totalResults);


  return (
    <div className="cassette-list">
      <h1>Tapedeck</h1>

      {/* Filter section */}
      <div className="filters">
        <div>
          <label>
            Brand:
          </label>
            <select value={brandFilter} onChange={(e) => handleFilterChange('brand', e.target.value)}>
              <option value="">All Brands</option>
              {Array.from(new Set(filteredCassettes.map((cassette) => cassette.brand)))
              .filter((brand) => brand !== '')
              .sort((a,b)=> a.localeCompare(b))
              .map((brand, index) => (
                <option key={index} value={brand}>
                  {brand}
                </option>
              ))}
          </select>
        </div>
        <div>
        <label>
          Color:
        </label>
          <select value={colorFilter} onChange={(e) => handleFilterChange('color', e.target.value)}>
            <option value="">All Colors</option>
            {Array.from(new Set(filteredCassettes.map((cassette) => cassette.color)))
            .filter((color) => color !== '')
            .sort((a,b)=> a.localeCompare(b))
            .map((color, index) => (
                <option key={index} value={color}>
                  {color}
                </option>
             ))}
          </select>

        </div>
        <div>
          <label>
          Play Time:
        </label>
          <select value={playTimeFilter} onChange={(e) => handleFilterChange('playTime', e.target.value)}>
            <option value="">All Play Times</option>
            {Array.from(new Set(filteredCassettes.map((cassette) => cassette.playingTime)))
            .filter((playingTime) => playingTime !== '')
            .sort((a,b)=> a.localeCompare(b))
            .map((playTime, index) => (
              <option key={index} value={playTime}>
                {playTime}
              </option>
            ))}
          </select>
        </div>  
        <div>  
        <label>
          Type:
        </label>
          <select value={typeFilter} onChange={(e) => handleFilterChange('type', e.target.value)}>
            <option value="">All Types</option>
            {Array.from(new Set(filteredCassettes.map((cassette) => cassette.type)))
            .filter((type) => type !== '')
            .sort((a,b)=> a.localeCompare(b))
            .map((type, index) => (
              <option key={index} value={type}>
                {type}
              </option>
            ))}
          </select>  

          </div>  
      
        <div className="clear-filter-div">              
            <button onClick={clearFilters} className="clear-filter">Clear Filters</button>
        </div>
      </div>
      
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
      <table className="cassette-table">
        <thead>
          <tr>
            <th>Image</th>
            <th>Brand</th>
            <th>Type</th>
            <th>Color</th>
            <th>Playing Time</th>
            {/* Add other headers if needed */}
          </tr>
        </thead>
        <tbody>
          {filteredCassettes
            .slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)
            .map((cassette, index) => (
              <tr key={index} className={`cassette-item ${cassette.color.toLowerCase()}`}>
                <td>{cassette.img ? <img src={cassette.thumb} alt={`Cassette ${index + 1}`} className="cassette-image" /> : null}</td>
                <td>{cassette.brand}</td>
                <td>{cassette.type}</td>
                <td>{cassette.color}</td>
                <td>{cassette.playingTime}</td>
              </tr>
            ))}
        </tbody>
      </table>


       {/* Pagination */}
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
    </div>
  );
};

export default CassetteList;