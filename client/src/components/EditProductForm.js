import React from 'react'
import { connect } from 'react-redux'
import { updateProduct } from '../reducers/productReducer'

class EditProductForm extends React.Component {
  editProduct = (event) => {
    event.preventDefault()
    if (Number(event.target.price.value)) {
      this.props.updateProduct(
        this.props.product.id,
        event.target.name.value,
        event.target.category.value,
        Number(event.target.price.value)
      )
    } else {
      //if the price is not a valid number, don't update item
      event.target.price.value = ''
    }
  }

  render() {
    return (
      <div>
        <h3> Edit product info </h3>
        <form onSubmit={this.editProduct}>
          <div> Name <input name="name" defaultValue={this.props.product.name}/> </div>
          <div> Category <input name="category" defaultValue={this.props.product.category}/> </div>
          <div> Price <input name="price" defaultValue={this.props.product.price} /> </div>
          <button>Edit</button>
        </form> <br />
      </div>
    )
  }
}

export default connect(
  null,
  { updateProduct }
)(EditProductForm)