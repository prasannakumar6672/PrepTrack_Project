require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const prepRoutes = require('./routes/prep.routes');
const errorHandler = require('./middleware/error.middleware');

const app = express();

// Connect to database
connectDB();

// Middleware
app.use(cors({
    origin: process.env.CLIENT_URL || 'http://localhost:3000',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true
}));
app.use(express.json());

// Routes
app.use('/api/prep-topics', prepRoutes);

// Health check route
app.get('/', (req, res) => {
    res.json({
        message: 'PrepTrack API is running',
        version: '1.0.0'
    });
});

// Error handler (must be last)
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
});
