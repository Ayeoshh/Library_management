const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const UserRepository = require('../data/userRepository');
const dotenv = require('dotenv');

dotenv.config();

class AuthServices{
    static generateToken(user){
        return jwt.sign(
            { id: user.id, email: user.email},
            process.env.JWT_SECRET,
            { expiresIn: process.env.JWT_EXPIRES_IN}
        );
    }

    static async registerUser(name, email, password){
        // check if the user exists
        let user = await UserRepository.findByEmail(email);
        if(user){
            throw new Error('User already exists');
        }

        // hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        //create user
        user = await UserRepository.createUser({name, email, password: hashedPassword});

        return {message: 'User created successfully'};
    }
    static async loginUser(email, password){
        const user = await UserRepository.findByEmail(email);
        if(!user){
            throw new Error('Invalid credentials');
        }

        // compare password
        const isMatch = await bcrypt.compare(password, user.passwords);
        if(!isMatch){
            throw new Error('Invalid credentials');
        }

        const token = this.generateToken(user);
        return {
            token,
            user : {id: user.id, name: user.name, email: user.email}
        };
    }
}

module.exports = AuthServices;
