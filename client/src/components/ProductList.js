import React from 'react'
import { connect } from 'react-redux'

class ProductList extends React.Component {
  openDiv = (product) => (event) => {
    event.preventDefault()
    console.log('click', product.id)
    // link to router
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