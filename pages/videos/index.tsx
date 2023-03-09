import InfinitiVideoScroll from '@/src/components/videos/InfinitiVideoScroll'
import React, { FC } from 'react'
import Playlists from '@/src/components/videos/Playlists'
import { Playlist } from '@prisma/client'
import Head from 'next/head'
import { GetServerSideProps } from 'next'
import axios from 'axios'
import { useAtomValue } from 'jotai'
import { playlistState } from '@/src/jotai/atoms'
interface Props {
  playlists: Playlist[]
}

const Videos :FC<Props> = ({playlists}) => {
   
  const playlist = useAtomValue(playlistState)
   

  return (
    <div className='videos_container'  >
      <Head>
        <title>Videolar</title>
      </Head>
      <Playlists  playlists={playlists} />
      <InfinitiVideoScroll playlist={playlist} />
    </div>
  )
}

export default Videos



export const getServerSideProps: GetServerSideProps = async () => {
  try {
    const { data } = await axios.get(`${process.env.URL}/api/playlists}`)
    
    return {
      props: {
        playlists: data || [],
      },
    }
  } catch (error) {
    console.error(error)
    return {
      props: {
        playlists: [],
      },
    }
  }
}
 