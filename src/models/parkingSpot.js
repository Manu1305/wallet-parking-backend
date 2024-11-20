const mongoose = require('mongoose');

const parkingSpotSchema = new mongoose.Schema({
    name: { type: String, required: true },
    isAvailable: { type: Boolean, default: true }, 
    price: { type: Number, required: true }, 
});

module.exports = mongoose.model('ParkingSpot', parkingSpotSchema);
