import { useEffect } from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'
import { MotionConfig } from 'framer-motion'
import HomePage from './pages/HomePage'
import EscapesPage from './pages/EscapesPage'
import EscapeDetailPage from './pages/EscapeDetailPage'
import Footer from './components/sections/Footer'

// react-router doesn't reset scroll position on navigation the way a normal
// page load does — without this, clicking a Link while scrolled down a page
// lands on the new page at that same scroll offset instead of the top.
function ScrollToTop() {
  const { pathname } = useLocation()

  useEffect(() => {
    // `html` has `scroll-behavior: smooth` globally, which hijacks a plain
    // `scrollTo(0, 0)` into an animated scroll — explicit 'instant' bypasses
    // that so route changes land at the top immediately, like a real page load.
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' })
  }, [pathname])

  return null
}

function App() {
  return (
    <MotionConfig reducedMotion="user">
      <ScrollToTop />
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
