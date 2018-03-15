import { createStore, applyMiddleware, combineReducers } from 'redux'
import thunk from 'redux-thunk'
import productReducer from './reducers/productReducer'
import { composeWithDevTools } from 'redux-devtools-extension'

const reducer = combineReducers({
  products: productReducer
})

const store = createStore(
  reducer,
  composeWithDevTools(
    applyMiddleware(thunk)
  )
)

console.log('store.js, store:', store)

export default store