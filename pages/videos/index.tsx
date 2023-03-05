import InfinitiVideoScroll from '@/src/components/videos/InfinitiVideoScroll'
import React from 'react'
import Playlists from '@/src/components/videos/Playlists'
import { Playlist } from '@prisma/client'


const Videos = () => {


  return (
    <div className='videos_container  bg-gray-200 dark:bg-gray-800'  >
      <Playlists  />
      <InfinitiVideoScroll   />
    </div>
  )
}

export default Videos
