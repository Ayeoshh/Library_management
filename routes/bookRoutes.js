const express = require('express');
const bookController = require('../controllers/bookController');

module.exports = (db) => {
    const router = express.Router();

    router.get('/books', (req, res)=>{bookController.getAllBooks(req, res, db)});
    router.get('/books/:id', (req, res)=>{bookController.getBookById(req, res, db)});
    router.post('/books', (req, res)=>{bookController.createBook(req, res, db)});
    router.put('/books/:id', (req, res)=>{bookController.updateBook(req, res, db)});
    router.detele('/books/:id', (req, res)=>{bookController.deleteBook(req, res, db)});

    return router;
}