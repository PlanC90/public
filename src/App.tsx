import React, { useState, useEffect } from 'react'
import { Plus, ArrowUpDown, X, TrendingUp, TrendingDown } from 'lucide-react'

interface User {
  telegram_username: string;
  rating: number;
}

interface Order {
  id: number;
  token_name: string;
  order_type: 'buy' | 'sell';
  amount: number;
  price: number;
  user: User;
}

interface CreateOrderForm {
  token_name: string;
  order_type: 'buy' | 'sell';
  amount: number;
  price: number;
}

interface MarketStats {
  averagePrice: number;
  priceChange: number;
}

function App() {
  const [activeTab, setActiveTab] = useState<'buy' | 'sell'>('buy');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isRatingModalOpen, setIsRatingModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [rating, setRating] = useState<number>(5);
  const [currentUser] = useState<User>({
    telegram_username: 'current_user', // Telegram entegrasyonundan gelecek
    rating: 0
  });
  
  const [formData, setFormData] = useState<CreateOrderForm>({
    token_name: 'MemeX',
    order_type: 'buy',
    amount: 0,
    price: 0
  });

  const [marketStats, setMarketStats] = useState<MarketStats>({
    averagePrice: 0.485,
    priceChange: 2.5
  });

  const mockOrders: Order[] = [
    {
      id: 1,
      token_name: 'MemeX',
      order_type: 'sell',
      amount: 1000,
      price: 0.5,
      user: {
        telegram_username: 'seller1',
        rating: 4.5
      }
    },
    {
      id: 2,
      token_name: 'MemeX',
      order_type: 'buy',
      amount: 500,
      price: 0.48,
      user: {
        telegram_username: 'buyer1',
        rating: 4.2
      }
    }
  ];

  const handleContact = (user: User) => {
    // Telegram deep link
    const telegramUrl = `https://t.me/${user.telegram_username}`;
    window.open(telegramUrl, '_blank');
    setSelectedUser(user);
    // Rating modal'ı işlem tamamlandıktan sonra gösterilecek
    setTimeout(() => setIsRatingModalOpen(true), 1000);
  };

  const handleRatingSubmit = () => {
    if (selectedUser) {
      console.log(`Rating ${selectedUser.telegram_username} with ${rating} stars`);
      // TODO: Rating'i veritabanına kaydet
      setIsRatingModalOpen(false);
      setSelectedUser(null);
      setRating(5);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Creating order:', formData);
    setIsModalOpen(false);
    setFormData({
      token_name: 'MemeX',
      order_type: 'buy',
      amount: 0,
      price: 0
    });
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-8">
        <header className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">P2P Token Trading Platform</h1>
          <div className="flex items-center gap-4">
            <span className="text-gray-400">
              Welcome, @{currentUser.telegram_username}
            </span>
            <button 
              onClick={() => setIsModalOpen(true)}
              className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg flex items-center gap-2"
            >
              <Plus size={20} />
              Create Order
            </button>
          </div>
        </header>

        {/* Create Order Modal */}
        {isModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-gray-800 rounded-lg p-6 w-full max-w-md">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold">Create New Order</h2>
                <button 
                  onClick={() => setIsModalOpen(false)}
                  className="text-gray-400 hover:text-white"
                >
                  <X size={24} />
                </button>
              </div>
              <div className="mb-4 p-4 bg-gray-700 rounded-lg">
                <div className="flex justify-between items-center">
                  <div>
                    <span className="text-sm text-gray-400">Average Price</span>
                    <div className="text-xl font-bold">${marketStats.averagePrice}</div>
                  </div>
                  <div className={`flex items-center ${marketStats.priceChange >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                    {marketStats.priceChange >= 0 ? <TrendingUp size={20} /> : <TrendingDown size={20} />}
                    <span className="ml-1">{Math.abs(marketStats.priceChange)}%</span>
                  </div>
                </div>
              </div>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Token</label>
                  <input
                    type="text"
                    value="MemeX"
                    disabled
                    className="w-full bg-gray-700 rounded-lg px-3 py-2 text-white opacity-50"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Order Type</label>
                  <select
                    value={formData.order_type}
                    onChange={(e) => setFormData({...formData, order_type: e.target.value as 'buy' | 'sell'})}
                    className={`w-full rounded-lg px-3 py-2 text-white ${
                      formData.order_type === 'buy' ? 'bg-green-600' : 'bg-red-600'
                    }`}
                  >
                    <option value="buy">Buy</option>
                    <option value="sell">Sell</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Amount</label>
                  <input
                    type="number"
                    value={formData.amount}
                    onChange={(e) => setFormData({...formData, amount: Number(e.target.value)})}
                    className="w-full bg-gray-700 rounded-lg px-3 py-2 text-white"
                    min="0"
                    step="1"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Price (USD)</label>
                  <input
                    type="number"
                    value={formData.price}
                    onChange={(e) => setFormData({...formData, price: Number(e.target.value)})}
                    className="w-full bg-gray-700 rounded-lg px-3 py-2 text-white"
                    min="0"
                    step="0.01"
                    required
                  />
                </div>
                <button
                  type="submit"
                  className={`w-full px-4 py-2 rounded-lg mt-4 ${
                    formData.order_type === 'buy' 
                      ? 'bg-green-600 hover:bg-green-700' 
                      : 'bg-red-600 hover:bg-red-700'
                  }`}
                >
                  Create {formData.order_type === 'buy' ? 'Buy' : 'Sell'} Order
                </button>
              </form>
            </div>
          </div>
        )}

        {/* Rating Modal */}
        {isRatingModalOpen && selectedUser && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-gray-800 rounded-lg p-6 w-full max-w-md">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold">Rate User</h2>
                <button 
                  onClick={() => setIsRatingModalOpen(false)}
                  className="text-gray-400 hover:text-white"
                >
                  <X size={24} />
                </button>
              </div>
              <div className="text-center mb-4">
                <p className="text-gray-400">How was your experience with</p>
                <p className="text-lg font-bold">@{selectedUser.telegram_username}?</p>
              </div>
              <div className="flex justify-center gap-2 mb-6">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    onClick={() => setRating(star)}
                    className={`text-2xl ${star <= rating ? 'text-yellow-400' : 'text-gray-600'}`}
                  >
                    ★
                  </button>
                ))}
              </div>
              <button
                onClick={handleRatingSubmit}
                className="w-full bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg"
              >
                Submit Rating
              </button>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Order Book */}
          <div className="lg:col-span-2 bg-gray-800 rounded-lg p-6">
            <div className="flex gap-4 mb-6">
              <button
                className={`px-4 py-2 rounded-lg ${
                  activeTab === 'buy'
                    ? 'bg-green-600 text-white'
                    : 'bg-gray-700 text-gray-300'
                }`}
                onClick={() => setActiveTab('buy')}
              >
                Buy Orders
              </button>
              <button
                className={`px-4 py-2 rounded-lg ${
                  activeTab === 'sell'
                    ? 'bg-red-600 text-white'
                    : 'bg-gray-700 text-gray-300'
                }`}
                onClick={() => setActiveTab('sell')}
              >
                Sell Orders
              </button>
            </div>

            <div className="space-y-4">
              {mockOrders
                .filter((order) => order.order_type === activeTab)
                .map((order) => (
                  <div
                    key={order.id}
                    className="bg-gray-700 rounded-lg p-4 flex justify-between items-center"
                  >
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-lg font-semibold">
                          {order.token_name}
                        </span>
                        <span className="text-sm text-gray-400">
                          @{order.user.telegram_username}
                        </span>
                        <span className="text-yellow-400 text-sm">
                          ★ {order.user.rating}
                        </span>
                      </div>
                      <div className="text-sm text-gray-300">
                        Amount: {order.amount} tokens
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-xl font-bold">
                        ${order.price.toFixed(2)}
                      </div>
                      <button 
                        onClick={() => handleContact(order.user)}
                        className="mt-2 bg-blue-600 hover:bg-blue-700 px-4 py-1 rounded text-sm"
                      >
                        Contact
                      </button>
                    </div>
                  </div>
                ))}
            </div>
          </div>

          {/* Market Stats */}
          <div className="bg-gray-800 rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <ArrowUpDown size={20} />
              Market Stats
            </h2>
            <div className="space-y-4">
              <div className="bg-gray-700 rounded-lg p-4">
                <div className="text-sm text-gray-400">24h Volume</div>
                <div className="text-xl font-bold">$24,532</div>
              </div>
              <div className="bg-gray-700 rounded-lg p-4">
                <div className="text-sm text-gray-400">Active Orders</div>
                <div className="text-xl font-bold">42</div>
              </div>
              <div className="bg-gray-700 rounded-lg p-4">
                <div className="text-sm text-gray-400">Average Price</div>
                <div className="flex justify-between items-center">
                  <div className="text-xl font-bold">${marketStats.averagePrice}</div>
                  <div className={`flex items-center ${marketStats.priceChange >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                    {marketStats.priceChange >= 0 ? <TrendingUp size={20} /> : <TrendingDown size={20} />}
                    <span className="ml-1">{Math.abs(marketStats.priceChange)}%</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App