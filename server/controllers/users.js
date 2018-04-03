const usersRouter = require('express').Router()
const User = require('../models/user')
const bcrypt = require('bcrypt')
const config = require('../utils/config')
const jwt = require('jsonwebtoken')
const saltRounds = 10

usersRouter.get('/', async (request, response) => {
  try {
    const users = await User.find({})
      .populate('addedProducts', { id: 1, name: 1 })
    response.json(users.map(User.format))
  } catch (exception) {
    console.log(exception)
    response.status(400).send({ error: 'something went wrong' })
  }
})

usersRouter.get('/:id', async (request, response) => {
  try {
    await User.findById(request.params.id)
      .populate('addedProducts', { id: 1, name: 1 }).
      exec (function (err, user) {
        if (err) return response.status(404).send({ error: 'Id not found' })
        return response.json(User.format(user))
      })
  } catch (exception) {
    console.log(exception.name)
    response.status(500).send({ error: 'Server error' })
  }
})

usersRouter.post('/', async (request, response) => {
  try {
    const body = request.body
    //console.log(request.get('Authorization'))
    var requestType = request.get('Authorization')
    //Do not let logged users create a new user:
    if (requestType && requestType.length > 0) {
      console.log('hello requesttype')
      console.log('User is already logged in')
      response.status(400).json({ error: 'User is already logged in' })
      return
    }
    console.log(body)

    const existingUser = await User.find({ username: body.username })
    if (existingUser.length>0) {
      console.log('Username must be unique')
      return response.status(400).json({ error: 'Username must be unique' })
    }
    if (body.password.length < 8) {
      console.log('Password must be at least 8 characters long')
      return response.status(400).json({ error: 'Password must be at least 8 characters long' })
    }

    let passwordHash
    //do tests without bcrypt:
    if (process.env.NODE_ENV === 'test') {
      passwordHash = body.password.concat(config.testHash)
    } else {
      passwordHash = await bcrypt.hash(body.password, saltRounds)
    }

    const user = new User({
      name: body.name,
      username: body.username,
      passwordHash
    })

    console.log(user)
    const savedUser = await user.save()
    console.log(savedUser)
    response.json(User.format(savedUser))

  } catch (exception) {
    if (exception.name === 'ValidationError') {
      response.status(400).json({ error: 'A required field is missing' })
    } else {
      console.log(exception)
      response.status(500).json({ error: 'Something went wrong.' })
    }
  }
})

usersRouter.put('/:id', async (request, response) => {
  try {
    const body = request.body
    console.log(body)

    //Only allow logged users edit products:
    const decodedToken = jwt.verify(request.token, process.env.SECRET)
    if (!request.token || !decodedToken.id) {
      return response.status(401).json({ error: 'token missing or invalid' })
    }

    let passwordHash = ''
    //If password is updated, also update the hash:
    if (body.password) {
      passwordHash = await bcrypt.hash(body.password, saltRounds)
    }

    if (passwordHash.length > 0) {
      User.findByIdAndUpdate(request.params.id,
        { username: body.username, name: body.name, passwordHash: passwordHash },
        { new: true },
        (err, user) => {
          if (err) { response.status(404).send({ error: 'Id not found' })
          } else {
            return response.json(User.format(user))
          }
        })
        .populate('addedProducts', { id: 1, name: 1 })
    } else {
      User.findByIdAndUpdate(request.params.id,
        { username: body.username, name: body.name },
        { new: true },
        (err, user) => {
          if (err) { response.status(404).send({ error: 'Id not found' })
          } else {
            return response.json(User.format(user))
          }
        })
        .populate('addedProducts', { id: 1, name: 1 })

    }
  } catch (exception) {
    if (exception.name === 'ValidationError') {
      response.status(400).json({ error: 'A required field is missing' })
    } else if (exception.name === 'JsonWebTokenError' ) {
      response.status(401).json({ error: 'You need to be logged in to update user info' })
    } else if (exception.name === 'CastError') {
      console.log('CastError')
    } else {
      console.log(exception.name)
      response.status(500).json({ error: 'Something went wrong.' })
    }
  }
})

usersRouter.delete('/:id', async (request, response) => {
  try {
    const body = request.body
    const removeUser = await User.findById(request.params.id)

    //Only same user can request deletion that the created account:
    if (removeUser.id === body.id) {
      await User.findByIdAndRemove(request.params.id)
      response.status(204).end()
    } else {
      return response.status(400).json({ error: 'User could not be deleted' })
    }
    //remove user from item?
  } catch (exception) {
    console.log(exception)
    response.status(500).json({ error: 'Something went wrong.' })
  }
})

module.exports = usersRouter