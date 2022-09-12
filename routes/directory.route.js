const { Router } = require('express')
const router = Router()
const auth = require('../middleware/auth.middleware')

router.all('/*', auth, async (req, res, next) => {
  router.use('/hop', require('./directory/hop.route'))
  router.use('/list', require('./directory/list.route'))
  router.use('/malt', require('./directory/malt.route'))
  router.use('/yeast', require('./directory/yeast.route'))
  router.use('/other-ingredient', require('./directory/other-ingredient.route'))
  
  next()
})

module.exports = router