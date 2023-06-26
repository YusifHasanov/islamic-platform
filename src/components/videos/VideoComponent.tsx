import React, { FC } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/router'; 
import Link from 'next/link';




const VideoComponent: FC<any> = ({ id, title, videoId, thumbnail, publishedAt, playlistId }) => {
    const router = useRouter();

    const clickHandler = () =>
        router.push(`/videos/${videoId}`)

    return (
        <Link href={`/videos/${videoId}`} >
            <div className="video_component dark:border-gray-800 h-full   hover:cursor-pointer flex bg-gray-100 dark:bg-gray-900  rounded-xl justify-center  " >
                <div className=" rounded-3xl md:flex-col items-center justify-between flex flex-row shadow-lgmax-w-sm">
                    <div className='p-3 w-full relative flex items-center justify-center'>
                        <Image loading="lazy" className=' cursor-pointer rounded-xl ' src={thumbnail} alt={title} height={45} width={220} />
                    </div>
                    <div className="p-4">
                        <h5 className="video_title text-gray-900 dark:text-slate-300 text-lg font-medium mb-2"> {title}</h5>
                    </div>
                </div>
            </div>
        </Link>
    )
}

export default VideoComponent