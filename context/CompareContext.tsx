import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Blend } from '../types';

interface CompareContextType {
  compareList: Blend[];
  addToCompare: (blend: Blend) => void;
  removeFromCompare: (id: number) => void;
  isInCompare: (id: number) => boolean;
  clearCompare: () => void;
  isModalOpen: boolean;
  setIsModalOpen: (isOpen: boolean) => void;
}

const CompareContext = createContext<CompareContextType | undefined>(undefined);

export const CompareProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [compareList, setCompareList] = useState<Blend[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const addToCompare = (blend: Blend) => {
    if (compareList.length >= 3) {
      // Optional: Replace the oldest or just alert. Let's alert for MVP.
      alert("You can compare up to 3 blends at a time.");
      return;
    }
    if (!compareList.find(i => i.id === blend.id)) {
      setCompareList([...compareList, blend]);
    }
  };

  const removeFromCompare = (id: number) => {
    setCompareList(compareList.filter(item => item.id !== id));
  };

  const isInCompare = (id: number) => {
    return compareList.some(item => item.id === id);
  };

  const clearCompare = () => {
    setCompareList([]);
  };

  return (
    <CompareContext.Provider value={{ 
      compareList, 
      addToCompare, 
      removeFromCompare, 
      isInCompare, 
      clearCompare,
      isModalOpen,
      setIsModalOpen 
    }}>
      {children}
    </CompareContext.Provider>
  );
};

export const useCompare = () => {
  const context = useContext(CompareContext);
  if (!context) throw new Error("useCompare must be used within a CompareProvider");
  return context;
};