const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors')
const mongoose = require('mongoose')
const loginRouter = require('./controllers/login')
const productsRouter = require('./controllers/products')
const shopsRouter = require('./controllers/shops')
const usersRouter = require('./controllers/users')
const middleware = require('./utils/middleware')
const path = require('path')
const morgan = require('morgan')
require('dotenv').config()

if ( process.env.NODE_ENV !== 'production' ) {
  require('dotenv').config()
}

mongoose
  .connect(process.env.MONGODB_URI)
  .then( () => {
    console.log('connected to database')
  })
  .catch( err => {
    console.log(err)
  })

app.use(cors())
app.use(bodyParser.json())
app.use(middleware.tokenExtractor)

morgan.token('json', function(req) { return JSON.stringify(req.body) })
app.use(morgan(':method :url :json :status :res[content-length] :response-time ms'))

app.use('/api/products', productsRouter)
app.use('/api/shops', shopsRouter)
app.use('/api/users', usersRouter)
app.use('/api/login', loginRouter)

app.use(express.static('build'))
app.use(middleware.error)

//catch all for routes:
app.get('*', function (req, res) {
  res.sendFile(path.join(__dirname, 'index.html'))
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})