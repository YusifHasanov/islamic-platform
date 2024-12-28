import React from 'react';
import Videos from "@/layouts/VideosPage";


export const metadata = {
    title: 'Videolar',
};


const Page = async ({searchParams}) => {
    const {playlistId,videoId, search} = await searchParams;

    return (
        <>
         <Videos playlistId ={playlistId} videoId = {videoId} search = {search} />
        </>
    );
};

export default Page;