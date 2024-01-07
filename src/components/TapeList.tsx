// TapeList.tsx
import React from 'react';
import Cassette from '../interfaces/Cassette';
import './TapeList.scss';

const TapeList: React.FC<{
  filteredCassettes: Cassette[];
}> = ({ filteredCassettes}) => {


  return (
    <div>
      {/* Cassette list */}
      <table className="cassette-table">
        <thead>
          <tr>
            <th>Image</th>
            <th>Brand</th>
            <th>Type</th>
            <th>Color</th>
            <th>Playing Time</th>
          </tr>
        </thead>
        <tbody>
          {filteredCassettes
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
    </div>
  );
};

export default TapeList;
