import userService from '../services/users'

const userReducer = (state = [], action) => {
  switch (action.type) {
    case 'INIT_USERS':
      console.log('userreducer', action.data)
      return action.data
    case 'NEW_USER':
      return [...state, action.data]
    case 'UPDATE_USER': {
      const old = state.filter(a => a.id !== action.data.id)
      return [...old, action.data]
    }
    case 'DELETE_USER':
      return state.filter(a => a.id !== action.data)
    default:
      return state
  }
}

export const initializeUsers = () => {
  return async (dispatch) => {
    const users = await userService.getAll()
    dispatch({
      type: 'INIT_USERS',
      data: users
    })
  }
}

export const createUser = (name, username, password) => {
  return async (dispatch) => {
    const content = { name: name, username: username, password: password }
    const newUser = await userService.create(content)
    console.log('Userreducer newUser:', newUser)
    dispatch({
      type: 'NEW_USER',
      data: newUser
    })
  }
}

export const updateUser = (id, name, username, password) => {
  return async (dispatch) => {
    const user = await userService.getOne(id)
    const content = { ...user, name: name, username: username, password: password }
    const updatedUser = await userService.update(id, content)
    dispatch({
      type: 'UPDATE_USER',
      data: updatedUser
    })
  }
}

export const deleteUser = (id) => {
  return async (dispatch) => {
    await userService.remove(id)
    dispatch({
      type: 'DELETE_USER',
      data: id
    })
  }
}

export default userReducer