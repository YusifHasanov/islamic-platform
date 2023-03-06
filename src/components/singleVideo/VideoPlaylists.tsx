import { Video } from '@prisma/client'
import React, { FC } from 'react'
import { useQuery } from 'react-query';
import axios from 'axios';
import Image from 'next/image'
import { useRouter } from 'next/router'
import { useAtom } from 'jotai';
import { playlistVideosAtom, selectedPlaylistId } from '@/src/jotai/atoms'
import PlaylistItemSkeleton from './PlaylistItemSkeleton';
import RenderedPlaylistItemSkeleton from './RenderedPlaylistItemSkeleton';
import HeaderSkeleton from '../HeaderSkeleton';

async function queryFn(playlistId: string) {
    const videosData = axios.get(`/api/videos?playlistId=${playlistId}`)
    const playlistData = axios.get(`/api/playlists?id=${playlistId}`)
    const [videos, playlist] = await Promise.all([videosData, playlistData])
    return { videos: videos.data, playlist: playlist.data }
}

const VideoPlaylists = ({ videoId }: { videoId: videoIdType }) => {

    const [playlistVideos, setPlaylistVideos] = useAtom(playlistVideosAtom)
    const router = useRouter()
    const [playlistId, setSelectedPlaylistIdAtom] = useAtom(selectedPlaylistId)
    console.log(playlistId)
    const query = useQuery<any, unknown>(["video", playlistId],
        async () => await queryFn(playlistId), {
        staleTime: 1000 * 60 * 60 * 24, // 24 hours
    })

    if (query.isLoading || query.isFetching) return (
        <div className='flex flex-col   items-center'>
            <HeaderSkeleton />
            <RenderedPlaylistItemSkeleton number={8} />
        </div>
    )
    if (query.isError) return <div>error</div>
    setPlaylistVideos(query.data.videos)
    if (query.data?.videos.filter((v: Video) => v.videoId !== videoId).length === 0) return <div className='flex w-full justify-center'>no videos</div>

    return (

        <div className='flex flex-col py-8 items-center w-full'>
            <h3 className='text-green-500 mb-6 playlist_title px-3 text-2xl uppercase' >{query.data.playlist.title}</h3>
            <div className='video_playlists pt-2 px-5'>
                {query.data.videos.map((video: Video) => (
                    <div onClick={() => router.push(`/videos/${video.videoId}`)} key={video.id} className='flex  border border-gray-500 dark:border-slate-900 pl-4 rounded-lg mb-4 justify-between items-center bg-gray-300 dark:bg-slate-800 cursor-pointer  '>
                        <p className='text-gray-600 dark:text-gray-400 text-xl' >{video.title}</p>
                        <Image className='rounded-tr-md rounded-br-md' src={video.thumbnail} alt={video.title} width={100} height={40} />
                    </div>

                ))}
            </div>
        </div>
    )
}


export default VideoPlaylists