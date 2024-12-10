const express = require('express');
const { postABook, getAllBooks, getABook, updateBook, deleteBook } = require('./book.controller');
const router = express.Router();
const { verifyAdminToken } = require('../middleware/verifyAdminToken')


// post = when submit smt frontend to backend
// get = when frontend request data from backend
// put/patch = when frontend update data from backend
// delete = when frontend delete data from backend

// frontend => backend server => controller => model => database => model => controller => backend server => frontend

// post a book
router.post('/create-book', verifyAdminToken, postABook);

// get all books
router.get('/get-books', getAllBooks);

// get a book 
router.get('/get-book/:id', getABook);

// update a book
router.put('/edit/:id', verifyAdminToken, updateBook);

// delete book
router.delete('/delete/:id', verifyAdminToken, deleteBook);

module.exports = router;