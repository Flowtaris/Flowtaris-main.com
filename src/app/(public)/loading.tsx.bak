import { Skeleton } from '@/components/ui/Skeleton'

export default function PublicLoading() {
  return (
    <div className="min-h-screen">
      {/* Hero skeleton */}
      <div className="bg-navy-900 py-24">
        <div className="container-content max-w-2xl space-y-4">
          <Skeleton className="h-4 w-32 bg-navy-700" />
          <Skeleton className="h-14 w-3/4 bg-navy-700" />
          <Skeleton className="h-6 w-full bg-navy-800" />
          <Skeleton className="h-6 w-2/3 bg-navy-800" />
          <div className="flex gap-3 pt-4">
            <Skeleton className="h-12 w-40 bg-navy-700 rounded-lg" />
            <Skeleton className="h-12 w-36 bg-navy-800 rounded-lg" />
          </div>
        </div>
      </div>
      {/* Content skeleton */}
      <div className="container-content py-20 grid grid-cols-1 md:grid-cols-3 gap-6">
        {Array.from({ length: 3 }).map((_, i) => (
          <Skeleton key={i} className="h-48 rounded-xl" />
        ))}
      </div>
    </div>
  )
}
