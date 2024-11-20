const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    parkingSpot: { type: mongoose.Schema.Types.ObjectId, ref: 'ParkingSpot', required: true },
    amountPaid: { type: Number, required: true },
    startTime: { type: Date, default: Date.now },
    endTime: { type: Date, required: true }, 
    status: { type: String, enum: ['active', 'completed'], default: 'active' },
    
});

module.exports = mongoose.model('Booking', bookingSchema);
