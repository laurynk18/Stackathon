const router = require('express').Router()
const {Place, Category} = require('../db/models')
module.exports = router

//gatekeeping
const currentUserOnly = async (req, res, next) => {
  const place = await Place.findByPk(req.params.placeId)
  if (req.user && req.user.id === place.userId) next()
  else {
    const err = new Error('Please sign up or log in!')
    err.status = 401
    next(err)
  }
}

// GET /api/places
router.get('/', async (req, res, next) => {
  try {
    const places = await Place.findAll({
      where: {
        userId: req.user.id
      },
      include: {model: Category}
    })
    res.status(200).json(places)
  } catch (err) {
    next(err)
  }
})

// GET /api/places/:placeId
router.get('/:placeId', currentUserOnly, async (req, res, next) => {
  try {
    const place = await Place.findByPk(req.params.placeId, {
      include: [{model: Category}]
    })
    res.status(200).json(place)
  } catch (err) {
    next(err)
  }
})

// POST /api/places
router.post('/', async (req, res, next) => {
  try {
    const category = await Category.findByPk(req.body.categoryId)

    const place = await Place.create({
      ...req.body,
      userId: req.user.id,
      categoryId: req.body.categoryId
    })
    await place.setCategory(category)
    const newPlace = await Place.findOne({
      where: {
        userId: req.user.id,
        name: req.body.name
      },
      include: [Category]
    })
    res.status(201).send(newPlace)
  } catch (err) {
    next(err)
  }
})

// PUT /api/places/:placeId
router.put('/:placeId', currentUserOnly, async (req, res, next) => {
  try {
    const place = await Place.findByPk(req.params.placeId, {
      include: [{model: Category}]
    })
    if (!place) {
      res.send(`This place doesn't exist!`)
    }
    const updatedPlace = await place.update(req.body)
    res.status(201).send(updatedPlace)
  } catch (err) {
    next(err)
  }
})

// DELETE /api/places/:placeId
router.delete('/:placeId', currentUserOnly, async (req, res, next) => {
  try {
    const place = await Place.findByPk(req.params.placeId)
    console.log('place to delete!!', place)
    if (place) {
      await place.destroy()
      res.status(204).send(place)
    } else {
      res.sendStatus(400)
    }
  } catch (err) {
    next(err)
  }
})
