const Product = require('../models/product')
const User = require('../models/user')

const initialProducts = [
  {
    'id': '5ab2b4f39d2514e3987fec4e',
    'name': 'Kinkku',
    'category': 'Leikkeleet',
    'price': 1,
    'shops': null,
    'user': []
  },
  {
    'id': '5ab69299bfc1bf5a97be8adf',
    'name': 'Jekkukola',
    'category': 'Alkoholit',
    'price': 3,
    'shops': [],
    'user': [
      {
        '_id': '5ab2a5eb23cbc1c0f0df90fa',
        'name': 'Jani Jaskelin',
        'username': 'jake'
      }
    ]
  }
]

let password = 'salasana'

const newUser = new User({
  'name': 'Jani Jaskelin',
  'username': 'jake',
  'password': password,
  'passwordHash': mockPasswordHash(password)
})

const bcryptUserCredentials = {
  'name': 'Joni Joukahainen',
  'username': 'joni',
  'password': 'bcryptsalattu'
}

function mockPasswordHash (password) {
  return password.concat('mockedhash')
}

const newUserCredentials = {
  'name': 'Jani Jaskelin',
  'username': 'jake',
  'password': 'salasana'
}

const productsInDb = async () => {
  const products = await Product.find({})
  return products.map(Product.format)
}

const usersInDb = async () => {
  const users = await User.find({})
  return users.map(User.format)
}

module.exports = {
  initialProducts, productsInDb, usersInDb, newUser, newUserCredentials,
  mockPasswordHash, bcryptUserCredentials
}