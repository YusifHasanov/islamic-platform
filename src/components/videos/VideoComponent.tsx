import React, { FC } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/router';
import { Video } from '@prisma/client';
const VideoComponent: FC<Video> = ({ id, title, videoId, thumbnail }) => {
    const router = useRouter();

    return (
        <div className="flex  justify-center"
            onClick={() => router.push(`/videos/${videoId}`)}
        >
            <div className="rounded-lg shadow-lg bg-white max-w-sm">
                <div className='p-3 w-full relative flex items-center justify-center'>
                    <Image className=' cursor-pointer rounded-xl ' src={thumbnail} alt={title} height={45}  width={220} />
                </div>
                <div className="p-4">
                    <h5 className="text-gray-900 text-xl font-medium mb-2"> {title}</h5>

                </div>
            </div>
        </div>
    )
}

export default VideoComponent