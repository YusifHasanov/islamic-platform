import React, { CSSProperties, FC } from 'react'
import VideoPlaylists from '@/src/components/videos/singleVideo/VideoPlaylists';
import VideoItem from '@/src/components/videos/singleVideo/VideoItem';
import Head from 'next/head';
import FetchAPI from '@/src/components/globals/FetchAPI';
 

interface Props { 
  video :any 
};

const style : CSSProperties = { 
   height: "calc((100vh - 20px) - 64px)"
  } ;

const Index: FC<Props> = ({ video  }) => {

  return (
    <>
      <Head>
        <title>Əhli Sünnə Mədrəsəsi</title>
      </Head>
      <div style={style} className='px-6 pb-6'>
        <VideoItem video={video} />
        <VideoPlaylists video={video} />
      </div>
    </>
  )
}

export default Index

// export const getServerSideProps = async (context: any) => {
//   const { videoId } = context.params
//   const fetchAPI = FetchAPI.getInstance();

//   const video = await fetchAPI.get( `videos/${videoId}`) 
//   if (!video) {
//     return {
//       redirect: {
//         permanent: false,
//         destination: "/404",
//       },
//       props: {},
//     };
//   }
//   return {

//     props: {
      
//       video
//     }
//   }
// }

