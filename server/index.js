const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors')
const mongoose = require('mongoose')
const productsRouter = require('./controllers/products')
const shopsRouter = require('./controllers/shops')
const middleware = require('./utils/middleware')
const path = require('path')
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
app.use('/api/products', productsRouter)
app.use('/api/shops', shopsRouter)
app.use(express.static('build'))
app.use(middleware.logger)
app.use(middleware.error)

app.get('*', function (req, res) {
  res.sendFile(path.join(__dirname, 'index.html'))
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})