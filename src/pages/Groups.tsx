import React from 'react';
import { Users, Link2, Calendar } from 'lucide-react';

type Group = {
  id: string;
  name: string;
  memberCount: number;
  linkCount: number;
  joinedAt: string;
  lastActivity: string;
};

const mockGroups: Group[] = [
  {
    id: '1',
    name: 'Tech Enthusiasts',
    memberCount: 250,
    linkCount: 45,
    joinedAt: '2024-02-15T08:00:00Z',
    lastActivity: '2024-03-10T15:30:00Z'
  },
  {
    id: '2',
    name: 'Digital Marketing',
    memberCount: 180,
    linkCount: 32,
    joinedAt: '2024-02-20T10:00:00Z',
    lastActivity: '2024-03-11T09:15:00Z'
  },
  {
    id: '3',
    name: 'Content Creators',
    memberCount: 320,
    linkCount: 67,
    joinedAt: '2024-02-10T14:30:00Z',
    lastActivity: '2024-03-11T11:45:00Z'
  }
];

export function Groups() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-gray-800">Groups</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {mockGroups.map((group) => (
          <div key={group.id} className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-start justify-between">
              <div className="flex items-center">
                <div className="h-12 w-12 rounded-lg bg-blue-100 flex items-center justify-center">
                  <Users className="w-6 h-6 text-blue-600" />
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-semibold text-gray-900">{group.name}</h3>
                  <p className="text-sm text-gray-500">
                    {group.memberCount.toLocaleString()} members
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-2 gap-4">
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="flex items-center">
                  <Link2 className="w-5 h-5 text-gray-400" />
                  <span className="ml-2 text-sm font-medium text-gray-500">Links Shared</span>
                </div>
                <p className="mt-2 text-2xl font-semibold text-gray-900">{group.linkCount}</p>
              </div>

              <div className="bg-gray-50 rounded-lg p-4">
                <div className="flex items-center">
                  <Calendar className="w-5 h-5 text-gray-400" />
                  <span className="ml-2 text-sm font-medium text-gray-500">Joined</span>
                </div>
                <p className="mt-2 text-sm font-medium text-gray-900">
                  {new Date(group.joinedAt).toLocaleDateString()}
                </p>
              </div>
            </div>

            <div className="mt-6">
              <div className="flex items-center text-sm text-gray-500">
                <span className="mr-2">Last activity:</span>
                <time dateTime={group.lastActivity}>
                  {new Date(group.lastActivity).toLocaleString()}
                </time>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
