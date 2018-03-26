const Product = require('../models/product')

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

const productsInDb = async () => {
  const products = await Product.find({})
  return products.map(Product.format)
}

module.exports = {
  initialProducts, productsInDb
}