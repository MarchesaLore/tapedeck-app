import React, { useState } from 'react';
import './FilterSection.scss';

const FilterSection: React.FC<{
  brandOptions: string[];
  colorOptions: string[];
  playTimeOptions: string[];
  typeOptions: string[];
  onFilterChange: (filterType: string, value: string) => void;
  isFilterVisible: boolean;
}> = ({
  brandOptions,
  colorOptions,
  playTimeOptions,
  typeOptions,
  onFilterChange,
  isFilterVisible
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

  return (<div className={`filters ${isFilterVisible? '' : 'hidden'}`}>
      <div className={selectedBrand!==''?'selected':''}>
        <div className="circle"></div>
        <div>
          <label id="brandlabel">Brand:</label>
          <select aria-labelledby='brandlabel'
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
  );
};

export default FilterSection;
