const express = require('express');
const db = require('../config/dbConfig');
const BorrowController = require('../controllers/borrowController');

module.exports = () =>{
    const router = express.Router();
    const borrowController = new BorrowController(db);

    router.get('/borrow', borrowController.getAllBorrow);
    router.get('/borrow/:id', borrowController.getBorrowById);
    router.post('/borrow', borrowController.createBorrow);
    router.put('/borrow/:id', borrowController.updateBorrow);
    router.delete('/borrow/:id', borrowController.deleteBorrow);

    return router;
}