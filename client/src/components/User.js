import React from 'react'
import { Link } from 'react-router-dom'
import Togglable from './Togglable'
import EditUserForm from './EditUserForm'
import { FormattedMessage } from 'react-intl'

const User = ({ user }) => {
  return (
    <div>
      <h2>Welcome {user.name}!</h2>
      <Togglable buttonLabel="Edit user info">
        <EditUserForm user={user} />
      </Togglable>
      <FormattedMessage
        id="user.favoriteproducts"
        defaultMessage={`You {favorites, plural,
                            =0 { have favorited zero products.}
                            one {{heart} one product.}
                            other {{heart} {favorites} products. }}`}
        values={{ heart: <i className='fas fa-heart' />,
          favorites: user.favoriteProducts.length }}
      />
      {user.favoriteProducts &&
      user.favoriteProducts.map(product =>
        <li key={product._id+'fav'}>
          <Link to={`/products/${product._id}`}>{product.name}</Link>
        </li>
      )}
      <br/>
      <FormattedMessage
        id="user.addedproducts"
        defaultMessage={`You have added {addedPr, plural,
                            =0 {zero products.}
                            one {{addedPr} product.}
                            other {{addedPr} products. }}`}
        values={{ addedPr: user.addedProducts.length }}
      />
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