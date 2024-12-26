import { saveToFile } from './utils.js';

export async function loadUserData(username) {
    try {
        const response = await fetch("/data/users.json");
        const users = await response.json();
        const user = users.find(u => u.username === username);
        
        if (user) {
            return {
                balance: user.balance,
                tasksCompleted: new Set(user.tasks_completed),
                referralEarnings: user.referral_earnings || 0,
                totalReferrals: user.total_referrals || 0
            };
        } else {
            const newUser = {
                username,
                balance: 500000,
                tasks_completed: [],
                referral_earnings: 0,
                total_referrals: 0,
                last_login: new Date().toISOString()
            };
            users.push(newUser);
            await saveToFile("users.json", users);
            return {
                balance: newUser.balance,
                tasksCompleted: new Set(),
                referralEarnings: 0,
                totalReferrals: 0
            };
        }
    } catch (error) {
        console.error("Error loading user data:", error);
        return {
            balance: 500000,
            tasksCompleted: new Set(),
            referralEarnings: 0,
            totalReferrals: 0
        };
    }
}

export async function updateUserStats(user) {
    try {
        const response = await fetch("/data/users.json");
        const users = await response.json();
        const userIndex = users.findIndex(u => u.username === user.username);
        
        if (userIndex !== -1) {
            users[userIndex] = {
                ...users[userIndex],
                ...user,
                last_login: new Date().toISOString()
            };
            await saveToFile("users.json", users);
            return true;
        }
        return false;
    } catch (error) {
        console.error("Error updating user stats:", error);
        return false;
    }
}

export async function updateUserBalance(username, newBalance) {
    try {
        const response = await fetch("/data/users.json");
        const users = await response.json();
        const userIndex = users.findIndex(u => u.username === username);
        
        if (userIndex !== -1) {
            users[userIndex].balance = newBalance;
            await saveToFile("users.json", users);
            return true;
        }
        return false;
    } catch (error) {
        console.error("Error updating user balance:", error);
        return false;
    }
}