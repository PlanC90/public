import React, { useState } from 'react';
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Link2, Flag, ThumbsUp, Plus } from 'lucide-react';
import type { Link as LinkType } from '../types';

export function Links() {
  const [links, setLinks] = useState<LinkType[]>([
    {
      username: '@johndoe',
      platform: 'Twitter',
      timestamp: '2024-03-15T10:30:00Z',
      url: 'https://twitter.com/example/status/123',
      groupInfo: {
        name: 'MemeX Community',
        id: '123456789',
      },
      rewards: {
        add: 10,
        support: 5,
      },
      reports: [],
      supportedBy: [],
    },
  ]);

  const [showAddForm, setShowAddForm] = useState(false);
  const [newLink, setNewLink] = useState({
    url: '',
    platform: 'Twitter' as LinkType['platform'],
  });
  const [supportedLinks, setSupportedLinks] = useState<string[]>([]);

  const handleSupport = (url: string) => {
    if (!supportedLinks.includes(url)) {
      setSupportedLinks([...supportedLinks, url]);
      // Here you would also make an API call to update the backend
    }
  };

  const handleAddLink = () => {
    if (newLink.url) {
      const link: LinkType = {
        username: '@johndoe', // This would come from the authenticated user
        platform: newLink.platform,
        timestamp: new Date().toISOString(),
        url: newLink.url,
        groupInfo: {
          name: 'MemeX Community',
          id: '123456789',
        },
        rewards: {
          add: 10,
          support: 5,
        },
        reports: [],
        supportedBy: [],
      };

      setLinks((prev) => [link, ...prev]);
      setNewLink({ url: '', platform: 'Twitter' });
      setShowAddForm(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between">
        <h1 className="text-2xl font-semibold text-gray-900">Links</h1>
        <Button
          onClick={() => setShowAddForm(true)}
          className="flex items-center gap-2 mt-2 sm:mt-0"
        >
          <Plus className="h-4 w-4" />
          Add New Link
        </Button>
      </div>

      {showAddForm && (
        <Card>
          <CardHeader>
            <CardTitle>Add New Link</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Platform
              </label>
              <select
                value={newLink.platform}
                onChange={(e) =>
                  setNewLink((prev) => ({
                    ...prev,
                    platform: e.target.value as LinkType['platform'],
                  }))
                }
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
              >
                <option value="Twitter">Twitter</option>
                <option value="Reddit">Reddit</option>
                <option value="Facebook">Facebook</option>
                <option value="TikTok">TikTok</option>
                <option value="YouTube">YouTube</option>
                <option value="Other">Other</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                URL
              </label>
              <input
                type="url"
                value={newLink.url}
                onChange={(e) =>
                  setNewLink((prev) => ({ ...prev, url: e.target.value }))
                }
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
                placeholder="Enter link URL"
              />
            </div>
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setShowAddForm(false)}>
                Cancel
              </Button>
              <Button onClick={handleAddLink}>Add Link</Button>
            </div>
          </CardContent>
        </Card>
      )}

      <div className="space-y-4">
        {links.map((link, index) => (
          <Card key={index}>
            <CardHeader className="flex flex-col sm:flex-row items-start sm:items-center justify-between space-y-0">
              <CardTitle className="text-lg font-medium">
                <span className="text-blue-600">{link.platform}</span> Link
              </CardTitle>
              <div className="flex items-center space-x-2 mt-2 sm:mt-0">
                <Button
                  variant="outline"
                  size="sm"
                  className={`flex items-center gap-1 ${
                    supportedLinks.includes(link.url)
                      ? 'bg-green-500 text-white hover:bg-green-600'
                      : ''
                  }`}
                  onClick={() => handleSupport(link.url)}
                >
                  <ThumbsUp className="h-4 w-4" />
                  Support ({link.rewards.support} MemeX)
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className="flex items-center gap-1 text-red-600"
                >
                  <Flag className="h-4 w-4" />
                  Report
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 text-sm text-gray-500">
                <span>Added by {link.username}</span>
                <span>•</span>
                <span>{new Date(link.timestamp).toLocaleDateString()}</span>
                <span>•</span>
                <span>Group: {link.groupInfo.name}</span>
              </div>
              <a
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline"
              >
                {link.url}
              </a>
              <div className="text-sm text-gray-500">
                Rewards: {link.rewards.add} MemeX for adding,{' '}
                {link.rewards.support} MemeX for supporting
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}