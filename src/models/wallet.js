const mongoose = require('mongoose');

const walletSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    balance: { type: Number, default: 0 },
    transactions: [
        {
            amount: { type: Number, required: true },
            type: { type: String, enum: ['credit', 'debit'], required: true },
            date: { type: Date, default: Date.now },
        },
    ],
});

module.exports = mongoose.model('Wallet', walletSchema);
