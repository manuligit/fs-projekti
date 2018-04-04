import loginService from '../services/login'
import productService from '../services/products'
import userService from '../services/users'

//Reducer for all the operations concerning the user currently logged in the system
//Used for logging in, out and updating the state of the current user.

const loginReducer = (state = null, action) => {
  switch (action.type) {
    case 'LOGIN':
      console.log('logging in', action.data)
      return action.data
    case 'LOGOUT':
      state = null
      return state
    case 'AUTHENTICATE':
      return action.data
    case 'UPDATE_USER':
      return action.data
    case 'UPDATE_USER_PRODUCT_LIST': {
      let copyProducts = state.addedProducts.slice()
      let item = { ...action.data }
      //rename id field to _id:
      item._id = item.id
      delete item.id
      //add to user's list in state
      let products = copyProducts.map(a => a._id === item._id ? item : a)
      //update JSONWebToken
      window.localStorage.setItem('loggedUser', JSON.stringify({ ...state, addedProducts: products }))
      return { ...state, addedProducts: products }
    }
    case 'ADD_PRODUCT_TO_USER': {
      //create the new product list for state
      let products = state.addedProducts.slice()
      let item = { ...action.data }
      //rename id field to _id:
      item._id = item.id
      delete item.id
      products = products.concat(item)
      //update JSONWebToken
      window.localStorage.setItem('loggedUser', JSON.stringify({ ...state, addedProducts: products }))
      return { ...state, addedProducts: products }
    }
    case 'DELETE_PRODUCT_FROM_USER': {
      const products = state.addedProducts.filter(a => a._id !== action.data)
      //update JSONWebToken
      window.localStorage.setItem('loggedUser', JSON.stringify({ ...state, addedProducts: products }))
      return { ...state, addedProducts: products }
    }
    case 'ADD_PRODUCT_TO_FAVORITES': {
      //create the new product list for state
      let products = state.favoriteProducts.slice()
      let item = { ...action.data }
      //rename id field to _id:
      item._id = item.id
      delete item.id
      products = products.concat(item)
      //update JSONWebToken
      window.localStorage.setItem('loggedUser', JSON.stringify({ ...state, favoriteProducts: products }))
      return { ...state, addedProducts: products }
    }
    default:
      return state
  }
}

export const login = (credentials) => {
  return async (dispatch) => {
    const user = await loginService.login(credentials)
    window.localStorage.setItem('loggedUser', JSON.stringify(user))
    productService.setToken(user.token)
    userService.setToken(user.token)
    dispatch ({
      type: 'LOGIN',
      data: user
    })
  }
}

export const authenticateUser = (user) => {
  return (dispatch) => {
    productService.setToken(user.token)
    userService.setToken(user.token)
    dispatch({
      type: 'AUTHENTICATE',
      data: user
    })
  }
}

export const logout = () => {
  return (dispatch) => {
    productService.setToken(null)
    userService.setToken(null)
    window.localStorage.clear()
    dispatch({
      type: 'LOGOUT'
    })
  }
}

export const addProductToFavorites = (product, user) => {
  return async (dispatch) => {
    //Save the favorited product for the user:
    let fav = [ ...user.favoriteProducts, product ]
    user.favoriteProducts = fav
    console.log('loginreducer user', user)
    userService.update(user.id, user)
    //update user in login and userreducer
    dispatch({
      type: 'ADD_PRODUCT_TO_FAVORITES',
      data: product
    })
  }
}

export default loginReducer