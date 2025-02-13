import React, { useState, useEffect } from 'react';
    import { Link2, CheckCircle, Users, Clock, Edit2, Trash2, Plus, ThumbsUp, AlertTriangle } from 'lucide-react';
    import settings from '../config/settings.json';

    type Link = {
      id: string;
      url: string;
      platform: string;
      username: string;
      groupName: string;
      timestamp: string;
      completed: boolean;
      reported: boolean;
      supporters: Array<{
        username: string;
        clicked: boolean;
      }>;
      memexEarned: number;
    };

    type Wallet = {
      username: string;
      balance: number;
    };

    const mockLinks: Link[] = [
      {
        id: '1',
        url: 'https://twitter.com/example/status/123',
        platform: 'Twitter',
        username: 'user1',
        groupName: 'Tech Group',
        timestamp: '2024-03-10T10:00:00Z',
        completed: false,
        reported: false,
        supporters: [
          { username: 'supporter1', clicked: true },
          { username: 'supporter2', clicked: false }
        ],
        memexEarned: settings.rewards.linkShare
      },
    ];

    export function Links() {
      const [links, setLinks] = useState(mockLinks);
      const [filter, setFilter] = useState('all');
      const [search, setSearch] = useState('');
      const [showAddModal, setShowAddModal] = useState(false);
      const [showEditModal, setShowEditModal] = useState<Link | null>(null);
      const [editingLink, setEditingLink] = useState<Link | null>(null);
      const [newLink, setNewLink] = useState({ url: '', platform: 'Twitter' });
      const [currentUser, setCurrentUser] = useState('');
      const [isAdmin, setIsAdmin] = useState(false);
      const [wallets, setWallets] = useState<Wallet[]>(() => {
        const storedWallets = localStorage.getItem('wallets');
        return storedWallets ? JSON.parse(storedWallets) : [];
      });

      useEffect(() => {
        const fetchTelegramUser = async () => {
          try {
            const response = await fetch('https://api.telegram.org/bot7700368269:AAH_Yyk9tTQgsHWukRDGeAZG71d17irW4R8/getMe');
            const data = await response.json();
            if (data.ok) {
              setCurrentUser(data.result.username);
              setIsAdmin(settings.admins.includes(data.result.username));
            }
          } catch (error) {
            console.error('Telegram API error:', error);
          }
        };

        fetchTelegramUser();
      }, []);

      useEffect(() => {
        localStorage.setItem('wallets', JSON.stringify(wallets));
      }, [wallets]);

      const isValidUrl = (urlString: string) => {
        try {
          new URL(urlString);
          return true;
        } catch (e) {
          return false;
        }
      };

      const getHostname = (urlString: string) => {
        try {
          const url = new URL(urlString);
          return url.hostname;
        } catch (e) {
          return urlString;
        }
      };

      const updateWalletsFile = (updatedWallets: Wallet[]) => {
        localStorage.setItem('wallets', JSON.stringify(updatedWallets));
      };

      const handleAddLink = () => {
        if (!isValidUrl(newLink.url)) {
          alert('Please enter a valid URL');
          return;
        }

        const link: Link = {
          id: Date.now().toString(),
          ...newLink,
          username: currentUser,
          groupName: 'Tech Group',
          timestamp: new Date().toISOString(),
          completed: false,
          reported: false,
          supporters: [],
          memexEarned: settings.rewards.linkShare
        };
        setLinks([link, ...links]);

        // Update wallet balance for the user who shared the link
        const updatedWallets = updateBalance(currentUser, settings.rewards.linkShare);
        setWallets(updatedWallets);
        updateWalletsFile(updatedWallets);

        setShowAddModal(false);
        setNewLink({ url: '', platform: 'Twitter' });
      };

      const handleEditLink = () => {
        if (editingLink && isValidUrl(editingLink.url)) {
          setLinks(links.map(link => 
            link.id === editingLink.id ? editingLink : link
          ));
          setShowEditModal(false);
          setEditingLink(null);
        } else {
          alert('Please enter a valid URL');
        }
      };

      const handleDelete = (id: string) => {
        if (!isAdmin) {
          alert('Only admins can delete links!');
          return;
        }
        
        if (window.confirm('Are you sure you want to delete this link?')) {
          setLinks(links.filter(link => link.id !== id));
        }
      };

      const handleReport = (id: string) => {
        setLinks(links.map(link => {
          if (link.id === id) {
            return { ...link, reported: !link.reported };
          }
          return link;
        }));
      };

      const updateBalance = (username: string, reward: number) => {
        const walletIndex = wallets.findIndex(wallet => wallet.username === username);
        if (walletIndex === -1) {
          // If wallet doesn't exist, create a new one
          return [...wallets, { username, balance: reward }];
        } else {
          // If wallet exists, update the balance
          const updatedWallets = [...wallets];
          updatedWallets[walletIndex] = {
            ...updatedWallets[walletIndex],
            balance: updatedWallets[walletIndex].balance + reward,
          };
          return updatedWallets;
        }
      };

      const handleSupport = (linkId: string) => {
        setLinks(links.map(link => {
          if (link.id === linkId) {
            const alreadySupported = link.supporters.some(s => s.username === currentUser);
            if (!alreadySupported) {
              const updatedWallets = updateBalance(currentUser, settings.rewards.support);
              setWallets(updatedWallets);
              updateWalletsFile(updatedWallets);

              return {
                ...link,
                supporters: [...link.supporters, { username: currentUser, clicked: false }],
                memexEarned: link.memexEarned + settings.rewards.support
              };
            }
          }
          return link;
        }));
      };

      const handleClick = (linkId: string) => {
        setLinks(links.map(link => {
          if (link.id === linkId) {
            const updatedWallets = updateBalance(currentUser, settings.rewards.verification);
            setWallets(updatedWallets);
            updateWalletsFile(updatedWallets);

            return {
              ...link,
              supporters: link.supporters.map(s => 
                s.username === currentUser ? { ...s, clicked: true } : s
              ),
              memexEarned: link.memexEarned + settings.rewards.verification
            };
          }
          return link;
        }));
      };

      return (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">Links</h1>
            <button
              onClick={() => setShowAddModal(true)}
              className="w-full sm:w-auto bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 flex items-center justify-center gap-2"
            >
              <Plus className="w-4 h-4" />
              Add Link
            </button>
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <input
              type="text"
              placeholder="Search links..."
              className="w-full sm:flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          <select
            className="w-full sm:w-auto px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          >
            <option value="all">All Links</option>
            <option value="completed">Completed</option>
            <option value="pending">Pending</option>
            <option value="reported">Reported</option>
          </select>
        </div>

        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="overflow-x-auto">
            <div className="min-w-full inline-block align-middle">
              <div className="overflow-hidden">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Link
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Platform
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        User
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden lg:table-cell">
                        Supporters
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        MEMEX
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {links.map((link) => (
                      <tr key={link.id} className={`hover:bg-gray-50 ${link.reported ? 'bg-red-50' : ''}`}>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {isValidUrl(link.url) ? (
                            <a
                              href={link.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              onClick={() => handleClick(link.id)}
                              className={`flex items-center gap-2 ${
                                link.reported ? 'text-red-600 hover:text-red-800' : 'text-blue-600 hover:text-blue-800'
                              }`}
                            >
                              <Link2 className="w-4 h-4" />
                              <span className="truncate max-w-[200px]">{getHostname(link.url)}</span>
                            </a>
                          ) : (
                            <span className="text-gray-500">{link.url}</span>
                          )}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                            {link.platform}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center">
                              <span className="text-sm font-medium text-gray-600">
                                {link.username[0].toUpperCase()}
                              </span>
                            </div>
                            <div className="ml-3">
                              <p className="text-sm text-gray-900">@{link.username}</p>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span
                            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                              link.completed
                                ? 'bg-green-100 text-green-800'
                                : 'bg-yellow-100 text-yellow-800'
                            }`}
                          >
                            <CheckCircle className={`w-4 h-4 mr-1 ${
                              link.completed ? 'text-green-500' : 'text-yellow-500'
                            }`} />
                            {link.completed ? 'Completed' : 'Pending'}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap hidden lg:table-cell">
                          <div className="flex items-center space-x-2">
                            <button
                              onClick={() => handleSupport(link.id)}
                              className={`ml-2 ${link.supporters.some(s => s.username === currentUser) ? 'text-green-500 hover:text-green-600' : 'text-blue-500 hover:text-blue-600'}`}
                              title="Support"
                            >
                              <ThumbsUp className="w-4 h-4" />
                            </button>
                            <span className="text-sm font-medium text-gray-900">
                              {link.supporters.length}
                            </span>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="text-sm font-semibold text-gray-900">
                            {link.memexEarned.toLocaleString()} MEMEX
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center space-x-2">
                            {(link.username === currentUser || isAdmin) && (
                              <>
                                <button
                                  className="text-blue-500 hover:text-blue-600"
                                  onClick={() => {
                                    setEditingLink(link);
                                    setShowEditModal(true);
                                  }}
                                  title="Edit"
                                >
                                  <Edit2 className="w-4 h-4" />
                                </button>
                                {isAdmin && (
                                  <button
                                    className="text-red-500 hover:text-red-600"
                                    onClick={() => handleDelete(link.id)}
                                    title="Delete"
                                  >
                                    <Trash2 className="w-4 h-4" />
                                  </button>
                                )}
                              </>
                            )}
                            <button
                              className={`text-yellow-500 hover:text-yellow-600 ${link.reported ? 'text-green-500 hover:text-green-600' : ''}`}
                              onClick={() => handleReport(link.id)}
                              title={link.reported ? "Unreport" : "Report"}
                            >
                              <AlertTriangle className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>

        {/* Add Link Modal */}
        {showAddModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-lg p-6 w-full max-w-md">
              <h2 className="text-xl font-bold mb-4">Add New Link</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    URL
                  </label>
                  <input
                    type="text"
                    value={newLink.url}
                    onChange={(e) => setNewLink({ ...newLink, url: e.target.value })}
                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter URL"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Platform
                  </label>
                  <select
                    value={newLink.platform}
                    onChange={(e) => setNewLink({ ...newLink, platform: e.target.value })}
                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    {settings.platforms.map(platform => (
                      <option key={platform} value={platform}>{platform}</option>
                    ))}
                  </select>
                </div>
                <div className="flex justify-end space-x-2">
                  <button
                    onClick={() => setShowAddModal(false)}
                    className="px-4 py-2 text-gray-600 hover:text-gray-800"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleAddLink}
                    className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                  >
                    Add Link
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Edit Link Modal */}
        {showEditModal && editingLink && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-lg p-6 w-full max-w-md">
              <h2 className="text-xl font-bold mb-4">Edit Link</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    URL
                  </label>
                  <input
                    type="text"
                    value={editingLink.url}
                    onChange={(e) => setEditingLink({ ...editingLink, url: e.target.value })}
                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter URL"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Platform
                  </label>
                  <select
                    value={editingLink.platform}
                    onChange={(e) => setEditingLink({ ...editingLink, platform: e.target.value })}
                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    {settings.platforms.map(platform => (
                      <option key={platform} value={platform}>{platform}</option>
                    ))}
                  </select>
                </div>
                <div className="flex justify-end space-x-2">
                  <button
                    onClick={() => {
                      setShowEditModal(false);
                      setEditingLink(null);
                    }}
                    className="px-4 py-2 text-gray-600 hover:text-gray-800"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleEditLink}
                    className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                  >
                    Save
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
