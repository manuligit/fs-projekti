const shopsRouter = require('express').Router()
const Shop = require('../models/shop')

shopsRouter.get('/', async (request, response) => {
  try {
    const shops = await Shop.find({})
    response.json(shops.map(Shop.format))
  } catch (exception) {
    console.log(exception)
    response.status(400).send({ error: 'something went wrong' })
  }
})

shopsRouter.get('/:id', async (request, response) => {
  try {
    const shop = await Shop.findById(request.params.id)
    response.json(Shop.format(shop))
  } catch (exception) {
    console.log(exception)
    response.status(400).send({ error: 'something went wrong' })
  }
})

shopsRouter.post('/', async (request, response) => {
  try {
    const body = request.body
    const shop = new Shop({
      name: body.name,
      address: body.address,
      postalCode: body.postalCode,
      city: body.city,
      chain: body.chain
    })

    const savedShop = await shop.save()
    response.json(Shop.format(savedShop))

  } catch (exception) {
    console.log(exception)
    response.status(500).json({ error: 'Something went wrong' })
  }
})

shopsRouter.put('/:id', async (request, response) => {
  try {
    const body = request.body
    //console.log(request.body)
    Shop.findByIdAndUpdate(request.params.id,
      { name: body.name,
        address: body.address,
        postalCode: body.postalCode,
        city: body.city,
        chain: body.chain }, { new: true },
      (err, todo) => {
        if (err) { response.status(500).send(err) }
        return response.json(Shop.format(todo))
      })
  } catch (exception) {
    console.log(exception)
    response.status(500).json({ error: 'Something went wrong' })
  }
})

shopsRouter.delete('/:id', async (request, response) => {
  try {
    await Shop.findByIdAndRemove(request.params.id)
    response.status(204).end()
  } catch (exception) {
    console.log('shopsrouter.delete exception:', exception.name)
    response.status(400).json({ error: 'invalid id' })
  }
})

module.exports = shopsRouter