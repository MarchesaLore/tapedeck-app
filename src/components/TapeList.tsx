import React, { useState } from 'react';
import Cassette from '../interfaces/Cassette';
import './TapeList.scss';

const TapeList: React.FC<{
  filteredCassettes: Cassette[];
  
}> = ({ filteredCassettes}) => {
  const [selectedCassetteKey, setSelectedCassetteKey] = useState<string>();

  // Updated function to toggle the display
  const toggleImage = (uniquekey: string) => {
    if (selectedCassetteKey === uniquekey) {
      // If the clicked cassette is already selected, hide the image
      setSelectedCassetteKey('');
    } else {
      // Otherwise, show the image of the clicked cassette
      setSelectedCassetteKey(uniquekey);
    }
  };


  return (
      <div className='cassette-rack'>
          {filteredCassettes.length === 0 && <div className="no-results">No results found</div>}
          {filteredCassettes
            .map((cassette, index) => (
              <div key={index} className='cassette-item' onClick={() => toggleImage(cassette.key)}>
                 <div className={`cassette-image ${selectedCassetteKey === cassette.key ? 'visible' : ''}`}>
                  <div>
                     {cassette.img && <img src={cassette.img} alt={`Cassette ${index + 1}`} className="cassette-img" />}
                  </div>
                </div>
                <div className="cassette-side">
                  <div>
                    <div>{cassette.brand}</div>
                    <div>{cassette.type}</div>
                    <div>{cassette.playingTime}</div>
                    <div className={`color ${cassette.color?.toLowerCase()}`}><span>{cassette.color}</span></div>
                  </div>  
                </div>
              </div>
            ))}

      </div>
  );
};

export default TapeList;
