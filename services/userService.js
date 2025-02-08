const UserRepository = require('../data/userRepository');

class UserService{
    constructor(db){
        this.userRepository = new UserRepository(db);
    }

    async getAllUsers(){
        return await this.userRepository.getAllUsers();
    }

    async getUserById(id){
        const user = await this.userRepository.getUserById(id);
        if(!user){
            throw new Error('User not found');
        }
        return user;
    }

    async createUser(name, email, password){
        const existingUser = await this.userRepository.findUserByEmail(email);

        if(existingUser){
            throw new Error('User email already existing');
        }
        return await this.userRepository.createUser(name, email, password);
    }

    async updateUser(id,name, email, password){
        const result = await this.userRepository.updateUser(id, name, email, password);
        if(result.affectedRows === 0){
            throw new Error('user not found');
        }
        return {message: 'User updated successfully'};
    }

    async deleteUser(id){
        const result = await this.userRepository.deleteUser(id);
        if(result.affectedRows === 0){
            throw new Error('User not found');
        }
        return {message: 'user deleted successfully'};
    }
}

module.exports = UserService;