const { DataTypes } = require('sequelize');
const sequelize = require('../config/dbConfig');
const bcrypt = require('bcryptjs');



module.exports = (sequelize, DataTypes)=>{
    const Users = sequelize.define('Users',{
        id: {type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true},
        name: {type: DataTypes.STRING, allowNull: false},
        email: {type: DataTypes.STRING, allowNull: false, unique: true, 
            validate: {
                isEmail: true,
            }
        },
        password: {type: DataTypes.STRING, allowNull: false},
        role: {type: DataTypes.ENUM('admin', 'member'), defaultValue: 'member'},
        membership_date: {type: DataTypes.INTEGER, allowNull: true},
        hooks: {
            beforeCreate: async (user)=>{
                const salt = await bcrypt.genSalt(10);
                user.password = await bcrypt.hash(user.password, salt);
            },
        }
    });
    return Users;
};
