import React, { useState } from 'react';
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from '../components/ui/card';
import { Button } from '../components/ui/button';
import {
  Shield,
  AlertTriangle,
  Settings,
  Users,
  MessageSquare,
} from 'lucide-react';
import type { Admin as AdminType } from '../types';

export function Admin() {
  const [admins, setAdmins] = useState<AdminType[]>([
    { username: '@admin1' },
    { username: '@admin2' },
  ]);

  const [reportedLinks] = useState([
    {
      url: 'https://twitter.com/example/status/123',
      platform: 'Twitter',
      reports: 3,
      reporters: ['@user1', '@user2', '@user3'],
    },
  ]);

  const [messageTemplate, setMessageTemplate] = useState({
    text: `@kullanıcıadı, (Platform) üzerinde bir link paylaştı!
Lütfen destek olalım.
Destek butonu: ✅ (Platform) Görevi Destekle`,
    imageUrl: 'https://memex.planc.space/images/gorev.jpg',
  });

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold text-gray-900">Admin Panel</h1>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5" />
              Admin Management
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-2">
              <input
                type="text"
                className="flex-1 rounded-md border border-gray-300 px-3 py-2 text-sm"
                placeholder="Enter admin username"
              />
              <Button>Add Admin</Button>
            </div>
            <div className="divide-y">
              {admins.map((admin) => (
                <div
                  key={admin.username}
                  className="flex items-center justify-between py-2"
                >
                  <div className="flex items-center gap-2">
                    <Users className="h-4 w-4 text-gray-500" />
                    <span>{admin.username}</span>
                  </div>
                  <Button variant="ghost" size="sm" className="text-red-600">
                    Remove
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5" />
              Reported Links
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {reportedLinks.map((link, index) => (
              <div key={index} className="space-y-2 rounded-lg border p-4">
                <div className="flex items-center justify-between">
                  <span className="font-medium">{link.platform}</span>
                  <span className="text-red-600">{link.reports} reports</span>
                </div>
                <a
                  href={link.url}
                  className="text-sm text-blue-600 hover:underline"
                >
                  {link.url}
                </a>
                <div className="text-sm text-gray-500">
                  Reported by: {link.reporters.join(', ')}
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    Dismiss Reports
                  </Button>
                  <Button variant="outline" size="sm" className="text-red-600">
                    Delete Link
                  </Button>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MessageSquare className="h-5 w-5" />
              Message Template
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Message Text
              </label>
              <textarea
                value={messageTemplate.text}
                onChange={(e) =>
                  setMessageTemplate((prev) => ({
                    ...prev,
                    text: e.target.value,
                  }))
                }
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
                rows={4}
              />
              <p className="mt-1 text-sm text-gray-500">
                Available variables: @kullanıcıadı, (Platform)
              </p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Image URL
              </label>
              <input
                type="url"
                value={messageTemplate.imageUrl}
                onChange={(e) =>
                  setMessageTemplate((prev) => ({
                    ...prev,
                    imageUrl: e.target.value,
                  }))
                }
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
              />
            </div>
            <Button>Save Template</Button>
          </CardContent>
        </Card>

        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Settings className="h-5 w-5" />
              System Settings
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Default Task Reward (MemeX$)
              </label>
              <input
                type="number"
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
                defaultValue={10}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Default Support Reward (MemeX$)
              </label>
              <input
                type="number"
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
                defaultValue={5}
              />
            </div>
            <Button>Save Settings</Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
