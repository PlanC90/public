import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Link2, Flag, ThumbsUp, Plus } from 'lucide-react';
import type { Link as LinkType } from '../types';
import { readJsonFile, writeJsonFile } from '../services/dataService';

export function Links() {
  const [links, setLinks] = useState<LinkType[]>([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newLink, setNewLink] = useState({
    url: '',
    platform: 'Twitter' as LinkType['platform']
  });

  useEffect(() => {
    const loadLinks = async () => {
      const data = await readJsonFile<{ links: LinkType[] }>('links.json');
      if (data) {
        setLinks(data.links);
      }
    };
    loadLinks();
  }, []);

  const handleAddLink = async () => {
    if (newLink.url) {
      const link: LinkType = {
        username: '@johndoe', // This would come from the authenticated user
        platform: newLink.platform,
        timestamp: new Date().toISOString(),
        url: newLink.url,
        groupInfo: {
          name: 'MemeX Community',
          id: '123456789'
        },
        rewards: {
          add: 10,
          support: 5
        },
        reports: []
      };

      const updatedLinks = [link, ...links];
      const success = await writeJsonFile('links.json', { links: updatedLinks });

      if (success) {
        setLinks(updatedLinks);
        setNewLink({ url: '', platform: 'Twitter' });
        setShowAddForm(false);
      }
    }
  };

  const handleReport = async (linkUrl: string) => {
    const updatedLinks = links.map(link => {
      if (link.url === linkUrl) {
        return {
          ...link,
          reports: [...link.reports, '@johndoe'] // This would be the current user
        };
      }
      return link;
    });

    const success = await writeJsonFile('links.json', { links: updatedLinks });
    if (success) {
      setLinks(updatedLinks);
    }
  };

  const handleSupport = async (linkUrl: string) => {
    // Here you would typically update the user's balance and mark the link as supported
    // For now, we'll just show a success message
    toast.success('Link supported successfully!');
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-gray-900">Links</h1>
        <Button onClick={() => setShowAddForm(true)} className="flex items-center gap-2">
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
              <label className="block text-sm font-medium text-gray-700">Platform</label>
              <select
                value={newLink.platform}
                onChange={(e) => setNewLink(prev => ({ ...prev, platform: e.target.value as LinkType['platform'] }))}
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
              <label className="block text-sm font-medium text-gray-700">URL</label>
              <input
                type="url"
                value={newLink.url}
                onChange={(e) => setNewLink(prev => ({ ...prev, url: e.target.value }))}
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
                placeholder="Enter link URL"
              />
            </div>
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setShowAddForm(false)}>Cancel</Button>
              <Button onClick={handleAddLink}>Add Link</Button>
            </div>
          </CardContent>
        </Card>
      )}

      <div className="space-y-4">
        {links.map((link, index) => (
          <Card key={index}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0">
              <CardTitle className="text-lg font-medium">
                <span className="text-blue-600">{link.platform}</span> Link
              </CardTitle>
              <div className="flex items-center gap-2">
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="flex items-center gap-1"
                  onClick={() => handleSupport(link.url)}
                >
                  <ThumbsUp className="h-4 w-4" />
                  Support ({link.rewards.support} MemeX$)
                </Button>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="flex items-center gap-1 text-red-600"
                  onClick={() => handleReport(link.url)}
                >
                  <Flag className="h-4 w-4" />
                  Report {link.reports.length > 0 && `(${link.reports.length})`}
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="flex items-center gap-2 text-sm text-gray-500">
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
                Rewards: {link.rewards.add} MemeX$ for adding, {link.rewards.support} MemeX$ for supporting
              </div>
              {link.reports.length > 0 && (
                <div className="text-sm text-red-600">
                  Reported by: {link.reports.join(', ')}
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
