import React from 'react';
import { Purchase, Category } from '../types';
import PurchaseItem from './PurchaseItem';
import { getPurchasesByCategory } from '../utils/categoryUtils';

interface PurchaseListProps {
  purchases: Purchase[];
  onEditPurchase: (purchase: Purchase) => void;
  onDeletePurchase: (id: string) => void;
}

const PurchaseList: React.FC<PurchaseListProps> = ({ 
  purchases, 
  onEditPurchase, 
  onDeletePurchase 
}) => {
  const purchasesByCategory = getPurchasesByCategory(purchases);
  
  // Only display categories that have purchases
  const categoriesWithPurchases = Object.entries(purchasesByCategory)
    .filter(([_, categoryPurchases]) => categoryPurchases.length > 0)
    .map(([category]) => category as Category);
  
  if (purchases.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6 text-center">
        <p className="text-gray-500">Nenhuma compra registrada neste mês.</p>
      </div>
    );
  }
  
  return (
    <div className="space-y-6">
      {categoriesWithPurchases.map(category => (
        <div key={category} className="bg-white rounded-lg shadow-md p-4">
          <h2 className="text-lg font-semibold mb-3">{category}</h2>
          
          <div className="space-y-2">
            {purchasesByCategory[category].map(purchase => (
              <PurchaseItem 
                key={purchase.id} 
                purchase={purchase} 
                onEdit={onEditPurchase}
                onDelete={onDeletePurchase}
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default PurchaseList;