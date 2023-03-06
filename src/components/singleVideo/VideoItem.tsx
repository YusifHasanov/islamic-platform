import React from 'react'
import axios from 'axios';
import { useQuery } from 'react-query';
import Image from 'next/image'
import { useAtom } from 'jotai';
import { selectedPlaylistId } from '@/src/jotai/atoms'
import Head from 'next/head';

async function queryFn(videoId: videoIdType) {
    const { data } = await axios.get(`/api/videos?videoId=${videoId}`)

    return data
}


const VideoItem = ({ videoId }: { videoId: videoIdType }) => {

    const [selectedPlaylistIdAtom, setSelectedPlaylistIdAtom] = useAtom(selectedPlaylistId)
    const videoQuery = useQuery<any, unknown>(["video", videoId],
        async () => await queryFn(videoId), {
        staleTime: 1000 * 60 * 60 * 24, // 24 hours
    })

    if (videoQuery.isLoading) return <div>Loading</div>
    if (videoQuery.isError) return <div>error</div>
    setSelectedPlaylistIdAtom(videoQuery.data?.playlistId)
    return (
        
        <>
        <Head>
            <title>{videoQuery.data?.title}</title>
        </Head>
         <div className='flex single_video_box flex-col  items-center    px-6 py-8 rounded-xl '>
            <h3 className='bg-green-100 single  text-center border border-green-700 text-gray-400 text-2xl rounded-lg mb-4 font-medium mr-2 px-3 py-2 mt-0  dark:bg-green-900 dark:text-green-300'>{videoQuery.data?.title}</h3>

            <iframe className='responsive_iframe border-gray-300  rounded-2xl singleVideo ' allowFullScreen src={`https://www.youtube.com/embed/${videoId}`} allow="accelerometer;fullScreen; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" ></iframe>
        </div>
        </>
    )
}

export default VideoItem