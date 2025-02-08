module.exports = (sequelize, DataTypes)=>{
    const Book = sequelize.define('Book',{
        id: {type: DataTypes.UUID, defatultValue: DataTypes.UUIDV4, primaryKey: true},
        title: {type: DataTypes.STRING, allowNull: false},
        author: {type: DataTypes.STRING, allowNull: false},
        genre: {type: DataTypes.STRING, allowNull: false},
        publised_year: {type: DataTypes.INTEGER, allowNull: false},
        available: {type: DataTypes.BOOLEAN, allowNull: false}
    });

    return Book;
};
