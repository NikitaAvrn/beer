const { Router } = require('express')
const router = Router()
const Yeast = require('../../models/yeast.model')
const {SQLiteDB} = require('../../database')

let sqlite

router.all('/*', async (req, res, next) => {
  sqlite = new SQLiteDB()
  next()
})

router.get('/create-table', async (req, res) => {
  const yeast = new Yeast(sqlite)
  const result = await yeast.createTable()
  res.status(200).json({
    success: true,
    message: 'Таблица успешно создана',
    datetime: new Date(),
    data: result 
  })  
})

router.get('/:id', async (req, res) => {
  const yeast = new Yeast(sqlite, req.params)
  const result = await yeast.read()
  res.status(200).json({
    success: true,
    datetime: new Date(),
    data: result
  })  
})

router.get('/', async (req, res) => {
  const yeast = new Yeast(sqlite)
  const result = await yeast.readAll()
  res.status(200).json({
    success: true,
    datetime: new Date(),
    data: result
  })  
})

router.post('/', async (req, res) => {
  const yeast = new Yeast(sqlite, req.body)
  const result = await yeast.create()
  res.status(201).json({
    success: true,
    message: 'Данные записаны в справочник',
    datetime: new Date(),
    data: result
  })
})

router.put('/', async (req, res) => {
  const yeast = new Yeast(sqlite, req.body)
  const result = await yeast.write()
  res.status(200).json({
    success: true,
    message: 'Данные изменены в справочнике',
    datetime: new Date(),
    data: result
  })
})

router.delete('/:id', async (req, res) => {
  const yeast = new Yeast(sqlite, req.params)
  await yeast.delete()
  res.status(200).json({
    success: true,
    message: 'Данные удалены из справочника',
    datetime: new Date(),
    data: req.params
  })  
})

module.exports = router