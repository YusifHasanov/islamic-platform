import { BASE_URL } from "@/util/Const"
import Link from "next/link"
import Pagination from "@/components/common/Pagination"
import { getBestThumbnailUrl } from "@/util/Thumbnail"
import Image from "next/image"
import { Clock, Calendar } from "lucide-react"

export const revalidate = 60

const LIMIT = 12

const VideosGrid = async ({ playlistId, search, videoId, page, content }) => {
  const clientPage = Number.parseInt(page, 10) || 1
  const backendPage = clientPage - 1

  const isShorts = content === "shorts" ? 1 : 0

  const res = await fetch(
    `${BASE_URL}/videos?page=${backendPage}&size=${LIMIT}&search=${search ?? ""}&shorts=${isShorts}`,
    {
      next: { revalidate: 60 },
    },
  )

  const data = await res.json()

  let videos = data.content ?? data
  const totalPages = data.page.totalPages ?? 1

  if (playlistId) {
    videos = videos?.sort((a, b) => (a.videoId === videoId ? -1 : b.videoId === videoId ? 1 : 0))
  }

  const buildPageLink = (newPage, dynamicVideoId) => {
    const params = new URLSearchParams()
    params.set("page", newPage)

    if (dynamicVideoId) {
      params.set("videoId", dynamicVideoId)
    } else if (videoId) {
      params.set("videoId", videoId)
    }

    if (content) {
      params.set("content", content)
    }
    if (search) {
      params.set("search", search)
    }
    if (playlistId) {
      params.set("playlistId", playlistId)
    }
    return `?${params.toString()}`
  }

  return (
    <div className="py-8">
      <div className="max-w-7xl mx-auto">
        {videos?.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center mb-6">
              <svg
                className="w-12 h-12 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                ></path>
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-gray-700 mb-2">Heç bir video tapılmadı</h2>
            <p className="text-gray-500 max-w-md">
              Axtarışa uyğun bir nəticə tapılmadı. Zəhmət olmasa başqa açar sözlərlə yenidən cəhd edin.
            </p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {videos?.map((video) => (
                <Link
                  href={buildPageLink(clientPage, video.videoId)}
                  key={video.videoId}
                  className="group bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                >
                  <div className="relative aspect-video">
                    <Image
                      src={getBestThumbnailUrl(video.thumbnail) || "/placeholder.svg"}
                      alt={video.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <div className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded-md">
                      12:34
                    </div>
                    <div className="absolute top-2 left-2">
                      <span className="bg-emerald-600 text-white text-xs px-2 py-1 rounded-md">
                        {content === "shorts" ? "Short" : "Video"}
                      </span>
                    </div>
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold text-gray-800 mb-2 line-clamp-2 group-hover:text-emerald-700">
                      {video.title}
                    </h3>
                    <div className="flex items-center text-xs text-gray-500 space-x-4">
                      <div className="flex items-center">
                        <Calendar className="w-3 h-3 mr-1" />
                        <span>
                          {new Date(video.publishedAt).toLocaleDateString("az-AZ", {
                            year: "numeric",
                            month: "short",
                            day: "numeric",
                          })}
                        </span>
                      </div>
                      <div className="flex items-center">
                        <Clock className="w-3 h-3 mr-1" />
                        <span>12:34</span>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>

            {/* Pagination */}
            <div className="mt-12">
              <Pagination clientPage={clientPage} totalPages={totalPages} buildPageLink={buildPageLink} />
            </div>
          </>
        )}
      </div>
    </div>
  )
}

export default VideosGrid

