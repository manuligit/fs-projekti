const supertest = require('supertest')
const { app, server } = require('../index')
const api = supertest(app)
const User = require('../models/user')
//const Product = require('../models/product')
const { newUser, usersInDb, newUserCredentials, newUser2Credentials,
  dbUser, dbUserCredentials } = require('./test_helper')

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
        .send(newUser2Credentials)
        .expect(200)
        .expect('Content-Type', /application\/json/)

      console.log(response.body)
      const dbUsersAfter = await usersInDb()
      expect(response.body.username).toEqual(newUser2Credentials.username)
      expect(dbUsersAfter.length).toBe(dbUsersBefore.length+1)
    })

    test('new user with duplicate username cannot be added', async () => {
      //Add new user to the db so duplicate username can be tested:
      await newUser.save()
      const dbUsersBefore = await usersInDb()
      expect(dbUsersBefore.length).toBeGreaterThan(0)

      //Create user with a duplicate username
      let duplicateUser = {
        name: 'nimi',
        username: dbUsersBefore[0].username,
        password: 'salasana'
      }

      const response = await api
        .post('/api/users')
        .set('Content-type', 'application/json')
        .send(duplicateUser)
        .expect(400)
        .expect('Content-Type', /application\/json/)

      //console.log(response.body)
      const dbUsersAfter = await usersInDb()
      expect(response.body.error).toEqual('Username must be unique')
      expect(dbUsersAfter.length).toBe(dbUsersBefore.length)
    })

    test('new user with too short password cannot be added', async () => {
      //Add new user to the db so duplicate username can be tested
      const dbUsersBefore = await usersInDb()

      let credentials = {
        username: newUserCredentials.username,
        password: 'short',
        name: newUserCredentials.name
      }

      const response = await api
        .post('/api/users')
        .set('Content-type', 'application/json')
        .send(credentials)
        .expect(400)
        .expect('Content-Type', /application\/json/)

      //console.log(response.body)
      const dbUsersAfter = await usersInDb()
      expect(response.body.error).toEqual('Password must be at least 8 characters long')
      expect(dbUsersAfter.length).toBe(dbUsersBefore.length)
    })

    test('new user cannot be added with invalid fields', async () => {
      const dbUsersBefore = await usersInDb()
      //Create credentials without username:
      let credentials = {
        password: newUserCredentials.password,
        name: newUserCredentials.name
      }

      const response = await api
        .post('/api/users')
        .set('Content-type', 'application/json')
        .send(credentials)
        .expect(400)
        .expect('Content-Type', /application\/json/)

      console.log(response.body)
      const dbUsersAfter = await usersInDb()
      expect(response.body.error).toEqual('A required field is missing')
      expect(dbUsersAfter.length).toBe(dbUsersBefore.length)

      //Create credentials without name:
      credentials = {
        username: newUserCredentials.username,
        password: newUserCredentials.password
      }

      const response2 = await api
        .post('/api/users')
        .set('Content-type', 'application/json')
        .send(credentials)
        .expect(400)
        .expect('Content-Type', /application\/json/)

      console.log(response2.body)
      let dbUsersAfter2 = await usersInDb()
      expect(response2.body.error).toEqual('A required field is missing')
      expect(dbUsersAfter2.length).toBe(dbUsersBefore.length)
    })

    test('new user cannot be created while logged in', async () => {
      //Create a new test user:
      let user = await dbUser.save()
      //console.log(user)
      //Login with the created user credentials:
      const dbUsersBefore = await usersInDb()
      const loginRequest = await api
        .post('/api/login')
        .set('Content-type', 'application/json')
        .send({
          username: dbUserCredentials.username,
          password: dbUserCredentials.password
        })
        .expect(200)
      //Add token to the post request:
      expect(loginRequest.body.token)
      const token = loginRequest.body.token
      const headers = { 'Authorization': `bearer ${token}` }

      //Try to create a new user while logged in:
      const response = await api
        .post('/api/users')
        .set(headers)
        .set('Content-type', 'application/json')
        .send(newUser2Credentials)
        .expect(400)
        .expect('Content-Type', /application\/json/)

      console.log(response.body)
      const dbUsersAfter = await usersInDb()
      expect(response.body.error).toEqual('User is already logged in')
      expect(dbUsersAfter.length).toBe(dbUsersBefore.length)
    })
  })

  afterAll(() => {
    server.close()
  })
})