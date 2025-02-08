const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/dbConfig');

const User = require('./userModel')(sequelize, DataTypes);
const Book = require('./bookModel')(sequelize, DataTypes);
const Borrow = require('./borrowModel')(sequelize, DataTypes);

// database connections

User.hasMany(Borrow, {foreignKey : 'userId'});
Book.hasMany(Borrow, {foreignKey : 'bookId'});
Borrow.belongsTo(User, {foreignKey : 'userId'});
Borrow.belongsTo(Book, {foreignKey : 'bookId'});

const db = {
    sequelize,
    Sequelize, 
    User,
    Book,
    Borrow
};

module.exports = db;