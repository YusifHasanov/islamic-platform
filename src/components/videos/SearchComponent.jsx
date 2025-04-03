"use client"
import { useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Search } from "lucide-react" // Importing an icon for better design

const SearchComponent = ({ searchProps }) => {
  const [search, setSearch] = useState(searchProps ?? "")
  const router = useRouter()
  const searchParams = useSearchParams()

  const handleSubmit = (e) => {
    e.preventDefault()

    const currentParams = new URLSearchParams(searchParams)

    if (search.trim()) {
      currentParams.set("search", search.trim())
    } else {
      currentParams.delete("search")
    }

    const path = `?${currentParams.toString()}`

    // setSearch('');
    router.push(path, {
      scroll: false,
    })
  }

  return (
    <div className=" flex  justify-center rounded-lg  ">
      <form
        onSubmit={handleSubmit}
        className="flex items-center space-x-3 bg-white px-4 py-2 rounded-full shadow-lg border border-gray-200"
      >
        {/* Search Input */}
        <div className="relative w-full">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Playlist axtar..."
            className="w-full bg-transparent focus:outline-none focus:ring-0 text-gray-700 placeholder-gray-400"
          />
        </div>

        {/* Search Button */}
        <button
          type="submit"
          className="flex items-center justify-center w-10 h-8 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition duration-200"
        >
          <Search size={20} />
        </button>
      </form>
    </div>
  )
}

export default SearchComponent

