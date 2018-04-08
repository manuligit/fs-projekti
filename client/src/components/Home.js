import React from 'react'
import User from './User'
import { getTranslation as t } from '../translate'

const Home = ({ user }) => {
  const changeLanguage = (event) => {
    event.preventDefault()
    console.log(document.documentElement.lang )
    if ( document.documentElement.lang === 'en') {
      document.documentElement.lang = 'fi'
    } else {
      document.documentElement.lang = 'en'
    }
  }

  if (user === null) {
    return (
      <div>
        <h2>{t('app.welcome')}</h2>
        <p> Here you can view products and if you register, you can add new products and add existing products
            to your favourites.
        </p>
        <button onClick={changeLanguage}>klik</button>
      </div>
    )
  } else {
    return (
      <User user={user} />
    )
  }
}

export default Home