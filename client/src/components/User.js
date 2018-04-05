import React from 'react'
import { Link } from 'react-router-dom'
import Togglable from './Togglable'
import EditUserForm from './EditUserForm'

const User = ({ user }) => {
  //console.log('User propsuser', user)
  return (
    <div>
      <h2>Welcome {user.name}!</h2>
      <Togglable buttonLabel="Edit user info">
        <EditUserForm user={user} />
      </Togglable>
      {user.favoriteProducts && <div>You <i className='fas fa-heart' /> {user.favoriteProducts.length} products</div>}
      {user.favoriteProducts &&
      user.favoriteProducts.map(product =>
        <li key={product._id+'fav'}>
          <Link to={`/products/${product._id}`}>{product.name}</Link>
        </li>
      )}

      {user.addedProducts &&
        <div>You have added {user.addedProducts.length} products</div>}
      {user.addedProducts && console.log(user.addedProducts)}
      {user.addedProducts &&
      user.addedProducts.map(product =>
        <li key={product._id}>
          <Link to={`/products/${product._id}`}>{product.name}</Link>
        </li>
      )}
    </div>
  )
}

export default User