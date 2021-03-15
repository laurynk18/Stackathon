const Sequelize = require('sequelize')
const db = require('../db')
const {Category} = require('./')

const Place = db.define('place', {
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  address: Sequelize.STRING,
  phone: Sequelize.STRING,
  location: {
    type: Sequelize.ARRAY(Sequelize.DOUBLE),
    allowNull: false
  },
  rating: {
    type: Sequelize.INTEGER,
    validate: {min: 1, max: 5}
  },
  note: Sequelize.TEXT,
  tag: Sequelize.ARRAY(Sequelize.STRING)
})

Place.beforeCreate(async place => {
  if (!Array.isArray(place.tag)) {
    place.tag = [place.tag]
  }
  const duplicate = await Place.findOne({
    where: {
      name: place.name,
      userId: place.userId
    }
  })
  if (duplicate) {
    throw new Error('Place already saved!')
  }
})

// Place.beforeSave(async place => {
//   const foundCategory = await Category.findByPk(place.categoryId)
//   await place.setCategory(foundCategory);
// })

module.exports = Place
