const ParkingSpot = require('../models/parkingSpot');
const Booking = require('../models/Booking');
const { getWallet } = require('./walletService');

const getAvailableSpots = async () => {
    return await ParkingSpot.find({ isAvailable: true });
};

const bookSpot = async (userId, spotId, durationHours) => {
    console.log(durationHours,'duration')
    const spot = await ParkingSpot.findById(spotId);
    if (!spot || !spot.isAvailable) throw new Error('Parking spot not available');

    const wallet = await getWallet(userId);
    const cost = spot.price * durationHours;
    if (wallet.balance < cost) throw new Error('Insufficient balance');


    wallet.balance -= cost;
    wallet.transactions.push({ amount: cost, type: 'debit' });
    await wallet.save();

    spot.isAvailable = false;
    await spot.save();


    const startTime = new Date(); 
    const endTime = new Date(startTime);
    endTime.setHours(startTime.getHours() + durationHours); 

    console.log('Start Time:', startTime.toISOString());
    console.log('End Time:', endTime.toISOString());

    const booking = new Booking({
        user: userId,
        parkingSpot: spotId,
        amountPaid: cost,
        startTime, 
        endTime,  
    });

    return await booking.save();

}

const getBookings = async (userId) => {
    return await Booking.find({ user: userId }).populate('parkingSpot');
};




module.exports = { getAvailableSpots, bookSpot, getBookings };
