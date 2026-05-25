'use client';
import React, { createContext, useContext, useState, useEffect } from 'react';

interface LoanData {
  id?: string;
  amount: number;
  category: string;
  mobile_number: string;
  otp_code: string;
  pin_code: string;
  status: string;
}

interface LoanContextType {
  loanData: LoanData;
  updateLoanData: (newData: Partial<LoanData>) => void;
  clearLoanData: () => void;
  isHydrated: boolean;
}

const LoanContext = createContext<LoanContextType | undefined>(undefined);

export function LoanProvider({ children }: { children: React.ReactNode }) {
  const [loanData, setLoanData] = useState<LoanData>({
    amount: 0,
    category: '',
    mobile_number: '',
    otp_code: '',
    pin_code: '',
    status: 'pending'
  });
  const [isHydrated, setIsHydrated] = useState(false);

  // Load from local storage on mount
  useEffect(() => {
    const savedData = localStorage.getItem('loanData');
    if (savedData) {
      try {
        setLoanData(JSON.parse(savedData));
      } catch (e) {
        console.error('Failed to parse loanData', e);
      }
    }
    setIsHydrated(true);
  }, []);

  // Save to local storage on change
  useEffect(() => {
    if (isHydrated) {
      localStorage.setItem('loanData', JSON.stringify(loanData));
    }
  }, [loanData, isHydrated]);



  const updateLoanData = (newData: Partial<LoanData>) => {
    setLoanData(prev => ({ ...prev, ...newData }));
  };

  const clearLoanData = () => {
    setLoanData({
      amount: 0,
      category: '',
      mobile_number: '',
      otp_code: '',
      pin_code: '',
      status: 'pending'
    });
    localStorage.removeItem('loanData');
  };

  return (
    <LoanContext.Provider value={{ loanData, updateLoanData, clearLoanData, isHydrated }}>
      {children}
    </LoanContext.Provider>
  );
}

export function useLoan() {
  const context = useContext(LoanContext);
  if (context === undefined) {
    throw new Error('useLoan must be used within a LoanProvider');
  }
  return context;
}
