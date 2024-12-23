export async function handleWithdrawal(username, amount, walletAddress) {
    if (!amount || amount <= 0) {
        throw new Error("Invalid withdrawal amount");
    }

    if (!walletAddress) {
        throw new Error("Wallet address is required");
    }

    // Validate wallet address format
    if (typeof walletAddress !== 'string' || !walletAddress.startsWith('x')) {
        throw new Error("Please enter a valid OmniXEP wallet address starting with 'x'");
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

        const data = await response.json();

        if (!data.success) {
            throw new Error(data.error || 'Withdrawal failed');
        }

        return true;
    } catch (error) {
        console.error('Withdrawal error:', error);
        throw error;
    }
}