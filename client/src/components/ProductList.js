import React from 'react'
import { connect } from 'react-redux'
import Product from './Product'

class ProductList extends React.Component {
  openDiv = (product) => (event) => {
    event.preventDefault()
    console.log('click', product.id)
    return (
      <Product product={product} />
    )
  }

  render () {
    return (
      <ul>
        {this.props.products.map(product => 
          <li key={product.id} onClick={this.openDiv(product)}>
            {product.name}
            </li>
          )}
      </ul>
    )  
  }
}

const mapStateToProps = (state) => {
  return {
    products: state
  }
}

export default connect(
  mapStateToProps, null
)(ProductList)