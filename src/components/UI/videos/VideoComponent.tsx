import React, {FC} from 'react'
import { Video } from '@/src/utils/types/Types'

const VideoComponent :FC<Video> = ({id,title, videoId,thumbnail}) => {

    const [isOpen, setIsOpen] = React.useState(true)
    return (
        <div className="flex justify-center">
            <div className="rounded-lg shadow-lg bg-white max-w-sm">
                <div className='p-3'>
                    <img  className= ' cursor-pointer rounded-xl' src={thumbnail} alt="" />         
                </div>
                <div className="p-6">
                    <h5 className="text-gray-900 text-xl font-medium mb-2"> {title}</h5>

                </div>
            </div>
        </div>
    )
}

export default VideoComponent