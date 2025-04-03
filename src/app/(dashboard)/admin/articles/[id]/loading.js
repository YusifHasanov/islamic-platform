export default function SkeletonLoader() {
  return (
    <div className="animate-pulse mx-auto max-w-7xl px-4 py-16">
      <div className="mb-12 text-center">
        <div className="h-8 w-1/2 mx-auto bg-gray-300 rounded"></div>
        <div className="mt-2 mx-auto h-1 w-24 bg-gray-300 rounded"></div>
      </div>

      <div className="relative px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 4 }).map((_, index) => (
            <div key={index} className="space-y-4">
              <div className="aspect-[3/4] w-full bg-gray-300 rounded-lg"></div>
              <div className="h-6 w-3/4 bg-gray-300 rounded"></div>
            </div>
          ))}
        </div>

        <div className="mt-8 flex justify-between">
          <div className="h-10 w-10 bg-gray-300 rounded-full"></div>
          <div className="h-10 w-10 bg-gray-300 rounded-full"></div>
        </div>
      </div>
    </div>
  )
}

