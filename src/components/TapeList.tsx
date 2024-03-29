import React, { useState } from 'react';
import { useCassettes } from '../contexts/CassettesContext'; // Import the context hook
import '../styles/TapeList.scss';
import Cassette from '../interfaces/Cassette';

const TapeList: React.FC = () => {
  const { 
    filteredCassettes,
    currentPage,
    itemsPerPage
   } = useCassettes(); 
   
  const visibleCassettes : Cassette[] = filteredCassettes.slice( (currentPage - 1) * itemsPerPage,currentPage * itemsPerPage);

  //this is to be used to show and hide image
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
      {visibleCassettes?.length === 0 && <div className="no-results">No results found</div>}
      {visibleCassettes.map((cassette, index) => (
        <div key={index} className={`cassette-item ${cassette.img?'has-image':''}`} onClick={() => cassette.img?toggleImage(cassette.key):'return false'} role='row'>
          {cassette?.img && 
          <div className={`cassette-image ${selectedCassetteKey === cassette.key ? 'visible' : ''}`}>
            <div>
              <img src={cassette.img} alt={`Cassette ${index + 1}`} className="cassette-img" />
            </div>
          </div>}
          <div className="cassette-side">
            <div>
              <div><span>{cassette.brand}</span></div>
              <div><span>{cassette.type}</span></div>
              <div><span>{cassette.playingTime}</span></div>
              <div className={`color ${cassette.color?.toLowerCase()}`}><span>{cassette.color}</span></div>
            </div>  
          </div>
        </div>
      ))}
    </div>
  );
};

export default TapeList;
