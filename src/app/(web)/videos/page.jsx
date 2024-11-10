import React from 'react';
import Videos from "@/layouts/VideosPage";


export const metadata = {
    title: 'Videolar',
};


const Page = async ({searchParams}) => {
    const {playlistId,videoId} = await searchParams;

    return (
        <>
         <Videos playlistId ={playlistId} videoId = {videoId}/>
        </>
    );
};

export default Page;