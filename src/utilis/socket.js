const socketIo = require('socket.io');
const ParkingSpot = require('../models/parkingSpot');

let io;

const initSocket = (server) => {
    io = socketIo(server, {
        cors: { origin: '*' },
    });

    io.on('connection', (socket) => {
        console.log(`New connection: ${socket.id}, User ID: ${socket.handshake.query.userId}`);

        socket.on('disconnect', () => {
            console.log(`Disconnected: ${socket.id}`);
        });
    });


    return io;
};

const emitParkingUpdate = async () => {
    if (!io) return;
    const spots = await ParkingSpot.find();
    console.log("Emitting parking update:", spots); 
    io.emit('parkingUpdate', spots);
};


module.exports = { initSocket, emitParkingUpdate };
