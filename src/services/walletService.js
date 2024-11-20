const Wallet = require('../models/wallet');

const getWallet = async (userId) => {
    let wallet = await Wallet.findOne({ user: userId });
    if (!wallet) {
        
        wallet = new Wallet({ user: userId });
        await wallet.save();
    }
    return wallet;
};

const addMoney = async (userId, amount) => {
    if (amount <= 0) throw new Error('Amount must be greater than zero');

    const wallet = await getWallet(userId);
    wallet.balance += amount;
    wallet.transactions.push({ amount, type: 'credit' });
    await wallet.save();
    return wallet;
};

module.exports = { getWallet, addMoney };
