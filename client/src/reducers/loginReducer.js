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
      //Create the new product list for state
      //console.log('state.favoriteproducts::::', state.favoriteProducts)
      //let products = state.favoriteProducts.slice()
      //products = products.concat(action.data)
      //console.log('eproducts::::', products)
      //Update JSONWebToken:
      //window.localStorage.setItem('loggedUser', JSON.stringify({ ...state, favoriteProducts: products }))
      return { ...state }
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
    //rename id field to _id:
    let item = { ...product }
    item._id = item.id
    delete item.id
    //Remake favoriteproducts for saving:
    let favorites = user.favoriteProducts.map(p => p._id)
    favorites.push(item._id)
    user.favoriteProducts = favorites

    let user2 = await userService.update(user.id, user)
    //Repopulate user's favorite product list:
    user.favoriteProducts = user2.favoriteProducts
    dispatch({
      type: 'ADD_PRODUCT_TO_FAVORITES',
      data: product
    })
  }
}

export default loginReducer