import React from 'react';
import { connect } from 'react-redux'
import { initializeProducts } from './reducers/productReducer'
import ConnectedProductList from './components/ProductList'

class App extends React.Component {
  async componentDidMount() {
    this.props.initializeProducts()
  }

  render() {
    return (
      <div className="App">
        <h1>Tuotteet</h1>
        <ConnectedProductList />
      </div>
    );
  }
}

export default connect (
  null,
  { initializeProducts }
)(App)
