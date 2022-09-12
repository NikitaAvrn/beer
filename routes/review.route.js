const { Router } = require('express')
const router = Router()
const Review = require('../models/review.model')
const auth = require('../middleware/auth.middleware')
const { SQLiteDB } = require('../database')

router.get('/:batch', async (req, res) => {
  const sqlite = new SQLiteDB()
  const review = new Review(sqlite, req.params)

  const result = await review.readAll()

  res.status(200).json({
    success: true,
    data: result
  })
})

router.get('/:id', async (req, res) => {
  const sqlite = new SQLiteDB()
  const review = new Review(sqlite, req.params)

  const result = await review.read()

  res.status(200).json({
    success: true,
    data: result
  })
})

router.post('/', async (req, res) => {
  const sqlite = new SQLiteDB()
  const review = new Review(sqlite, req.body)

  review.user = 1
  const result = await review.create()

  res.status(200).json({
    success: true,
    message: 'Отзыв добавлен',
    data: result
  })
})

router.put('/', auth, async (req, res) => {
  const sqlite = new SQLiteDB()
  const review = new Review(sqlite, req.body)

  const result = await review.update()

  res.status(200).json({
    success: true,
    message: 'Отзыв изменен',
    data: result
  })
})

router.delete('/:id', auth, async (req, res) => {
  const sqlite = new SQLiteDB()
  const review = new Review(sqlite, req.params)

  await review.delete()

  res.status(200).json({
    success: true,
    message: 'Отзыв удален'
  })
})

module.exports = router