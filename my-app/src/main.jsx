import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { AuthProvider } from './context/AuthContext.jsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import {ChakraProvider } from '@chakra-ui/react'
import { Provider } from "./components/ui/provider"

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
    <AuthProvider>
      <Provider>
<App />
      </Provider>
      
    
    </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>,
)
