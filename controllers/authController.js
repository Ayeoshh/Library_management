const { validationResult} = require('express-validator');
const AuthService = require('../services/authServices');
const dotenv = require('dotenv');
// const db = require('../config/dbConfig');
// const authService = new AuthService(db);

dotenv.config();

// register new user
exports.register = async(req, res)=>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()});
    }
    try{
        const{name, email, password} = req.body;
        console.log("incontroller *************")
        const response = await AuthService.registerUser(name, email, password);

        res.status(201).json(response);
    } catch (err){
        res.status(500).json({message: err.message});
    }
};

// login user
exports.login = async (req, res)=>{
    try{
        const {email, password} = req.body;
        const response = await AuthService.loginUser(email, password);
        res.json(response);

    }catch (err){
        res.status(400).json({message: err.message});
    }
};

exports.protectedRoute = async (req, res)=>{
    res.json({message: 'welcome to protected route', user: req.user});
};