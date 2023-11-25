import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'

// Utiliza ReactDOM.createRoot para crear una raíz React y renderizar la aplicación
// en el elemento con el ID 'root' del documento HTML
ReactDOM.createRoot(document.getElementById('root')).render(
  // Utiliza React.StrictMode para habilitar el modo estricto de React
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)

