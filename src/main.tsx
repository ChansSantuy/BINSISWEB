import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import 'aos/dist/aos.css'
import '@fortawesome/fontawesome-free/css/all.min.css'
import AOS from 'aos'
import { injectSpeedInsights } from '@vercel/speed-insights'

// Initialize AOS
AOS.init({
  duration: 800,
  easing: 'ease-in-out',
  once: true,
  mirror: false,
})

// Initialize Vercel Speed Insights
injectSpeedInsights()

// main.tsx

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
