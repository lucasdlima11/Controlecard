import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { Purchase, Category } from '../types';
import { getCategories } from '../utils/categoryUtils';
import { getPurchaseStatementMonth, getMonthName } from '../utils/dateUtils';

interface PurchaseFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (purchase: Purchase) => void;
  editPurchase?: Purchase;
}

const PurchaseForm: React.FC<PurchaseFormProps> = ({ 
  isOpen, 
  onClose, 
  onSave, 
  editPurchase 
}) => {
  const [name, setName] = useState('');
  const [value, setValue] = useState('');
  const [category, setCategory] = useState<Category>('Alimentação');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [currentInstallment, setCurrentInstallment] = useState('1');
  const [totalInstallments, setTotalInstallments] = useState('1');
  
  const categories = getCategories();
  
  useEffect(() => {
    if (editPurchase) {
      setName(editPurchase.name);
      setValue(editPurchase.value.toString());
      setCategory(editPurchase.category);
      setDescription(editPurchase.description || '');
      setDate(new Date(editPurchase.date).toISOString().split('T')[0]);
      
      if (editPurchase.category === 'Compras Parceladas') {
        setCurrentInstallment((editPurchase.currentInstallment || 1).toString());
        setTotalInstallments((editPurchase.totalInstallments || 1).toString());
      }
    } else {
      resetForm();
    }
  }, [editPurchase, isOpen]);
  
  const resetForm = () => {
    setName('');
    setValue('');
    setCategory('Alimentação');
    setDescription('');
    setDate(new Date().toISOString().split('T')[0]);
    setCurrentInstallment('1');
    setTotalInstallments('1');
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const purchaseDate = new Date(date);
    const { month, year } = getPurchaseStatementMonth(purchaseDate);
    
    const monthName = getMonthName(month);
    
    const parsedValue = parseFloat(value);
    
    const newPurchase: Purchase = {
      id: editPurchase?.id || Date.now().toString(),
      name,
      value: parsedValue,
      category,
      description: description || undefined,
      date: purchaseDate.toISOString(),
    };
    
    if (category === 'Compras Parceladas') {
      newPurchase.currentInstallment = parseInt(currentInstallment, 10);
      newPurchase.totalInstallments = parseInt(totalInstallments, 10);
      newPurchase.installmentValue = parsedValue / parseInt(totalInstallments, 10);
    }
    
    onSave(newPurchase);
    resetForm();
    onClose();
  };
  
  if (!isOpen) return null;
  
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-xl font-semibold">
            {editPurchase ? 'Editar Compra' : 'Nova Compra'}
          </h2>
          <button
            onClick={onClose}
            className="p-1 rounded-full hover:bg-gray-200 transition-colors"
          >
            <X size={20} />
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="p-4 space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
              Nome da compra
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>
          
          <div>
            <label htmlFor="value" className="block text-sm font-medium text-gray-700 mb-1">
              Valor (R$)
            </label>
            <input
              type="number"
              id="value"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              step="0.01"
              min="0"
              className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>
          
          <div>
            <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
              Categoria
            </label>
            <select
              id="category"
              value={category}
              onChange={(e) => setCategory(e.target.value as Category)}
              className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              required
            >
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>
          
          {category === 'Compras Parceladas' && (
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="currentInstallment" className="block text-sm font-medium text-gray-700 mb-1">
                  Parcela atual
                </label>
                <input
                  type="number"
                  id="currentInstallment"
                  value={currentInstallment}
                  onChange={(e) => setCurrentInstallment(e.target.value)}
                  min="1"
                  className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  required={category === 'Compras Parceladas'}
                />
              </div>
              <div>
                <label htmlFor="totalInstallments" className="block text-sm font-medium text-gray-700 mb-1">
                  Total de parcelas
                </label>
                <input
                  type="number"
                  id="totalInstallments"
                  value={totalInstallments}
                  onChange={(e) => setTotalInstallments(e.target.value)}
                  min="1"
                  className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  required={category === 'Compras Parceladas'}
                />
              </div>
            </div>
          )}
          
          <div>
            <label htmlFor="date" className="block text-sm font-medium text-gray-700 mb-1">
              Data da compra
            </label>
            <input
              type="date"
              id="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>
          
          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
              Descrição (opcional)
            </label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 min-h-[80px]"
            />
          </div>
          
          <div className="pt-2 flex space-x-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="flex-1 py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              Salvar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PurchaseForm;