const User = require('./user')
const Place = require('./place')
const Category = require('./category')

Place.belongsTo(Category)
User.hasMany(Place)
//Place.belongsTo(User)

/**
 * We'll export all of our models here, so that any time a module needs a model,
 * we can just require it from 'db/models'
 * for example, we can say: const {User} = require('../db/models')
 * instead of: const User = require('../db/models/user')
 */
module.exports = {
  User,
  Place,
  Category
}
