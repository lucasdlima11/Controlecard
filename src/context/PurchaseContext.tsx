import React, { createContext, useContext, useState, useEffect } from 'react';
import { Purchase, MonthlyStatement } from '../types';
import { 
  addPurchase, 
  updatePurchase, 
  deletePurchase, 
  getMonthlyStatement 
} from '../utils/storageUtils';

interface PurchaseContextType {
  currentStatement: MonthlyStatement;
  nextStatement: MonthlyStatement;
  selectedMonth: number;
  selectedYear: number;
  setSelectedMonth: (month: number, year: number) => void;
  addNewPurchase: (purchase: Purchase) => void;
  editPurchase: (purchase: Purchase) => void;
  removePurchase: (id: string) => void;
}

const PurchaseContext = createContext<PurchaseContextType | undefined>(undefined);

export const usePurchases = () => {
  const context = useContext(PurchaseContext);
  if (!context) {
    throw new Error('usePurchases must be used within a PurchaseProvider');
  }
  return context;
};

export const PurchaseProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const today = new Date();
  const [selectedMonth, setSelectedMonth] = useState(today.getMonth());
  const [selectedYear, setSelectedYear] = useState(today.getFullYear());
  const [currentStatement, setCurrentStatement] = useState<MonthlyStatement>({
    month: selectedMonth,
    year: selectedYear,
    purchases: []
  });
  const [nextStatement, setNextStatement] = useState<MonthlyStatement>({
    month: selectedMonth === 11 ? 0 : selectedMonth + 1,
    year: selectedMonth === 11 ? selectedYear + 1 : selectedYear,
    purchases: []
  });
  
  // Load monthly statements when month/year changes
  useEffect(() => {
    const current = getMonthlyStatement(selectedMonth, selectedYear);
    setCurrentStatement(current);
    
    const nextMonth = selectedMonth === 11 ? 0 : selectedMonth + 1;
    const nextYear = selectedMonth === 11 ? selectedYear + 1 : selectedYear;
    const next = getMonthlyStatement(nextMonth, nextYear);
    setNextStatement(next);
  }, [selectedMonth, selectedYear]);
  
  const handleSetSelectedMonth = (month: number, year: number) => {
    setSelectedMonth(month);
    setSelectedYear(year);
  };
  
  const handleAddPurchase = (purchase: Purchase) => {
    addPurchase(purchase);
    // Refresh statements
    const current = getMonthlyStatement(selectedMonth, selectedYear);
    setCurrentStatement(current);
    
    const nextMonth = selectedMonth === 11 ? 0 : selectedMonth + 1;
    const nextYear = selectedMonth === 11 ? selectedYear + 1 : selectedYear;
    const next = getMonthlyStatement(nextMonth, nextYear);
    setNextStatement(next);
  };
  
  const handleEditPurchase = (purchase: Purchase) => {
    updatePurchase(purchase);
    // Refresh statements
    const current = getMonthlyStatement(selectedMonth, selectedYear);
    setCurrentStatement(current);
    
    const nextMonth = selectedMonth === 11 ? 0 : selectedMonth + 1;
    const nextYear = selectedMonth === 11 ? selectedYear + 1 : selectedYear;
    const next = getMonthlyStatement(nextMonth, nextYear);
    setNextStatement(next);
  };
  
  const handleDeletePurchase = (id: string) => {
    deletePurchase(id);
    // Refresh statements
    const current = getMonthlyStatement(selectedMonth, selectedYear);
    setCurrentStatement(current);
    
    const nextMonth = selectedMonth === 11 ? 0 : selectedMonth + 1;
    const nextYear = selectedMonth === 11 ? selectedYear + 1 : selectedYear;
    const next = getMonthlyStatement(nextMonth, nextYear);
    setNextStatement(next);
  };
  
  const value = {
    currentStatement,
    nextStatement,
    selectedMonth,
    selectedYear,
    setSelectedMonth: handleSetSelectedMonth,
    addNewPurchase: handleAddPurchase,
    editPurchase: handleEditPurchase,
    removePurchase: handleDeletePurchase
  };
  
  return (
    <PurchaseContext.Provider value={value}>
      {children}
    </PurchaseContext.Provider>
  );
};