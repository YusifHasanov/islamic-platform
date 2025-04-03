import SearchComponent from "@/components/videos/SearchComponent"
import Link from "next/link"

const SearchAndToggle = ({ playlistId, search, videoId, content }) => {
  // Link yaratmaq üçün optimallaşdırılmış funksiya
  const createHref = (contentValue) => {
    const currentParams = new URLSearchParams()

    if (content !== contentValue || content == null) {
      currentParams.set("content", contentValue.trim())
    }

    if (playlistId != null) {
      currentParams.set("playlistId", playlistId)
    }

    if (videoId != null) {
      currentParams.set("videoId", videoId)
    }

    if (search != null) {
      currentParams.set("search", search)
    }

    return `?${currentParams.toString()}`
  }

  // Düymələrin məlumatları
  const buttons = [
    { label: "Playlistlər", value: "playlists" },
    { label: "Videolar", value: "videos" },
    { label: "Shortlar", value: "shorts" },
  ]

  return (
    <div className="flex flex-col md:flex-row justify-center items-center w-full space-y-4 md:space-y-0 md:space-x-4 p-4">
      <div className="flex flex-wrap justify-center gap-2">
        {buttons.map((btn) => (
          <Link
            key={btn.value}
            scroll={false}
            href={createHref(btn.value)}
            className={`text-white py-2 px-4 rounded-full transition-colors duration-200
                            ${content === btn.value ? "bg-yellow-400" : "bg-gray-700 hover:bg-gray-600"}`}
          >
            {btn.label}
          </Link>
        ))}
      </div>
      <div className="w-full md:w-auto flex justify-center mt-4 md:mt-0">
        <SearchComponent searchProps={search} />
      </div>
    </div>
  )
}

export default SearchAndToggle

