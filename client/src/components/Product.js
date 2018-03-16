import React from 'react'
import Togglable from './Togglable'
import EditProductForm from './EditProductForm'

const Product = ({ product, deleteProduct, history }) => {
  const onClick = (event) => {
    event.preventDefault()
    deleteProduct(product.id)
    history.push('/products')
  }

  console.log(product)
  return (
    <div>
      <h2>{product.name}</h2>
      Category: {product.category} <br />
      Price: {product.price} <br />
      <Togglable buttonLabel="edit">
        <EditProductForm product={product} />
      </Togglable>
      <button onClick={onClick}>delete</button>
    </div>
  )
}

export default Product