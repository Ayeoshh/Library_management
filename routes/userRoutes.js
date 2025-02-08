const express = require('express');
const db = require('../config/dbConfig');
const UserController = require('../controllers/userController');

module.exports = () => {
    const router = express.Router();
    const userController = new UserController(db);

    router.get('/user', userController.getAllUsers);
    router.get('/user/:id', userController.getUserById);
    router.post('/user', userController.createUser);
    router.put('/user/:id', userController.updateUser);
    router.delete('/user/:id', userController.deleteUser);

    return router;
};

