import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'

// Aqui eu busco o elemento raiz do HTML e renderizo minha aplicação dentro dele
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>
)
