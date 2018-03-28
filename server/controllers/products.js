const productsRouter = require('express').Router()
const Product = require('../models/product')
const User = require('../models/user')
const jwt = require('jsonwebtoken')

productsRouter.get('/', async (request, response) => {
  try {
    const products = await Product.find({})
      .populate('shops', { id: 1, name: 1, chain: 1 })
      .populate('user', { id: 1, username: 1, name: 1 })

    response.json(products.map(Product.format))
  } catch (exception) {
    console.log('productsRouter error:',exception.name)
    response.status(400).send({ error: 'something went wrong' })
  }
})

productsRouter.get('/:id', async (request, response) => {
  try {
    const product = await Product.findById(request.params.id)
      .populate('shops', { id: 1, name: 1, chain: 1 })
      .populate('user', { id: 1, username: 1, name: 1 })

    if (product) {
      response.json(Product.format(product))
    } else {
      response.status(404).end()
    }
  } catch (exception) {
    console.log('productsRouter error:', exception.name)
    response.status(400).send({ error: 'Malformatted id' })
  }
})

productsRouter.post('/', async (request, response) => {
  const body = request.body
  try {
    if (body.name === undefined || body.price === undefined) {
      return response.status(400).json({ error: 'name or price missing' })
    }

    const decodedToken = jwt.verify(request.token, process.env.SECRET)

    if (!request.token || !decodedToken.id) {
      return response.status(401).json({ error: 'token missing or invalid' })
    }

    const user = await User.findById(decodedToken.id)

    const product = new Product({
      name: body.name,
      category: body.category,
      price: body.price,
      user: user._id
    })

    const savedProduct = await product.save()
    user.addedProducts = user.addedProducts.concat(savedProduct._id)
    await user.save()

    response.json(Product.format(savedProduct))
  }
  catch (exception) {
    if (exception.name === 'JsonWebTokenError' ) {
      response.status(401).json({ error: exception.message })
    } else {
      console.log('productsRouter error: ', exception.name)
      response.status(500).json({ error: 'Something went wrong' })
    }
  }
})

productsRouter.put('/:id', async (request, response) => {
  try {
    const body = request.body

    if (body.name === undefined || body.price === undefined) {
      return response.status(400).json({ error: 'name or price missing' })
    }

    //Only allow logged users edit products:
    const decodedToken = jwt.verify(request.token, process.env.SECRET)

    if (!request.token || !decodedToken.id) {
      return response.status(401).json({ error: 'token missing or invalid' })
    }

    //console.log(body)
    Product.findByIdAndUpdate(request.params.id,
      { name: body.name, category: body.category, price: body.price, shops: body.shops },
      { new: true },
      (err, todo) => {
        if (err) { response.status(404).send({ error: 'Id not found' })
        } else {
          return response.json(Product.format(todo))
        }
      }
    )
  } catch (exception) {
    if (exception.name === 'CastError') {
      console.log('CastError')
      //response.status(404).send({ error: 'Id not found' })
    } else if (exception.name === 'JsonWebTokenError' ) {
      response.status(401).json({ error: 'You need to be logged in to update products' })
    } else {
      console.log(exception)
      response.status(500).json({ error: 'Something broke' })
    }
  }
})

productsRouter.delete('/:id', async (request, response) => {
  try {
    const decodedToken = jwt.verify(request.token, process.env.SECRET)

    if (!request.token || !decodedToken.id) {
      return response.status(401).json({ error: 'token missing or invalid' })
    }

    await Product.findByIdAndRemove(request.params.id,
      (err) => {
        if (err) {
          response.status(404).send({ error: 'Id not found' })
        } else {
          response.status(204).end()
        }
      }
    )
  } catch (exception) {
    if (exception.name === 'CastError') {
      console.log('CastError')
    } else if (exception.name === 'JsonWebTokenError' ) {
      response.status(401).json({ error: 'You need to be logged in to delete products' })
    } else {
      console.log('productsrouter.delete exception:', exception.name)
      response.status(500).json({ error: 'Server error' })
    }
  }
})

module.exports = productsRouter