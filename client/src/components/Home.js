import React from 'react'
import User from './User'

const Home = ({ user }) => {
  if (user === null) {
    return (
      <div>
        <h2>Welcome to the Home page of the app!</h2>
      </div>
    )
  } else {
    return (
      <User user={user} />
    )
  }
}

export default Home