const express = require('express');
const db = require('../config/dbConfig');
const UserController = require('../controllers/userController');

module.exports = () => {
    const router = express.Router();
    const userController = new UserController(db);
   
    router.get('/', userController.getAllUsers);
    router.get('/:id', userController.getUserById);
    router.post('/', userController.createUser);
    router.put('/:id', userController.updateUser);
    router.delete('/:id', userController.deleteUser);

    return router;
};

