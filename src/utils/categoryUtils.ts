import { Purchase, Category } from '../types';

/**
 * Get all available categories
 */
export const getCategories = (): Category[] => {
  return ['Transporte', 'Alimentação', 'Diversão', 'PET', 'Compras Parceladas'];
};

/**
 * Get total spending by category
 */
export const getTotalByCategory = (purchases: Purchase[]): Record<Category, number> => {
  const initial: Record<Category, number> = {
    'Transporte': 0,
    'Alimentação': 0,
    'Diversão': 0,
    'PET': 0,
    'Compras Parceladas': 0
  };
  
  return purchases.reduce((acc, purchase) => {
    acc[purchase.category] += purchase.value;
    return acc;
  }, initial);
};

/**
 * Get purchases grouped by category
 */
export const getPurchasesByCategory = (purchases: Purchase[]): Record<Category, Purchase[]> => {
  const initial: Record<Category, Purchase[]> = {
    'Transporte': [],
    'Alimentação': [],
    'Diversão': [],
    'PET': [],
    'Compras Parceladas': []
  };
  
  return purchases.reduce((acc, purchase) => {
    acc[purchase.category].push(purchase);
    return acc;
  }, initial);
};

/**
 * Get total of all purchases
 */
export const getTotal = (purchases: Purchase[]): number => {
  return purchases.reduce((total, purchase) => total + purchase.value, 0);
};

/**
 * Get category color
 */
export const getCategoryColor = (category: Category): string => {
  const colors: Record<Category, string> = {
    'Transporte': 'bg-blue-500',
    'Alimentação': 'bg-green-500',
    'Diversão': 'bg-purple-500',
    'PET': 'bg-yellow-500',
    'Compras Parceladas': 'bg-red-500'
  };
  
  return colors[category] || 'bg-gray-500';
};

/**
 * Get category light color (for backgrounds)
 */
export const getCategoryLightColor = (category: Category): string => {
  const colors: Record<Category, string> = {
    'Transporte': 'bg-blue-100',
    'Alimentação': 'bg-green-100',
    'Diversão': 'bg-purple-100',
    'PET': 'bg-yellow-100',
    'Compras Parceladas': 'bg-red-100'
  };
  
  return colors[category] || 'bg-gray-100';
};

/**
 * Get category text color
 */
export const getCategoryTextColor = (category: Category): string => {
  const colors: Record<Category, string> = {
    'Transporte': 'text-blue-700',
    'Alimentação': 'text-green-700',
    'Diversão': 'text-purple-700',
    'PET': 'text-yellow-700',
    'Compras Parceladas': 'text-red-700'
  };
  
  return colors[category] || 'text-gray-700';
};