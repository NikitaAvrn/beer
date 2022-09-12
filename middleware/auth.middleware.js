const jwt = require('jsonwebtoken')
const config = require('config')

module.exports = (req, res, next) => {
  if (req.method === 'OPTIONS') {
    return next()
  }
  
  try {
    const token = req.headers.autorization.split(' ')[1]
    const decode = jwt.verify(token, config.get('jwtSecret'))

    req.userId = decode.userId

    return next()
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: 'Вам необходимо авторизоваться'
    })
  }
}