import React from 'react';
import { connect } from 'react-redux'
import { initializeProducts, deleteProduct } from './reducers/productReducer'
import { createNotification } from './reducers/notificationReducer'
import Home from './components/Home'
import Notification from './components/Notification'
import Product from './components/Product'
import ProductList from './components/ProductList'
import CreateProductForm from './components/CreateProductForm'
import { BrowserRouter as Router, Route, Link, Switch, Redirect } from 'react-router-dom'

class App extends React.Component {
  componentWillMount() {
    console.log('mounted')
    this.props.initializeProducts()
    console.log(this.props.products)
  }

  render() {
    const productById = (id) => this.props.products.find(item => item.id === id)

    //console.log(this.props.products)
    //Do not render single product screen unless the props are fully loaded
    return (
      <div className="App">
        <Router>
          <div>
            <div>
              <Link to="/">home</Link> &nbsp;
              <Link to="/products">products</Link> &nbsp;
              <Link to="/products/new">new product</Link>
            </div>
              <Notification message={this.props.notification} />
              <h1>Tuotteet</h1>
              <Switch>
                <Route exact path="/" render={() => <Home />} />
                <Route exact path="/products" render={() => <ProductList />} />
                <Route exact path="/products/new" render={() => <CreateProductForm />} />
                {this.props.products.length > 0 && 
                  <Route exact path="/products/:id" render={({match, history}) =>
                    productById(match.params.id) 
                    ? <Product product={productById(match.params.id)} deleteProduct={this.props.deleteProduct} history={history} /> 
                    : <Redirect to="/products" />
                } /> }
              </Switch>
          </div>
        </Router>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    products: state.products,
    notification: state.notification
  }
}

const mapDispatchToProps = {
  initializeProducts, deleteProduct, createNotification
}

export default connect (
  mapStateToProps, mapDispatchToProps
)(App)