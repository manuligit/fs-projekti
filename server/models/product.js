const mongoose = require('mongoose')

const productSchema = new mongoose.Schema ({
  name: { type: String, required: true },
  category: String,
  price: Number,
  weigth: Number,
  unitprice: Number,
  unit: String,
  shops: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Shop' }],
  user: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }]
})

productSchema.statics.format = (product) => {
  return {
    id: product.id,
    name: product.name,
    category: product.category,
    price: product.price,
    weigth: product.weigth,
    unitprice: product.unitprice,
    unit: product.unit,
    shops: product.shops,
    user: product.user
  }
}

const Product = mongoose.model('Product', productSchema)
module.exports = Product