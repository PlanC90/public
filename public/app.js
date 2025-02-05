document.addEventListener('DOMContentLoaded', () => {
    const price = document.getElementById('price');
    const amount = document.getElementById('amount');
    const totalAmount = document.getElementById('totalAmount');
    const createOrderBtn = document.getElementById('createOrder');
    const buyBtn = document.getElementById('buyBtn');
    const sellBtn = document.getElementById('sellBtn');
    const orderType = document.getElementById('orderType');

    // Format number with thousands separator
    function formatNumber(num) {
        return new Intl.NumberFormat('en-US').format(num);
    }

    // Parse number with thousands separator
    function parseFormattedNumber(str) {
        return parseFloat(str.replace(/,/g, ''));
    }

    // Add thousands separator to amount input
    amount.addEventListener('input', (e) => {
        const value = e.target.value.replace(/,/g, '');
        if (value) {
            const formattedValue = formatNumber(value);
            e.target.value = formattedValue;
        }
    });

    // Update create order button color based on order type
    orderType.addEventListener('change', () => {
        if (orderType.value === 'sell') {
            createOrderBtn.classList.remove('bg-green-500', 'hover:bg-green-600');
            createOrderBtn.classList.add('bg-red-500', 'hover:bg-red-600');
        } else {
            createOrderBtn.classList.remove('bg-red-500', 'hover:bg-red-600');
            createOrderBtn.classList.add('bg-green-500', 'hover:bg-green-600');
        }
    });

    function calculateTotal() {
        const parsedAmount = parseFormattedNumber(amount.value) || 0;
        const parsedPrice = parseFloat(price.value) || 0;
        const total = parsedAmount * parsedPrice;
        totalAmount.textContent = formatNumber(total.toFixed(2));
    }

    price.addEventListener('input', calculateTotal);
    amount.addEventListener('input', calculateTotal);

    let lastAveragePrice = 0;

    function updateMarketCap(avgPrice) {
        const totalSupply = 30000000000000; // 30 trillion
        const marketCap = totalSupply * avgPrice;
        
        document.getElementById('marketCap').innerHTML = `
            <div class="flex items-center justify-center gap-2">
                <svg class="h-6 w-6 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span class="text-2xl font-bold">$${formatNumber(marketCap.toFixed(2))}</span>
            </div>
        `;
    }

    function updateAveragePrice(buyOrders, sellOrders) {
        const allOrders = [...buyOrders, ...sellOrders];
        const avgPrice = allOrders.length > 0 
            ? allOrders.reduce((sum, order) => sum + (order.price || 0), 0) / allOrders.length 
            : 0;
        
        const priceChange = lastAveragePrice ? ((avgPrice - lastAveragePrice) / lastAveragePrice) * 100 : 0;
        const changeIcon = priceChange >= 0 
            ? '<svg class="inline h-5 w-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 15l7-7 7 7"/></svg>'
            : '<svg class="inline h-5 w-5 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/></svg>';
        
        document.getElementById('averagePrice').innerHTML = `
            ${avgPrice.toFixed(8)} 
            ${changeIcon}
            <span class="${priceChange >= 0 ? 'text-green-500' : 'text-red-500'}">${Math.abs(priceChange).toFixed(2)}%</span>
        `;
        
        updateMarketCap(avgPrice);
        lastAveragePrice = avgPrice;
    }

    async function loadOrders() {
        try {
            const [buyResponse, sellResponse] = await Promise.all([
                fetch('/api/orders/buy'),
                fetch('/api/orders/sell')
            ]);
            
            const buyOrders = await buyResponse.json();
            const sellOrders = await sellResponse.json();
            
            // Calculate total volume (24h)
            const last24h = Date.now() - (24 * 60 * 60 * 1000);
            const recentOrders = [...buyOrders, ...sellOrders].filter(order => order.timestamp > last24h);
            const volume = recentOrders.reduce((sum, order) => sum + ((order.amount || 0) * (order.price || 0)), 0);
            
            document.querySelector('#volume').textContent = `$${formatNumber(volume.toFixed(2))} Volume (24h)`;
            document.querySelector('#activeOrders').textContent = `${buyOrders.length + sellOrders.length} Active Orders`;
            
            // Calculate average price
            const avgPrice = recentOrders.length > 0 
                ? recentOrders.reduce((sum, order) => sum + (order.price || 0), 0) / recentOrders.length 
                : 0;

            // Sort orders by closest to average price
            buyOrders.sort((a, b) => Math.abs(a.price - avgPrice) - Math.abs(b.price - avgPrice));
            sellOrders.sort((a, b) => Math.abs(a.price - avgPrice) - Math.abs(b.price - avgPrice));

            // Display only top 6 orders
            displayOrders('buyOrders', buyOrders.slice(0, 6));
            displayOrders('sellOrders', sellOrders.slice(0, 6));
            updateAveragePrice(buyOrders, sellOrders);
            updateOrderBars(buyOrders, sellOrders);
        } catch (error) {
            console.error('Error loading orders:', error);
            document.getElementById('buyOrders').innerHTML = '<p class="p-4 text-red-400">Error loading orders</p>';
            document.getElementById('sellOrders').innerHTML = '<p class="p-4 text-red-400">Error loading orders</p>';
        }
    }

    function displayOrders(containerId, orders) {
        const container = document.getElementById(containerId);
        let total = 0;
        
        container.innerHTML = `
            <div class="order-row p-2 bg-gray-700 font-semibold border-b border-gray-600">
                <div>Price</div>
                <div>Amount</div>
            </div>
            ${orders.map(order => {
                const orderTotal = (order.amount || 0) * (order.price || 0);
                total += orderTotal;
                return `
                    <div class="order-row p-2 hover:bg-gray-700 text-sm">
                        <div>$${order.price?.toFixed(8) || '0.00000000'}</div>
                        <div>${formatNumber(order.amount) || '0'}</div>
                    </div>
                `;
            }).join('')}
            <div class="order-row font-bold p-2 bg-gray-700 text-right">
                <div>Total:</div>
                <div>$${formatNumber(total.toFixed(2))}</div>
            </div>`;
    }

    function updateOrderBars(buyOrders, sellOrders) {
        const buyVolume = buyOrders.reduce((sum, order) => sum + (order.amount || 0), 0);
        const sellVolume = sellOrders.reduce((sum, order) => sum + (order.amount || 0), 0);
        const total = buyVolume + sellVolume;
        
        const buyBar = document.getElementById('buyBar');
        const sellBar = document.getElementById('sellBar');
        
        buyBar.style.width = total > 0 ? `${(buyVolume / total * 100)}%` : '50%';
        sellBar.style.width = total > 0 ? `${(sellVolume / total * 100)}%` : '50%';
    }

    createOrderBtn.addEventListener('click', async () => {
        const username = document.getElementById('username').value;
        const orderType = document.getElementById('orderType').value;
        const amountValue = parseFormattedNumber(amount.value);
        const priceValue = parseFloat(price.value);

        if (!username) {
            alert('Please enter your Telegram username');
            return;
        }

        if (!amountValue || !priceValue) {
            alert('Please enter both amount and price');
            return;
        }

        const orderData = {
            username,
            type: orderType,
            amount: amountValue,
            price: priceValue
        };

        try {
            const response = await fetch('/api/orders', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(orderData)
            });

            if (response.ok) {
                const deleteDate = new Date();
                deleteDate.setDate(deleteDate.getDate() + 10);
                alert(`Order created successfully! Will be deleted on ${deleteDate.toLocaleDateString('en-US', { 
                    weekday: 'long', 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                })}`);
                loadOrders();
                amount.value = '';
                price.value = '';
                calculateTotal();
            }
        } catch (error) {
            console.error('Error creating order:', error);
            alert('Error creating order. Please try again.');
        }
    });

    sellBtn.addEventListener('click', async () => {
        try {
            const sellResponse = await fetch('/api/orders/sell');
            const sellOrders = await sellResponse.json();
            
            const avgPriceResponse = await fetch('/api/orders/buy');
            const buyOrders = await avgPriceResponse.json();
            const allOrders = [...buyOrders, ...sellOrders];
            const avgPrice = allOrders.length > 0 
                ? allOrders.reduce((sum, order) => sum + (order.price || 0), 0) / allOrders.length 
                : 0;
            
            // Find closest sell order to average price
            sellOrders.sort((a, b) => Math.abs(a.price - avgPrice) - Math.abs(b.price - avgPrice));
            const closestOrder = sellOrders[0];
            
            if (closestOrder) {
                document.getElementById('sellOrders').innerHTML = `
                    <div class="order-row p-2 bg-gray-700">
                        <div>$${closestOrder.price?.toFixed(8) || '0.00000000'}</div>
                        <div>${formatNumber(closestOrder.amount) || '0'}</div>
                        <div>
                            <a href="https://t.me/${closestOrder.username.replace('@', '')}" 
                               target="_blank" 
                               class="text-blue-400 hover:text-blue-300">
                                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 inline" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                                </svg>
                            </a>
                        </div>
                    </div>
                `;
            }
            
            document.getElementById('buyOrders').style.display = 'none';
            document.getElementById('sellOrders').style.display = 'block';
        } catch (error) {
            console.error('Error loading sell orders:', error);
        }
    });

    buyBtn.addEventListener('click', () => {
        loadOrders();
        document.getElementById('buyOrders').style.display = 'block';
        document.getElementById('sellOrders').style.display = 'none';
    });

    // Initial load
    loadOrders();

    // Auto-cleanup old orders (runs every hour)
    setInterval(async () => {
        try {
            await fetch('/api/cleanup-orders', { method: 'POST' });
            loadOrders();
        } catch (error) {
            console.error('Error cleaning up orders:', error);
        }
    }, 60 * 60 * 1000);
});