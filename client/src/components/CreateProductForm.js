import React from 'react'
import { connect } from 'react-redux'
import { createProduct } from '../reducers/productReducer'
import { createNotification } from '../reducers/notificationReducer'

class CreateProductForm extends React.Component {
  addProduct = (event) => {
    event.preventDefault()

    //If price contains commas, replace them with dot:
    let price = event.target.price.value
    price = price.replace(',', '.')
    if (Number(price)) {
      this.props.createProduct(
        event.target.name.value,
        event.target.category.value,
        Number(price)
      )
      this.props.createNotification(`Created item ${event.target.name.value} successfully`)
      event.target.name.value = ''
      event.target.category.value = ''
      event.target.price.value = ''
    } else {
      //if the price is not a valid number, don't post item at all
      event.target.price.value = ''
    }
  }

  render() {
    return (
      <div>
        <h3> Create new product </h3>
        <form onSubmit={this.addProduct}>
          <div> Name <input type="text" name="name" required/> </div>
          <div> Category <input type="text" name="category" required/> </div>
          <div> Price <input type="number" name="price" required/> </div>
          <button>Create</button>
        </form>
      </div>
    )
  }
}

export default connect(
  null,
  { createProduct, createNotification }
)(CreateProductForm)