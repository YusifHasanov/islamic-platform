import React, { FC, useEffect } from 'react'
import { NextRouter, useRouter } from 'next/router';
import VideoPlaylists from '@/src/components/videos/singleVideo/VideoPlaylists';
import VideoItem from '@/src/components/videos/singleVideo/VideoItem';
import Head from 'next/head';
import { Playlist, Video } from '@prisma/client';
import axios from 'axios';

interface Props {
  video: Video
  videosByPlaylist: Video[]
  playlistData: Playlist
}
const style = {
  height: "calc((100vh - 64px) - 64px)", 
} as any

const Index: FC<Props> = ({ video, videosByPlaylist, playlistData }) => {

  const router = useRouter();
  const { videoId } = router.query;
  return (
    <>
      <Head>
        <title>Əhli Sünnə Mədrəsəsi</title>
      </Head>
      <div style={style} className=' overflow-y-hidden grid custom-grid p-6'>
        <VideoItem video={video} />
        <VideoPlaylists   video={video} />
      </div>
    </>
  )
}

export default Index

export const getServerSideProps = async (context: any) => {
  const { videoId } = context.params
  const { data: video } = await axios.get(`${process.env.URL}/api/videos/${videoId}`)
  if (!video) {
    return {
      redirect: {
        permanent: false,
        destination: "/404",
      },
      props: {},
    };
  }
  return {

    props: {
      video
      
    }
  }
}
