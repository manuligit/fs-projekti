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
    case 'ADDPRODUCT': {
      console.log('hello')
      let person = state.user
      let products = person.addedProducts.slice()
      products = products.concat(action.data)
      person.addedProducts = products
      console.log(person)
      return person
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

export const addToProducts = (item) => {
  return (dispatch) => {
    console.log('userReducer addtoProcute')
    dispatch({
      type: 'ADDPRODUCT',
      data: item
    })
  }
}

export default userReducer