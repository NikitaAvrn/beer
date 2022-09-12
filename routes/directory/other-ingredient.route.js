const { Router } = require('express')
const router = Router()
const OtherIngredient = require('../../models/other-ingredient.model')
const {SQLiteDB} = require('../../database')

let sqlite

router.all('/*', async (req, res, next) => {
  sqlite = new SQLiteDB()
  next()
})

router.get('/create-table', async (req, res) => {
  const otherIngredient = new OtherIngredient(sqlite)
  const result = await otherIngredient.createTable()
  res.status(200).json({
    success: true,
    message: 'Таблица успешно создана',
    datetime: new Date(),
    data: result 
  })  
})

router.get('/:id', async (req, res) => {
  const otherIngredient = new OtherIngredient(sqlite, req.params)
  const result = await otherIngredient.read()
  res.status(200).json({
    success: true,
    datetime: new Date(),
    data: result
  })  
})

router.get('/', async (req, res) => {
  const otherIngredient = new OtherIngredient(sqlite)
  const result = await otherIngredient.readAll()
  res.status(200).json({
    success: true,
    datetime: new Date(),
    data: result
  })  
})

router.post('/', async (req, res) => {
  const otherIngredient = new OtherIngredient(sqlite, req.body)
  const result = await otherIngredient.create()
  res.status(201).json({
    success: true,
    message: 'Данные записаны в справочник',
    datetime: new Date(),
    data: result
  })
})

router.put('/', async (req, res) => {
  const otherIngredient = new OtherIngredient(sqlite, req.body)
  const result = await otherIngredient.write()
  res.status(200).json({
    success: true,
    message: 'Данные изменены в справочнике',
    datetime: new Date(),
    data: result
  })
})

router.delete('/:id', async (req, res) => {
  const otherIngredient = new OtherIngredient(sqlite, req.params)
  await otherIngredient.delete()
  res.status(200).json({
    success: true,
    message: 'Данные удалены из справочника',
    datetime: new Date(),
    data: req.params
  })  
})

module.exports = router