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
    default:
      return state
  }
}

export const login = (credentials) => {
  return async (dispatch) => {
    const user = await loginService.login(credentials)
    productService.setToken(user.token)
    dispatch ({
      type: 'LOGIN',
      data: user
    })
  }
}

export default userReducer