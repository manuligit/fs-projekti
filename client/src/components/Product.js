import React from 'react'

const Product = ({ product }) => {
  return (
    <div>
      <h2>{product.name}</h2>
      Category: {product.category} <br />
      Price: {product.price}
    </div>
  )
}

export default Product