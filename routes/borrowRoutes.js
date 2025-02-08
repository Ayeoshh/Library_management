const express = require('express');
const borrowController = require('../controllers/borrowController');

module.exports = (db) =>{
    const router = express.router();

    router.get('/borrow', (req, res) =>{borrowController.getAllBorrow(req, res, db);});
    router.get('/borrow/:id', (req, res)=>{borrowController.getBorrowById(req, res, db);});
    router.post('/borrow', (req, res)=> {borrowController.createBorrow(req, res, db);});
    router.put('/borrow/:id', (req, res)=>{borrowController.updateBorrow(req, res, db);});
    router.delete('/borrow/:id', (req, res)=>{borrowController.deleteBorrow(req, res, db);});

    return router;
}