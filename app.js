const express = require('express')
const config = require('config')
const cors = require('cors')

const app = express()
const PORT = config.get('port') || 5000

app.use(cors())
app.use(express.json())

app.use('/api/init', require('./routes/init.route'))
app.use('/api/directory', require('./routes/directory.route'))
app.use('/api/beer-recipe', require('./routes/beer-recipe.route'))
app.use('/api/batch-of-beer', require('./routes/batch-of-beer.route'))
app.use('/api/review', require('./routes/review.route'))
app.use('/api/auth', require('./routes/auth.route'))

if (process.env.NODE_ENV === 'production') {
  app.use('/', express.static(path.join(__dirname, 'client', 'dist')))

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'dist', 'index.html'))
  })
}

function start() {
  try {
    app.listen(PORT, () => console.log(`App has been started on port ${PORT}...`))
  } catch (error) {
    console.log('Server error: ', error.message)
    process.exit(1)
  }
}

start()

app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'Неверный запрос `' + req.url + '`'
  })
})