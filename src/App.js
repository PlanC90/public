import React, { useState, useMemo, useEffect } from 'react';
import { FaStar, FaChartBar, FaList, FaShoppingCart, FaTags } from 'react-icons/fa';

function App() {
  const [telegramUsername, setTelegramUsername] = useState('');
  const [orderType, setOrderType] = useState('buy');
  const [amount, setAmount] = useState('');
  const [price, setPrice] = useState('');
  const [orders, setOrders] = useState([]);
  const [selectedPrice, setSelectedPrice] = useState(null);
  const [users, setUsers] = useState([
    { id: 1, username: 'user1', rating: 4.5 },
    { id: 2, username: 'user2', rating: 3.8 },
    { id: 3, username: 4.9 },
  ]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [showRatingModal, setShowRatingModal] = useState(false);
  const [rating, setRating] = useState(0);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [showAllOrders, setShowAllOrders] = useState(true);
  const [isTelegramUsernameFetched, setIsTelegramUsernameFetched] = useState(false);
  const [loggedInUserId, setLoggedInUserId] = useState(null);
  const [usernameError, setUsernameError] = useState(false);
  const [totalAmount, setTotalAmount] = useState(0);
  const [buttonColor, setButtonColor] = useState('#007bff');

  useEffect(() => {
    // Telegram'dan kullanıcı adını çekme (simülasyon)
    const simulatedUsername = "@testuser"; // Buraya Telegram'dan çekilen kullanıcı adını yerleştirin
    if (simulatedUsername) {
      setTelegramUsername(simulatedUsername);
      setLoggedInUserId(simulatedUsername);
      setIsTelegramUsernameFetched(true);
    }
  }, []);

  useEffect(() => {
    const calculateTotalAmount = () => {
      const parsedPrice = parseFloat(String(price).replace(/,/g, '')) || 0;
      const parsedAmount = parseFloat(String(amount).replace(/,/g, '')) || 0;
  
      if (parsedPrice && parsedAmount) {
        setTotalAmount(formatNumber((parsedPrice * parsedAmount).toFixed(2)));
      } else {
        setTotalAmount(0);
      }
    };
  
      calculateTotalAmount();
  }, [price, amount]);

  useEffect(() => {
    fetch('/api/orders.php')
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        console.log("API'den gelen veri:", data);
        if (Array.isArray(data)) {
          setOrders(data);
        } else {
          console.error('Veri okuma hatası: Gelen veri bir dizi değil.', data);
          setOrders([]);
        }
      })
      .catch(error => console.error('Error fetching orders:', error));
  }, []);

  useEffect(() => {
    if (orderType === 'buy') {
      setButtonColor('#28a745'); // Yeşil
    } else if (orderType === 'sell') {
      setButtonColor('#dc3545'); // Kırmızı
    } else {
      setButtonColor('#007bff'); // Varsayılan mavi
    }
  }, [orderType]);

  const formatNumber = (number) => {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  const isOrderValid = (createdAt) => {
    const oneMonthAgo = new Date();
    oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);
    return new Date(createdAt) > oneMonthAgo;
  };

  const averagePrice = useMemo(() => {
    if (!orders || !Array.isArray(orders) || orders.length === 0) return { price: 0, change: 0, isUp: null };
    const sum = orders.reduce((acc, order) => acc + parseFloat(order.price), 0);
    const avg = sum / orders.length;
    const change = orders.length > 1 ? ((orders[orders.length - 1].price - orders[0].price) / orders[0].price * 100).toFixed(2) : 0;
    const isUp = change > 0 ? true : change < 0 ? false : null;
    return {
      price: avg.toFixed(5),
      change: change,
      isUp: isUp
    };
  }, [orders]);

  const tradeBar = useMemo(() => {
    if (!orders || !Array.isArray(orders) || orders.length === 0) return { buyPercent: 50, sellPercent: 50 };
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
    if (!telegramUsername) {
      setUsernameError(true);
      alert("Telegram username is required. Please enter your Telegram username.");
      return;
    }
    setUsernameError(false);
    console.log('Order submitted:', {
      telegramUsername,
      orderType,
      amount,
      price,
    });

    // Form verilerini gönderme
    fetch('/api/orders.php', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*' // CORS hatası için
      },
      body: JSON.stringify({
        telegramUsername: telegramUsername,
        type: orderType,
        amount: amount,
        price: price,
      }),
    })
    .then(response => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    })
    .then(data => {
      console.log('Success:', data);
      // Başarılı bir şekilde gönderildikten sonra form alanlarını temizle
      setAmount('');
      setPrice('');
       // Verileri yeniden çek
       fetch('/api/orders.php')
       .then(response => response.json())
       .then(data => setOrders(Array.isArray(data) ? data : []))
       .catch(error => console.error('Error fetching orders:', error));
    })
    .catch((error) => {
      console.error('Error:', error);
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
        React.createElement(FaStar, {
          key: i,
          onClick: () => handleRatingChange(i),
          color: i <= rating ? '#ffc107' : '#aaa'
        })
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
    return showAllOrders && Array.isArray(orders) ? orders.filter(order => order.type === 'buy' && isOrderValid(order.createdAt)).slice(0, 5) : [];
  }, [orders, showAllOrders]);

  const sellOrders = useMemo(() => {
    return showAllOrders && Array.isArray(orders) ? orders.filter(order => order.type === 'sell' && isOrderValid(order.createdAt)).slice(0, 5) : [];
  }, [orders, showAllOrders]);

  const filteredValidOrders = useMemo(() => {
    return Array.isArray(filteredOrders) ? filteredOrders.filter(order => isOrderValid(order.createdAt)) : [];
  }, [filteredOrders]);

  const volume24h = useMemo(() => {
    return Array.isArray(orders) ? orders.reduce((acc, order) => {
      const orderDate = new Date(order.createdAt);
      const now = new Date();
      const diffInHours = Math.abs(now - orderDate) / (60 * 60 * 1000);
      if (diffInHours <= 24) {
        return acc + order.amount * order.price;
      }
      return acc;
    }, 0).toFixed(2) : 0;
  }, [orders]);

  const activeOrders = useMemo(() => {
    return Array.isArray(orders) ? orders.filter(order => isOrderValid(order.createdAt)).length : 0;
  }, [orders]);

  const buyOrdersTotalAmount = useMemo(() => {
    return buyOrders.reduce((acc, order) => acc + order.amount, 0);
  }, [buyOrders]);

  const sellOrdersTotalAmount = useMemo(() => {
    return sellOrders.reduce((acc, order) => acc + order.amount, 0);
  }, [sellOrders]);

  const myOrders = useMemo(() => {
    return Array.isArray(orders) ? orders.filter(order => order.username === loggedInUserId && isOrderValid(order.createdAt)) : [];
  }, [orders, loggedInUserId]);

  const handleAmountChange = (e) => {
    const rawValue = e.target.value.replace(/,/g, '');
    const formattedValue = formatNumber(rawValue);
    setAmount(formattedValue);
  };
  
  const handleMyOrdersClick = () => {
    setFilteredOrders(myOrders);
    setShowAllOrders(false);
  };

  return (
    React.createElement('div', { className: 'container' },
      React.createElement('h2', null,
        React.createElement(FaTags, null),
        'Memex P2P Token Trade'
      ),
      React.createElement('form', { onSubmit: handleOrderSubmit },
        React.createElement('div', { className: `form-group ${usernameError ? 'error' : ''}` },
          React.createElement('label', null, 'Telegram Username (e.g., @username)'),
          React.createElement('input', {
            type: 'text',
            value: telegramUsername,
            onChange: handleAmountChange,
            placeholder: 'Enter your Telegram username',
            className: 'equal-width-input'
          })
        ),
        React.createElement('div', { className: 'form-group' },
          React.createElement('label', null, 'Order Type'),
          React.createElement('select', {
            className: 'order-type-select',
            value: orderType,
            onChange: (e) => setOrderType(e.target.value)
          },
            React.createElement('option', { value: 'buy', style: { backgroundColor: '#28a745', color: '#fff' } }, 'Buy'),
            React.createElement('option', { value: 'sell', style: { backgroundColor: '#dc3545', color: '#fff' } }, 'Sell')
          )
        ),
        React.createElement('div', { className: 'form-group' },
          React.createElement('label', null, orderType === 'buy' ? 'Buy Amount' : 'Sell Amount'),
          React.createElement('input', {
            type: 'text',
            value: amount,
            onChange: handleAmountChange,
            placeholder: orderType === 'buy' ? 'Enter amount to buy' : 'Enter amount to sell',
            className: 'equal-width-input'
          })
        ),
        React.createElement('div', { className: 'form-group' },
          React.createElement('label', null, 'Price'),
          React.createElement('input', {
            type: 'number',
            value: price,
            onChange: (e) => setPrice(e.target.value),
            placeholder: 'Enter your price',
            className: 'equal-width-input'
          })
        ),
        React.createElement('div', { className: 'form-total-amount' },
          React.createElement('span', { className: 'total-amount-label' }, 'Total Amount:'),
          React.createElement('span', { className: 'total-amount-value' }, `$${totalAmount}`)
        ),
        React.createElement('button', { type: 'submit', style: { backgroundColor: buttonColor } }, 'Create Order')
      ),
      React.createElement('div', { className: 'average-price', style: { marginTop: '20px' } },
        React.createElement('div', { className: 'average-price-header' },
          React.createElement(FaChartBar, null),
          'Average Price:'
        ),
        React.createElement('div', { className: 'average-price-value-container' },
          React.createElement('span', { className: `average-price-value ${averagePrice.isUp === true ? 'price-up' : averagePrice.isUp === false ? 'price-down' : ''}` },
            `$${averagePrice.price}`
          ),
          React.createElement('span', { className: `average-price-change ${averagePrice.isUp === true ? 'price-up arrow-up' : averagePrice.isUp === false ? 'price-down arrow-down' : ''}` },
            `(${averagePrice.change}%)`
          )
        )
      ),
      React.createElement('div', { className: 'market-info' },
        React.createElement('div', { className: 'market-info-item' },
          React.createElement(FaShoppingCart, null),
          React.createElement('span', null, volume24h),
          '24h Volume'
        ),
        React.createElement('div', { className: 'market-info-item' },
          React.createElement(FaList, null),
          React.createElement('span', null, activeOrders),
          'Active Orders'
        )
      ),
      React.createElement('div', { className: 'trade-bar-container' },
        React.createElement('div', { className: 'trade-bar trade-bar-buy', style: { width: `${tradeBar.buyPercent}%` } },
          React.createElement('span', { className: 'trade-bar-label trade-bar-label-left' }, `${tradeBar.buyPercent}%`)
        ),
        React.createElement('div', { className: 'trade-bar trade-bar-sell', style: { width: `${tradeBar.sellPercent}%` } },
          React.createElement('span', { className: 'trade-bar-label trade-bar-label-right' }, `${tradeBar.sellPercent}%`)
        )
      ),
      React.createElement('div', { className: 'trade-buttons', style: { marginTop: '40px' } },
        React.createElement('button', { className: 'buy', onClick: handleBuyClick },
          React.createElement(FaShoppingCart, null),
          'Buy'
        ),
        React.createElement('button', { className: 'sell', onClick: handleSellClick },
          React.createElement(FaTags, null),
          'Sell'
        ),
        React.createElement('button', { onClick: handleMyOrdersClick },
          React.createElement(FaList, null),
          'My Orders'
        )
      ),
      showAllOrders ? (
        React.createElement('div', { className: 'order-book' },
          React.createElement('div', { className: 'order-book-buy' },
            React.createElement('h3', null, 'Buy Orders'),
            React.createElement('table', null,
              React.createElement('thead', null,
                React.createElement('tr', null,
                  React.createElement('th', null, 'Price'),
                  React.createElement('th', null, 'Amount'),
                  React.createElement('th', null, 'Change (%)')
                )
              ),
              React.createElement('tbody', null,
                buyOrders.map((order) => (
                  React.createElement('tr', { key: order.id, onClick: () => handlePriceClick(order.price) },
                    React.createElement('td', null, `$${order.price}`),
                    React.createElement('td', null, order.amount),
                    React.createElement('td', null, order.change)
                  )
                ))
              ),
              React.createElement('tfoot', null,
                React.createElement('tr', null,
                  React.createElement('td', { colSpan: '3' }, `Total Amount: ${buyOrdersTotalAmount}`)
                )
              )
            )
          ),
          React.createElement('div', { className: 'order-book-sell' },
            React.createElement('h3', null, 'Sell Orders'),
            React.createElement('table', null,
              React.createElement('thead', null,
                React.createElement('tr', null,
                  React.createElement('th', null, 'Price'),
                  React.createElement('th', null, 'Amount'),
                  React.createElement('th', null, 'Change (%)')
                )
              ),
              React.createElement('tbody', null,
                sellOrders.map((order) => (
                  React.createElement('tr', { key: order.id, onClick: () => handlePriceClick(order.price) },
                    React.createElement('td', null, `$${order.price}`),
                    React.createElement('td', null, order.amount),
                    React.createElement('td', null, order.change)
                  )
                ))
              ),
              React.createElement('tfoot', null,
                React.createElement('tr', null,
                  React.createElement('td', { colSpan: '3' }, `Total Amount: ${sellOrdersTotalAmount}`)
                )
              )
            )
          )
        )
      ) : (
        React.createElement('table', { className: 'filtered-orders-table' },
          React.createElement('thead', null,
            React.createElement('tr', null,
              React.createElement('th', null, 'Price'),
              React.createElement('th', null, 'Amount'),
              React.createElement('th', null, 'Change (%)')
            )
          ),
          React.createElement('tbody', null,
            filteredValidOrders.map((order) => (
              React.createElement('tr', { key: order.id, onClick: () => handlePriceClick(order.price) },
                React.createElement('td', null, `$${order.price}`),
                React.createElement('td', null, order.amount),
                React.createElement('td', null, order.change)
              )
            ))
          )
        )
      ),
      selectedPrice && (
        React.createElement('div', { className: 'selected-price-modal' },
          React.createElement('div', { className: 'selected-price-content' },
            React.createElement('p', null, `Selected Price: $${selectedPrice}`),
            React.createElement('button', { onClick: () => setSelectedPrice(null) }, 'Close')
          )
        )
      ),
      showRatingModal && selectedUser && (
        React.createElement('div', { className: 'rating-modal' },
          React.createElement('div', { className: 'rating-modal-content' },
            React.createElement('h3', null, `Rate ${selectedUser.username}`),
            React.createElement('div', { className: 'rating-stars' },
              renderStars()
            ),
            React.createElement('button', { onClick: handleRatingSubmit }, 'Submit Rating')
          )
        )
      )
    )
  );
}

export default App;
