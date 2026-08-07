import { Route, Routes } from 'react-router-dom'
import { MotionConfig } from 'framer-motion'
import HomePage from './pages/HomePage'
import EscapesPage from './pages/EscapesPage'
import EscapeDetailPage from './pages/EscapeDetailPage'
import Footer from './components/sections/Footer'

function App() {
  return (
    <MotionConfig reducedMotion="user">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/escapes" element={<EscapesPage />} />
        <Route path="/escapes/:slug" element={<EscapeDetailPage />} />
      </Routes>
      <Footer />
    </MotionConfig>
  )
}

export default App
