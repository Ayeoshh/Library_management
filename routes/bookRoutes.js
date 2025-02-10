const express = require('express');
const db = require('../config/dbConfig');
const BookController = require('../controllers/bookController');

module.exports = () => {
    const router = express.Router();
    const bookController = new BookController(db);
 
    router.get('/', bookController.getAllBooks);
    router.get('/:id', bookController.getBookById);
    router.post('/', bookController.createBook);
    router.put('/:id', bookController.updateBook);
    router.delete('/:id', bookController.deleteBook);

    return router;
}