import { Star } from 'lucide-react'

export default function StarRatingInput({ value, onChange, size = 28 }) {
  return (
    <div className="flex gap-1.5" role="radiogroup" aria-label="التقييم بالنجوم">
      {Array.from({ length: 5 }).map((_, i) => {
        const starValue = i + 1
        const active = starValue <= value
        return (
          <button
            key={i}
            type="button"
            role="radio"
            aria-checked={active}
            aria-label={`${starValue} من 5 نجوم`}
            onClick={() => onChange(starValue)}
            className="text-amber-400 transition-transform hover:scale-110 focus-visible:scale-110"
          >
            <Star size={size} className={active ? 'fill-amber-400' : 'fill-slate-200 text-slate-200'} />
          </button>
        )
      })}
    </div>
  )
}
