import React from 'react'
import { connect } from 'react-redux'
import { createProduct } from '../reducers/productReducer'

class CreateProductForm extends React.Component {
  addProduct = (event) => {
    event.preventDefault()
    this.props.createProduct(
      event.target.name.value, 
      event.target.category.value,
      Number(event.target.price.value)
    )
    console.log('created item')
    event.target.name.value = ''
    event.target.category.value = ''
    event.target.price.value = ''
  } 

  render() {
    return (
      <div>
        <h3> Create new product </h3>
        <form onSubmit={this.addProduct}>
        <div> Name <input name="name" /> </div>
        <div> Category <input name="category" /> </div>
        <div> Price <input name="price" /> </div>
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