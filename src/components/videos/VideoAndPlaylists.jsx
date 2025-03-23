import React from 'react';
import SearchAndToggle from "@/components/videos/SearchAndToggle";
import PlaylistsGrid from "@/components/videos/PlaylistsGrid";
import VideosGrid from "@/components/videos/VideosGrid";


const VideoAndPlaylists = ({playlistId, search, videoId, content, page}) => {

    return (
        <div className="min-h-screen bg-gray-100 py-8">
            {/*<Script>*/}
            {/*    alert("d");*/}
            {/*</Script>*/}
            <div className="py-3 mx-auto px-7">
                {/*<div className="flex justify-center space-x-4 mb-8">*/}
                {/*    <button className="bg-gray-700 text-white py-2 px-4 rounded-full">Oynatma Listeleri</button>*/}
                {/*    <button className="bg-gray-700 text-white py-2 px-4 rounded-full">Son Yüklenenler</button>*/}
                {/*</div>*/}

                <SearchAndToggle     content={content} />


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

                {/* Playlists Grid */}

            </div>
        </div>
    );
};

export default VideoAndPlaylists;


