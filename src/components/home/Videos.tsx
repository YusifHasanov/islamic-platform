import React, { FC, useEffect, useRef, useState } from "react";
import { Swiper, SwiperSlide, useSwiper, useSwiperSlide } from "swiper/react";
import { Autoplay } from "swiper";
import "swiper/css";
import "swiper/css/autoplay";
import { useRouter } from "next/router";
import { useGetVideosQuery } from "@/src/redux/slices/videoSlice";

import 'swiper/css/virtual';
const Videos = () => {
  const router = useRouter();
  const { data: videos, isSuccess, isLoading } = useGetVideosQuery({ refetchOnMountOrArgChange: false });
 
  return (
    <div className="px-5 py-12 text-center bg-gray-100 dark:bg-gray-600 ">
      <h3 className="text-4xl text-center mb-6 font-bold"    >Videolarımız</h3>
      <Swiper modules={[Autoplay]}  
 
        autoplay={{ delay: 1000, disableOnInteraction: false, }}
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
        {
          isSuccess &&
          videos.map((item: any, index: any) => (
            <SwiperSlide key={index}  >
              <Slide isSuccess={isSuccess} {...item as any} />
            </SwiperSlide>
          ))

        }{
          isLoading &&
          <SwiperSlide    >
       <div className="flex justify-center items-center h-96">
            <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900"></div>
          </div>
        </SwiperSlide>
          
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
    <div className={" p-8  "}>
      <div
        style={{
          backgroundPosition: "center",
          backgroundSize: "cover",
          backgroundImage: `url(${thumbnail.split("+")[2]})`,
          border: "1px    solid #383d47", boxShadow: "1px 12px 15px -3px #000"
        }}
        className="flex h-72 w-96 items-center justify-center relative rounded-md text-6xl   ">
        <div style={{
          backgroundColor: "rgba(0,0,0,0.5)",
          borderRadius: "0.375rem",
        }}>
          <svg className="    h-16 w-16" xmlns="http://www.w3.org/2000/svg" width="29" height="29" viewBox="0 0 29 29" fill="none">
            <path fill-rule="evenodd" clip-rule="evenodd" d="M9.71892 6.56779C9.05265 6.15778 8.19482 6.63713 8.19482 7.41945V22.507C8.19482 23.2893 9.05265 23.7687 9.71892 23.3586L21.9775 15.8149C22.6121 15.4244 22.6121 14.502 21.9775 14.1116L9.71892 6.56779Z" fill="white" />
          </svg>
        </div>
      </div>
    </div>
  )
}

export default Videos;