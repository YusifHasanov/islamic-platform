import React, { FC } from 'react'
import VideoPlaylists from '@/src/components/videos/singleVideo/VideoPlaylists';
import VideoItem from '@/src/components/videos/singleVideo/VideoItem';
import Head from 'next/head';
import { Video } from '@prisma/client';
import { useSSG } from '@/server/utils/ssg';
import axios from 'axios';

interface Props {
  video: Video
}
const style = {
  height: "calc((100vh - 64px) - 64px)",
} as any

const Index: FC<Props> = ({ video }) => {

  return (
    <>
      <Head>
        <title>Əhli Sünnə Mədrəsəsi</title>
      </Head>
      <div style={style} className=' overflow-y-hidden grid custom-grid p-6'>
        <VideoItem video={video} />
        <VideoPlaylists video={video} />
      </div>
    </>
  )
}

export default Index

export const getServerSideProps = async (context: any) => {
  const { videoId } = context.params

  const ssg = await useSSG();
  const video = await ssg.video.oneByVideoId.fetch(videoId as string).then((res) => JSON.parse(JSON.stringify(res)))
  // const { data: video } = await axios.get(`${process.env.URL}/api/videos/${videoId}`)
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
      trpcState: ssg.dehydrate(),
      video
    }
  }
}

