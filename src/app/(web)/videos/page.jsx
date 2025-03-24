import React from 'react';
import Videos from "@/layouts/VideosPage";


export const metadata = {
    title: 'Videolar',
};


const Page = async ({searchParams}) => {
    let {playlistId, search, videoId, content, page} = await searchParams;


    if (page === null || page === undefined) {
        if ((content === null || content === undefined) && (videoId != null)) {
            content = "videos"
        }
        page = 0
    }

    if (content === null || content === undefined) {
        content = "videos"
    }


    return (
        <>
            <Videos playlistId={playlistId}
                    videoId={videoId}
                    content={content}
                    search={search}
                    page={page}
            />
        </>
    );
};

export default Page;
