/* The starting point for the /admin page (viewing links and the quote). */
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import AdminPage from './components/AdminPage.tsx'
import './styles.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AdminPage />
  </StrictMode>,
)
