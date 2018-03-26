import loginService from '../services/login'
import productService from '../services/products'

const userReducer = (state = null, action) => {
  switch (action.type) {
    case 'LOGIN':
      console.log('logging in', action.data)
      return action.data
    case 'LOGOUT':
      state = null
      return state
    case 'AUTHENTICATE':
      return action.data
    case 'ADD_PRODUCT_TO_USER': {
      //create the new product list for state
      let products = state.addedProducts.slice()
      products = products.concat(action.data)
      //update JSONWebToken
      window.localStorage.setItem('loggedUser', JSON.stringify({ ...state, addedProducts: products }))
      return { ...state, addedProducts: products }
    }
    case 'UPDATE_USER_PRODUCT_LIST': {
      console.log('*************************')
      console.log(state.addedProducts)
      let copyProducts = state.addedProducts.slice()
      let products = copyProducts.map(a => a.id !== action.data.id ? a : action.data)
      //products = products.concat(action.data)
      console.log('products after', products)
      console.log('*************************')
      //update JSONWebToken
      window.localStorage.setItem('loggedUser', JSON.stringify({ ...state, addedProducts: products }))
      return { ...state, addedProducts: products }
    }
    case 'DELETE_PRODUCT_FROM_USER': {
      console.log(state.addedProducts.length)
      console.log(action.data)
      const products = state.addedProducts.filter(a => a.id !== action.data)
      console.log(products.length)
      //update JSONWebToken
      window.localStorage.setItem('loggedUser', JSON.stringify({ ...state, addedProducts: products }))
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
    dispatch ({
      type: 'LOGIN',
      data: user
    })
  }
}

export const authenticateUser = (user) => {
  return (dispatch) => {
    productService.setToken(user.token)
    dispatch({
      type: 'AUTHENTICATE',
      data: user
    })
  }
}

export const logout = () => {
  return (dispatch) => {
    productService.setToken(null)
    window.localStorage.clear()
    dispatch({
      type: 'LOGOUT'
    })
  }
}

export default userReducer