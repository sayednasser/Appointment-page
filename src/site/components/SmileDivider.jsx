// Signature element: a smile-shaped arc used as a section divider.
// It echoes the brand's core promise ("a smile") as a structural device
// rather than a decorative flourish, and reappears at each major
// section boundary to give the page a distinct rhythm.
export default function SmileDivider({ flip = false, color = '#F8FAFC' }) {
  return (
    <div className={`smile-divider ${flip ? 'rotate-180' : ''}`} aria-hidden="true">
      <svg viewBox="0 0 1440 60" preserveAspectRatio="none">
        <path
          d="M0,0 C240,60 1200,60 1440,0 L1440,60 L0,60 Z"
          fill={color}
        />
      </svg>
    </div>
  )
}
