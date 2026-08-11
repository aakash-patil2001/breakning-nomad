import { useTheme } from '../../context/ThemeContext'

function GearIcon(props) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <circle cx="12" cy="12" r="3" />
      <path d="M12 3.5v2M12 18.5v2M20.5 12h-2M5.5 12h-2M17.66 6.34l-1.42 1.42M7.76 16.24l-1.42 1.42M17.66 17.66l-1.42-1.42M7.76 7.76 6.34 6.34" />
    </svg>
  )
}

// Pastel background + darker text of the same hue per section, so each
// badge reads as belonging to its section while keeping the shared pill
// shape/dashed-border/gear-icon form factor. `neutral` is the fallback.
const TONE_STYLES = {
  neutral: { background: 'rgba(42,36,32,0.05)', color: 'rgba(42,36,32,0.5)', borderColor: 'rgba(42,36,32,0.25)' },
  hero: { background: '#f7d9bd', color: '#8a4b23', borderColor: '#dba468' },
  story: { background: '#dcebf0', color: '#3f7189', borderColor: '#a9cdd8' },
  categories: { background: '#faf0c8', color: '#8a6d1f', borderColor: '#e3d38f' },
  escapes: { background: '#e3e9d6', color: '#5b6f45', borderColor: '#bcc7a0' },
  plan: { background: '#f6dcd3', color: '#b15d4c', borderColor: '#e3b3a4' },
  howweplan: { background: '#ece2f5', color: '#6b4f8a', borderColor: '#cbb3de' },
  waitlist: { background: '#f2e2a9', color: '#8a6a1f', borderColor: '#dfc978' },
  closing: { background: '#f6c9b8', color: '#a1472b', borderColor: '#e3a488' },
  faq: { background: '#f5cba0', color: '#8a5a2a', borderColor: '#e0b47c' },
  friction: { background: '#ece0e6', color: '#6b3f56', borderColor: '#c9a8ba' },
  vision: { background: '#d9f0ec', color: '#2d6b5f', borderColor: '#a8d9cc' },
  whyus: { background: '#fbe3d6', color: '#a6461f', borderColor: '#e8b79c' },
}

// Same tones, re-lit for dark backgrounds: bg darkened toward near-black,
// text lightened toward the tone's hue, border pitched in between — keeps
// each badge's color identity instead of flattening everything to gray.
const DARK_TONE_STYLES = {
  neutral: { background: 'rgba(255,255,255,0.08)', color: 'rgba(255,255,255,0.6)', borderColor: 'rgba(255,255,255,0.2)' },
  hero: { background: '#3d2c1d', color: '#f0c090', borderColor: '#6b4a2c' },
  story: { background: '#1e2b30', color: '#8fc4d8', borderColor: '#3a5560' },
  categories: { background: '#3a3318', color: '#e8cf6f', borderColor: '#5c4f28' },
  escapes: { background: '#262e1c', color: '#b8cc95', borderColor: '#47542f' },
  plan: { background: '#3a2620', color: '#e8a08c', borderColor: '#5c3a30' },
  howweplan: { background: '#2c2438', color: '#c3a8e0', borderColor: '#4a3a5c' },
  waitlist: { background: '#3a3018', color: '#e8c96f', borderColor: '#5c4d28' },
  closing: { background: '#3d251c', color: '#e89478', borderColor: '#5c3828' },
  faq: { background: '#3a2a18', color: '#e8b578', borderColor: '#5c452a' },
  friction: { background: '#2e2229', color: '#cf9db5', borderColor: '#4a3540' },
  vision: { background: '#1a2e2a', color: '#7fcdb8', borderColor: '#33574a' },
  whyus: { background: '#3d2a1e', color: '#e89968', borderColor: '#5c3d2a' },
}

// Small pill "eyebrow" that sits above a section's main heading — dashed
// border and flanking gear icons, echoing the postmark/postcard dashed-
// border motif used elsewhere on the site. `tone` picks the pastel
// background/text pairing for the section it's used in.
function Eyebrow({ children, tone = 'neutral' }) {
  const { theme } = useTheme()
  const styles = theme === 'dark' ? DARK_TONE_STYLES : TONE_STYLES
  const style = styles[tone] ?? styles.neutral

  return (
    <div className="mb-5 flex justify-center">
      <span
        className="inline-flex items-center gap-2 rounded-full border border-dashed px-4 py-1.5 font-sans text-xs font-medium tracking-wide shadow-sm"
        style={{
          backgroundColor: style.background,
          color: style.color,
          borderColor: style.borderColor,
        }}
      >
        <GearIcon className="h-3.5 w-3.5 shrink-0" />
        <span>{children}</span>
        <GearIcon className="h-3.5 w-3.5 shrink-0" />
      </span>
    </div>
  )
}

export default Eyebrow
