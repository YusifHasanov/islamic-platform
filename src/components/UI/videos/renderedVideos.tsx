import { Video } from '@/src/utils/types/Types'
import React, { FC } from 'react'
import VideoComponent from './VideoComponent'



const RenderedVideos = ({ videos }: { videos: Video[] }) => {
    return (
        <>
            {
                videos.map((video: Video, id: number) => (

                    <VideoComponent {...video} key={id} />
                ))
            }
        </>
    )
}

export default RenderedVideos
