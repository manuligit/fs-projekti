import React from 'react'
import { connect } from 'react-redux'
import Product from './Product'

class ProductList extends React.Component {
  render () {
    return (
      <ul>
        {this.props.products.map(product => <Product key={product.id} product={product} />)}
      </ul>
    )  
  }
}

const mapStateToProps = (state) => {
  return {
    products: state
  }
}

const ConnectedProductList = connect(
  mapStateToProps, null
)(ProductList)

export default ConnectedProductList