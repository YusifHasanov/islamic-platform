import React from 'react'
import axios from 'axios';
import Head from 'next/head';
import VideoItemSkeleton from './VideoItemSkeleton';
import HeaderSkeleton from '../../common/HeaderSkeleton';



// async function queryFn(videoId: videoIdType) {
//     const { data } = await axios.get(`/api/videos/${videoId}`)
//     return data
// }

const videoo = {

    id: 1,
    videoId: "KYVw2w8MAIM",
    publishedAt: "2023-02-27T13:45:52.000Z",
    thumbnail: "https://i.ytimg.com/vi/KYVw2w8MAIM/hqdefault.jpg",
    title: "Qardaşlıq Çempionatı | Final",
    playlistId: "PLU43-RoCoSfMihq_-X8zYGxergJCMgayn"

}
const VideoItem = ({ video }: { video: any }) => {

    // const videoQuery = useQuery<any, unknown>(["video", videoId],
    //     async () => await queryFn(videoId), {
    //     staleTime: 1000 * 60 * 60 * 24, // 24 hours
    // })


    // if (!video) return (
    //     <div className='w-full px-10 flex flex-col'>
    //         <HeaderSkeleton />
    //         <VideoItemSkeleton />
    //     </div>
    // )


    return (
        <>
            <Head>
                <title>{videoo?.title}</title>
            </Head>
            <div className='flex single_video_box flex-col  items-center  px-0 lg:px-6 pt-3 lg:pt-8 rounded-xl '>
                <h3 className='bg-green-900 single  text-center border border-green-700 text-gray-100 text-2xl rounded-lg mb-4 font-medium mr-2 px-3 py-2 mt-0  dark:bg-green-300 dark:text-green-900'>{videoo?.title}</h3>
                <iframe className='responsive_iframe border-gray-300  rounded-2xl singleVideo ' allowFullScreen src={`https://www.youtube.com/embed/${videoo?.videoId}`} allow="accelerometer;fullScreen; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" ></iframe>
            </div>
        </>
    )
}

export default VideoItem