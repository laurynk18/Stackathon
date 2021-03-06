const Sequelize = require('sequelize')
const db = require('../db')

const Category = db.define('category', {
  category: {
    type: Sequelize.ENUM('Restaurant', 'Cafe', 'Bar'),
    allowNull: false,
    unique: true
  }
})

module.exports = Category
