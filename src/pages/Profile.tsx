import React, { useState } from 'react';
import { Wallet, Save, Download } from 'lucide-react';

export function Profile() {
  const [walletAddress, setWalletAddress] = useState('');
  const [memexBalance, setMemexBalance] = useState(50000);
  
  const handleWithdraw = async () => {
    if (memexBalance > 0) {
      try {
        const withdrawal = {
          walletAddress,
          amount: memexBalance,
          timestamp: new Date().toISOString()
        };
        
        // In a real app, this would be an API call
        console.log('Withdrawal:', withdrawal);
        setMemexBalance(0);
        alert('Withdrawal request submitted successfully!');
      } catch (error) {
        alert('Failed to process withdrawal');
      }
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">Profile</h1>
      
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Wallet Settings</h2>
        
        <div className="space-y-4">
          <div>
            <label htmlFor="wallet" className="block text-sm font-medium text-gray-700 mb-1">
              Wallet Address
            </label>
            <div className="flex gap-2">
              <input
                id="wallet"
                type="text"
                value={walletAddress}
                onChange={(e) => setWalletAddress(e.target.value)}
                placeholder="Enter your wallet address"
                className="flex-1 rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                onClick={() => alert('Wallet address saved!')}
                className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 flex items-center gap-2"
              >
                <Save className="w-4 h-4" />
                Save
              </button>
            </div>
          </div>
        </div>
      </div>
      
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">MEMEX Balance</h2>
        
        <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg mb-4">
          <div className="flex items-center gap-3">
            <Wallet className="w-6 h-6 text-blue-500" />
            <div>
              <p className="text-sm text-gray-500">Available Balance</p>
              <p className="text-2xl font-bold text-gray-900">{memexBalance.toLocaleString()} MEMEX</p>
            </div>
          </div>
        </div>
        
        <button
          onClick={handleWithdraw}
          disabled={memexBalance === 0}
          className={`w-full flex items-center justify-center gap-2 px-4 py-2 rounded-lg ${
            memexBalance > 0
              ? 'bg-green-500 hover:bg-green-600 text-white'
              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
          }`}
        >
          <Download className="w-4 h-4" />
          Withdraw MEMEX
        </button>
      </div>
    </div>
  );
}
