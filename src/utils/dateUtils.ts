/**
 * Determines if a purchase belongs to the current statement based on the date
 * Cutoff is the 11th of each month
 */
export const getPurchaseStatementMonth = (date: Date): { month: number; year: number } => {
  const day = date.getDate();
  let month = date.getMonth(); // 0-11
  let year = date.getFullYear();
  
  // If purchase was made after the 11th, it goes to next month's statement
  if (day >= 12) {
    // If December, roll over to January of next year
    if (month === 11) {
      month = 0;
      year += 1;
    } else {
      month += 1;
    }
  }
  
  return { month, year };
};

/**
 * Get formatted month name
 */
export const getMonthName = (month: number): string => {
  const monthNames = [
    'Janeiro', 'Fevereiro', 'Março', 'Abril', 
    'Maio', 'Junho', 'Julho', 'Agosto', 
    'Setembro', 'Outubro', 'Novembro', 'Dezembro'
  ];
  
  return monthNames[month];
};

/**
 * Get current and previous few months for statement selection
 */
export const getAvailableMonths = (count = 6): Array<{ month: number; year: number; label: string }> => {
  const today = new Date();
  const months = [];
  
  for (let i = 0; i < count; i++) {
    const date = new Date(today);
    date.setMonth(today.getMonth() - i);
    
    const month = date.getMonth();
    const year = date.getFullYear();
    
    months.push({
      month,
      year,
      label: `${getMonthName(month)} ${year}`
    });
  }
  
  return months;
};

/**
 * Format date to display
 */
export const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleDateString('pt-BR');
};