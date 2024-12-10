const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
require('dotenv').config();

// Import models
const Order = require('./src/orders/order.model'); // Ensure the Order model is imported

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
app.use('/api/admin',adminRoutes);

async function main() {
    await mongoose.connect(process.env.DB_URL);
    app.get('/', (req, res) => {
        res.send('Hello World!');
    });
}

main().then(() => console.log("MongoDB connected successfully")).catch(err => console.error(err));

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});