export function TableSkeleton({ rows = 5, cols = 5 }) {
  return (
    <div className="space-y-3 p-4">
      {Array.from({ length: rows }).map((_, r) => (
        <div key={r} className="flex items-center gap-4">
          {Array.from({ length: cols }).map((_, c) => (
            <div key={c} className="skeleton h-4 flex-1 rounded-lg" />
          ))}
        </div>
      ))}
    </div>
  )
}

export function CardSkeleton() {
  return (
    <div className="admin-card overflow-hidden">
      <div className="skeleton h-40 w-full" />
      <div className="space-y-2 p-4">
        <div className="skeleton h-4 w-3/4 rounded" />
        <div className="skeleton h-3 w-1/2 rounded" />
      </div>
    </div>
  )
}

export function StatCardSkeleton() {
  return (
    <div className="admin-card flex items-center gap-4 p-5">
      <div className="skeleton h-12 w-12 rounded-xl" />
      <div className="flex-1 space-y-2">
        <div className="skeleton h-3 w-2/3 rounded" />
        <div className="skeleton h-5 w-1/3 rounded" />
      </div>
    </div>
  )
}
