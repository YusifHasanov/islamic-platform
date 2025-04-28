"use client"
import Link from "next/link"
import { getBestThumbnailUrl } from "@/util/Thumbnail"
import Image from "next/image"

const VideoPlayerPlaylistItems = ({ playlistId, videos, page, searchParams, content, videoId }) => {
  const generateRoute = (playlistId, videoId) => {
    const searchParams = new URLSearchParams()
    if (playlistId != null) {
      searchParams.set("playlistId", playlistId)
    }

    if (videoId != null) {
      searchParams.set("videoId", videoId)
    }

    if (content != null) {
      searchParams.set("content", content)
    }

    if (page != null) {
      searchParams.set("page", page)
    }

    return `/videos?${searchParams}`
  }

  return (
    <div className="divide-y divide-gray-700">
      {videos?.map((video) => {
        console.log( video.videoId === videoId ? "bg-emerald-900/30 border-l-4 border-emerald-500" : "")
        return (
            <Link
                href={generateRoute(playlistId, video.videoId)}
                key={video.videoId}
                className={`flex p-3 hover:bg-gray-700/50 transition-colors ${
                    video.videoId === videoId ? "bg-emerald-900/30 border-l-4 !border-l-emerald-500" : ""
                }`}
            >
              <div className="flex-shrink-0 relative w-24 h-16 rounded-md overflow-hidden">
                <Image
                    src={getBestThumbnailUrl(video.thumbnail) || "/placeholder.svg"}
                    alt={video.title}
                    fill
                    className="object-cover"
                />
              </div>
              <div className="ml-3 flex-1 min-w-0">
                <p
                    className={`text-sm font-medium line-clamp-2 ${
                        video.videoId === videoId ? "text-emerald-400" : "text-white"
                    }`}
                >
                  {video.title}
                </p>
                {video.publishedAtFormatted && (
                  <p className="text-xs text-gray-400 mt-1">
                    {video.publishedAtFormatted}
                  </p>
                )}
              </div>
            </Link>
        )
      })}
    </div>
  )
}

export default VideoPlayerPlaylistItems

