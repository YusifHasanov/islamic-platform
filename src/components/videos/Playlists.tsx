import React, { FC } from 'react'

import Image from 'next/image'

import { useDispatch, useSelector } from 'react-redux'
import { playlistSelector, setPlaylist } from '@/src/redux/slices/playlistSlice'
import ListItemSkeleton from './ListItemSkeleton'
import { useGetPlaylistsQuery } from '@/src/redux/slices/playlistSlice'

const playlists = [
    {
        id: "clf2rqeu602ymuwj8y9jtgfcl",
        playlistId: "PLU43-RoCoSfMihq_-X8zYGxergJCMgayn",
        publishedAt: "2023-02-27T13:45:42.000Z",
        thumbnail: "https://i.ytimg.com/vi/KYVw2w8MAIM/hqdefault.jpg",
        title: "Futbol"
    },
    {
        id: "clf2rqfjf02youwj8vlmf6gme",
        playlistId: "PLU43-RoCoSfPLj9z7d_jwLzi4ue9Yvv7e",
        publishedAt: "2023-02-06T14:25:47.000Z",
        thumbnail: "https://i.ytimg.com/vi/Czdxy8ljPPE/hqdefault.jpg",
        title: "Gündəm Və İslam"
    },
    {
        id: "clf2rqg8l02yquwj8cioy9q59",
        playlistId: "PLU43-RoCoSfPxzRXzhWAqvNwroqbc_LB8",
        publishedAt: "2023-01-03T18:13:20.000Z",
        thumbnail: "https://i.ytimg.com/vi/OI-4IlPzj40/hqdefault.jpg",
        title: "Səhabə Həyatı"
    },
    {
        id: "clf2rqgxw02ysuwj8yvul9re6",
        playlistId: "PLU43-RoCoSfOSTqDgbF77YnHFaWj116Ll",
        publishedAt: "2022-12-16T04:54:45.000Z",
        thumbnail: "https://i.ytimg.com/vi/H_n998_SxQA/hqdefault.jpg",
        title: "Sualın Qalmasın"
    }
]

interface Props {

}

const Playlists: FC<Props> = () => {

    const playlist = useSelector(playlistSelector)
    const dispatch = useDispatch()
    const [filteredData, setFilteredData] = React.useState<any[]>([])
    const [wordEntered, setWordEntered] = React.useState("")
    const { isLoading, data } = useGetPlaylistsQuery(undefined, {});

    const togglePlaylist = (playlistState: any) =>
        dispatch(setPlaylist(playlistState.playlistId === playlist?.playlistId ? null : playlistState))

    // if (isLoading) return (
    //     <div className='list_skeletons  hidden  flex-col lg:flex   pl-12  pt-10' >
    //         <ListItemSkeleton number={14} />
    //     </div>


    // )
    console.log(data)
    const handleFilter = (event: any) => {
        const searchWord = event.target.value;
        setWordEntered(searchWord);
    }
    return (
        <aside className=" playlists_container  sticky   hidden pr-2  max-h-screen min-h-full w-full flex-shrink-0 flex-col  overflow-y-scroll overscroll-none   lg:flex lg:max-w-[260px] xl:max-w-[340px] xl:px-5 xl:pb-15  2xl:max-w-[420px]">

            <input type="text" value={wordEntered} onChange={(e) => { handleFilter(e) }} className="bg-gray-50 border mb-2 outline-none  border-gray-300 text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 sticky top-0 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Axtarış" required />
            <ul className="">
                {
                    playlists?.filter((val: any) => {
                        return (wordEntered === "" || val.title.toLowerCase().includes(wordEntered.toLowerCase())) ? val : null;
                    }).map((item: any) => (
                        <li onClick={() => {
                            togglePlaylist(item)
                        }} key={item.id} className={` px-2  ${playlist?.playlistId === item.playlistId ? " bg-gray-400  dark:text-gray-200 text-slate-900  dark:bg-slate-900 " : "dark:bg-slate-700 text-slate-700 bg-slate-300"}   py-1 cursor-pointer mb-2  transition-colors rounded-md dark:hover:bg-slate-700 hover:bg-gray-200`}>
                            <span className={`flex items-center rounded-md px-1 w-full text-sm font-medium  dark:text-gray-400`}>
                                {/* <Image src={item.thumbnail.split("+")[2]} alt="" className=' rounded-full' width={45} height={50} /> */}
                                <Image src={item.thumbnail} alt="" className='  rounded-full' width={60} height={50} />
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

