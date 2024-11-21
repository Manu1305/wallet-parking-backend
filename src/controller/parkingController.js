const { getAvailableSpots, bookSpot, getBookings } = require('../services/parkingService');
const { emitParkingUpdate } = require('../utilis/socket');



const viewAvailableSpots = async (req, res) => {
    try {
        const spots = await getAvailableSpots();
        res.status(200).json(spots);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const makeBooking = async (req, res) => {
    try {
        const { spotId, durationHours } = req.body;
        const booking = await bookSpot(req.user.id, spotId, durationHours);
        res.status(201).json({ message: 'Booking successful', booking });
        emitParkingUpdate();
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const viewBookings = async (req, res) => {
    try {
        const bookings = await getBookings(req.user.id);
        res.status(200).json(bookings);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};




module.exports = { viewAvailableSpots, makeBooking, viewBookings };
