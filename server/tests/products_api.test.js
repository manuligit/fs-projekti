const supertest = require('supertest')
const { app, server } = require('../index')
const api = supertest(app)
const Product = require('../models/product')
const { initialProducts, productsInDb } = require('./test_helper')

describe('test with initialized products', async () => {
  beforeAll(async () => {
    await Product.remove({})

    const productObjects = initialProducts.map(n => new Product(n))
    await Promise.all(productObjects.map(n => n.save()))
  })
  describe('api-get tests', async () => {
    test('products are returned as json', async () => {
      await api
        .get('/api/products')
        .expect(200)
        .expect('Content-Type', /application\/json/)
    })

    test('api returns correct number of products', async () => {
      const dbProducts = await productsInDb()

      const response = await api
        .get('/api/products')
        .expect(200)
        .expect('Content-Type', /application\/json/)
      expect(response.body.length).toBe(dbProducts.length)
    })

    test('valid product can be returned as JSON', async () => {
      const dbProducts = await productsInDb()
      const valid = dbProducts[0]
      
      const response = await api
        .get(`/api/products/${valid.id}`)
        .expect(200)
        .expect('Content-Type', /application\/json/)

      expect(response.body.name).toBe(valid.name)
    })

    test('invalid id returns 404', async () => {
      const invalidId = 'eitoimi'

      await api
        .get(`/api/products/${invalidId}`)
        .expect(400)
    })
  })
})

describe('api-post tests', async () => {
  test('valid products can be posted to server', async () => {
  })
})

afterAll(() => {
  server.close()
})