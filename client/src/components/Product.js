import React from 'react'

const Product = ({ product }) => {
  console.log(product)
  return (
    <div>
      <h2>{product.name}</h2>
      Category: {product.category} <br />
      Price: {product.price} <br />
      <button>edit</button>
      <button>delete</button>
    </div>
  )
}

export default Product