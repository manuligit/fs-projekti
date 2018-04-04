import React from 'react'
import Togglable from './Togglable'
import EditProductForm from './EditProductForm'

const Product = ({ product, deleteProduct, history, createNotification, user, addProductToFavorites }) => {
  const productClick = async (event) => {
    event.preventDefault()
    //Confirm that the user wants to delete the item
    const result = window.confirm(`Are you sure you want to delete ${product.name}?`)
    if (result) {
      deleteProduct(product.id)
        .then((response) => {
          console.log(response)
          createNotification(`${product.name} deleted successfully`)
          history.push('/products')
        }, (error) => {
          console.log(error)
        })
    }
  }

  const favorite = async (event) => {
    event.preventDefault()
    console.log('klik')
    if (event.target.className === 'fas fa-heart' ) {
      //Unavorite item:
      console.log('unfavorite')
      event.target.className = 'far fa-heart'
    } else {
      //Favorite item:
      addProductToFavorites(product, user)
      event.target.className = 'fas fa-heart'
    }
  }

  //console.log('product user', user)
  //console.log(product)
  let className = 'fas fa-heart'
  if (user) {
    if (user.favoriteProducts.includes(product.id)) {
      console.log(user.favoriteProducts.includes(product.id))
      className = 'far fa-heart'
    }
  }
  //if user has logged in, show favorite icon
  //if user has product favorited, change the className to favorited:

  return (
    <div>
      <h2>{product.name}</h2>
      { user && <i onClick={favorite} className={className}></i>} <br />
      Category: {product.category} <br />
      Price: {product.price} <br />
      <Togglable buttonLabel="edit">
        <EditProductForm product={product} />
      </Togglable>
      <button onClick={productClick}>delete</button>
    </div>
  )
}

export default Product