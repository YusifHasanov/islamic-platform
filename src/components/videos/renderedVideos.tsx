
import React, { FC } from 'react'
import VideoComponent from './VideoComponent'
import { Video } from '@prisma/client'



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
