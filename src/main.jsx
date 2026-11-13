import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

// StrictMode is intentionally disabled — it double-invokes effects in dev
// which destroys WebGL contexts (the Waves canvas) and breaks rendering.
createRoot(document.getElementById('root')).render(
  <App />
)
