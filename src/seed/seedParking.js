const mongoose = require('mongoose');
const ParkingSpot = require('../models/parkingSpot');
const { DB_URL } = require('../config/config');

const seedParkingSpots = async () => {
    await mongoose.connect(DB_URL, { useNewUrlParser: true, useUnifiedTopology: true });
    await ParkingSpot.deleteMany();
    const spots = [
        { name: 'A1', price: 50 },
        { name: 'A2', price: 50 },
        { name: 'B1', price: 50 },
        { name: 'A3', price: 50 },
        { name: 'A4', price: 50 },
        { name: 'B5', price: 50 },
        { name: 'A6', price: 50 },
        { name: 'A7', price: 50 },
        { name: 'B4', price: 50 },
        { name: 'A8', price: 50 },
        { name: 'A9', price: 50 },
        { name: 'B9', price: 50 },
    ];
    await ParkingSpot.insertMany(spots);
    console.log('Parking spots seeded!');
    mongoose.disconnect();
};

seedParkingSpots();
