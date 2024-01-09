import React, { createContext, useContext, ReactNode, useState, Dispatch, SetStateAction } from 'react';
import Cassette from '../interfaces/Cassette';

type CassettesContextType = {
  originalCassettes: Cassette[];
  setOriginalCassettes: React.Dispatch<React.SetStateAction<Cassette[]>>;
  filteredCassettes: Cassette[];
  setFilteredCassettes: React.Dispatch<React.SetStateAction<Cassette[]>>;
  currentPage: number;
  setCurrentPage: Dispatch<SetStateAction<number>>;
  itemsPerPage: number;
  setItemsPerPage: Dispatch<SetStateAction<number>>;
  errorMsg: string;
  setErrorMsg: Dispatch<SetStateAction<string>>;
  isLoading: boolean;
  setIsLoading: Dispatch<SetStateAction<boolean>>;
};

const CassettesContext = createContext<CassettesContextType | undefined>(undefined);

type CassettesProviderProps = {
  children: ReactNode;
};

export const CassettesProvider: React.FC<CassettesProviderProps> = ({ children }) => {
  const [originalCassettes, setOriginalCassettes] = useState<Cassette[]>([]);
  const [filteredCassettes, setFilteredCassettes] = useState<Cassette[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [itemsPerPage, setItemsPerPage] = useState<number>(15);
  const [errorMsg, setErrorMsg] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(true);

  return (
    <CassettesContext.Provider value={{ 
      originalCassettes, setOriginalCassettes, 
      filteredCassettes, setFilteredCassettes,      
      currentPage, setCurrentPage,    
      itemsPerPage, setItemsPerPage,
      errorMsg, setErrorMsg,
      isLoading, setIsLoading,
    }}>
      {children}
    </CassettesContext.Provider>
  );
};

export const useCassettes = () => {
  const context = useContext(CassettesContext);
  if (!context) {
    throw new Error('useCassettes must be used within a CassettesProvider');
  }
  return context;
};
