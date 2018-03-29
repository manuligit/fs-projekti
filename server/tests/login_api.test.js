const supertest = require('supertest')
const { app, server } = require('../index')
const api = supertest(app)
const User = require('../models/user')
const { newUser, newUserCredentials, bcryptUserCredentials } = require('./test_helper')
const bcrypt = require('bcrypt')

//For the login tests, bcrypt is disabled in test enviroment
describe('test with initialized products', async () => {
  describe('User can log using valid credentials', async () => {
    let bcryptUser = {}
    beforeAll(async () => {
      //console.log('loginstest beforeall **********')
      //Remove existing users from db
      await User.remove({})
      let passwordHash = await bcrypt.hash('bcryptsalattu', 1)
      //Create user with bcrypt-hashed password:
      const bUser = new User({
        'name': 'Joni Joukahainen',
        'username': 'joni',
        'password': 'bcryptsalattu',
        'passwordHash': passwordHash
      })
      bcryptUser = await bUser.save()
      //console.log('loginstest beforeall **********')
    })

    test('logged user can login to server', async () => {
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
      expect(loginRequest.body.username).toEqual(newUserCredentials.username)
      //console.log(loginRequest.body)
    })

    test('logged user login to server with a valid token and bcrypt', async () => {
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
      expect(loginRequest.body.username).toEqual(bcryptUser.username)
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

  afterAll(() => {
    server.close()
  })

})