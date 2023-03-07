import InfinitiVideoScroll from '@/src/components/videos/InfinitiVideoScroll'
import React from 'react'
import Playlists from '@/src/components/videos/Playlists'
import { Playlist } from '@prisma/client'
import Head from 'next/head'

const Videos = () => {


  return (
    <div className='videos_container '  >
      <Head>
        <title>Videolar</title>
      </Head>
      <Playlists />
      <InfinitiVideoScroll />
    </div>
  )
}

export default Videos
