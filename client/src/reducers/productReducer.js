import productService from '../services/products'
import Product from '../components/Product';

const productReducer = (state = [], action) => {
  switch (action.type) {
    case 'INIT':
      return action.data
    case 'NEW_PRODUCT':
      return [...state, action.data]
    default:
      return state
  }
}

export const initializeProducts = () => {
  return async (dispatch) => {
    const products = await productService.getAll()
    dispatch({ 
      type: 'INIT',
      data: products
    })
  }
}

export const createProduct = (content) => {
  return async (dispatch) => {
    const newProduct = await productService.create(content)
    console.log('productreducer newProduct:', newProduct)
    dispatch({
      type: 'NEW_PRODUCT',
      data: newProduct
    })
  }
}

export default productReducer