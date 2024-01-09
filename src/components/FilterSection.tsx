import React, { useEffect, useState } from 'react';
import { useCassettes } from '../contexts/CassettesContext';
import '../styles/FilterSection.scss';
import Cassette from '../interfaces/Cassette';

const FilterSection: React.FC = () => {
  const [isFilterVisible, setFilterVisible] = useState<boolean>(true);

  const {
    originalCassettes,
    setFilteredCassettes,
    setIsLoading
  } = useCassettes();

  const [selectedBrand, setSelectedBrand] = useState<string>('');
  const [selectedColor, setSelectedColor] = useState<string>('');
  const [selectedPlayTime, setSelectedPlayTime] = useState<string>('');
  const [selectedType, setSelectedType] = useState<string>('');
  
  
  const brandOptions = Array.from(new Set(originalCassettes.map((cassette) => cassette.brand)))
  .filter((brand) => brand !== '')
  .sort((a, b) => a.localeCompare(b));

  const colorOptions = Array.from(new Set(originalCassettes.map((cassette) => cassette.color)))
  .filter((color) => color !== '')
  .sort((a, b) => a.localeCompare(b));

  const playTimeOptions = Array.from(new Set(originalCassettes.map((cassette) => cassette.playingTime)))
  .filter((playingTime) => playingTime !== '')
  .sort((a, b) => a.localeCompare(b));

  const typeOptions = Array.from(new Set(originalCassettes.map((cassette) => cassette.type)))
  .filter((type) => type !== '')
  .sort((a, b) => a.localeCompare(b));

  const handleFilterChange = (filterType: string, value: string) => {
    switch (filterType) {
      case 'brand':
        setSelectedBrand(value);
        break;
      case 'color':
        setSelectedColor(value);
        break;
      case 'playTime':
        setSelectedPlayTime(value);
        break;
      case 'type':
        setSelectedType(value);
        break;
      default:
        break;
    }
  };
  
  useEffect(() => {
    
    setIsLoading(true);

    // Apply filters to the original cassettes list and update the filtered list in the context
    const filteredList = applyFilters(originalCassettes);
    setFilteredCassettes(filteredList);
    
    setIsLoading(false);
    
  }, [selectedBrand, selectedColor, selectedPlayTime, selectedType]);
  

  const clearFilters = () => {
    setSelectedBrand('');
    setSelectedColor('');
    setSelectedPlayTime('');
    setSelectedType('');

    // Reset filters and update the filtered list in the context
    setFilteredCassettes(originalCassettes);
  };

  const applyFilters = (cassettes: Cassette[]): Cassette[] => {
    return cassettes.filter((cassette) => {
      const brandMatches = selectedBrand
        ? cassette.brand === selectedBrand
        : true;
      const colorMatches = selectedColor
        ? cassette.color === selectedColor
        : true;
      const playTimeMatches = selectedPlayTime
        ? cassette.playingTime === selectedPlayTime
        : true;
      const typeMatches = selectedType
        ? cassette.type === selectedType
        : true;
  
      return brandMatches && colorMatches && playTimeMatches && typeMatches;
    });
  };
  

  return (
    <div>
      <div className={`filters ${isFilterVisible ? '' : 'hidden'}`}>
        <div className={selectedBrand !== '' ? 'selected' : ''}>
          <div className="circle"></div>
          <div>
            <label id="brandlabel">Brand:</label>
            <select
            aria-labelledby="brandlabel"
            value={selectedBrand}
            onChange={(e) => handleFilterChange('brand', e.target.value)}
          >
            <option value="">All Brands</option>
            {brandOptions.map((brand, index) => (
              <option key={index} value={brand}>
                {brand}
              </option>
            ))}
          </select>
          </div>
        </div>
      <div className={selectedColor!==''?'selected':''}>
        <div className="circle"></div>
        <div>
        <label id='colorlabel'>Color:</label>
        <select aria-labelledby='colorlabel'
          value={selectedColor}
          onChange={(e) => handleFilterChange('color', e.target.value)}
        >
          <option value="">All Colors</option>
          {colorOptions.map((color, index) => (
            <option key={index} value={color}>
              {color}
            </option>
          ))}
        </select>
        </div>
      </div>
      <div className={selectedPlayTime!==''?'selected':''}>
        <div className="circle"></div>
        <div>
        <label id='playtimelabel'>Play Time:</label>
        <select aria-labelledby='playtimelabel'
          value={selectedPlayTime}
          onChange={(e) => handleFilterChange('playTime', e.target.value)}
        >
          <option value="">All Play Times</option>
          {playTimeOptions.map((playTime, index) => (
            <option key={index} value={playTime}>
              {playTime}
            </option>
          ))}
        </select>
      </div>
      </div>
      <div className={selectedType!==''?'selected':''}>
        <div className="circle"></div>
        <div>
        <label id="typelabel">Type:</label>
        <select aria-labelledby='typelabel'
          value={selectedType}
          onChange={(e) => handleFilterChange('type', e.target.value)}
        >
          <option value="">All Types</option>
          {typeOptions.map((type, index) => (
            <option key={index} value={type}>
              {type}
            </option>
          ))}
        </select>
      </div>
    </div>
        <div className="clear-filter-div">
          <button onClick={clearFilters} className="clear-filter">
            Clear Filters
          </button>
        </div>
      </div>
    <button
      className="toggle-filter"
      onClick={() => setFilterVisible(!isFilterVisible)}/>

    </div>

  );
};

export default FilterSection;
