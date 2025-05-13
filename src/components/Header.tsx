import React from 'react';
import { CreditCard } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <header className="bg-gradient-to-r from-blue-600 to-blue-800 text-white shadow-md">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <CreditCard size={28} className="text-white" />
          <h1 className="text-xl font-bold">ControleCard</h1>
        </div>
      </div>
    </header>
  );
};

export default Header;