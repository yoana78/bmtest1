import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { HashRouter } from 'react-router-dom'
import { LanguageProvider } from './i18n/LanguageContext'
import { ThemeProvider } from './context/ThemeContext'
import { DataProvider } from './context/DataContext'
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <HashRouter>
      <ThemeProvider>
        <LanguageProvider>
          <DataProvider>
            <App />
          </DataProvider>
        </LanguageProvider>
      </ThemeProvider>
    </HashRouter>
  </StrictMode>,
)
