const { Router } = require('express')
const router = Router()
const Batch = require('../models/batch.model')
const Link = require('../models/link.model')
const { SQLiteDB } = require('../database')

router.get('/', async (req, res) => {
  const sqlite = new SQLiteDB()
  const batch = new Batch(sqlite, null)
  const result = await batch.readAll()

  res.status(200).json({
    success: true,
    data: result
  })
})

router.get('/link/:code', async (req, res) => {
  const sqlite = new SQLiteDB()
  const link = await Link.readByCode(sqlite, req.params.code)

  if (link === null) {
    res.status(200).json({
      success: false,
      message: 'По данной ссылке нет данных'
    })
    return
  }

  const batch = new Batch(sqlite, {
    id: link.batch
  })
  const result = await batch.read()
  
  res.status(200).json({
    success: true,
    data: result
  })
})

router.get('/:id', async (req, res) => {
  const sqlite = new SQLiteDB()
  const batch = new Batch(sqlite, req.params)
  const result = await batch.read()
  
  res.status(200).json({
    success: true,
    data: result
  })
})

router.post('/', async (req, res) => {
  const sqlite = new SQLiteDB()
  const batch = new Batch(sqlite, req.body)
  const result = await batch.create()

  await Link.create(sqlite, result.id)
  
  res.status(200).json({
    success: true,
    message: 'Новая партия пива сохранена',
    data: result
  })
})

router.put('/', async (req, res) => {
  const sqlite = new SQLiteDB()
  const batch = new Batch(sqlite, req.body)
  const result = await batch.update()
  
  res.status(200).json({
    success: true,
    message: 'Партия пива изменена',
    data: result
  })
})

router.delete('/:id', async (req, res) => {
  const sqlite = new SQLiteDB()
  const batch = new Batch(sqlite, req.params)
  const result = await batch.delete()
  
  res.status(200).json({
    success: true,
    message: 'Партия пива удалена',
    data: result
  })
})

module.exports = router