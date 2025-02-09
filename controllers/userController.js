const UserService = require('../services/userService');

class UserController{
    constructor(db){
        this.userService = new UserService(db);
    }

    // get all users
    getAllUsers = async (req, res)=>{
        try{
            const users = await this.userService.getAllUsers();
            res.json(users);
        } catch(error){
            res.status(500).json({message: error.message});
        }
    };

    // get user by id
    getUserById = async (req, res)=>{
        try{
            const id = req.params;
            const user = await this.userService.getUserById(id);
            res.json(user);
        }catch(error){
            res.status(400).json({message: error.message});
        }
    };

    // create new user
    createUser = async (req, res)=>{
        try{
            const {name, email, password} = req.body;
            const newUser = await this.userService.createUser(name, email, password);
            res.json(newUser);
        }catch (error){
            res.status(400).json({message: error.message});
        }
    };

    // update user
    updateUser = async (req, res)=>{
        try{
            const {id} = req.params;
            const {name, email, password} = req.body;
            const updateUser = await this.userService.updateUser(id, name, email, password);
            res.json(updateUser);
        }catch (error){
            res.status(400).json({message: error.message});
        }
    };

    // delete user 
    deleteUser = async (req, res)=>{
        try{
            const {id} = req.params;
            const deleteUser = await this.userService.deleteUser(id);
            res.json(deleteUser);
        }catch (error){
            res.status(400).json({message: error.message});
        }
    }
}


module.exports = UserController;

