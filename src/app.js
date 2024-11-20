const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes');
const passport = require('passport');
const walletRoutes = require('./routes/walletRoutes');
const parkingRoutes = require('./routes/parkingRoutes');



require('./middleware/passportMiddleware');

const app = express();

// Middleware
app.use(express.json());
app.use(helmet());
app.use(cors());
app.use(passport.initialize());
app.use('/api/parking', parkingRoutes);
// Routes
app.use('/api/auth', authRoutes);
app.use('/api/wallet', walletRoutes);
module.exports = app;
