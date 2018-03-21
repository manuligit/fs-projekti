const error = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

//Takes token from authorization header and places it in the token field of request
const tokenExtractor = (request, response, next) => {
  const authorization = request.get('authorization')
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    request.token = authorization.substring(7)
    next()
  } else {
    request.token = null
    next()
  }
}

module.exports = {
  error, tokenExtractor
}