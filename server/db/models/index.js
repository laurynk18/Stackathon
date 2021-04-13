const User = require('./user')
const Place = require('./place')
const Category = require('./category')

Place.belongsTo(Category)
Category.hasMany(Place)

User.hasMany(Place)
Place.belongsTo(User)

module.exports = {
  User,
  Place,
  Category
}
