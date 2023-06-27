import InfinitiVideoScroll from '@/src/components/videos/InfinitiVideoScroll'
import React, { FC } from 'react'
import Playlists from '@/src/components/videos/Playlists' 
import Head from 'next/head'    
import Header from '@/src/components/globals/Header'
import { useDispatch,useSelector } from 'react-redux'
import { playlistSelector } from '@/src/redux/slices/playlistSlice'
interface Props {
 
}

const Videos :FC<Props> = ( ) => {
 
   
     const playlist = useSelector(playlistSelector)
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
 