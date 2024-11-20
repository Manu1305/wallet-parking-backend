const express = require('express');
const { viewWallet, topUpWallet } = require('../controller/walletController');
const authenticate = require('../middleware/passportMiddleware');
const router = express.Router();

// Protected routes
router.get('/', authenticate, viewWallet);
router.post('/top-up', authenticate, topUpWallet);

module.exports = router;
