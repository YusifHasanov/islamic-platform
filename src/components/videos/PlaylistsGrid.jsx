import {BASE_URL} from "@/util/Const"
import Link from "next/link"
import {getBestThumbnailUrl} from "@/util/Thumbnail"
import Image from "next/image";
import {Calendar, Clock} from "lucide-react";

export const revalidate = 60

const PlaylistsGrid = async ({playlistId, search, videoId, content}) => {
    console.log("search", search ?? "")
    const res = await fetch(`${BASE_URL}/playlists?search=${search ?? ""}`, {
        next: {revalidate: 60},
    })
    let playlists = await res.json()

    // if (search && search !== '') {
    //     playlists = playlists.filter(x => x.title.toLowerCase().includes(search.toLowerCase()));
    // }

    if (playlistId) {
        playlists = playlists.sort((a, b) => (a.playlistId === playlistId ? -1 : b.playlistId === playlistId ? 1 : 0))
    }

    const isCurrentPlaylist = (id) => {
        return playlistId === id ? "bg-slate-200" : ""
    }

    const buildPageLink = (dynamicPlaylistId) => {
        const params = new URLSearchParams()
        if (dynamicPlaylistId) {
            params.set("playlistId", dynamicPlaylistId)
        } else if (dynamicPlaylistId) {
            params.set("playlistId", dynamicPlaylistId)
        }

        if (content) {
            params.set("content", content)
        }

        if (search) {
            params.set("search", search)
        }

        return `?${params.toString()}`
    }

    return (
        <div className="py-8">
            <div className="max-w-7xl mx-auto">
                {playlists?.length === 0 ? (
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
                            {playlists?.map((video) => (
                                <Link
                                    href={buildPageLink(video.playlistId)}
                                    key={video.playlistId}
                                    className="group bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                                >
                                    <div className="relative aspect-video">
                                        <Image
                                            src={getBestThumbnailUrl(video.thumbnail) || "/placeholder.svg"}
                                            alt={video.title}
                                            fill
                                            className="object-cover transition-transform duration-500 group-hover:scale-105"
                                        />
                                        <div
                                            className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                        <div
                                            className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded-md">
                                            12:34
                                        </div>
                                        <div className="absolute top-2 left-2">
                      <span className="bg-emerald-600 text-white text-xs px-2 py-1 rounded-md">
                        Playlist
                      </span>
                                        </div>
                                    </div>
                                    <div className="p-4">
                                        <div className={'flex justify-between'}>
                                            <h3 className="font-semibold text-gray-800 mb-2 line-clamp-2 group-hover:text-emerald-700">
                                                {video.title}
                                            </h3>
                                            <span>
                                                {video.videoCount} Video
                                            </span>
                                        </div>
                                        <div className="flex items-center text-xs text-gray-500 space-x-4">
                                            <div className="flex items-center">
                                            <Calendar className="w-3 h-3 mr-1"/>
                                                <span>
                          {new Date(video.publishedAt).toLocaleDateString("az-AZ", {
                              year: "numeric",
                              month: "short",
                              day: "numeric",
                          })}
                        </span>
                                            </div>
                                            <div className="flex items-center">
                                                <Clock className="w-3 h-3 mr-1"/>
                                                <span>12:34</span>
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>

                    </>
                )}
            </div>
        </div>
    )
}

export default PlaylistsGrid

