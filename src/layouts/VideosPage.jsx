import React from 'react';
import VideoPlayer from "@/components/videos/VideoPlayer";
import PlaylistsSection from "@/components/videos/PlaylistsSection";
import VideoAndPlaylists from "@/components/videos/VideoAndPlaylists";

const Videos = ({playlistId, search, videoId, content,page}) => {
    return (
        <>
            <VideoPlayer playlistId={playlistId}
                         videoId={videoId}
                         content={content}
                         search={search} />
            {/*<PlaylistsSection params={params}  />*/}
            <VideoAndPlaylists playlistId={playlistId}
                               videoId={videoId}
                               content={content}
                               search={search}
                               page={page}/>
        </>
        //dsada
    );
};

export default Videos;
