import { saveToFile } from './utils.js';
import { updateUserData } from './userService.js';
import { showMessage } from './utils.js';

export async function handleWithdraw(username, currentBalance, walletAddress) {
    if (currentBalance === 0) {
        showMessage("Your balance is 0. Complete tasks to earn MEMEX!");
        return { success: false };
    }

    if (!walletAddress?.trim()) {
        showMessage("Please enter a valid wallet address");
        return { success: false };
    }

    const withdrawalData = {
        username,
        walletAddress: walletAddress.trim(),
        amount: currentBalance,
        timestamp: new Date().toISOString()
    };

    try {
        const response = await fetch("/data/withdrawals.json");
        const withdrawals = await response.json();
        withdrawals.push(withdrawalData);
        await saveToFile("withdrawals.json", withdrawals);
        
        await updateUserData(username, 0, []);
        showMessage("Withdrawal successful!");
        return { success: true, newBalance: 0 };
    } catch (error) {
        console.error("Error processing withdrawal:", error);
        showMessage("Error processing withdrawal. Please try again.");
        return { success: false };
    }
}