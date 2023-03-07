import React, { useEffect } from 'react'
import { NextRouter, useRouter } from 'next/router';
import axios from 'axios';
import VideoPlaylists from '@/src/components/singleVideo/VideoPlaylists';
import VideoItem from '@/src/components/singleVideo/VideoItem';
import Head from 'next/head';
import { Video } from '@prisma/client';
import { useQuery } from 'react-query';
 

const Index = () => {
  const router = useRouter()
  const { videoId } = router.query
 
 

  return (
    <>
      <Head>
        <title>Əhli Sünnə Mədrəsəsi</title>
      </Head>
  
      <div
        style={{
          height: "calc((100vh - 64px) - 64px)",
          overflowY: 'hidden',
        }}
        className='grid custom-grid  p-6 '>

        <VideoItem videoId={videoId} />
        <VideoPlaylists videoId={videoId} />
      </div>
    </>
  )
}

export default Index


