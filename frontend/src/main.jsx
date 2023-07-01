import React from 'react'
import ReactDOM from 'react-dom/client'
import { AuthContextProvider } from './context/authContext.jsx'
import App from './App.jsx'
import './App.scss'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>

    <AuthContextProvider>
      <App />
    </AuthContextProvider>

  </React.StrictMode>,
)
