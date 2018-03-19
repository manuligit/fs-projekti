const mongoose = require('mongoose')

const productSchema = new mongoose.Schema ({
  name: { type: String, required: true },
  category: String,
  price: Number,
  weigth: Number,
  unitprice: Number,
  unit: String
})

productSchema.statics.format = (product) => {
  return {
    id: product.id,
    name: product.name,
    category: product.category,
    price: product.price,
    weigth: product.weigth,
    unitprice: product.unitprice,
    unit: product.unit
  }
}

const Product = mongoose.model('Product', productSchema)
module.exports = Product