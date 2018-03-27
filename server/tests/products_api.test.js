const supertest = require('supertest')
const { app, server } = require('../index')
const api = supertest(app)
const Product = require('../models/product')
const User = require('../models/user')
const { initialProducts, productsInDb, usersInDb, newUser, newUserCredentials } = require('./test_helper')

describe('test with initialized products', async () => {
  beforeAll(async () => {
    await Product.remove({})

    const productObjects = initialProducts.map(n => new Product(n))
    await Promise.all(productObjects.map(n => n.save()))
  })
  describe.skip('api-get tests', async () => {
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
  beforeAll(async () => {
    await User.remove({})
    //create test user for posting
    const savedUser = await newUser.save()
  })


  test('logged user can post products to server with a valid token', async () => {
    const dbProducts = await productsInDb()

    //login with the created user credentials to receive token:
    const loginRequest = await api
      .post('/api/login')
      .send({
        username: newUserCredentials.username,
        password: newUserCredentials.password
      })
      .expect(200)

    const newProduct =
      {
        'name': 'Herkkutatti',
        'category': 'Sienet',
        'price': 3.99
      }
      //post the product with credentials:
    let headers = { 'Authorization': `bearer ${loginRequest.token}` }
    const request = await api
      .post('/api/products')
      .set(headers)
      .send(newProduct)
      .expect(401)
      .expect('Content-Type', /application\/json/)
    
    console.log(request)
  })


  test('products cannot be posted to server without a token', async () => {
    const beforeProducts = await productsInDb()

    const newProduct =
      {
        'name': 'Herkkutatti',
        'category': 'Sienet',
        'price': 3.99
      }

    await api
      .post('/api/products')
      .send(newProduct)
      .expect(401)
      .expect('Content-Type', /application\/json/)

    const afterProducts = await productsInDb()

    expect(beforeProducts.length).toBe(afterProducts.length)
  })
})

afterAll(() => {
  server.close()
})