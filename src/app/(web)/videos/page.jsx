import React from 'react';
import Videos from "@/layouts/VideosPage";


export const metadata = {
    title: 'Videolar',
};


const Page = async ({searchParams}) => {
    const {playlistId, search, videoId, content, page} = await searchParams;

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
