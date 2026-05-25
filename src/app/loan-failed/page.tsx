'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useLoan } from '@/context/LoanContext';

export default function LoanFailed() {
  const router = useRouter();
  const { loanData, clearLoanData } = useLoan();

  useEffect(() => {
    if (!loanData.amount) {
      router.push('/');
    }
  }, [loanData, router]);

  const handleHome = () => {
    clearLoanData();
    router.push('/');
  };

  const handleNewRequest = () => {
    clearLoanData();
    router.push('/loan-request');
  };

  const maskedMobile = loanData.mobile_number 
    ? loanData.mobile_number.substring(0, 3) + 'XXXX' + loanData.mobile_number.substring(7)
    : '';

  return (
    <div className="bg-gradient-to-br from-red-50 to-red-100 min-h-screen flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl shadow-2xl p-8 w-full max-w-md text-center">
        {/* Error Icon */}
        <div className="mb-6">
          <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-10 h-10 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-gray-800 mb-2">ঋণ প্রত্যাখ্যাত</h1>
          <p className="text-gray-600">দুঃখিত, আপনার ঋণের আবেদন প্রত্যাখ্যাত হয়েছে।</p>
        </div>

        {/* Loan Details */}
        <div className="bg-gray-50 rounded-2xl p-6 mb-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">আবেদনের বিবরণ</h2>
          <div className="space-y-3 text-left">
            <div className="flex justify-between border-b border-gray-200 pb-1">
              <span className="text-gray-600">পরিমাণ:</span>
              <span className="font-semibold text-red-600">৳{loanData.amount?.toLocaleString()}</span>
            </div>
            <div className="flex justify-between border-b border-gray-200 pb-1">
              <span className="text-gray-600">ক্যাটেগরি:</span>
              <span className="font-semibold">{loanData.category}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">মোবাইল:</span>
              <span className="font-semibold">{maskedMobile}</span>
            </div>
          </div>
        </div>

        {/* Reasons */}
        <div className="text-left mb-6">
          <h3 className="font-semibold text-gray-800 mb-2">সম্ভাব্য কারণসমূহ:</h3>
          <ul className="text-sm text-gray-600 space-y-1">
            <li>• অপর্যাপ্ত ক্রেডিট স্কোর</li>
            <li>• আয়ের প্রমাণ অসম্পূর্ণ</li>
            <li>• পূর্ববর্তী ঋণের বকেয়া</li>
            <li>• নীতিমালা অনুযায়ী অযোগ্য</li>
          </ul>
        </div>

        {/* Action Buttons */}
        <div className="space-y-3">
          <button 
            onClick={handleHome}
            className="w-full bg-pink-600 text-white py-3 px-6 rounded-2xl font-semibold hover:bg-pink-700 transition-colors"
          >
            হোম পেজে ফিরে যান
          </button>
          <button 
            onClick={handleNewRequest}
            className="w-full bg-gray-200 text-gray-700 py-3 px-6 rounded-2xl font-semibold hover:bg-gray-300 transition-colors"
          >
            নতুন আবেদন করুন
          </button>
        </div>
      </div>
    </div>
  );
}
