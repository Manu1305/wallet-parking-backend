const http = require('http');
const mongoose = require('mongoose');
const app = require('./app');
const { PORT, DB_URL } = require('./config/config');
const { initSocket } = require('./utilis/socket');

// Create HTTP server
const server = http.createServer(app);

// Initialize Socket.IO
initSocket(server);

// Connect to MongoDB
mongoose.connect(DB_URL)
    .then(() => console.log('Connected to MongoDB 🎉🎉🎉'))
    .catch((err) => console.error('Database connection error:', err));

// Start the server
server.listen(PORT, () => {
    console.log(`Server running on port ${PORT} 🤖`);
});
