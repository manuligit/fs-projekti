const usersRouter = require('express').Router()
const User = require('../models/user')
const bcrypt = require('bcrypt')

usersRouter.get('/', async (request, response) => {
  try {
    const users = await User.find({})
    response.json(users.map(User.format))
  } catch (exception) {
    console.log(exception)
    response.status(400).send({ error: 'something went wrong' })
  }
})

usersRouter.post('/', async (request, response) => {
  try {
    const body = request.body

    const existingUser = await User.find({ username: body.username })
    if (existingUser.length>0) {
      return response.status(400).json({ error: 'Username must be unique' })
    }
    if (body.password.length < 8) {
      return response.status(400).json({ error: 'Password must be at least 8 characters long' })
    }

    const saltRounds = 10
    const passwordHash = await bcrypt.hash(body.password, saltRounds)

    const user = new User({
      name: body.name,
      username: body.username,
      passwordHash
    })

    const savedUser = await user.save()
    response.json(User.format(savedUser))

  } catch (exception) {
    console.log(exception)
    response.status(500).json({ error: 'Something went wrong.' })
  }
})

usersRouter.put('/:id', async (request, response) => {
  try {
    //const body = request.body
    //to be continues
  } catch (exception) {
    console.log(exception)
    response.status(500).json({ error: 'Something went wrong.' })
  }
})


module.exports = usersRouter