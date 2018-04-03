import React from 'react'
import Togglable from './Togglable'
import EditProductForm from './EditProductForm'

const Product = ({ product, deleteProduct, history, createNotification }) => {
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
  }

  console.log(product)
  return (
    <div>
      <h2>{product.name}</h2>
      <i onClick={favorite} className="far fa-heart"></i><i className="fas fa-heart"></i> <br />
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