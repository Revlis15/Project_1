const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
require('dotenv').config();

const Order = require('./src/orders/order.model');
const port = process.env.PORT || 5000;

//middleware
app.use(express.json());
app.use(cors({
    origin: ['http://localhost:5173', 'https://project-1-frontend-sigma.vercel.app'],
    credentials: true
}));

// Routes
const bookRoutes = require('./src/books/book.route');
const orderRoutes = require('./src/orders/order.route');
const userRoutes = require('./src/users/user.route')
const adminRoutes = require('./src/stats/admin.stats');

app.use('/api/books', bookRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/auth', userRoutes);
app.use('/api/admin', adminRoutes);

// Handle undefined routes
app.use((req, res, next) => {
    res.status(404).json({ message: 'Route not found' });
});


async function main() {
    try {
        await mongoose.connect(process.env.DB_URL);
        console.log("MongoDB connected successfully");

        app.listen(port, () => {
            console.log(`Server is running on port ${port}`);
        });
    } catch (err) {
        console.error("Failed to connect to MongoDB:", err);
    }
}

main();