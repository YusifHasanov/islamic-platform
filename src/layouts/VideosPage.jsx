import React from 'react';
import VideoPlayer from "@/components/videos/VideoPlayer";
import SearchAndToggle from "@/components/videos/SearchAndToggle";
import PlaylistsGrid from "@/components/videos/PlaylistsGrid";
import VideosGrid from "@/components/videos/VideosGrid";

const Videos = ({playlistId, search, videoId, content, page}) => {
    return (
        <>
            <VideoPlayer playlistId={playlistId}
                         videoId={videoId}
                         content={content}
                         search={search}/>
            {/*<PlaylistsSection params={params}  />*/}
            <div className="min-h-screen bg-gray-100 py-8">
                <div className="py-3 mx-auto px-7">
                    <SearchAndToggle content={content}    search={search}/>
                    {
                        content === "playlists" && <PlaylistsGrid
                            playlistId={playlistId}
                            videoId={videoId}
                            content={content}
                            search={search}
                        />
                    }
                    {
                        content === "videos" && <VideosGrid
                            playlistId={playlistId}
                            videoId={videoId}
                            content={content}
                            search={search}
                            page={page}
                        />
                    }
                </div>
            </div>
        </>
        //dsada
    );
};

export default Videos;
