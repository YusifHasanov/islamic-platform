import InfinitiVideoScroll from '@/src/components/videos/InfinitiVideoScroll'
import React, { FC } from 'react'
import Playlists from '@/src/components/videos/Playlists' 
import Head from 'next/head'  
import { useAtomValue } from 'jotai'
import { playlistState } from '@/src/jotai/atoms'
import Header from '@/src/components/globals/Header'

interface Props {
 
}

const Videos :FC<Props> = ( ) => {
 
  const playlist = useAtomValue(playlistState)
     
  return (
    <div className='videos_contwainer flex relative lg:flex-row flex-column'  >
      <Header title='Videolar' description='videolarımız səhifəsində videolarımızı izləyə bilərsiniz'/>
      <Playlists  />
      <InfinitiVideoScroll playlist={playlist} />
    </div>
  )
}

export default Videos



// export const getServerSideProps: GetServerSideProps = async () => {
//   try {
//     const { data } = await axios.get(`${process.env.URL}/api/playlists`)
    
//     return {
//       props: {
//         playlists: data || [],
//       },
//     }
//   } catch (error) {
//     console.error(error)
//     return {
//       props: {
//         playlists: [],
//       },
//     }
//   }
// }
 