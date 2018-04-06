import React from 'react'
import User from './User'

const Home = ({ user }) => {
  if (user === null) {
    return (
      <div>
        <h2>Welcome to the Ostoskori of the app!</h2>
        <p> Here you can view products and if you register, you can add new products and add existing products
            to your favourites.
        </p>
      </div>
    )
  } else {
    return (
      <User user={user} />
    )
  }
}

export default Home