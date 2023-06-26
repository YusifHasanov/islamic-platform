
import React, { FC } from 'react'
import Image from 'next/image'
import PlaylistItemSkeleton from './PlaylistItemSkeleton'
import HeaderSkeleton from '../../globals/HeaderSkeleton'
import Link from 'next/link'
import { useGetVideosByPlaylistIdQuery } from '@/src/redux/slices/videoSlice'
import { useGetPlaylistByIdQuery } from '@/src/redux/slices/playlistSlice'


interface Props {
    video: any
}
 

const VideoPlaylists: FC<Props> = ({ video }) => {
    const { data: videos, isLoading: videoLoading } = useGetVideosByPlaylistIdQuery(video.playlistId);
    const { data: playlist, isLoading: playlistLoading } = useGetPlaylistByIdQuery(video.playlistId);
 

    if (videoLoading || playlistLoading) return (
        <div className='flex flex-col   items-center'>
            {playlistLoading && <HeaderSkeleton />}
            {videoLoading && <PlaylistItemSkeleton number={6} />}
        </div>
    )


    if (videos?.filter((v: any) => v.videoId !== video.videoId).length === 0) return <div className='flex w-full justify-center'>
        <p className='text-gray-600 dark:text-gray-400 text-xl' >Bu listede başka video bulunmamaktadır.</p>
    </div>

    return (

        <div className='flex flex-col pt-8 pb-1 items-center w-full'>
            <h3 className='text-green-500 mb-6 playlist_title px-3 text-2xl uppercase' >{playlist?.title}</h3>
            <div className='video_playlists pt-2 lg:px-5'>
                {videos?.map((video: any) => (
                    <Link href={`/videos/${video.videoId}`} key={video.id}>
                        <div key={video.id} className='flex  dark:border-slate-900 pl-4 rounded-lg mb-4 justify-between items-center bg-gray-300 dark:bg-slate-700 cursor-pointer  '>
                            <p className='text-gray-600 dark:text-gray-400 text-xl' >{video.title}</p>
                            <Image loading='lazy' className='rounded-tr-md rounded-br-md' src={video.thumbnail.split("+")[2]} alt={video.title} width={100} height={40} />
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    )
}


export default VideoPlaylists

