import React from 'react'
import { connect } from 'react-redux'
import { createProduct } from '../reducers/productReducer'

class CreateProductForm extends React.Component {
  addProduct = (event) => {
    event.preventDefault()
    console.log('click')
  } 

  render() {
    return (
      <div>
        <form onSubmit={this.addProduct}>
        <input name="note" />
        <button>lisää</button>    
        </form>
      </div>
    )
  }
}

export default connect(
  null,
  { createProduct }
)(CreateProductForm)