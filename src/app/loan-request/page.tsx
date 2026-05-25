'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useLoan } from '@/context/LoanContext';

export default function LoanRequest() {
  const router = useRouter();
  const { loanData, updateLoanData } = useLoan();
  const [amount, setAmount] = useState(loanData.amount || '');
  const [category, setCategory] = useState(loanData.category || '');
  const [error, setError] = useState('');
  const [isValid, setIsValid] = useState(false);

  useEffect(() => {
    const amt = Number(amount);
    if (amt >= 1000 && amt <= 100000 && category) {
      setIsValid(true);
      setError('');
    } else {
      setIsValid(false);
      if (amount && (amt < 1000 || amt > 100000)) {
        setError('Amount must be between ৳1,000 and ৳1,00,000');
      } else {
        setError('');
      }
    }
  }, [amount, category]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isValid) return;

    try {
      const res = await fetch('/api/loan/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ amount: Number(amount), category })
      });
      const data = await res.json();
      
      if (data.success) {
        updateLoanData({ id: data.id, amount: Number(amount), category });
        router.push('/verify-number');
      } else {
        setError('Failed to create loan request. Please try again.');
      }
    } catch (err) {
      setError('Connection error. Please try again.');
    }
  };


  return (
    <div className="bg-gray-100 flex items-center justify-center min-h-screen p-4">
      <div className="bg-white p-6 rounded-xl shadow-md w-full max-w-md">
        
        {/* bKash Header */}
        <div className="flex items-center justify-center mb-4">
          <img src="/img/loanricuestpage.png" alt="bKash Logo"
               className="w-full h-36 object-contain" />
        </div>
        
        {/* Red Line */}
        <div className="w-full h-0.5 bg-red-500 mb-4"></div>
        
        {/* Description */}
        <div className="text-center mb-6">
          <p className="text-gray-600 text-sm leading-relaxed">
            লোনের সুদের হার এবং চার্জ আগে ভালোভাবে দেখে নিন । সময়মতো পরিশোধ না করলে জরিমানা লাগতে পারে 
          </p>
        </div>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4 text-xs">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          {/* Amount Input with Floating Label */}
          <div className="mb-4 relative">
            <input 
              type="number" 
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder=" " 
              className="w-full px-4 py-3 border rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-pink-500 peer" 
              required 
            />
            <label className="absolute text-sm text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-pink-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1">
              Amount (৳1,000 - ৳1,00,000)
            </label>
          </div>

          {/* Loan Category Dropdown with Floating Label */}
          <div className="mb-4 relative">
            <select 
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 peer appearance-none bg-white" 
              required
            >
              <option value="" disabled>Select</option>
              <option value="Business Loan">Business Loan</option>
              <option value="Personal Loan">Personal Loan</option>
            </select>
            <label className={`absolute text-sm text-gray-500 duration-300 transform top-2 z-10 origin-[0] bg-white px-2 left-1 ${category ? '-translate-y-4 scale-75 text-pink-600' : 'translate-y-1/2 scale-100'}`}>
              Category
            </label>
            <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
              <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
              </svg>
            </div>
          </div>

          {/* Checkbox */}
          <div className="flex items-center mb-6">
            <input id="useBkash" type="checkbox" defaultChecked className="h-4 w-4 text-pink-600 focus:ring-pink-500 border-gray-300 rounded" />
            <label htmlFor="useBkash" className="ml-2 block text-sm text-gray-700">
              Use bKash wallet number as your contact number
            </label>
          </div>

          {/* Confirm Button */}
          <button 
            type="submit" 
            disabled={!isValid}
            className="w-full bg-pink-500 text-white py-2 rounded-lg font-semibold hover:bg-pink-600 transition duration-200 disabled:opacity-50"
          >
            Request Loan 
          </button>
        </form>

        {/* Terms */}
        <p className="text-xs text-center text-gray-500 mt-4">
          By clicking on <strong>Get Loan</strong> you are agreeing to the 
          <a href="#" className="text-pink-600 underline ml-1">terms & conditions</a>
        </p>

      </div>
    </div>
  );
}
