const express = require('express');
const db = require('../config/dbConfig');
const BookController = require('../controllers/bookController');

module.exports = () => {
    const router = express.Router();
    const bookController = new BookController(db);

    router.get('/books', bookController.getAllBooks);
    router.get('/books/:id', bookController.getBookById);
    router.post('/books', bookController.createBook);
    router.put('/books/:id', bookController.updateBook);
    router.delete('/books/:id', bookController.deleteBook);

    return router;
}