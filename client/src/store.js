import { createStore, applyMiddleware, combineReducers } from 'redux'
import thunk from 'redux-thunk'
import productReducer from './reducers/productReducer'
import notificationReducer from './reducers/notificationReducer'
import { composeWithDevTools } from 'redux-devtools-extension'
import loginReducer from './reducers/loginReducer'
import userReducer from './reducers/userReducer'

const reducer = combineReducers({
  products: productReducer,
  notification: notificationReducer,
  user: loginReducer,
  users: userReducer
})

const store = createStore(
  reducer,
  composeWithDevTools(
    applyMiddleware(thunk)
  )
)

console.log('store.js, store:', store)
export default store