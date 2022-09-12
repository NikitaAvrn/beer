const { Router } = require('express')
const router = Router()
const List = require('../../models/list.model')
const {SQLiteDB} = require('../../database')

router.get('/:type', async (req, res) => {
  if (!req.params.type) {
    res.status(404).json({
      success: false,
      message: 'Не указан тип справочника'
    }) 
    return
  }

  const sqlite = new SQLiteDB()

  const list = new List(sqlite, req.params.type)
  const result = await list.readAll()
  res.status(200).json({
    success: true,
    datetime: new Date(),
    data: result
  })  
})

module.exports = router