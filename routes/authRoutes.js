const express = require('express');
const authController = require('../controllers/authController');
const authMiddleware = require('../middleware/authMiddleware');
const validateSchema = require('../utils/validateSchema');
const {registerSchema} = require('../utils/authSchema');


const router = express.Router();

router.post('/register', validateSchema(registerSchema), authController.register);

router.post('/login', authController.login);

router.get('/protected', authMiddleware, authController.protectedRoute);


module.exports = router;