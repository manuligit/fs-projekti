const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
  username: String,
  name: String,
  passwordHash: String,
  favoriteProducts: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Product' }],
  favoriteShops: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Shop' }],
})

userSchema.statics.format = (user) => {
  return {
    id: user.id,
    username: user.username,
    name: user.name,
    favoriteProducts: user.favoriteProducts,
    favoriteShops: user.favoriteShops
  }
}

const User = mongoose.model('User', userSchema)
module.exports = User