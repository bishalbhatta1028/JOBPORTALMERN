import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { store } from './redux/store.js'
import { Provider } from 'react-redux'
import Footer from './components/Footer.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(

  <Provider store={store} >
    <App />

  </Provider>

)
