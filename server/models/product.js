const mongoose = require('mongoose')

const productSchema = new mongoose.Schema ({
  name: String,
  category: String,
  price: Number
})

productSchema.statics.format = (product) => {
  return {
    id: product.id,
    name: product.name,
    category: product.category,
    price: product.price
  }
}

const Product = mongoose.model('Product', productSchema)
module.exports = Product