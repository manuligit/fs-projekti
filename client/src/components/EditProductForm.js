import React from 'react'
import { connect } from 'react-redux'
import { updateProduct } from '../reducers/productReducer'
import { createNotification } from '../reducers/notificationReducer'

class EditProductForm extends React.Component {
  editProduct = (event) => {
    event.preventDefault()

    //If price contains a comma, replace it with a dot:
    let price = event.target.price.value
    price = price.replace(',', '.')
    this.props.updateProduct(
      this.props.product.id,
      event.target.name.value,
      event.target.category.value,
      Number(price)
    )
    this.props.createNotification(`Edited ${event.target.name.value} successfully`)
  }

  render() {
    return (
      <div>
        <h3>Edit product info</h3>
        <form onSubmit={this.editProduct}>
          <div> Name <input name="name" type="text" defaultValue={this.props.product.name}/> </div>
          <div> Category <input name="category" type="text" defaultValue={this.props.product.category}/> </div>
          <div> Price <input name="price" step=".01" type="number" defaultValue={this.props.product.price} /> </div>
          <button>Edit</button>
        </form> <br />
      </div>
    )
  }
}

export default connect(
  null,
  { updateProduct, createNotification }
)(EditProductForm)