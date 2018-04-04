const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const loginRouter = require('express').Router()
const User = require('../models/user')
const config = require('../utils/config')

loginRouter.post('/', async (request, response) => {
  try {
    const body = request.body
    //console.log('loginRouter request.body: ', body)
    const user = await User.findOne({ username: body.username })
      .populate('addedProducts', { id: 1, name: 1 })
      .populate('favoriteProducts', { id: 1, name: 1 })

    let passwordCorrect

    //skip bcrypt compare when testing:
    if (process.env.NODE_ENV === 'test') {
      if (body.bcrypt) {
        console.log('hello bcrypt')
        //console.log(user)
        passwordCorrect = user === null ?
          false :
          await bcrypt.compare(body.password, user.passwordHash)
      } else {
        //console.log(user)
        let hash = body.password.concat(config.passwordHash)
        //console.log(hash)
        passwordCorrect = user === null ?
          false : user.passwordHash === hash
      }
    } else {
      passwordCorrect = user === null ?
        false :
        await bcrypt.compare(body.password, user.passwordHash)
    }

    if ( !(user && passwordCorrect) ) {
      return response.status(401).send({ error: 'Invalid username or password' })
    }

    const userForToken = {
      username: user.username,
      id: user._id
    }

    const token = jwt.sign(userForToken, process.env.SECRET)

    response.status(200).send({ token, id: user.id, username: user.username, name: user.name,
      addedProducts: user.addedProducts, favoriteProducts: user.favoriteProducts })
  } catch (exception) {
    console.log(exception)
    response.status(500).json({ error: 'Something broke' })
  }
})

module.exports = loginRouter