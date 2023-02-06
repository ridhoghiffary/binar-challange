const {
  Model,
  DataTypes
} = require("sequelize");
const sequelize = require('./sequelize')

class Users extends Model {}

Users.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  full_name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false
  },
  phone: {
    type: DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  },
}, {
  sequelize: sequelize,
  timestamps: true,
  paranoid: true,
  underscored: true,
  tableName: 'users',
  freezeTableName: true,
}, )

module.exports = Users