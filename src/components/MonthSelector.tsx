import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { getAvailableMonths } from '../utils/dateUtils';

interface MonthSelectorProps {
  selectedMonth: number;
  selectedYear: number;
  onSelectMonth: (month: number, year: number) => void;
}

const MonthSelector: React.FC<MonthSelectorProps> = ({ 
  selectedMonth, 
  selectedYear, 
  onSelectMonth 
}) => {
  const availableMonths = getAvailableMonths(12);
  
  const currentMonthIndex = availableMonths.findIndex(
    m => m.month === selectedMonth && m.year === selectedYear
  );
  
  const handlePrevMonth = () => {
    if (currentMonthIndex < availableMonths.length - 1) {
      const prevMonth = availableMonths[currentMonthIndex + 1];
      onSelectMonth(prevMonth.month, prevMonth.year);
    }
  };
  
  const handleNextMonth = () => {
    if (currentMonthIndex > 0) {
      const nextMonth = availableMonths[currentMonthIndex - 1];
      onSelectMonth(nextMonth.month, nextMonth.year);
    }
  };
  
  const currentMonth = availableMonths[currentMonthIndex];
  
  return (
    <div className="flex items-center justify-center space-x-4 my-4">
      <button 
        onClick={handlePrevMonth}
        disabled={currentMonthIndex >= availableMonths.length - 1}
        className="p-2 rounded-full hover:bg-gray-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <ChevronLeft size={20} />
      </button>
      
      <div className="text-xl font-semibold">{currentMonth?.label || 'Carregando...'}</div>
      
      <button 
        onClick={handleNextMonth}
        disabled={currentMonthIndex <= 0}
        className="p-2 rounded-full hover:bg-gray-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <ChevronRight size={20} />
      </button>
    </div>
  );
};

export default MonthSelector;