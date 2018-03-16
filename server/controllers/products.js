const productsRouter = require('express').Router()
const Product = require('../models/product')

productsRouter.get('/', async (request, response) => {
  try {
    const products = await Product.find({})
    response.json(products.map(Product.format))
  } catch (exception) {
    console.log('productsRouter error:',exception.name)
    response.status(400).send({ error: 'something went wrong' })
  }
})

productsRouter.post('/', async (request, response) => {
  const body = request.body
  try {
    if (body.name === undefined || body.price === undefined) {
      return response.status(400).json({ error: 'name or price missing' })
    }

    const product = new Product({
      name: body.name,
      category: body.category,
      price: body.price
    })

    const savedProduct = await product.save()
    response.json(Product.format(savedProduct))
  }
  catch (exception) {
    console.log('productsRouter error: ', exception.name)
    response.status(500).json({ error: 'Something went wrong' })
  }
})

productsRouter.put('/:id', async (request, response) => {
  try {
    const body = request.body
    console.log(body)
    Product.findByIdAndUpdate(request.params.id, 
      { name: body.name, category: body.category, price: body.price },
      { new: true }.price,
      (err, todo) => { if (err) response.status(500).send(err); return response.send(todo) }
    )
  } catch (exception) {
    console.log(exception)
    response.status(500).json({ error: 'Something broke' })
  }
})

productsRouter.delete('/:id', async (request, response) => {
  try {
    await Product.findByIdAndRemove(request.params.id)
    response.status(204).end()
  } catch (exception) {
    console.log('productsrouter.delete exception:', exception.name)
    response.status(400).json({ error: 'invalid id' })
  }
})



module.exports = productsRouter