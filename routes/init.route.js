const { Router } = require('express')
const {SQLiteDB} = require('../database')
const Init = require('../models/init.model')
const router = Router()

router.get('/:pi', async (req, res) => {
  if (!req.params.pi) {
    res.status(403).json({
      success: false,
      message: 'Нет кода инициализации'
    })
    return
  } else if (req.params.pi !== '3.1415926') {
    res.status(403).json({
      success: false,
      message: 'Неверный код инициализации'
    })
    return
  }

  const sqlite = new SQLiteDB()
  const init = new Init(sqlite)

  init.init()

  res.status(200).json({
    success: true,
    message: 'Инициализация приложения прошла успешно'
  })
})

module.exports = router