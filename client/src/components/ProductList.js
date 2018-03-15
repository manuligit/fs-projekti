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

export default connect(
  mapStateToProps, null
)(ProductList)