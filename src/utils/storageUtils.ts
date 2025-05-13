import { Purchase, MonthlyStatement } from '../types';

const STORAGE_KEY = 'controlecard_data';

interface StoredData {
  purchases: Purchase[];
}

/**
 * Save all purchases to localStorage
 */
export const savePurchases = (purchases: Purchase[]): void => {
  const data: StoredData = { purchases };
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
};

/**
 * Get all purchases from localStorage
 */
export const getPurchases = (): Purchase[] => {
  const data = localStorage.getItem(STORAGE_KEY);
  if (!data) return [];
  
  try {
    const parsedData: StoredData = JSON.parse(data);
    return parsedData.purchases || [];
  } catch (error) {
    console.error('Error parsing stored purchases:', error);
    return [];
  }
};

/**
 * Add a new purchase
 */
export const addPurchase = (purchase: Purchase): void => {
  const purchases = getPurchases();
  purchases.push(purchase);
  savePurchases(purchases);
};

/**
 * Update an existing purchase
 */
export const updatePurchase = (updatedPurchase: Purchase): void => {
  const purchases = getPurchases();
  const index = purchases.findIndex(p => p.id === updatedPurchase.id);
  
  if (index !== -1) {
    purchases[index] = updatedPurchase;
    savePurchases(purchases);
  }
};

/**
 * Delete a purchase
 */
export const deletePurchase = (id: string): void => {
  const purchases = getPurchases();
  const filteredPurchases = purchases.filter(p => p.id !== id);
  savePurchases(filteredPurchases);
};

/**
 * Get purchases for a specific month's statement
 */
export const getMonthlyStatement = (month: number, year: number): MonthlyStatement => {
  const purchases = getPurchases();
  
  // Filter purchases for the selected month/year statement
  const statementPurchases = purchases.filter(purchase => {
    const purchaseDate = new Date(purchase.date);
    const purchaseDay = purchaseDate.getDate();
    const purchaseMonth = purchaseDate.getMonth();
    const purchaseYear = purchaseDate.getFullYear();
    
    // If purchase day is 1-11, it belongs to that month's statement
    if (purchaseDay <= 11) {
      return purchaseMonth === month && purchaseYear === year;
    }
    
    // If purchase day is 12-31, it belongs to next month's statement
    const prevMonth = month === 0 ? 11 : month - 1;
    const prevYear = month === 0 ? year - 1 : year;
    
    return purchaseMonth === prevMonth && purchaseYear === prevYear;
  });
  
  return {
    month,
    year,
    purchases: statementPurchases
  };
};