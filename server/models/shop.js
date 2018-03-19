const mongoose = require('mongoose')

const shopSchema = new mongoose.Schema ({
  name: { type: String, required: true },
  address: String,
  postalCode: String,
  city: String,
  chain: String
})

shopSchema.statics.format = (shop) => {
  return {
    id: shop.id,
    name: shop.name,
    address: shop.address,
    postalCode: shop.postalCode,
    city: shop.city,
    chain: shop.chain
  }
}

const Shop = mongoose.model('Shop', shopSchema)
module.exports = Shop