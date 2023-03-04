import InfinitiVideoScroll from '@/src/components/UI/videos/InfinitiVideoScroll'
import { useQuery } from 'react-query'
import React from 'react'
import axios from 'axios'
import { Playlist } from '@prisma/client'
import Image from 'next/image'

const queryFn = async () => {
  const { data } = await axios.get(`/api/playlists`)
  return data
}

const Videos = () => {
  const [playlistState, setPlaylistState] = React.useState<Playlist|null>(null)
  const query = useQuery("playlists", async () => queryFn())
  if (query.isLoading) return <div>Loading</div>
  if (query.isError) return <div>Error</div>
  const togglePlaylist = (playlist: Playlist) => {
     
    if (playlistState?.playlistId === playlist.playlistId) {
      setPlaylistState(null)
    } else {
      setPlaylistState(playlist)

    }
  }
  return (
    <div className='videos_container bg-gray-200'  >


      <div className=" sticky top-0 h-full  px-3 py-4 pr-1 bg-gray-50 dark:bg-gray-800">
        <ul
          style={{
            height: "100vh"
          }
          }
          className="space-y-2 sticky h-full   top-0 overflow-y-auto  pb-10 ">

          {
            query.data?.map((playlist: Playlist) => (
              <li onClick={() => togglePlaylist(playlist)}  key={playlist.id} className=" px-2 py-1 cursor-pointer transition-colors rounded-md dark:hover:bg-gray-700 hover:bg-gray-200">
                
                <span className={`flex items-center ${playlistState?.playlistId === playlist.playlistId ? " bg-gray-200 p-1 rounded-md" : ""}            w-full text-sm font-medium text-gray-600 dark:text-gray-400`}>
                <Image   src={playlist.thumbnail}  alt="" className= ' rounded-full' width={45} height={50} />
                  <span className="ml-4">{playlist.title}</span>
                </span>
              </li>
            ))
          }

        </ul>
      </div>
      <InfinitiVideoScroll playlist={playlistState} />
    </div>
  )
}

export default Videos
