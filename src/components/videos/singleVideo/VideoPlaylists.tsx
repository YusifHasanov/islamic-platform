import { Video } from '@prisma/client'
import React, { FC } from 'react'
import Image from 'next/image'
import PlaylistItemSkeleton from './PlaylistItemSkeleton'
import HeaderSkeleton from '../../globals/HeaderSkeleton'
import { trpc } from '@/server/utils/trpc'
import Link from 'next/link'

interface Props {
    video: Video

}
const staleTime = { staleTime: 1000 * 60 * 60 * 24 * 7 }

const VideoPlaylists: FC<Props> = ({ video }) => {
    const { data: videos, isLoading: videoLoading } = trpc.video.manyByPlaylistId.useQuery(video.playlistId, staleTime)
    const { data: playlist, isLoading: playlistLoading } = trpc.playlist.getByPlaylistId.useQuery(video.playlistId, staleTime)

    if (videoLoading || playlistLoading) return (
        <div className='flex flex-col   items-center'>
            {playlistLoading && <HeaderSkeleton />}
            {videoLoading && <PlaylistItemSkeleton number={6} />}
        </div>
    )


    if (videos?.filter((v) => v.videoId !== video.videoId).length === 0) return <div className='flex w-full justify-center'>no videos</div>

    return (

        <div className='flex flex-col py-8 items-center w-full'>
            <h3 className='text-green-500 mb-6 playlist_title px-3 text-2xl uppercase' >{playlist?.title}</h3>
            <div className='video_playlists pt-2 lg:px-5'>
                {videos?.map((video) => (
                    <Link href={`/videos/${video.videoId}`} key={video.id}>
                        <div key={video.id} className='flex  dark:border-slate-900 pl-4 rounded-lg mb-4 justify-between items-center bg-gray-300 dark:bg-slate-700 cursor-pointer  '>
                            <p className='text-gray-600 dark:text-gray-400 text-xl' >{video.title}</p>
                            <Image loading='lazy' className='rounded-tr-md rounded-br-md' src={video.thumbnail} alt={video.title} width={100} height={40} />
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    )
}


export default VideoPlaylists