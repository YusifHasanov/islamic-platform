import React, { FC, useEffect, useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper";
import "swiper/css";
import "swiper/css/effect-coverflow";
import { useRouter } from "next/router";
import { trpc } from "@/server/utils/trpc"; 



const Videos = () => {
  const router = useRouter();
  const { data: videos, isSuccess } = trpc.video.manyByLimit.useQuery(8, { staleTime: 0 });
  useEffect(() => {
    console.log(videos)
  }, [videos])

  return (
    <div className="p-5 text-center">

      <h3 className="text-4xl text-center font-bold">Videolarımız</h3>


      <Swiper modules={[Autoplay]} className="mySwiper"
        autoplay={{ delay: 1000 , disableOnInteraction: false}}
        
        loop={true}
        breakpoints={{
          640: {
            slidesPerView: 1,
          },
          768: {
            slidesPerView: 2,
          },
          1024: {
            slidesPerView: 3,
          },
        }}
      >
        {isSuccess ?
          videos.map((item, index) => (
            <SwiperSlide key={index}  >
              <Slide {...item as any} />
            </SwiperSlide>
          )):
          <div className="flex justify-center items-center h-96">
            <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900"></div>
          </div>
          
        }
      </Swiper>
      <button onClick={() => router.push("/videos")} type="button" className=" py-3 px-4 inline-flex justify-center items-center gap-2 rounded-md border-2 border-green-200 font-semibold text-green-500 hover:text-white hover:bg-green-500 hover:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-200 focus:ring-offset-2 transition-all text-sm dark:focus:ring-offset-gray-800">
        Bütün videolar

      </button>
    </div>
  );
}

interface Video {
  id: number;
  videoId: string;
  publishedAt: string;
  thumbnail: string;
  title: string;
  playlistId: string;
}

const Slide: FC<Video> = ({
  id,
  videoId,
  publishedAt,
  thumbnail,
  title,
  playlistId
}) => {
  return (
    <div className="flex rounded-sm p-8 justify-center text-6xl   ">
      <img src={thumbnail} className="rounded-sm" alt="" />
    </div>
  )
}

export default Videos;