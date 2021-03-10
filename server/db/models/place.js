const Sequelize = require('sequelize')
const db = require('../db')

const Place = db.define('place', {
  name: {
    type: Sequelize.STRING,
    unique: true,
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

module.exports = Place
