const http = require('http');
const mongoose = require('mongoose');
const app = require('./app');
const { PORT, DB_URL } = require('./config/config');
const { initSocket } = require('./utilis/socket');


const server = http.createServer(app);

initSocket(server);

mongoose.connect(DB_URL)
    .then(() => console.log('Connected to MongoDB 🎉🎉🎉'))
    .catch((err) => console.error('Database connection error:', err));


server.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on port ${PORT} 🤖`);
});
