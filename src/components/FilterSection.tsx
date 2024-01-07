import React, { useState } from 'react';
import './FilterSection.scss';

const FilterSection: React.FC<{
  brandOptions: string[];
  colorOptions: string[];
  playTimeOptions: string[];
  typeOptions: string[];
  onFilterChange: (filterType: string, value: string) => void;
}> = ({
  brandOptions,
  colorOptions,
  playTimeOptions,
  typeOptions,
  onFilterChange,
}) => {
  const [selectedBrand, setSelectedBrand] = useState<string>('');
  const [selectedColor, setSelectedColor] = useState<string>('');
  const [selectedPlayTime, setSelectedPlayTime] = useState<string>('');
  const [selectedType, setSelectedType] = useState<string>('');

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

    onFilterChange(filterType, value);
  };

  const clearFilters = () => {
    setSelectedBrand('');
    setSelectedColor('');
    setSelectedPlayTime('');
    setSelectedType('');

    onFilterChange('brand', '');
    onFilterChange('color', '');
    onFilterChange('playTime', '');
    onFilterChange('type', '');
  };

  return (
    <div className="filters">
      <div>
        <label>Brand:</label>
        <select
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
      <div>
        <label>Color:</label>
        <select
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
      <div>
        <label>Play Time:</label>
        <select
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
      <div>
        <label>Type:</label>
        <select
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
      <div className="clear-filter-div">
        <button onClick={clearFilters} className="clear-filter">
          Clear Filters
        </button>
      </div>
    </div>
  );
};

export default FilterSection;
