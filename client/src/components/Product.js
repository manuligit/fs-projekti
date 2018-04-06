import React from 'react'
import Togglable from './Togglable'
import EditProductForm from './EditProductForm'

const Product = ({ product, deleteProduct, history, createNotification, user, addProductToFavorites, remove }) => {
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
    if (event.target.className === 'fas fa-heart' ) {
      //Unavorite item:
      remove(product, user.id)
      event.target.className = 'far fa-heart'
      createNotification(`Unfavorited ${product.name}`)

    } else {
      //Favorite item:
      addProductToFavorites(product, user.id)
      event.target.className = 'fas fa-heart'
      createNotification(`Favorited ${product.name}`)
    }
  }

  let className = 'far fa-heart'
  if (user) {
    //If user has favorited the product, show full heart icon:
    if (user.favoriteProducts && user.favoriteProducts.find(p => p._id === product.id) !== undefined) {
      className = 'fas fa-heart'
    }
  }

  return (
    <div>
      <h2 className='productname'>{product.name}  { user && <i onClick={favorite} className={className}></i>}</h2> <br />
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