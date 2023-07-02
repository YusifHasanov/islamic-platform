import React, { FC } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/router'; 
import Link from 'next/link';
import moment from 'moment';



const VideoComponent: FC<any> = ({ id, title, videoId, thumbnail, publishedAt, playlistId }) => {
    const router = useRouter();

    const clickHandler = () =>
        router.push(`/videos/${videoId}`)

    return (
        <Link href={`/videos/${videoId}`} >
            <div className="video_component dark:border-gray-800 h-full   hover:cursor-pointer flex bg-gray-100 dark:bg-gray-900  rounded-xl justify-center  " >
                <div className=" rounded-3xl flex-col items-center justify-between flex shadow-lgmax-w-sm">
                    <div className='p-3 w-full relative flex items-center justify-center'>
                        <Image loading="lazy" className='w-full cursor-pointer rounded-xl ' src={thumbnail} alt={title} height={45} width={220} />
                    </div>
                    <div className="p-4 pb-2 w-full  ">
                        <h5 className="video_title  text-gray-900 dark:text-slate-300 text-lg font-medium mb-2"> {title}</h5>
                        <p className="video_date text-gray-500 text-right dark:text-slate-300 text-xs"> {  moment(publishedAt).fromNow() }</p>
                    </div>
                </div>
            </div>
        </Link>
    )
}

export default VideoComponent