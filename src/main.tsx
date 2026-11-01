import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import { I18n } from './i18n'
import './index.css'
createRoot(document.getElementById('root')!).render(<StrictMode><I18n><BrowserRouter><App /></BrowserRouter></I18n></StrictMode>)
