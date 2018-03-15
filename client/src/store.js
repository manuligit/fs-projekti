import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import productReducer from './reducers/productReducer'
import { composeWithDevTools } from 'redux-devtools-extension'

const store = createStore(
  productReducer,
  composeWithDevTools(
    applyMiddleware(thunk)
  )
)

console.log('store.js, store:', store)

export default store