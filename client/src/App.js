import React from 'react';
import { connect } from 'react-redux'
import { initializeProducts } from './reducers/productReducer'
import ProductList from './components/ProductList'
import CreateProductForm from './components/CreateProductForm'

class App extends React.Component {
  async componentDidMount() {
    this.props.initializeProducts()
  }

  render() {
    return (
      <div className="App">
        <h1>Tuotteet</h1>
        <ProductList />
        <CreateProductForm />
      </div>
    );
  }
}

export default connect (
  null,
  { initializeProducts }
)(App)
