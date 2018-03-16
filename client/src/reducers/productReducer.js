import productService from '../services/products'

const productReducer = (state = [], action) => {
  switch (action.type) {
    case 'INIT':
      return action.data
    case 'NEW_PRODUCT':
      return [...state, action.data]
    case 'UPDATE_LIST': {
      //const old = state.filter(a => a.id !== action.id)
      const item = state.find(a => a.id === action.id)
      //const newlist = item.filter(a => a.id === action.id ? a = action.data)
      return [...state, item: action.data ]
    }
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

export const createProduct = (name, category, price) => {
  return async (dispatch) => {
    const content = { name: name, category: category, price: price }
    const newProduct = await productService.create(content)
    console.log('productreducer newProduct:', newProduct)
    dispatch({
      type: 'NEW_PRODUCT',
      data: newProduct
    })
  }
}

export const updateProduct = (id, name, category, price) => {
  return async (dispatch) => {
    const content = { name: name, category: category, price: price }
    const updatedProduct = await productService.update(id, content)
    console.log('productreducer updateProduct', updatedProduct)

    dispatch({
      type: 'UPDATE_LIST',
      data: updatedProduct
    })
  }
}

export default productReducer