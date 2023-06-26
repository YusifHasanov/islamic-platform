
import React, { FC } from 'react'
import Image from 'next/image'
import PlaylistItemSkeleton from './PlaylistItemSkeleton'
import HeaderSkeleton from '../../globals/HeaderSkeleton'
import Link from 'next/link'
import { useGetVideosByPlaylistIdQuery } from '@/src/redux/slices/videoSlice'
import { useGetPlaylistByIdQuery } from '@/src/redux/slices/playlistSlice'
import { Swiper, SwiperSlide, useSwiper, useSwiperSlide } from "swiper/react";
import { Autoplay } from "swiper";
import "swiper/css";
import "swiper/css/autoplay";
import { useRouter } from "next/router";
import VideoItem from './VideoItem'
import VideoComponent from '../VideoComponent'
const videos = [
    {
        id: 1,
        videoId: "KYVw2w8MAIM",
        publishedAt: "2023-02-27T13:45:52.000Z",
        thumbnail: "https://i.ytimg.com/vi/KYVw2w8MAIM/hqdefault.jpg",
        title: "Qardaşlıq Çempionatı | Final",
        playlistId: "PLU43-RoCoSfMihq_-X8zYGxergJCMgayn"
    },
    {
        id: 2,
        videoId: "cuhKwEl6DuQ",
        publishedAt: "2023-03-06T16:00:07.000Z",
        thumbnail: "https://i.ytimg.com/vi/cuhKwEl6DuQ/hqdefault.jpg",
        title: "Qardaşlıq Çempionatı - Super Kubok Oyunu | 313 - DABIQ",
        playlistId: "PLU43-RoCoSfMihq_-X8zYGxergJCMgayn"
    },
    {
        id: 3,
        videoId: "Czdxy8ljPPE",
        publishedAt: "2023-02-06T14:25:57.000Z",
        thumbnail: "https://i.ytimg.com/vi/Czdxy8ljPPE/hqdefault.jpg",
        title: "Müsəlman Ölkələrindəki Zəlzələ Haqqında | Gündəm Və İslam",
        playlistId: "PLU43-RoCoSfPLj9z7d_jwLzi4ue9Yvv7e"
    },
    {
        id: 4,
        videoId: "o2ENJHBKFtM",
        publishedAt: "2023-02-09T14:02:47.000Z",
        thumbnail: "https://i.ytimg.com/vi/o2ENJHBKFtM/hqdefault.jpg",
        title: "Dini Lağa Qoyanlar | Gündəm Və İslam",
        playlistId: "PLU43-RoCoSfPLj9z7d_jwLzi4ue9Yvv7e"
    },
    {
        id: 5,
        videoId: "ZUW2Ffyn_do",
        publishedAt: "2023-02-13T11:54:18.000Z",
        thumbnail: "https://i.ytimg.com/vi/ZUW2Ffyn_do/hqdefault.jpg",
        title: "14 Fevral Sevgililər Günü Haqqında | Gündəm Və İslam",
        playlistId: "PLU43-RoCoSfPLj9z7d_jwLzi4ue9Yvv7e"
    },
    {
        id: 3,
        videoId: "Czdxy8ljPPE",
        publishedAt: "2023-02-06T14:25:57.000Z",
        thumbnail: "https://i.ytimg.com/vi/Czdxy8ljPPE/hqdefault.jpg",
        title: "Müsəlman Ölkələrindəki Zəlzələ Haqqında | Gündəm Və İslam",
        playlistId: "PLU43-RoCoSfPLj9z7d_jwLzi4ue9Yvv7e"
    },
    {
        id: 4,
        videoId: "o2ENJHBKFtM",
        publishedAt: "2023-02-09T14:02:47.000Z",
        thumbnail: "https://i.ytimg.com/vi/o2ENJHBKFtM/hqdefault.jpg",
        title: "Dini Lağa Qoyanlar | Gündəm Və İslam",
        playlistId: "PLU43-RoCoSfPLj9z7d_jwLzi4ue9Yvv7e"
    },
    {
        id: 5,
        videoId: "ZUW2Ffyn_do",
        publishedAt: "2023-02-13T11:54:18.000Z",
        thumbnail: "https://i.ytimg.com/vi/ZUW2Ffyn_do/hqdefault.jpg",
        title: "14 Fevral Sevgililər Günü Haqqında | Gündəm Və İslam",
        playlistId: "PLU43-RoCoSfPLj9z7d_jwLzi4ue9Yvv7e"
    }
]
interface Props {
    video: any
}


// const VideoPlaylists: FC<Props> = ({ video }) => {
//     // const { data: videos, isLoading: videoLoading } = useGetVideosByPlaylistIdQuery(video.playlistId);
//     // const { data: playlist, isLoading: playlistLoading } = useGetPlaylistByIdQuery(video.playlistId);


//     // if (videoLoading || playlistLoading) return (
//     //     <div className='flex flex-col   items-center'>
//     //         {playlistLoading && <HeaderSkeleton />}
//     //         {videoLoading && <PlaylistItemSkeleton number={6} />}
//     //     </div>
//     // )


//     // if (videos?.filter((v: any) => v.videoId !== video.videoId).length === 0) return <div className='flex w-full justify-center'>
//     //     <p className='text-gray-600 dark:text-gray-400 text-xl' >Bu listede başka video bulunmamaktadır.</p>
//     // </div>

//     return (

//         <div className='flex flex-col pt-8 pb-1 items-center w-full'>
//             {/* <h3 className='text-green-500 mb-6 playlist_title px-3 text-2xl uppercase' >{playlist?.title}</h3> */}
//             <h3 className='text-green-500 mb-6 playlist_title px-3 text-2xl uppercase' >Playlist Title</h3>
//             <div className='video_playlists pt-2 lg:px-5'>
//                 {videos?.map((video: any) => (
//                     <Link href={`/videos/${video.videoId}`} key={video.id}>
//                         <div key={video.id} className='flex  dark:border-slate-900 pl-4 rounded-lg mb-4 justify-between items-center bg-gray-300 dark:bg-slate-700 cursor-pointer  '>
//                             <p className='text-gray-600 dark:text-gray-400 text-xl' >{video.title}</p>
//                             {/* <Image loading='lazy' className='rounded-tr-md rounded-br-md' src={video.thumbnail.split("+")[2]} alt={video.title} width={100} height={40} /> */}
//                             <Image loading='lazy' className='rounded-tr-md rounded-br-md' src={video.thumbnail} alt={video.title} width={100} height={40} />

//                         </div>
//                     </Link>
//                 ))}
//             </div>
//         </div>
//     )
// }

const VideoPlaylists: FC<Props> = ({ video }) => {
    return (

        <div className='p-5  '>
           <h3 className='text-green-500 mb-6 text-center my-3 playlist_title px-3 text-2xl uppercase' >Playlist Title</h3>
            <Swiper
                modules={[Autoplay]}

                autoplay={{ delay: 1000, disableOnInteraction: false, }}
                loop={true}


                breakpoints={{
                    140:{
                        slidesPerView: 2,
                    },
                    640: {
                        slidesPerView: 2,
                    },
                    768: {
                        slidesPerView: 3,
                    },
                    1024: {
                        slidesPerView: 4,
                    },
                }}
            >
                {

                    videos.map((item: any, index: any) => (
                        <SwiperSlide className='p-5' key={index}  >
                            <Link href={`/videos/${item.videoId}`} key={item.id}>
                                <div   className="video_component dark:border-gray-800   hover:cursor-pointer flex bg-gray-100 dark:bg-gray-900  rounded-xl justify-center  " >
                                    <div className=" rounded-3xl      shadow-lgmax-w-sm">
                                        <div className='p-3 w-full relative flex items-center justify-center'>
                                            <img loading="lazy" className=' cursor-pointer rounded-xl ' src={item.thumbnail} alt={item.title} height={45} width={270} />
                                        </div>
                                        <div className="p-4 h-24">
                                            <h5 className="video_title text-gray-900 dark:text-slate-300 text-lg font-medium mb-2"> {item.title}</h5>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        </SwiperSlide>
                    ))

                }
            </Swiper>

        </div>
    )
}

export default VideoPlaylists

