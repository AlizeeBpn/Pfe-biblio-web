import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import WebHomePage from './pages/WebHomePage.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <WebHomePage />
  </StrictMode>,
)