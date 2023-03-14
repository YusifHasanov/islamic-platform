import React, { FC } from 'react'
import { useQuery } from 'react-query'
import axios from 'axios'
import { Playlist } from '@prisma/client'
import Image from 'next/image'
import { atom, useAtom } from 'jotai'
import { playlistState } from '@/src/jotai/atoms'
import ListItemSkeleton from './ListItemSkeleton'
import { trpc } from '@/server/utils/trpc'


interface Props {

}

const Playlists: FC<Props> = () => {

    const [playlist, setPlaylist] = useAtom(playlistState);
    const [filteredData, setFilteredData] = React.useState<any[]>([])
    const [wordEntered, setWordEntered] = React.useState("")
    const query = trpc.playlist.getAll.useQuery(undefined, { staleTime: 86400000, }); // 

    const togglePlaylist = (playlistState: Playlist) =>
        setPlaylist(playlistState.playlistId === playlist?.playlistId ? null : playlistState)

    if (query.isLoading) return (
        <div className='list_skeletons flex flex-col   pl-12  pt-10' >
            <ListItemSkeleton number={14} />
        </div>

    )
    const handleFilter = (event: any) => {
        const searchWord = event.target.value;
        setWordEntered(searchWord);
    }
    return (
        <aside className=" playlists_container  sticky   hidden pr-2  max-h-screen min-h-full w-full flex-shrink-0 flex-col  overflow-y-scroll overscroll-none   lg:flex lg:max-w-[260px] xl:max-w-[340px] xl:px-5 xl:pb-15  2xl:max-w-[420px]">

            <input type="text" value={wordEntered} onChange={(e) => { handleFilter(e) }} className="bg-gray-50 border mb-2 outline-none  border-gray-300 text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 sticky top-0 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Axtarış" required />
            <ul className="">
                {
                    query.data?.filter((val: any) => {
                        return (wordEntered === "" || val.title.toLowerCase().includes(wordEntered.toLowerCase())) ? val : null;
                    }).map((item: any) => (
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

