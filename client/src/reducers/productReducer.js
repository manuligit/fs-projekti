const productReducer = (state = [], action) => {
  switch (action.type) {
    case 'NEW_PRODUCT':
      return [...state, action.data]
    default:
      return state
  }
}

export default productReducer