import InfinitiVideoScroll from '@/src/components/videos/InfinitiVideoScroll'
import React from 'react'
import Playlists from '@/src/components/videos/Playlists'
import { Playlist } from '@prisma/client'


const Videos = () => {
  const [playlist, setPlaylist] = React.useState<Playlist | null>(null)

  return (
    <div className='videos_container bg-gray-200 dark:bg-gray-800'  >
      <Playlists playlist={playlist} setPlaylist={setPlaylist} />
      <InfinitiVideoScroll playlist={playlist} />
    </div>
  )
}

export default Videos
