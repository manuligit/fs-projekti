const supertest = require('supertest')
const { app, server } = require('../index')
const api = supertest(app)
const User = require('../models/user')
//const Product = require('../models/product')
const { newUser, usersInDb, newUserCredentials } = require('./test_helper')

describe('testing the users api', async () => {

  beforeAll(async () => {
    await User.remove({})
    //Create a test user
    await newUser.save()
  })

  describe('users-get tests', async () => {
    test('users are returned as json', async () => {
      await api
        .get('/api/users')
        .expect(200)
        .expect('Content-Type', /application\/json/)
    })

    test('api returns correct number of users', async () => {
      const dbUsers = await usersInDb()

      const response = await api
        .get('/api/users')
        .expect(200)
        .expect('Content-Type', /application\/json/)
      expect(response.body.length).toBe(dbUsers.length)
    })

    test('valid user can be returned as JSON', async () => {
      const dbUsers = await usersInDb()
      const valid = dbUsers[0]

      const response = await api
        .get(`/api/users/${valid.id}`)
        .expect(200)
        .expect('Content-Type', /application\/json/)

      expect(response.body.username).toBe(valid.username)
    })

    test('invalid id returns 404', async () => {
      const invalidId = 'eitoimi'

      await api
        .get(`/api/users/${invalidId}`)
        .expect(404)
    })
  })

  describe('users-post tests', async () => {
    beforeAll(async () => {
      await User.remove({})
    })

    test('a new user can be added to the database', async () => {
      const dbUsersBefore = await usersInDb()

      const response = await api
        .post('/api/users')
        .set('Content-type', 'application/json')
        .send(newUserCredentials)
        .expect(200)
        .expect('Content-Type', /application\/json/)

      console.log(response.body)
      const dbUsersAfter = await usersInDb()
      expect(response.body.username).toEqual(newUserCredentials.username)
      expect(dbUsersAfter.length).toBe(dbUsersBefore.length+1)
    })

    test.skip('new user with duplicate username cannot be added', async () => {
      expect(true).toBe(true)
    })

    test.skip('new user with too short password cannot be added', async () => {
      expect(true).toBe(true)
    })

    test.skip('new user cannot be added with invalid fields', async () => {
      expect(true).toBe(true)
    })

    test.skip('new user cannot be created when logged in', async () => {
      expect(true).toBe(true)
    })
  })

  afterAll(() => {
    server.close()
  })
})