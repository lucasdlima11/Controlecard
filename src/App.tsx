import React, { useState } from 'react';
import Header from './components/Header';
import MonthSelector from './components/MonthSelector';
import CategorySummary from './components/CategorySummary';
import PurchaseList from './components/PurchaseList';
import PurchaseForm from './components/PurchaseForm';
import FloatingButton from './components/FloatingButton';
import { PurchaseProvider, usePurchases } from './context/PurchaseContext';
import { Purchase } from './types';
import { getMonthName } from './utils/dateUtils';

const MainContent: React.FC = () => {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingPurchase, setEditingPurchase] = useState<Purchase | undefined>(undefined);
  
  const { 
    currentStatement, 
    nextStatement,
    selectedMonth, 
    selectedYear, 
    setSelectedMonth,
    addNewPurchase,
    editPurchase,
    removePurchase
  } = usePurchases();
  
  const handleOpenForm = () => {
    setEditingPurchase(undefined);
    setIsFormOpen(true);
  };
  
  const handleCloseForm = () => {
    setIsFormOpen(false);
    setEditingPurchase(undefined);
  };
  
  const handleSavePurchase = (purchase: Purchase) => {
    if (editingPurchase) {
      editPurchase(purchase);
    } else {
      addNewPurchase(purchase);
    }
  };
  
  const handleEditPurchase = (purchase: Purchase) => {
    setEditingPurchase(purchase);
    setIsFormOpen(true);
  };
  
  const handleDeletePurchase = (id: string) => {
    if (window.confirm('Tem certeza que deseja excluir esta compra?')) {
      removePurchase(id);
    }
  };

  const nextMonth = selectedMonth === 11 ? 0 : selectedMonth + 1;
  const nextYear = selectedMonth === 11 ? selectedYear + 1 : selectedYear;
  
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="container mx-auto px-4 py-6 max-w-4xl">
        <MonthSelector 
          selectedMonth={selectedMonth}
          selectedYear={selectedYear}
          onSelectMonth={setSelectedMonth}
        />
        
        <div className="space-y-8">
          {/* Current Month Statement */}
          <div>
            <h2 className="text-xl font-semibold mb-4">
              Fatura de {getMonthName(selectedMonth)} {selectedYear}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="col-span-1">
                <CategorySummary purchases={currentStatement.purchases} />
              </div>
              
              <div className="md:col-span-2">
                <PurchaseList 
                  purchases={currentStatement.purchases}
                  onEditPurchase={handleEditPurchase}
                  onDeletePurchase={handleDeletePurchase}
                />
              </div>
            </div>
          </div>

          {/* Next Month Statement */}
          <div>
            <h2 className="text-xl font-semibold mb-4">
              Próxima Fatura ({getMonthName(nextMonth)} {nextYear})
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="col-span-1">
                <CategorySummary purchases={nextStatement.purchases} />
              </div>
              
              <div className="md:col-span-2">
                <PurchaseList 
                  purchases={nextStatement.purchases}
                  onEditPurchase={handleEditPurchase}
                  onDeletePurchase={handleDeletePurchase}
                />
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <FloatingButton onClick={handleOpenForm} />
      
      <PurchaseForm 
        isOpen={isFormOpen}
        onClose={handleCloseForm}
        onSave={handleSavePurchase}
        editPurchase={editingPurchase}
      />

      <footer className="text-center py-4 text-gray-600 text-sm">
        Desenvolvido por Lucas Lima
      </footer>
    </div>
  );
};

function App() {
  return (
    <PurchaseProvider>
      <MainContent />
    </PurchaseProvider>
  );
}

export default App;