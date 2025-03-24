import React from 'react';
import SearchAndToggle from "@/components/videos/SearchAndToggle";
import PlaylistsGrid from "@/components/videos/PlaylistsGrid";
import VideosGrid from "@/components/videos/VideosGrid";


const VideoAndPlaylists = ({playlistId, search, videoId, content, page}) => {

    return (
        <div className="min-h-screen bg-gray-100 py-8">
            <div className="py-3 mx-auto px-7">
                <SearchAndToggle content={content}/>

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
    );
};

export default VideoAndPlaylists;


