import React from 'react'
import { NextRouter, useRouter } from 'next/router';
import axios from 'axios';
import { useQuery } from 'react-query';
import { Video } from '@prisma/client';

const Index = () => {
  const router: NextRouter = useRouter();
  const { videoId } = router.query;
  const videoQuery = useQuery<Video, unknown>(["video", videoId], async () => {
    const { data } = await axios.get(`/api/videos?videoId=${videoId}`)
    return data
  }, {
    staleTime: 600000 ,
  })
  if (videoQuery.isLoading) return <div>Loading</div>
  if (videoQuery.isError) return <div>error</div>

  return (
    <div>
      <h1>{videoQuery.data?.title}</h1>
      <img src={videoQuery.data?.thumbnail} alt="" />
    </div>
  )
}

export default Index
