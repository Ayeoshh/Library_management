const BorrowService = require('../services/borrowService');

class BorrowController{
    constructor(db){
        this.borrowService = new BorrowService(db);
    }

    getAllBorrows = async (req, res)=>{
        try {
            const borrows = await this.borrowService.getAllBorrows();
            res.status(200).json(borrows);
        }catch(error){
            res.status(500).json({message: error.message});
        }
    }

    getBorrowById = async (req, res)=>{
        try {
            const {id} = req.params;
            const borrow = await this.borrowService.getBorrowById(id);
            res.status(200).json(borrow);
        } catch (error){
            res.status(404).json({message: error.message});
        }
    }

    createBorrow = async (req, res)=>{
        try{
            const {user_id, borrow_id, borrow_date, return_date} = req.body;
            const borrowcreate = await this.borrowService.createBorrow(user_id, borrow_id, borrow_date, return_date);
            res.status(201).json({message: 'borrow created successfully', borrow: borrowcreate});
        }catch (error){
            res.status(400).json({message: error.message});
        }
    }
    updateBorrow = async (req, res)=>{
        try{
            const {id} = req.params;
            const {user_id, borrow_id, borrow_date, return_date} = req.body;
            const borrowupdate = await this.borrowService.createBorrow(id, user_id, borrow_id, borrow_date, return_date);
            res.status(201).json({message: 'borrow updated successfully', borrow: borrowupdate});
        }catch (error){
            res.status(400).json({message: error.message});
        }
    }

    deleteBorrow = async (req, res)=>{
        try{
            const {id} = req.params;
            const borrowdelete = await this.borrowService.deleteBorrow(id);
            res.status(200).json({message: 'borrow deleted successfull', borrow: borrowdelete});
        }catch (error){
            res.status(500).json({message: error.message});
        }
    }
}

module.exports = BorrowController; 