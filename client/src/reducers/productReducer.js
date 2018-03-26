import productService from '../services/products'

const productReducer = (state = [], action) => {
  switch (action.type) {
    case 'INIT':
      return action.data
    case 'NEW_PRODUCT':
      return [...state, action.data]
    case 'UPDATE_PRODUCT_LIST': {
      const old = state.filter(a => a.id !== action.data.id)
      return [...old, action.data]
    }
    case 'DELETE_PRODUCT':
      return state.filter(a => a.id !== action.data)
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

    //also add product to the user in state:
    dispatch({
      type: 'ADD_PRODUCT_TO_USER',
      data: newProduct
    })
  }
}

export const updateProduct = (id, name, category, price) => {
  return async (dispatch) => {
    const content = { name: name, category: category, price: price }
    const updatedProduct = await productService.update(id, content)
    //console.log('productreducer updateProduct', updatedProduct)
    dispatch({
      type: 'UPDATE_PRODUCT_LIST',
      data: updatedProduct
    })

    dispatch({
      type: 'UPDATE_USER_PRODUCT_LIST',
      data: updatedProduct
    })
  }
}

export const deleteProduct = (id) => {
  return async (dispatch) => {
    await productService.remove(id)
    dispatch({
      type: 'DELETE_PRODUCT',
      data: id
    })

    dispatch({
      type: 'DELETE_PRODUCT_FROM_USER',
      data: id
    })
  }
}

export default productReducer