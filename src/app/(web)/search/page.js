import { Suspense } from "react"
import SearchPage from "@/components/search/SearchPage"
import Spinner from "@/components/search/Spinner"

export default function Search() {
  return (
    <Suspense
      fallback={
        <div className="flex items-center justify-center min-h-[60vh]">
          <Spinner />
        </div>
      }
    >
      <SearchPage />
    </Suspense>
  )
}

