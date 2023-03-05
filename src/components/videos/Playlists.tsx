import React, { FC } from 'react'
import { useQuery } from 'react-query'
import axios from 'axios'
import { Playlist } from '@prisma/client'
import Image from 'next/image'
import RenderedListItemSkeleton from './RenderedListItemSkeleton'
import { atom, useAtom } from 'jotai'
import { playlistState } from '@/src/jotai/atoms'


const queryFn = async () => {
    const { data } = await axios.get(`/api/playlists`)
    return data
}


const Playlists: FC = () => {

    const [playlist, setPlaylist] = useAtom(playlistState);

    const query = useQuery("playlists", async () => queryFn(), {
        staleTime: Infinity,
    })

    const togglePlaylist = (playlistState: Playlist) =>
        setPlaylist(playlistState.playlistId === playlist?.playlistId ? null : playlistState)

    if (query.isLoading) return (
        <div  className='list_skeletons flex flex-col  pl-12  pt-10' >
        <RenderedListItemSkeleton number={24} />
    </div>
        
    )


    if (query.isError) return <div>Error</div>



    return (
        <aside className=" playlists_container scrollbar sticky pt-4 hidden pr-2  max-h-screen min-h-full w-full flex-shrink-0 flex-col justify-between overflow-y-scroll overscroll-none   lg:flex lg:max-w-[260px] xl:max-w-[340px] xl:px-5 xl:pb-15  2xl:max-w-[420px]">
            <ul  className="">
                {
                    query.data?.map((item: Playlist) => (
                        <li onClick={() => { togglePlaylist(item) }} key={item.id} className=" px-2 py-1 cursor-pointer mb-2  transition-colors rounded-md dark:hover:bg-slate-700 hover:bg-gray-200">
                            
                            <span className={`flex items-center  ${playlist?.playlistId === item.playlistId ? " bg-gray-400  dark:text-gray-200 text-slate-900  dark:bg-slate-900 " : "dark:bg-slate-700 text-slate-700 bg-slate-300"} rounded-md p-1 w-full text-sm font-medium  dark:text-gray-400`}>
                                <Image src={item.thumbnail} alt="" className=' rounded-full' width={45} height={50} />
                                <span className="ml-4">{item.title}</span>
                            </span>
                        </li>
                    ))
                }

            </ul>
        </aside>
    )
}

export default Playlists