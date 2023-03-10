import { Playlist, Video } from '@prisma/client'
import React, { FC } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/router'
import PlaylistItemSkeleton from './PlaylistItemSkeleton'
import { useAtom } from 'jotai'
import { playlistVideosAtom } from '@/src/jotai/atoms'
import { useQuery } from 'react-query'
import HeaderSkeleton from '../../globals/HeaderSkeleton'
import axios from 'axios'

async function queryFn(playlistId: string) {
    const videosData = axios.get(`/api/videos?playlistId=${playlistId}`)
    const playlistData = axios.get(`/api/playlists?id=${playlistId}`)
    const [videos, playlist] = await Promise.all([videosData, playlistData])
    return { videos: videos.data, playlist: playlist.data }
}

interface Props {
    video: Video

}

const VideoPlaylists: FC<Props> = ({ video }) => {

    const [playlistVideos, setPlaylistVideos] = useAtom(playlistVideosAtom)

    const router = useRouter()


    const query = useQuery<any, unknown>(["video", video.playlistId],
        async () => await queryFn(video.playlistId), {
        staleTime: 1000 * 60 * 60 * 24, // 24 hours
    })

    if (query.isLoading) return (
        <div className='flex flex-col   items-center'>
            <HeaderSkeleton />
            <PlaylistItemSkeleton number={6} />
        </div>
    )

    setPlaylistVideos(query.data?.playlistData)
    if (query.data?.videos?.filter((v: Video) => v.videoId !== video.videoId).length === 0) return <div className='flex w-full justify-center'>no videos</div>

    return (

        <div className='flex flex-col py-8 items-center w-full'>
            <h3 className='text-green-500 mb-6 playlist_title px-3 text-2xl uppercase' >{query.data?.playlist?.title}</h3>
            <div className='video_playlists pt-2 px-5'>
                {query.data?.videos?.map((video: Video) => (
                    <div onClick={() => router.push(`/videos/${video.videoId}`)} key={video.id} className='flex   dark:border-slate-900 pl-4 rounded-lg mb-4 justify-between items-center bg-gray-300 dark:bg-slate-800 cursor-pointer  '>
                        <p className='text-gray-600 dark:text-gray-400 text-xl' >{video.title}</p>
                        <Image loading='lazy' className='rounded-tr-md rounded-br-md' src={video.thumbnail} alt={video.title} width={100} height={40} />
                    </div>

                ))}
            </div>
        </div>
    )
}


export default VideoPlaylists