import VideoPlayer from "@/components/videos/VideoPlayer"
import SearchAndToggle from "@/components/videos/SearchAndToggle"
import PlaylistsGrid from "@/components/videos/PlaylistsGrid"
import VideosGrid from "@/components/videos/VideosGrid"
import ModernSearchAndToggle from "@/components/videos/ModernSearchAndToggle";

const Videos = ({playlistId, search, videoId, content, page}) => {
    if (page == null) {
        if (content == null && videoId != null) {
            content = "videos"
        }
        page = 0
    }

    content ??= "videos"

    return (
        <>
            <VideoPlayer playlistId={playlistId} videoId={videoId} content={content} search={search}/>

            <div className="min-h-screen bg-gray-100 py-8">
                <div className="py-3 mx-auto px-7">
                    <ModernSearchAndToggle playlistId={playlistId} videoId={videoId} content={content} search={search}/>
                    {content === "playlists" && (
                        <PlaylistsGrid playlistId={playlistId} videoId={videoId} content={content} search={search}/>
                    )}
                    {(content === "videos" || content === "shorts") && (
                        <VideosGrid playlistId={playlistId} videoId={videoId} content={content} search={search}
                                    page={page}/>
                    )}
                </div>
            </div>
        </>
        //dsada
    )
}

export default Videos

