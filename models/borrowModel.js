module.exports = (sequelize, DataTypes)=>{
    const Borrow = sequelize.define('Borrow',{
        id: {type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true},
        user_id: {type: DataType.UUID, defaultValue: DataTypes.UUIDV4, allowNull: false},
        book_id: {type: DataType.UUID, defaultValue: DataTypes.UUIDV4, allowNull: false},
        borrow_date: {type: DataType.INTEGER, allowNull: false},
        return_date: {type: DataType.INTEGER, allowNull: false},
        fine: {type: DataType.INTEGER, allowNull: false}

    });
        
    return Borrow;
};