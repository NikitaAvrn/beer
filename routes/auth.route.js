const { Router } = require('express')
const router = Router()
const Auth = require('../models/auth.model')
const middlewareAuth = require('../middleware/auth.middleware')
const { SQLiteDB } = require('../database')

router.post('/login', async (req, res) => {
  const sqlite = new SQLiteDB()
  const auth = await Auth.login(sqlite, req.body.email, req.body.password)
  if (auth.error) {
    return res.status(404).json({
      success: false,
      message: auth.error
    })
  }
  res.status(200).json({
    success: true,
    message: `Здравствуйте, ${auth.name}!`,
    data: auth
  })
})

router.get('/check-autorization/:userId', middlewareAuth, async (req, res) => {
  const userId = req.params.userId

  if (userId == req.userId) {
    return res.status(200).json({
      success: true
    })
  }
  res.status(401).json({
    success: false,
    message: "Вам необходимо авторизоваться"
  })
})

module.exports = router