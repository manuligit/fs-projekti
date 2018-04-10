import React from 'react'
import { connect } from 'react-redux'
import { initializeProducts, deleteProduct } from './reducers/productReducer'
import { createNotification } from './reducers/notificationReducer'
import { login, authenticateUser, logout, addProductToFavorites, removeProductFromFavorites } from './reducers/loginReducer'
import { initializeUsers } from './reducers/userReducer'
import Home from './components/Home'
import LoginForm from './components/LoginForm'
import Notification from './components/Notification'
import Product from './components/Product'
import ProductList from './components/ProductList'
import CreateProductForm from './components/CreateProductForm'
import { BrowserRouter as Router, Route, Link, Switch, Redirect } from 'react-router-dom'
import RegisterForm from './components/RegisterForm'
import './App.css'

class App extends React.Component {
  componentWillMount() {
    console.log('mounted')
    this.props.initializeProducts()
    this.props.initializeUsers()

    const loggedUserJSON = window.localStorage.getItem('loggedUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      this.props.authenticateUser(user)
    }
  }

  render() {
    const productById = (id) => this.props.products.find(item => item.id === id)
    //Do not render single product screen unless the props are fully loaded
    return (
      <div className="App">
        <Router>
          <div>
            <div className="header">
              <Link to="/"><i className="fas fa-home fa-lg"></i>Home</Link>
              <Link to="/products"> <i className="fas fa-shopping-cart fa-lg"></i> Products</Link>
              {this.props.user && <Link to="/products/new"> <i className="fas fa-cart-plus fa-lg"></i> New product</Link>}
              {this.props.user && <div> <i className="fas fa-user fa-lg"></i> {this.props.user.username} </div> }
              {this.props.user && <button onClick={this.props.logout}>log out</button>}
              {this.props.user === null && <Link to="/login"><i className="fas fa-user fa-lg"></i> Login</Link>}
              {this.props.user === null && <Link to="/register"><i className="far fa-user fa-lg"></i>Register</Link>}
            </div>
            <div className='pagetitle'>Ostoskori</div>
            <Notification message={this.props.notification} />
            <Switch>
              <Route exact path="/" render={() => <Home user={this.props.user}/>} />
              <Route exact path="/products" render={() => <ProductList />} />
              <Route exact path="/products/new" render={() => <CreateProductForm />} />
              {this.props.products.length > 0 &&
                <Route exact path="/products/:id" render={({ match, history }) =>
                  productById(match.params.id)
                    ? <Product product={productById(match.params.id)} deleteProduct={this.props.deleteProduct}
                      history={history} createNotification={this.props.createNotification}
                      user={this.props.user} addProductToFavorites={this.props.addProductToFavorites}
                      remove={this.props.removeProductFromFavorites} />
                    : <Redirect to="/products" />
                } /> }
              {this.props.user === null &&
                <Route exact path="/login" render={() => <LoginForm login={this.props.login} />} /> }
              {this.props.user === null &&
                <Route exact path="/register" render={() => <RegisterForm/>} /> }
            </Switch>
          </div>
        </Router>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    products: state.products,
    notification: state.notification,
    user: state.user,
    users: state.users
  }
}

const mapDispatchToProps = {
  initializeProducts, deleteProduct, createNotification, login, authenticateUser, logout,
  initializeUsers, addProductToFavorites, removeProductFromFavorites
}

export default connect (
  mapStateToProps, mapDispatchToProps
)(App)