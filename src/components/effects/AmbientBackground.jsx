import { useEffect, useState } from 'react'
import { useTheme } from '../../context/ThemeContext'
import Fireflies from './Fireflies'
import AmbientLight from './AmbientLight'

const MOBILE_QUERY = '(max-width: 640px)'

function useIsMobile() {
  const [isMobile, setIsMobile] = useState(
    () => typeof window !== 'undefined' && window.matchMedia(MOBILE_QUERY).matches
  )

  useEffect(() => {
    const mql = window.matchMedia(MOBILE_QUERY)
    const onChange = (event) => setIsMobile(event.matches)
    mql.addEventListener('change', onChange)
    return () => mql.removeEventListener('change', onChange)
  }, [])

  return isMobile
}

// Fixed, full-viewport, click-through ambient layer shared by both themes —
// renders fireflies in dark mode or light-rays+dust in light mode, never
// both. Mounted once at the app root (outside <Routes>) so it persists
// untouched across route changes instead of regenerating its randomized
// particles on every navigation.
function AmbientBackground() {
  const { theme } = useTheme()
  const isMobile = useIsMobile()

  return (
    <div className="pointer-events-none fixed inset-0 z-[2] overflow-hidden">
      {theme === 'dark' ? <Fireflies isMobile={isMobile} /> : <AmbientLight isMobile={isMobile} />}
    </div>
  )
}

export default AmbientBackground
