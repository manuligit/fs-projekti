import React from 'react';
import { connect } from 'react-redux'
import { initializeProducts } from './reducers/productReducer'
import ProductList from './components/ProductList'
import CreateProductForm from './components/CreateProductForm'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'


class App extends React.Component {
  async componentDidMount() {
    this.props.initializeProducts()
  }

  render() {
    return (
      <div className="App">
        <Router>
          <div>
            <div>
              <Link to="/">home</Link> &nbsp;
              <Link to="/products">products</Link> &nbsp;
              <Link to="/products/new">new product</Link>
            </div>
              <h1>Tuotteet</h1>
              <Route exact path="/products" render={() => <ProductList />} />
              <Route exact path="/products/new" render={() => <CreateProductForm />} />
          </div>
        </Router>
      </div>
    );
  }
}

export default connect (
  null,
  { initializeProducts }
)(App)
