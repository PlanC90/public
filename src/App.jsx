import React, { useState, useMemo, useEffect } from 'react';
    import { FaStar, FaChartBar, FaList, FaShoppingCart, FaTags } from 'react-icons/fa';

    function App() {
      const [telegramUsername, setTelegramUsername] = useState('');
      const [sellAmount, setSellAmount] = useState('');
      const [buyAmount, setBuyAmount] = useState('');
      const [price, setPrice] = useState('');
      const [orders, setOrders] = useState([
        { id: 1, price: 1.20, change: 2.5, type: 'buy', amount: 100, createdAt: new Date(), username: 'user1' },
        { id: 2, price: 1.18, change: -1.0, type: 'sell', amount: 50, createdAt: new Date(), username: 'user2' },
        { id: 3, price: 1.22, change: 3.2, type: 'buy', amount: 200, createdAt: new Date(), username: 'user3' },
        { id: 4, price: 1.25, change: 1.5, type: 'sell', amount: 75, createdAt: new Date(), username: 'user4' },
        { id: 5, price: 1.23, change: -0.5, type: 'buy', amount: 150, createdAt: new Date(), username: 'user5' },
      ]);
      const [selectedPrice, setSelectedPrice] = useState(null);
      const [users, setUsers] = useState([
        { id: 1, username: 'user1', rating: 4.5 },
        { id: 2, username: 'user2', rating: 3.8 },
        { id: 3, username: 'user3', rating: 4.9 },
      ]);
      const [selectedUser, setSelectedUser] = useState(null);
      const [showRatingModal, setShowRatingModal] = useState(false);
      const [rating, setRating] = useState(0);
      const [filteredOrders, setFilteredOrders] = useState([]);
      const [showAllOrders, setShowAllOrders] = useState(true);
      const [isTelegramUsernameFetched, setIsTelegramUsernameFetched] = useState(false);
      const [loggedInUserId, setLoggedInUserId] = useState(null);

      useEffect(() => {
        // Burada Telegram'dan kullanıcı adını çekme işlemini yapamayız.
        // Bu nedenle, kullanıcıdan manuel olarak girmesini isteyeceğiz.
        // Ancak, kullanıcı deneyimini iyileştirmek için bir ipucu gösterebiliriz.
        // Örneğin, "Telegram uygulamanızdaki kullanıcı adınızı girin" gibi bir açıklama ekleyebiliriz.
        // Sunucu tarafında bu işlem yapılabilir.
        if (!isTelegramUsernameFetched) {
          // Simüle edilmiş Telegram kullanıcı adı çekme işlemi
          const simulatedUsername = prompt("Telegram kullanıcı adınızı girin (simülasyon):");
          if (simulatedUsername) {
            setTelegramUsername(simulatedUsername);
            setLoggedInUserId(simulatedUsername); // Simülasyon için kullanıcı adını ID olarak kullan
          }
          setIsTelegramUsernameFetched(true);
        }
      }, [isTelegramUsernameFetched]);

      const isOrderValid = (createdAt) => {
        const oneMonthAgo = new Date();
        oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);
        return createdAt > oneMonthAgo;
      };

      const averagePrice = useMemo(() => {
        if (orders.length === 0) return { price: 0, change: 0, isUp: null };
        const sum = orders.reduce((acc, order) => acc + order.price, 0);
        const avg = sum / orders.length;
        const change = orders.length > 1 ? ((orders[orders.length - 1].price - orders[0].price) / orders[0].price * 100).toFixed(2) : 0;
        const isUp = change > 0 ? true : change < 0 ? false : null;
        return {
          price: avg.toFixed(2),
          change: change,
          isUp: isUp
        };
      }, [orders]);

      const tradeBar = useMemo(() => {
        if (orders.length === 0) return { buyPercent: 50, sellPercent: 50 };
        const buyOrders = orders.filter(order => order.type === 'buy').length;
        const sellOrders = orders.filter(order => order.type === 'sell').length;
        const totalOrders = orders.length;
        const buyPercent = (buyOrders / totalOrders * 100).toFixed(0);
        const sellPercent = (sellOrders / totalOrders * 100).toFixed(0);
        return {
          buyPercent: buyPercent,
          sellPercent: sellPercent
        };
      }, [orders]);

      const handleOrderSubmit = (e) => {
        e.preventDefault();
        console.log('Order submitted:', {
          telegramUsername,
          sellAmount,
          buyAmount,
          price,
        });
      };

      const handlePriceClick = (price) => {
        setSelectedPrice(price);
      };

      const handleContactClick = (username) => {
        window.open(`https://t.me/${username}`, '_blank');
      };

      const handleCloseTrade = (username) => {
        console.log(`Trade closed with ${username}`);
        setOrders(orders.filter(order => order.username !== username));
      };

      const handleUserClick = (user) => {
        setSelectedUser(user);
        setShowRatingModal(true);
      };

      const handleRatingChange = (newRating) => {
        setRating(newRating);
      };

      const handleRatingSubmit = () => {
        console.log(`Rating submitted for ${selectedUser.username}: ${rating} stars`);
        setShowRatingModal(false);
        setRating(0);
      };

      const renderStars = () => {
        const stars = [];
        for (let i = 1; i <= 5; i++) {
          stars.push(
            <FaStar
              key={i}
              onClick={() => handleRatingChange(i)}
              color={i <= rating ? '#ffc107' : '#aaa'}
            />
          );
        }
        return stars;
      };

      const handleBuyClick = () => {
        const sortedSells = [...orders]
          .filter(order => order.type === 'sell' && isOrderValid(order.createdAt))
          .sort((a, b) => Math.abs(a.price - averagePrice.price) - Math.abs(b.price - averagePrice.price));
        const closestSell = sortedSells.length > 0 ? [sortedSells[0]] : [];
        setFilteredOrders(closestSell);
        setShowAllOrders(false);
         if (closestSell.length > 0) {
          setSelectedPrice(closestSell[0].price);
        } else {
          setSelectedPrice(null);
        }
      };

      const handleSellClick = () => {
         const sortedBuys = [...orders]
          .filter(order => order.type === 'buy' && isOrderValid(order.createdAt))
          .sort((a, b) => Math.abs(a.price - averagePrice.price) - Math.abs(b.price - averagePrice.price));
        const closestBuy = sortedBuys.length > 0 ? [sortedBuys[0]] : [];
        setFilteredOrders(closestBuy);
        setShowAllOrders(false);
         if (closestBuy.length > 0) {
          setSelectedPrice(closestBuy[0].price);
        } else {
          setSelectedPrice(null);
        }
      };

      const buyOrders = useMemo(() => {
        return showAllOrders ? orders.filter(order => order.type === 'buy' && isOrderValid(order.createdAt)) : [];
      }, [orders, showAllOrders]);

      const sellOrders = useMemo(() => {
        return showAllOrders ? orders.filter(order => order.type === 'sell' && isOrderValid(order.createdAt)) : [];
      }, [orders, showAllOrders]);

      const filteredValidOrders = useMemo(() => {
        return filteredOrders.filter(order => isOrderValid(order.createdAt));
      }, [filteredOrders]);

      const volume24h = useMemo(() => {
        return orders.reduce((acc, order) => {
          const orderDate = new Date(order.createdAt);
          const now = new Date();
          const diffInHours = Math.abs(now - orderDate) / (60 * 60 * 1000);
          if (diffInHours <= 24) {
            return acc + order.amount * order.price;
          }
          return acc;
        }, 0).toFixed(2);
      }, [orders]);

      const activeOrders = useMemo(() => {
        return orders.filter(order => isOrderValid(order.createdAt)).length;
      }, [orders]);

      const buyOrdersTotalAmount = useMemo(() => {
        return buyOrders.reduce((acc, order) => acc + order.amount, 0);
      }, [buyOrders]);

      const sellOrdersTotalAmount = useMemo(() => {
        return sellOrders.reduce((acc, order) => acc + order.amount, 0);
      }, [sellOrders]);

      const myOrders = useMemo(() => {
        return orders.filter(order => order.username === loggedInUserId && isOrderValid(order.createdAt));
      }, [orders, loggedInUserId]);

      const handleMyOrdersClick = () => {
        setFilteredOrders(myOrders);
        setShowAllOrders(false);
      };

      return (
        <div className="container">
          <h2><FaTags />Memex P2P Token Trade</h2>
          <form onSubmit={handleOrderSubmit}>
            <div className="form-group">
              <label>Telegram Username (e.g., @username)</label>
              <input
                type="text"
                value={telegramUsername}
                onChange={(e) => setTelegramUsername(e.target.value)}
                placeholder="Enter your Telegram username"
              />
            </div>
            <div className="form-group">
              <label>Sell Amount</label>
              <input
                type="number"
                value={sellAmount}
                onChange={(e) => setSellAmount(e.target.value)}
                placeholder="Enter amount to sell"
              />
            </div>
            <div className="form-group">
              <label>Buy Amount</label>
              <input
                type="number"
                value={buyAmount}
                onChange={(e) => setBuyAmount(e.target.value)}
                placeholder="Enter amount to buy"
              />
            </div>
            <div className="form-group">
              <label>Price</label>
              <input
                type="number"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                placeholder="Enter your price"
              />
            </div>
            <button type="submit">Create Order</button>
          </form>

          <div className="average-price" style={{ marginTop: '20px' }}>
            <FaChartBar />
            Average Price:
            <span className={averagePrice.isUp === true ? 'price-up' : averagePrice.isUp === false ? 'price-down' : ''}>
              ${averagePrice.price}
            </span>
            <span className={averagePrice.isUp === true ? 'price-up arrow-up' : averagePrice.isUp === false ? 'price-down arrow-down' : ''}>
              ({averagePrice.change}%)
            </span>
          </div>

          <div className="market-info">
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <FaShoppingCart style={{ marginRight: '5px' }} />
              <span>{volume24h}&nbsp;</span>
              24h Volume
            </div>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <FaList style={{ marginRight: '5px' }} />
              <span>{activeOrders}&nbsp;</span>
              Active Orders
            </div>
          </div>

          <div className="trade-bar-container">
            <div className="trade-bar trade-bar-buy" style={{ width: `${tradeBar.buyPercent}%` }}>
              <span className="trade-bar-label trade-bar-label-left">{tradeBar.buyPercent}%</span>
            </div>
            <div className="trade-bar trade-bar-sell" style={{ width: `${tradeBar.sellPercent}%` }}>
              <span className="trade-bar-label trade-bar-label-right">{tradeBar.sellPercent}%</span>
            </div>
          </div>

          <div className="trade-buttons" style={{ marginTop: '40px' }}>
            <button className="buy" onClick={handleBuyClick}><FaShoppingCart />Buy</button>
            <button className="sell" onClick={handleSellClick}><FaTags />Sell</button>
            <button onClick={handleMyOrdersClick}><FaList />My Orders</button>
          </div>

          {showAllOrders ? (
            <div className="order-book">
              <div className="order-book-buy">
                <h3>Buy Orders</h3>
                <table>
                  <thead>
                    <tr>
                      <th>Price</th>
                      <th>Amount</th>
                      <th>Change (%)</th>
                    </tr>
                  </thead>
                  <tbody>
                    {buyOrders.map((order) => (
                      <tr key={order.id} onClick={() => handlePriceClick(order.price)}>
                        <td>${order.price}</td>
                        <td>{order.amount}</td>
                        <td>{order.change}</td>
                      </tr>
                    ))}
                  </tbody>
                  <tfoot>
                    <tr>
                      <td colSpan="3">Total Amount: {buyOrdersTotalAmount}</td>
                    </tr>
                  </tfoot>
                </table>
              </div>
              <div className="order-book-sell">
                <h3>Sell Orders</h3>
                <table>
                  <thead>
                    <tr>
                      <th>Price</th>
                      <th>Amount</th>
                      <th>Change (%)</th>
                    </tr>
                  </thead>
                  <tbody>
                    {sellOrders.map((order) => (
                      <tr key={order.id} onClick={() => handlePriceClick(order.price)}>
                        <td>${order.price}</td>
                        <td>{order.amount}</td>
                        <td>{order.change}</td>
                      </tr>
                    ))}
                  </tbody>
                  <tfoot>
                    <tr>
                      <td colSpan="3">Total Amount: {sellOrdersTotalAmount}</td>
                    </tr>
                  </tfoot>
                </table>
              </div>
            </div>
          ) : (
            <table className="filtered-orders-table">
              <thead>
                <tr>
                  <th>Price</th>
                  <th>Amount</th>
                  <th>Change (%)</th>
                </tr>
              </thead>
              <tbody>
                {filteredValidOrders.map((order) => (
                  <tr key={order.id} onClick={() => handlePriceClick(order.price)}>
                    <td>${order.price}</td>
                    <td>{order.amount}</td>
                    <td>{order.change}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}

          {selectedPrice && (
            <div className="user-list">
              <h3>Users at Price: {selectedPrice}</h3>
              <ul>
                {users.map((user) => (
                  <li key={user.id} onClick={() => handleUserClick(user)}>
                    <span>
                      {user.username} - Rating: {user.rating}
                    </span>
                    <div>
                      <button onClick={(e) => {
                        e.stopPropagation();
                        handleContactClick(user.username);
                      }}>
                        Contact
                      </button>
                      {loggedInUserId === user.username && (
                        <button style={{ backgroundColor: '#dc3545' }} onClick={(e) => {
                          e.stopPropagation();
                          handleCloseTrade(user.username);
                        }}>
                          Close
                        </button>
                      )}
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {showRatingModal && (
            <div className="rating-modal">
              <div className="rating-modal-content">
                <h3>Rate {selectedUser.username}</h3>
                <div className="rating-stars">{renderStars()}</div>
                <button onClick={handleRatingSubmit}>Submit Rating</button>
              </div>
            </div>
          )}
        </div>
      );
    }

    export default App;
