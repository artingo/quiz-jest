import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.scss'

/**
 * Dieses Projekt generiert ein Quiz mit MC- oder Textantworten
 * @author Alfred Walther
 * @version 1.1
 */
const root = ReactDOM.createRoot(document.getElementById("root"))
root.render(
  <React.StrictMode>
    <App/>
  </React.StrictMode>
)
