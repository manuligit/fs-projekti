import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import { Provider } from 'react-redux'
import store from './store'
import 'normalize.css'
import { IntlProvider } from 'react-intl'

ReactDOM.render(
  <IntlProvider locale='en'>
    <Provider store={store}>
      <App />
    </Provider>
  </IntlProvider>,
  document.getElementById('root'))