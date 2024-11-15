import React from 'react';
import VideoPlayer from "@/components/videos/VideoPlayer";
import PlaylistsSection from "@/components/videos/PlaylistsSection";

const Videos = ({playlistId,videoId}) => {
    return (
        <>
            <VideoPlayer playlistId={playlistId} videoId={videoId} />
            <PlaylistsSection playlistId={playlistId} />
        </>
        //dsada
    );
};

export default Videos;