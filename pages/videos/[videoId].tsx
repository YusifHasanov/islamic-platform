import React from 'react'
import { NextRouter, useRouter } from 'next/router';

import VideoPlaylists from '@/src/components/singleVideo/VideoPlaylists';
import VideoItem from '@/src/components/singleVideo/VideoItem';

const Index = () => {
  const router: NextRouter = useRouter();
  const { videoId } = router.query;




  return (
    <div className='flex  p-6 '>

      <VideoItem videoId={videoId} />
      <VideoPlaylists videoId={videoId}  />
    </div>
  )
}

export default Index
