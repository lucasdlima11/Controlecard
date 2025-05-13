import React from 'react';
import { Category, Purchase } from '../types';
import { getCategoryColor, getCategoryTextColor, getTotal, getTotalByCategory } from '../utils/categoryUtils';

interface CategorySummaryProps {
  purchases: Purchase[];
}

const CategorySummary: React.FC<CategorySummaryProps> = ({ purchases }) => {
  const totalByCategory = getTotalByCategory(purchases);
  const total = getTotal(purchases);
  
  const formatCurrency = (value: number) => {
    return value.toLocaleString('pt-BR', { 
      style: 'currency', 
      currency: 'BRL' 
    });
  };
  
  
  const percentages: Record<Category, number> = Object.entries(totalByCategory).reduce(
    (acc, [category, value]) => {
      acc[category as Category] = total > 0 ? (value / total) * 100 : 0;
      return acc;
    }, 
    {} as Record<Category, number>
  );
  
  return (
    <div className="bg-white rounded-lg shadow-md p-4 mb-6">
      <h2 className="text-lg font-semibold mb-4">Resumo por Categoria</h2>
      
      <div className="space-y-3">
        {Object.entries(totalByCategory)
          .filter(([_, value]) => value > 0) 
          .sort(([_, valueA], [__, valueB]) => valueB - valueA)
          .map(([category, value]) => (
            <div key={category} className="space-y-1">
              <div className="flex justify-between">
                <span className={`font-medium ${getCategoryTextColor(category as Category)}`}>
                  {category}
                </span>
                <span className="font-medium">{formatCurrency(value)}</span>
              </div>
              
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div 
                  className={`h-2.5 rounded-full ${getCategoryColor(category as Category)}`}
                  style={{ width: `${percentages[category as Category]}%` }}
                ></div>
              </div>
            </div>
          ))
        }
      </div>
      
      <div className="mt-4 pt-3 border-t flex justify-between">
        <span className="font-semibold">Total</span>
        <span className="font-semibold">{formatCurrency(total)}</span>
      </div>
    </div>
  );
};

export default CategorySummary;