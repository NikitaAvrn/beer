const { Router } = require('express')
const router = Router()
const Recipe = require('../models/recipe.model')
const auth = require('../middleware/auth.middleware')
const { SQLiteDB } = require('../database')

router.get('/', auth, async (req, res) => {
  const sqlite = new SQLiteDB()
  const recipe = new Recipe(sqlite, null)

  const result = await recipe.readAll()

  res.status(200).json({
    success: true,
    data: result
  })
})

router.get('/:id', async (req, res) => {
  const sqlite = new SQLiteDB()
  const recipe = new Recipe(sqlite, req.params)

  const result = await recipe.readRecipe()

  res.status(200).json({
    success: true,
    data: result
  })
})

router.post('/', auth, async (req, res) => {
  const sqlite = new SQLiteDB()
  const recipe = new Recipe(sqlite, req.body)

  const result = await recipe.create()

  res.status(200).json({
    success: true,
    message: 'Новый рецепт пива сохранен',
    data: result
  })
})

router.put('/', auth, async (req, res) => {
  const sqlite = new SQLiteDB()
  const recipe = new Recipe(sqlite, req.body)

  const result = await recipe.update()

  res.status(200).json({
    success: true,
    message: 'Рецепт пива изменен',
    data: result
  })
})

router.delete('/:id', auth, async (req, res) => {
  const sqlite = new SQLiteDB()
  const recipe = new Recipe(sqlite, req.params)

  await recipe.deleteRecipe()

  res.status(200).json({
    success: true,
    message: 'Рецепт удален успешно'
  })
})

module.exports = router