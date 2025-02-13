import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, Link2, Users, BarChart3, UserCircle, Plus } from 'lucide-react';

const navItems = [
  { path: '/', icon: LayoutDashboard, label: 'Dashboard' },
  { path: '/links', icon: Link2, label: 'Links' },
  { path: '/groups', icon: Users, label: 'Groups' },
  { path: '/reports', icon: BarChart3, label: 'Reports' },
  { path: '/profile', icon: UserCircle, label: 'Profile' },
];

export function Layout({ children }: { children: React.ReactNode }) {
  const location = useLocation();
  const [username, setUsername] = useState('');
  const [memexBalance, setMemexBalance] = useState(0);

  useEffect(() => {
    // Kullanıcı bilgilerini local storage'dan al
    const storedUsername = localStorage.getItem('username');
    const storedBalance = localStorage.getItem('memexBalance');

    if (storedUsername) {
      setUsername(storedUsername);
    }
    if (storedBalance) {
      setMemexBalance(parseInt(storedBalance));
    }
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 flex">
      {/* Sidebar */}
      <nav className="w-64 bg-white shadow-lg">
        <div className="p-4 border-b">
          <h1 className="text-2xl font-bold text-gray-800">Memex ARMY</h1>
          <div className="mt-2 flex items-center space-x-2">
            <UserCircle className="w-5 h-5 text-gray-500" />
            <span className="text-sm text-gray-600">@{username}</span>
          </div>
          <div className="mt-2 text-sm text-gray-600">
            <span className="font-semibold">{memexBalance.toLocaleString()}</span> MEMEX
          </div>
        </div>
        <ul className="mt-4">
          {navItems.map(({ path, icon: Icon, label }) => (
            <li key={path}>
              <Link
                to={path}
                className={`flex items-center px-4 py-3 text-gray-700 hover:bg-gray-100 ${
                  location.pathname === path ? 'bg-gray-100' : ''
                }`}
              >
                <Icon className="w-5 h-5 mr-3" />
                {label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      {/* Main content */}
      <main className="flex-1 p-8">
        {children}
      </main>
    </div>
  );
}
