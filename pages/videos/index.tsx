import InfinitiVideoScroll from '@/src/components/videos/InfinitiVideoScroll'
import React, { FC } from 'react'
import Playlists from '@/src/components/videos/Playlists'
import { Playlist } from '@prisma/client'
import Head from 'next/head'  
import { useAtomValue } from 'jotai'
import { playlistState } from '@/src/jotai/atoms'
import { trpc } from '@/server/utils/trpc';

interface Props {
 
}

const Videos :FC<Props> = ( ) => {
  const v1 = trpc.video.oneByVideoId.useQuery("jj81sPdd8fk",{staleTime: 1000 * 60 * 5 }  );//5min
  console.log(v1.isSuccess);
  const playlist = useAtomValue(playlistState)
     
  return (
    <div className='videos_container'  >
      <Head>
        <title>Videolar</title>
      </Head>
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
 