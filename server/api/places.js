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

// GET /api/places/:placeId
router.get('/:placeId', async (req, res, next) => {
  try {
    const place = await Place.findByPk(req.params.placeId)
    res.status(200).json(place)
  } catch (error) {
    next(error)
  }
})

// POST /api/places
router.post('/', async (req, res, next) => {
  try {
    res
      .status(201)
      .send(
        await Place.create({
          ...req.body,
          userId: req.user.id,
          categoryId: req.body.categoryId
        })
      )
  } catch (err) {
    next(err)
  }
})

// PUT /api/places/:placeId
router.put('/:placeId', async (req, res, next) => {
  try {
    const place = await Place.findByPk(req.params.placeId)
    if (!place) {
      res.send(`This place doesn't exist!`)
    }
    const updatedPlace = await place.update(req.body)
    res.status(201).send(updatedPlace)
  } catch (err) {
    next(err)
  }
})

//add gatekeeping middleware!!!
