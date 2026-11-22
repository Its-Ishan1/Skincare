import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import CareSkin from './careskin/CareSkin.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <CareSkin />
  </StrictMode>,
)
