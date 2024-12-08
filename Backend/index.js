const express = require('express');
const app = express();
const cors = require('cors');
const port = process.env.PORT || 5000;

const mongoose = require('mongoose');
const dotenv = require('dotenv');
require('dotenv').config();

//middleware
app.use(express.json());
app.use(cors(
    {
        origin: 'http://localhost:5173',
        credentials: true
    }
));

// Routes
const bookRoutes = require('./src/books/book.route');
app.use('/api/books', bookRoutes);

async function main() {
    await mongoose.connect(process.env.DB_URL);
    app.get('/', (req, res) => {
        res.send('Hello World!');
    });
  }

main().then(() => console.log("MongoBD connected succesfully")).catch(err => console.error(err));

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});