export async function handleWithdrawal(username, amount, walletAddress) {
    if (amount === 0) {
        throw new Error("Your balance is 0. Complete tasks to earn MEMEX!");
    }

    // Validate wallet address format
    if (!walletAddress || typeof walletAddress !== 'string' || !walletAddress.startsWith('x')) {
        throw new Error("Please enter a valid OmniXEP wallet address starting with 'x'");
    }

    // Additional length validation
    if (walletAddress.length < 25 || walletAddress.length > 35) {
        throw new Error("Invalid wallet address length");
    }

    try {
        const response = await fetch('/api/withdrawals', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username,
                walletAddress,
                amount
            })
        });

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.message || 'Withdrawal failed');
        }

        const data = await response.json();
        return data.success;
    } catch (error) {
        console.error('Withdrawal error:', error);
        throw error;
    }
}