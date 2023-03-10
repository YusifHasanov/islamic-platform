import React, { FC } from 'react'
import { useQuery } from 'react-query'
import axios from 'axios'
import { Playlist } from '@prisma/client'
import Image from 'next/image'
import { atom, useAtom } from 'jotai'
import { playlistState } from '@/src/jotai/atoms'
import ListItemSkeleton from './ListItemSkeleton'
 

async function queryFn(){
    const { data } = await axios.get(`/api/playlists`)
    return data
}
interface Props {
 
}

const Playlists: FC<Props> = ( ) => {

    const [playlist, setPlaylist] = useAtom(playlistState);
    const query = useQuery('playlists',
    async () => await queryFn(),{
        staleTime: 1000 * 60 * 60 * 24,
    })
    const togglePlaylist = (playlistState: Playlist) =>
        setPlaylist(playlistState.playlistId === playlist?.playlistId ? null : playlistState)

    if (query.isLoading) return (
        <div className='list_skeletons flex flex-col   pl-12  pt-10' >
            <ListItemSkeleton number={14} />
        </div>

    )
    return (
        <aside className=" playlists_container  sticky pt-4 hidden pr-2  max-h-screen min-h-full w-full flex-shrink-0 flex-col justify-between overflow-y-scroll overscroll-none   lg:flex lg:max-w-[260px] xl:max-w-[340px] xl:px-5 xl:pb-15  2xl:max-w-[420px]">
            <ul className="">
                {
                    query.data?.map((item: Playlist) => (
                        <li onClick={() => {
                            togglePlaylist(item)
                            console.log(item.playlistId)
                        }} key={item.id} className={` px-2  ${playlist?.playlistId === item.playlistId ? " bg-gray-400  dark:text-gray-200 text-slate-900  dark:bg-slate-900 " : "dark:bg-slate-700 text-slate-700 bg-slate-300"}   py-1 cursor-pointer mb-2  transition-colors rounded-md dark:hover:bg-slate-700 hover:bg-gray-200`}>

                            <span className={`flex items-center rounded-md p-1 w-full text-sm font-medium  dark:text-gray-400`}>
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

