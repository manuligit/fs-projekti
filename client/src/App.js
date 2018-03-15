import React from 'react';
import Product from './components/Product'
import productService from './services/products'
import { initializeProducts } from './reducers/productReducer'

class App extends React.Component {
  async componentDidMount() {
    const products = await productService.getAll()
    console.log('mounted, got products', products)
    this.setState({ products: products })
    //if the service returns no products, use dummy data to test:
    if (this.state.products.length === 0) {
      const products = [
        {
          id: 1,
          name: 'Leipajuusto',
          category: 'juustot',
          price: 5.99
        },
        {
          id: 2,
          name: 'Homejuusto',
          category: 'juustot',
          price: 6.99
        }
      ]

      this.setState({ products: products })
    } 
  }

  render() {
    return (
      <div className="App">
        <h1>Tuotteet</h1>
        <ul>
          {this.state.products.map(product => <Product key={product.id} product={product} />)}
        </ul>
      </div>
    );
  }
}

export default App;
