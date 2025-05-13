import React from 'react';
import { Edit2, Trash2 } from 'lucide-react';
import { Purchase } from '../types';
import { formatDate } from '../utils/dateUtils';
import { getCategoryLightColor, getCategoryTextColor } from '../utils/categoryUtils';

interface PurchaseItemProps {
  purchase: Purchase;
  onEdit: (purchase: Purchase) => void;
  onDelete: (id: string) => void;
}

const PurchaseItem: React.FC<PurchaseItemProps> = ({ purchase, onEdit, onDelete }) => {
  const { id, name, value, category, description, date, currentInstallment, totalInstallments } = purchase;
  
  const formatCurrency = (value: number) => {
    return value.toLocaleString('pt-BR', { 
      style: 'currency', 
      currency: 'BRL' 
    });
  };
  
  return (
    <div className={`border rounded-lg mb-3 overflow-hidden transition-all duration-200 hover:shadow-md ${getCategoryLightColor(category)}`}>
      <div className="p-4">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="font-medium text-gray-800">{name}</h3>
            {category === 'Compras Parceladas' && currentInstallment && totalInstallments && (
              <div className="text-sm text-gray-600 mt-1">
                Parcela {currentInstallment} de {totalInstallments}
              </div>
            )}
            {description && (
              <p className="text-sm text-gray-600 mt-1">{description}</p>
            )}
            <div className="mt-2 flex items-center">
              <span className={`text-xs font-medium px-2 py-1 rounded-full ${getCategoryTextColor(category)} ${getCategoryLightColor(category)}`}>
                {category}
              </span>
              <span className="text-xs text-gray-500 ml-2">{formatDate(date)}</span>
            </div>
          </div>
          <div className="text-right">
            <div className="font-semibold text-gray-800">
              {formatCurrency(value)}
            </div>
            <div className="flex mt-2 space-x-1">
              <button 
                onClick={() => onEdit(purchase)}
                className="p-1.5 rounded-full text-gray-500 hover:bg-gray-200 transition-colors"
              >
                <Edit2 size={16} />
              </button>
              <button 
                onClick={() => onDelete(id)}
                className="p-1.5 rounded-full text-gray-500 hover:bg-red-100 hover:text-red-600 transition-colors"
              >
                <Trash2 size={16} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PurchaseItem;