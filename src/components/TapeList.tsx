import React, { useState } from 'react';
import Cassette from '../interfaces/Cassette';
import './TapeList.scss';

const TapeList: React.FC<{
  filteredCassettes: Cassette[];
  
}> = ({ filteredCassettes}) => {
  const [selectedCassetteIndex, setSelectedCassetteIndex] = useState<number | null>(null);

  // Updated function to toggle the display
  const toggleImage = (index: number) => {
    if (selectedCassetteIndex === index) {
      // If the clicked cassette is already selected, hide the image
      setSelectedCassetteIndex(null);
    } else {
      // Otherwise, show the image of the clicked cassette
      setSelectedCassetteIndex(index);
    }
  };


  return (
      <div className='cassette-rack'>
          {filteredCassettes
            .map((cassette, index) => (
              <div key={index} className='cassette-item' onClick={() => toggleImage(index)}>
                 <div className={`cassette-image ${selectedCassetteIndex === index ? 'visible' : ''}`}>
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
