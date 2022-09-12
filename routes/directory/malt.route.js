const { Router } = require('express')
const router = Router()
const Malt = require('../../models/malt.model')
const {SQLiteDB} = require('../../database')

let sqlite

router.all('/*', async (req, res, next) => {
  sqlite = new SQLiteDB()
  next()
})

router.get('/create-table', async (req, res) => {
  const malt = new Malt(sqlite)
  const result = await malt.createTable()
  res.status(200).json({
    success: true,
    message: 'Таблица успешно создана',
    datetime: new Date(),
    data: result 
  })  
})

router.get('/:id', async (req, res) => {
  const malt = new Malt(sqlite, req.params)
  const result = await malt.read()
  res.status(200).json({
    success: true,
    datetime: new Date(),
    data: result
  })  
})

router.get('/', async (req, res) => {
  const malt = new Malt(sqlite)
  const result = await malt.readAll()
  res.status(200).json({
    success: true,
    datetime: new Date(),
    data: result
  })  
})

router.post('/', async (req, res) => {
  const malt = new Malt(sqlite, req.body)
  const result = await malt.create()
  res.status(201).json({
    success: true,
    message: 'Данные записаны в справочник',
    datetime: new Date(),
    data: result
  })
})

router.put('/', async (req, res) => {
  const malt = new Malt(sqlite, req.body)
  const result = await malt.write()
  res.status(200).json({
    success: true,
    message: 'Данные изменены в справочнике',
    datetime: new Date(),
    data: result
  })
})

router.delete('/:id', async (req, res) => {
  const malt = new Malt(sqlite, req.params)
  await malt.delete()
  res.status(200).json({
    success: true,
    message: 'Данные удалены из справочника',
    datetime: new Date(),
    data: req.params
  })  
})

module.exports = router