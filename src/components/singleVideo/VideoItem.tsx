import React, { useEffect } from 'react'
import axios from 'axios';
import { UseQueryResult, useQuery } from 'react-query';
import { useAtom } from 'jotai';
import { selectedPlaylistId } from '@/src/jotai/atoms'
import Head from 'next/head';
import VideoItemSkeleton from './VideoItemSkeleton';
import HeaderSkeleton from '../HeaderSkeleton';
import { useRouter } from 'next/router';

async function queryFn(videoId: videoIdType) {
    const { data } = await axios.get(`/api/videos/${videoId}`)

    return data
}


const VideoItem = ({ videoId }: { videoId: videoIdType }) => {
    const router = useRouter()


    const videoQuery = useQuery<any, unknown>(["video", videoId],
        async () => await queryFn(videoId), {
        staleTime: 1000 * 60 * 60 * 24, // 24 hours
    })

    if (videoQuery.isLoading) return (
        <div className='w-full px-10 flex flex-col'>
            <HeaderSkeleton />
            <VideoItemSkeleton />
        </div>
    )
    if (videoQuery.isError  ) {
        router.push('/404')
    }
    
    return (
        <>
            <Head>
                <title>{videoQuery.data?.title}</title>
            </Head>
            <div className='flex single_video_box flex-col  items-center    px-6 pt-8 rounded-xl '>
                <h3 className='bg-green-900 single  text-center border border-green-700 text-gray-100 text-2xl rounded-lg mb-4 font-medium mr-2 px-3 py-2 mt-0  dark:bg-green-300 dark:text-green-900'>{videoQuery.data?.title}</h3>
                <iframe className='responsive_iframe border-gray-300  rounded-2xl singleVideo ' allowFullScreen src={`https://www.youtube.com/embed/${videoId}`} allow="accelerometer;fullScreen; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" ></iframe>
            </div>
        </>
    )
}

export default VideoItem