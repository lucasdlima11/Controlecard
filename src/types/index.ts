export type Category = 'Transporte' | 'Alimentação' | 'Diversão' | 'PET' | 'Compras Parceladas';

export interface Purchase {
  id: string;
  name: string;
  value: number;
  category: Category;
  description?: string;
  date: string; // ISO string format
  // Fields for installment purchases
  installmentValue?: number;
  currentInstallment?: number;
  totalInstallments?: number;
}

export interface MonthlyStatement {
  month: number; // 0-11 (JavaScript months)
  year: number;
  purchases: Purchase[];
}