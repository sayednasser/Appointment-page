import { useRef, useState, useCallback } from 'react'
import { MoveHorizontal } from 'lucide-react'

export default function BeforeAfterSlider({ before, after, alt }) {
  const containerRef = useRef(null)
  const [position, setPosition] = useState(50)
  const dragging = useRef(false)

  const updatePosition = useCallback((clientX) => {
    const el = containerRef.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const pct = ((clientX - rect.left) / rect.width) * 100
    setPosition(Math.min(100, Math.max(0, pct)))
  }, [])

  const onMove = (e) => {
    if (!dragging.current) return
    const clientX = e.touches ? e.touches[0].clientX : e.clientX
    updatePosition(clientX)
  }

  const startDrag = () => {
    dragging.current = true
  }
  const stopDrag = () => {
    dragging.current = false
  }

  return (
    <div
      ref={containerRef}
      className="relative aspect-[4/3] w-full select-none overflow-hidden rounded-2xl"
      onMouseMove={onMove}
      onMouseUp={stopDrag}
      onMouseLeave={stopDrag}
      onTouchMove={onMove}
      onTouchEnd={stopDrag}
    >
      <img
        src={after}
        alt={`${alt} - بعد`}
        className="absolute inset-0 h-full w-full object-cover"
        draggable={false}
      />
      <img
        src={before}
        alt={`${alt} - قبل`}
        className="absolute inset-0 h-full w-full object-cover"
        style={{ clipPath: `inset(0 ${100 - position}% 0 0)` }}
        draggable={false}
      />

      <span className="absolute left-3 top-3 rounded-full bg-ink/70 px-3 py-1 text-xs font-bold text-white">
        قبل
      </span>
      <span className="absolute right-3 top-3 rounded-full bg-primary-500/90 px-3 py-1 text-xs font-bold text-white">
        بعد
      </span>

      <div
        className="absolute inset-y-0 z-10 w-1 -translate-x-1/2 bg-white shadow-floaty"
        style={{ left: `${position}%` }}
      >
        <button
          onMouseDown={startDrag}
          onTouchStart={startDrag}
          aria-label="اسحب للمقارنة"
          className="absolute top-1/2 left-1/2 flex h-10 w-10 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white text-primary-600 shadow-floaty"
        >
          <MoveHorizontal size={18} />
        </button>
      </div>
    </div>
  )
}
