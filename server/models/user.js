const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  name: { type: String, required: true },
  passwordHash: String,
  favoriteProducts: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Product' }],
  favoriteShops: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Shop' }],
  addedProducts: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Product' }]
})

userSchema.statics.format = (user) => {
  return {
    id: user.id,
    username: user.username,
    name: user.name,
    favoriteProducts: user.favoriteProducts,
    favoriteShops: user.favoriteShops,
    addedProducts: user.addedProducts
  }
}

const User = mongoose.model('User', userSchema)
module.exports = User