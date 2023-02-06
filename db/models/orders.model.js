const {
    Model,
    DataTypes
} = require("sequelize");
const sequelize = require('./sequelize')

class Orders extends Model {}

Orders.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: 'user_id'
    },
    item_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: 'item_id'
    },
    qty: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    total_price: {
        type: DataTypes.DOUBLE,
        allowNull: false
    },
    status: {
        type: DataTypes.ENUM,
        values: ['Belum dibayar', 'Lunas'],
        allowNull: false
    },
}, {
    sequelize: sequelize,
    timestamps: true,
    paranoid: true,
    underscored: true,
    tableName: 'orders',
    freezeTableName: true,
}, )

module.exports = Orders