import React from 'react';
import { connect } from 'react-redux'
import { initializeProducts } from './reducers/productReducer'
import Home from './components/Home'
import Product from './components/Product'
import ProductList from './components/ProductList'
import CreateProductForm from './components/CreateProductForm'
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom'

class App extends React.Component {
  async componentDidMount() {
    this.props.initializeProducts()
  }

  render() {
    const productById = (id) => this.props.products.find(item => item.id === id)
    //<Route exact path="/products/:id" render={({match}) =>
    //<Product product={productById(match.params.id)} />} /> 
    
    //console.log(this.props.products)

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
              <Switch>
                <Route exact path="/" render={() => <Home />} />
                <Route exact path="/products" render={() => <ProductList />} />
                <Route exact path="/products/new" render={() => <CreateProductForm />} />
                <Route exact path="/products/:id" render={({match}) =>
                  <Product product={productById(match.params.id)} />} /> 
              </Switch>
          </div>
        </Router>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    products: state.products
  }
}

const mapDispatchToProps = {
  initializeProducts
}

export default connect (
  mapStateToProps, mapDispatchToProps
)(App)
