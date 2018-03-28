const supertest = require('supertest')
const { app, server } = require('../index')
const api = supertest(app)
const Product = require('../models/product')
const User = require('../models/user')
const { initialProducts, productsInDb,  newUser, newUserCredentials, newProduct } = require('./test_helper')

describe('testing the products api', async () => {
  let token = ''
  let headers = ''

  beforeAll(async () => {
    await User.remove({})
    //Create a test user for posting/editing/updating products:
    await newUser.save()

    //Login with the created user credentials to receive token:
    const loginRequest = await api
      .post('/api/login')
      .set('Content-type', 'application/json')
      .send({
        username: newUserCredentials.username,
        password: newUserCredentials.password
      })
      .expect(200)
    //console.log('loginrequest', loginRequest.body)
    token = loginRequest.body.token
    headers = { 'Authorization': `bearer ${token}` }

    //Initialize product database:
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

  describe.skip('api-post tests', async () => {
    //Initialize some variables
    //let token = ''
    //let headers = ''

    beforeAll(async () => {
      console.log('api_post')
    })

    test('logged user can post products to server with a valid token', async () => {
      const beforeProducts = await productsInDb()
      let response = await api
        .post('/api/products')
        .set(headers)
        .send(newProduct)
        .expect(200)
        .expect('Content-Type', /application\/json/)

      const afterProducts = await productsInDb()
      expect(beforeProducts.length+1).toBe(afterProducts.length)
      console.log(response.body)
      //check that added item is owned by the user that added it
    })

    test('products cannot be posted to server without a token', async () => {
      const beforeProducts = await productsInDb()
      await api
        .post('/api/products')
        .send(newProduct)
        .expect(401)
        .expect('Content-Type', /application\/json/)

      const afterProducts = await productsInDb()

      expect(beforeProducts.length).toBe(afterProducts.length)
    })

    test('products cannot be posted to server with an invalid token', async () => {
      const beforeProducts = await productsInDb()
      let invalidHeaders = { 'Authorization': 'bearer thisisnotavalidtoken' }
      await api
        .post('/api/products')
        .set(invalidHeaders)
        .send(newProduct)
        .expect(401)
        .expect('Content-Type', /application\/json/)

      const afterProducts = await productsInDb()

      expect(beforeProducts.length).toBe(afterProducts.length)
    })
  })

  describe('api-put tests', async () => {
    let item = {}
    beforeAll(async () => {
      const dbItemsBefore = await productsInDb()
      item = dbItemsBefore[0]
    })

    test('database should contain items to be updated', async () => {
      const dbProducts = await productsInDb()
      //console.log(dbProducts)
      expect(dbProducts.length).toBeGreaterThan(0)
    })

    test('items can be updated with a valid id and token', async () => {
      const dbItemsBefore = await productsInDb()
      let newName = { name: 'Korvasieni', category: 'sienet' }
      //Replace fields:
      Object.assign(item, newName)

      const response = await api
        .put(`/api/products/${item.id}`)
        .set(headers)
        .send(item)
        .expect(200)
        .expect('Content-Type', /application\/json/)

      //console.log(response.body)
      expect(newName.name).toEqual(response.body.name)
      const dbItemsAfter = await productsInDb()
      expect(dbItemsBefore.length).toBe(dbItemsAfter.length)

    })

    test('items cannot be updated with a invalid id and token', async () => {
      const dbItemsBefore = await productsInDb()
      const failItem = dbItemsBefore[0]
      let newName = { id:'invalidid', name: 'Mikkeller', category: 'olut' }
      //Replace fields:
      Object.assign(failItem, newName)

      await api
        .put(`/api/products/${failItem.id}`)
        .set(headers)
        .send(failItem)
        .expect(404)
        .expect('Content-Type', /application\/json/)
    })
    
    test('items cannot be updated with a valid id and invalid token', async () => {
      let newName = { name: 'Saippua', category: 'pesuaineet' }
      //Replace fields:
      Object.assign(item, newName)
      let invalidHeaders = { 'Authorization': 'bearer thisisnotavalidtoken' }

      const response = await api
        .put(`/api/products/${item.id}`)
        .set(invalidHeaders)
        .send(item)
        .expect(401)
        .expect('Content-Type', /application\/json/)
    })
  })

  describe.skip('api-delete tests', async () => {
    beforeAll(async () => {
      await User.remove({})
      //create test user for deleting products
      await newUser.save()
      //create a products to delete
    })
    test('items can be deleted with a valid id and token', async () => {
      expect(true).toBe(true)
    })
    test.skip('items cannot be deleted with a invalid id and token', async () => {
      expect(true).toBe(true)
    })
    test.skip('items cannot be deleted with a valid id and invalid token', async () => {
      expect(true).toBe(true)
    })
  })

  afterAll(() => {
    server.close()
  })
})