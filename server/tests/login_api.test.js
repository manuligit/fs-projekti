const supertest = require('supertest')
const { app, server } = require('../index')
const api = supertest(app)
const User = require('../models/user')
const { newUser, newUserCredentials, bcryptUser, bcryptUserCredentials } = require('./test_helper')

//For the login tests, bcrypt is disabled in test enviroment
describe('test with initialized products', async () => {
  describe('User can log using valid credentials', async () => {
    beforeAll(async () => {
      //Remove existing users from db
      await User.remove({})
    })

    test('logged user can post products to server with a valid token', async () => {
      //create test user for posting
      await newUser.save()
      //const user = await User.findOne({ username: newUserCredentials.username })
      //Login with the created user credentials to receive token:
      const loginRequest = await api
        .post('/api/login')
        .set('Content-type', 'application/json')
        .send({
          username: newUserCredentials.username,
          password: newUserCredentials.password
        })
        .expect(200)
      expect(loginRequest.body.token)
      //console.log(loginRequest.body)
    })

    test('logged user can post products to server with a valid token and bcrypt', async () => {
      await User.remove({})
      //create test user for posting
      await bcryptUser()
      //const dbUsers = await usersInDb()
      //console.log(dbUsers)
      const user = await User.findOne({ username: bcryptUserCredentials.username })
      console.log(user.username)

      //Login with the created user credentials to receive token:
      const loginRequest = await api
        .post('/api/login')
        .set('Content-type', 'application/json')
        .send({
          username: bcryptUserCredentials.username,
          password: bcryptUserCredentials.password,
          bcrypt: true
        })
        .expect(200)

      expect(loginRequest.body.token)
      //console.log(loginRequest.body)
    })

    test('User cannot log in using invalid credentials', async () => {
      await api
        .post('/api/login')
        .set('Content-type', 'application/json')
        .send({
          username: newUserCredentials.username,
          password: 'notthepassword'
        })
        .expect(401)
    })
  })
})

afterAll(() => {
  server.close()
})