const express = require('express');
const app = express();
const port = process.env.PORT || 5000;

const mongoose = require('mongoose');
const dotenv = require('dotenv');
require('dotenv').config();
// nQQfSJN1hExtmanu
// bopbin15
// Routes

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