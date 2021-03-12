const router = require('express').Router()
const {Place, User} = require('../db/models')
module.exports = router

// GET /api/places
router.get('/', async (req, res, next) => {
  try {
    const places = await Place.findAll({
      where: {
        userId: req.user.id
      }
    })
    res.status(200).json(places)
  } catch (error) {
    next(error)
  }
})
