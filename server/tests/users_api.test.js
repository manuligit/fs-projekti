const supertest = require('supertest')
const { app, server } = require('../index')
const api = supertest(app)
const User = require('../models/user')
const Product = require('../models/product')
const { newUser } = require('./test_helper')

describe('testing the users api', async () => {

  beforeAll(async () => {
    console.log('usertest beforeall **********')
    await User.remove({})
    //Create a test user
    await newUser.save()
    console.log('usertest beforeall end *********')
  })

  describe('users-get tests', async () => {
    test.only('users are returned as json', async () => {
      console.log('usertest first test')
      await api
        .get('/api/users')
        .expect(200)
        .expect('Content-Type', /application\/json/)
    })
  })


  afterAll(() => {
    server.close()
    console.log('userstest afterall **********')
  })
})