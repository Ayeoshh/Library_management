const express = require('express');
const db = require('../config/dbConfig');
const BorrowController = require('../controllers/borrowController');

module.exports = () =>{
    const router = express.Router();
    const borrowController = new BorrowController(db);

    router.get('/', borrowController.getAllBorrows);
    router.get('/:id', borrowController.getBorrowById);
    router.post('/', borrowController.createBorrow);
    router.put('/:id', borrowController.updateBorrow);
    router.delete('/:id', borrowController.deleteBorrow);

    return router;
}