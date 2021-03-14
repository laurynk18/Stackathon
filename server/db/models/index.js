const User = require('./user')
const Place = require('./place')
//const PlaceName = require('./placeName')
const Category = require('./category')

Place.belongsTo(Category)
Category.hasMany(Place)

User.hasMany(Place)
Place.belongsTo(User)

//PlaceName.hasMany(Place)
//Place.belongsTo(PlaceName)

/**
 * We'll export all of our models here, so that any time a module needs a model,
 * we can just require it from 'db/models'
 * for example, we can say: const {User} = require('../db/models')
 * instead of: const User = require('../db/models/user')
 */
module.exports = {
  User,
  Place,
  //PlaceName,
  Category
}
