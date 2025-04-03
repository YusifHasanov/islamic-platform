import VideoPlayerPlaylistItems from "@/components/videos/VideoPlayerPlaylistItems"
import {CalendarIcon, Clock, Eye, ThumbsUp} from "lucide-react"
import {BASE_URL} from "@/util/Const";

export const revalidate = 60

const VideoPlayer = async ({playlistId, search, videoId, content, page}) => {
    // Geçerliliği kontrol eden yardımcı fonksiyon
    const isValid = (prop) => prop != null && prop !== "undefined" && prop !== "null"

    let selectedVideo, videos, playlist

    if(isValid(videoId)){
        const findPlaylistResponse = await fetch(`${BASE_URL}/playlists/of-video/${videoId}`, {
            next: {revalidate: 60},
        })
        const findPlaylist = await findPlaylistResponse.json()
        playlistId =  findPlaylist.playlistId
    }

    // Eğer playlistId sağlanmamışsa, videoId varsa ilgili playlisti bul; yoksa varsayılanı kullan.
    if (!isValid(playlistId)) {
        // if (!isValid(videoId)) {
        //     const latestVideoRes = await fetch(`${BASE_URL}/videos/latest`, {
        //         next: {revalidate: 60},
        //     })
        //
        //     selectedVideo = await latestVideoRes.json()
        //     videoId = selectedVideo.videoId
        //     console.log("selectedVideo", selectedVideo)
        // }

        // const findPlaylistResponse = await fetch(`${BASE_URL}/playlists/of-video/${videoId}`, {
        //     next: {revalidate: 60},
        // })
        // const findPlaylist = await findPlaylistResponse.json()
        // playlistId = findPlaylist?.playlistId ?? process.env.DEFAULT_PLAYLIST_ID
        playlistId = process.env.DEFAULT_PLAYLIST_ID
    }

    // Playlist ve videoları paralel şekilde çek
    const [playlistRes, videosRes] = await Promise.all([
        fetch(`${BASE_URL}/playlists/${playlistId}`, {next: {revalidate: 60}}),
        fetch(`${BASE_URL}/videos?playlistId=${playlistId}`, {next: {revalidate: 60}}),
    ])
    playlist = await playlistRes.json()
    videos = await videosRes.json()

    // videoId geçerli ise, ayrı fetch ile seçilen videoyu getir; aksi halde playlist içerisinden seç.
    if (selectedVideo == null) {
        if (isValid(videoId) && isValid(playlistId)) {
            const selectedVideoResponse = await fetch(`${BASE_URL}/videos/${videoId}`, {
                next: {revalidate: 60},
            })
            selectedVideo = await selectedVideoResponse.json()
        } else {
            selectedVideo = videos.find((v) => v.playlistId === playlistId) ?? videos[0]
        }
    }

    // Format the date
    const formattedDate = selectedVideo?.publishedAt
        ? new Date(selectedVideo.publishedAt).toLocaleDateString("az-AZ", {
            year: "numeric",
            month: "long",
            day: "numeric",
        })
        : ""


    return (
        <div className="bg-gradient-to-b from-gray-900 to-gray-800 text-white">
            <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Main Video Player Section */}
                    <div className="lg:col-span-2 space-y-6">
                        <div className="aspect-video w-full rounded-xl overflow-hidden shadow-2xl">
                            <iframe
                                className="w-full h-full"
                                src={`https://www.youtube.com/embed/${selectedVideo?.videoId}`}
                                title={selectedVideo?.title}
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                            ></iframe>
                        </div>

                        <div className="space-y-4">
                            <h1 className="text-2xl md:text-3xl font-bold text-white">{selectedVideo?.title}</h1>

                            {/*<div className="flex flex-wrap gap-4 text-sm text-gray-300">*/}
                            {/*  <div className="flex items-center">*/}
                            {/*    <CalendarIcon className="w-4 h-4 mr-2 text-emerald-400" />*/}
                            {/*    <span>{formattedDate}</span>*/}
                            {/*  </div>*/}
                            {/*  <div className="flex items-center">*/}
                            {/*    <Eye className="w-4 h-4 mr-2 text-emerald-400" />*/}
                            {/*    <span>1.2K izləmə</span>*/}
                            {/*  </div>*/}
                            {/*  <div className="flex items-center">*/}
                            {/*    <ThumbsUp className="w-4 h-4 mr-2 text-emerald-400" />*/}
                            {/*    <span>83 bəyənmə</span>*/}
                            {/*  </div>*/}
                            {/*  <div className="flex items-center">*/}
                            {/*    <Clock className="w-4 h-4 mr-2 text-emerald-400" />*/}
                            {/*    <span>12:34</span>*/}
                            {/*  </div>*/}
                            {/*</div>*/}

                            {/*<div className="pt-4 border-t border-gray-700">*/}
                            {/*  <p className="text-gray-300">*/}
                            {/*    {selectedVideo?.description || "Bu video haqqında ətraflı məlumat yoxdur."}*/}
                            {/*  </p>*/}
                            {/*</div>*/}

                            {/*<div className="flex flex-wrap gap-2 pt-2">*/}
                            {/*  <span className="px-3 py-1 bg-emerald-900 text-emerald-100 rounded-full text-xs font-medium">*/}
                            {/*    İslam*/}
                            {/*  </span>*/}
                            {/*  <span className="px-3 py-1 bg-emerald-900 text-emerald-100 rounded-full text-xs font-medium">*/}
                            {/*    Təfsir*/}
                            {/*  </span>*/}
                            {/*  <span className="px-3 py-1 bg-emerald-900 text-emerald-100 rounded-full text-xs font-medium">*/}
                            {/*    Hədis*/}
                            {/*  </span>*/}
                            {/*</div>*/}
                        </div>
                    </div>

                    {/* Playlist Section */}
                    <div
                        className="bg-gray-800  rounded-xl overflow-hidden shadow-lg border border-gray-700">
                        <h3 className="text-lg font-semibold p-4 bg-gradient-to-r from-emerald-800 to-emerald-900 border-b border-gray-700">
                            {playlist?.title || "Playlist"}
                        </h3>
                        <div
                            className="max-h-[500px] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-gray-800">
                            <VideoPlayerPlaylistItems
                                playlistId={playlistId}
                                videos={videos}
                                page={page}
                                searchParams={search}
                                content={content}
                                videoId={selectedVideo?.videoId}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default VideoPlayer

