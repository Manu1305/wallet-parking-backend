const express = require('express');
const { viewAvailableSpots, makeBooking, viewBookings } = require('../controller/parkingController');
const authenticate = require('../middleware/passportMiddleware');
const router = express.Router();

// Protected routes
router.get('/spots', authenticate, viewAvailableSpots);
router.post('/book', authenticate, makeBooking);
router.get('/bookings', authenticate, viewBookings);


module.exports = router;
