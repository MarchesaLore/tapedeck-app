import React from 'react';
import { CassettesProvider } from './contexts/CassettesContext';
import Tapedeck from './components/Tapedeck'; // Adjust the path based on your actual file structure
import './App.css';

function App() {
  return (
    <CassettesProvider>
      <Tapedeck />
    </CassettesProvider>
  );
}

export default App;
