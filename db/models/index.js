const Users = require('./users.model')
const Items = require('./items.model')
const Orders = require('./orders.model')
const sequelize = require('./sequelize')

Users.hasMany(Orders, {
  foreignKey: 'user_id'
})
Users.hasMany(Items,{
  foreignKey: 'user_id'
})

Orders.belongsTo(Users, {
  foreignKey: 'user_id'
})
Items.hasMany(Orders, {
  foreignKey: 'item_id'
})
Orders.belongsTo(Items, {
  foreignKey: 'item_id'
})

module.exports = {
  Users,
  Items,
  Orders,
  sequelize
}