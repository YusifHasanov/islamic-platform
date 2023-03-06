import React from 'react'
import { NextRouter, useRouter } from 'next/router';
import axios from 'axios';
import { useQuery } from 'react-query';
import Image from 'next/image'
import VideoPlaylists from '@/src/components/videos/renderedComponents/videoPlaylists';
type videoIdType = string | string[] | undefined

async function queryFn(videoId: videoIdType) {
  const { data } = await axios.get(`/api/videos?videoId=${videoId}`)

  return data
}

const Index = () => {
  const router: NextRouter = useRouter();
  const { videoId } = router.query;

  const videoQuery = useQuery<any, unknown>(["video", videoId],
    async () => await queryFn(videoId), {
    staleTime: 1000 * 60 * 60 * 24, // 24 hours
  })

  if (videoQuery.isLoading) return <div>Loading</div>
  if (videoQuery.isError) return <div>error</div>

  return (
    <div className='flex  p-6 '>
      <div className='flex single_video_box flex-col  items-center    px-6 py-8 rounded-xl '>
        <h3
          className='bg-green-100 single  text-center border border-green-700 text-gray-400 text-2xl rounded-lg mb-4 font-medium mr-2 px-3 py-2 mt-0  dark:bg-green-900 dark:text-green-300'
        >{videoQuery.data?.title}</h3>
 
<iframe   className='responsive_iframe border-gray-300  rounded-2xl singleVideo '  allowFullScreen  src={`https://www.youtube.com/embed/${videoId}`} allow="accelerometer;fullScreen; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" ></iframe>
  

      </div>
 
      <VideoPlaylists videoId={videoId} playlistId={videoQuery.data?.playlistId} />
    </div>
  )
}

export default Index
