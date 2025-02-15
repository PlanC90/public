import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { User, Wallet, Award, Link as LinkIcon, ArrowDownToLine } from 'lucide-react';
import type { User as UserType } from '../types';
import { readJsonFile, writeJsonFile } from '../services/dataService';

export function Profile() {
  const [user, setUser] = useState<UserType>({
    username: '@johndoe',
    tasksAdded: 156,
    tasksSupported: 342,
    balance: 2345,
    walletAddress: '0x742d35Cc6634C0532925a3b844Bc454e4438f44e'
  });

  const [withdrawAmount, setWithdrawAmount] = useState('');

  useEffect(() => {
    const loadUser = async () => {
      const data = await readJsonFile<{ users: UserType[] }>('users.json');
      if (data?.users.length) {
        setUser(data.users[0]); // For demo, using first user
      }
    };
    loadUser();
  }, []);

  const handleWithdraw = async () => {
    const amount = Number(withdrawAmount);
    if (amount > 0 && amount <= user.balance) {
      const withdrawal = {
        username: user.username,
        amount,
        walletAddress: user.walletAddress,
        timestamp: new Date().toISOString()
      };

      const cekimData = await readJsonFile<{ withdrawals: any[] }>('cekim.json');
      const success = await writeJsonFile('cekim.json', {
        withdrawals: [...(cekimData?.withdrawals || []), withdrawal]
      });

      if (success) {
        const newBalance = 0;
        const userData = await readJsonFile<{ users: UserType[] }>('users.json');
        const updatedUsers = userData?.users.map(u => 
          u.username === user.username ? { ...u, balance: newBalance } : u
        ) || [];

        await writeJsonFile('users.json', { users: updatedUsers });
        setUser(prev => ({ ...prev, balance: newBalance }));
        setWithdrawAmount('');
      }
    }
  };

  const handleSaveWallet = async () => {
    const userData = await readJsonFile<{ users: UserType[] }>('users.json');
    const updatedUsers = userData?.users.map(u => 
      u.username === user.username ? { ...u, walletAddress: user.walletAddress } : u
    ) || [];

    await writeJsonFile('users.json', { users: updatedUsers });
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold text-gray-900">Profile</h1>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <User className="h-5 w-5" />
            User Information
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Username</label>
            <p className="mt-1 text-lg font-medium">{user.username}</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Wallet Address</label>
            <div className="mt-1 flex items-center gap-2">
              <input
                type="text"
                value={user.walletAddress}
                onChange={(e) => setUser({ ...user, walletAddress: e.target.value })}
                className="flex-1 rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                placeholder="Enter your wallet address"
              />
              <Button onClick={handleSaveWallet}>Save</Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-6 md:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <LinkIcon className="h-5 w-5" />
              Tasks Added
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{user.tasksAdded}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <Award className="h-5 w-5" />
              Tasks Supported
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{user.tasksSupported}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <Wallet className="h-5 w-5" />
              Balance
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{user.balance} MemeX$</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <ArrowDownToLine className="h-5 w-5" />
            Withdraw MemeX$
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Amount to Withdraw (Available: {user.balance} MemeX$)
            </label>
            <div className="mt-1 flex items-center gap-2">
              <input
                type="number"
                value={withdrawAmount}
                onChange={(e) => setWithdrawAmount(e.target.value)}
                max={user.balance}
                className="flex-1 rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                placeholder="Enter amount to withdraw"
              />
              <Button
                onClick={handleWithdraw}
                disabled={!withdrawAmount || Number(withdrawAmount) <= 0 || Number(withdrawAmount) > user.balance}
              >
                Withdraw
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}