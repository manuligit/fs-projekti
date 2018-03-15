import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

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
          <li key={product.id}>
            <Link to={`/products/${product.id}`}>{product.name}</Link>
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