import InfinitiVideoScroll from '@/src/components/UI/videos/InfinitiVideoScroll'
import { useQuery } from 'react-query'
import React from 'react'
import axios from 'axios'
import { Playlist } from '@/src/utils/types/Types'
const queryFn = async () => {
  const { data } = await axios.get(`/api/playlists`)
  return data
}

const Videos = () => {
  const [playlistId, setPlaylistId] = React.useState<string>("")
  const query = useQuery("playlists", async () => queryFn())
  if (query.isLoading) return <div>Loading</div>
  if (query.isError) return <div>Error</div>
  const togglePlaylist = (id: string) => {
    console.log(id)
    if (playlistId === id) {
      setPlaylistId("")
    } else {
      setPlaylistId(id)

    }
  }
  return (
    <div className='videos_container bg-gray-200'  >


      <div
        style={{
          height: "100vh",
          position: "sticky",
          top: "0",
        }}
        className="  px-3 py-4 pr-1 bg-gray-50 dark:bg-gray-800">
        <ul
          style={{
            height: "100vh",
            position: "sticky",
            top: "0",
          }
          }
          className="space-y-2 overflow-y-auto  ">

          {
            query.data?.map((playlist: Playlist) => (
              <li
                onClick={() => togglePlaylist(playlist.playlistId)}
                key={playlist.id} className="px-2 py-1 cursor-pointer transition-colors rounded-md dark:hover:bg-gray-700 hover:bg-gray-200">
                <span className={`flex items-center ${playlistId === playlist.playlistId ? " bg-gray-200 p-1 rounded-md" : ""}            w-full text-sm font-medium text-gray-600 dark:text-gray-400`}>
                  <span className="ml-4">{playlist.title.replace(/&quot;/g, '')}</span>
                </span>
              </li>
            ))
          }

        </ul>
      </div>


      <InfinitiVideoScroll playlistId={playlistId} />
    </div>
  )
}

export default Videos
