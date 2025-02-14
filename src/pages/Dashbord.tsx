import React from 'react';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '../components/ui/card';
import { Users, Link2, Award, Wallet } from 'lucide-react';

export function Dashboard() {
  const stats = [
    {
      name: 'Total Users',
      value: '2,345',
      icon: Users,
      change: '+12%',
      changeType: 'increase',
    },
    {
      name: 'Active Links',
      value: '1,234',
      icon: Link2,
      change: '+23%',
      changeType: 'increase',
    },
    {
      name: 'Total Rewards',
      value: '45,678 MemeX$',
      icon: Award,
      change: '+8%',
      changeType: 'increase',
    },
    {
      name: 'Total Withdrawals',
      value: '23,456 MemeX$',
      icon: Wallet,
      change: '+18%',
      changeType: 'increase',
    },
  ];

  return (
    <div>
      <h1 className="text-2xl font-semibold text-gray-900">Dashboard</h1>

      <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <Card key={stat.name}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-gray-500">
                  {stat.name}
                </CardTitle>
                <Icon className="h-4 w-4 text-gray-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <p
                  className={`text-xs ${
                    stat.changeType === 'increase'
                      ? 'text-green-600'
                      : 'text-red-600'
                  }`}
                >
                  {stat.change} from last month
                </p>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
