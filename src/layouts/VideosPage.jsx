import React from 'react';
import VideoPlayer from "@/components/videos/VideoPlayer";
import PlaylistsSection from "@/components/videos/PlaylistsSection";

const Videos = () => {
    return (
        <>
            <VideoPlayer/>
            <PlaylistsSection/>
        </>
    );
};

export default Videos;