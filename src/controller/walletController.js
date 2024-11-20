const { getWallet, addMoney } = require('../services/walletService');

const viewWallet = async (req, res) => {
    try {
        const wallet = await getWallet(req.user.id);
        res.status(200).json(wallet);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const topUpWallet = async (req, res) => {
    try {
        const { amount } = req.body;
        const wallet = await addMoney(req.user.id, amount);
        res.status(200).json({ message: 'Wallet topped up successfully', wallet });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

module.exports = { viewWallet, topUpWallet };
