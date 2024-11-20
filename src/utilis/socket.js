const socketIo = require('socket.io');
const ParkingSpot = require('../models/parkingSpot');

const userSocketMap = {};

let io;

const initSocket = (server) => {
    io = socketIo(server, {
        cors: { origin: '*' },
    });

    io.on('connection', (socket) => {
        const userId = socket.handshake.query.userId;

        if (!userSocketMap[userId]) {
            userSocketMap[userId] = [];
        }
        userSocketMap[userId].push(socket.id);
        console.log('socketConnected', userSocketMap)
        socket.on('disconnect', () => {
            userSocketMap[userId] = userSocketMap[userId].filter((id) => id !== socket.id);
            if (userSocketMap[userId].length === 0) {
                delete userSocketMap[userId];
            }
        });
    });


    return io;
};

const emitParkingUpdate = async () => {
    if (!io) return;
    const spots = await ParkingSpot.find();
    io.emit('parkingUpdate', spots);
};

module.exports = { initSocket, emitParkingUpdate };
