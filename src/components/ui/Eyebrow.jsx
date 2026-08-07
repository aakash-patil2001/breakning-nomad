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
}

// Small pill "eyebrow" that sits above a section's main heading — dashed
// border and flanking gear icons, echoing the postmark/postcard dashed-
// border motif used elsewhere on the site. `tone` picks the pastel
// background/text pairing for the section it's used in.
function Eyebrow({ children, tone = 'neutral' }) {
  const style = TONE_STYLES[tone] ?? TONE_STYLES.neutral

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
