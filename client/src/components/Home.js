import React from 'react'
import { Link } from 'react-router-dom'

const Home = ({ user }) => {
  if (user === null) {
    return (
      <div>
        <h2>Welcome to the Home page of the app!</h2>
      </div>
    )
  } else {
    return (
      <div>
        <h2>Welcome {user.name}!</h2>
        {user.addedProducts &&
          <div>You have added {user.addedProducts.length} products</div>}
        {user.addedProducts &&
        user.addedProducts.map(product =>
          <li key={product._id}>
            <Link to={`/products/${product._id}`}>{product.name}</Link>
          </li>
        )}
      </div>
    )
  }
}

export default Home