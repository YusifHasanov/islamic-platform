import React,{FC} from 'react'
import { useQuery } from 'react-query'
import axios from 'axios'
import { Playlist } from '@prisma/client'
import Image from 'next/image'
import RenderedListItemSkeleton from './RenderedListItemSkeleton'
const queryFn = async () => {
    const { data } = await axios.get(`/api/playlists`)
    return data
}

interface PlaylistsProps {
    playlist: Playlist | null
    setPlaylist: React.Dispatch<React.SetStateAction<Playlist | null>>
}
const Playlists :FC<PlaylistsProps>= ({playlist,setPlaylist}) => {
 
     
    const query = useQuery("playlists", async () => queryFn(), {
        staleTime: Infinity,
    })


    if (query.isLoading) return (
        <div className='flex flex-col w-full   pt-10' >
            <RenderedListItemSkeleton number={16} />
        </div>
    )

    if (query.isError) return <div>Error</div>



    return (
        <div className=" sticky top-0 h-full  px-3 py-4 pr-1 bg-gray-50 dark:bg-gray-800">
            <ul style={{ height: "100vh" }} className="space-y-2 sticky h-full   top-0 overflow-y-auto  pb-10 ">
                {
                    query.data?.map((playlist: Playlist) => (
                        <li onClick={() => setPlaylist(playlist)} key={playlist.id} className=" px-2 py-1 cursor-pointer transition-colors rounded-md dark:hover:bg-gray-700 hover:bg-gray-200">

                            <span className={`flex items-center ${playlist?.playlistId === playlist.playlistId ? " bg-gray-200 dark:text-gray-600 p-1 rounded-md" : ""}            w-full text-sm font-medium text-gray-600 dark:text-gray-400`}>
                                <Image src={playlist.thumbnail} alt="" className=' rounded-full' width={45} height={50} />
                                <span className="ml-4">{playlist.title}</span>
                            </span>
                        </li>
                    ))
                }

            </ul>
        </div>
    )
}

export default Playlists