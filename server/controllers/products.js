const productsRouter = require('express').Router()
const Product = require('../models/product')

productsRouter.get('/', (request, response) => {
  Product
    .find({})
    .then(items => {
      response.json(items)
    })
})


module.exports = productsRouter