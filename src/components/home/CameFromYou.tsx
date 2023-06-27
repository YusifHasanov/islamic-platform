import React from 'react'
import { Swiper, SwiperSlide, useSwiper, useSwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/autoplay";
import { Autoplay } from "swiper";
import { useRouter } from "next/router";
import { useGetVideosQuery } from "@/src/redux/slices/videoSlice";
const CameFromYou = () => {
  return (
    <div className='dark:bg-gray-900     bg-gray-200 p-12'>



      <div className='  w-full text-center '>
      <h4 className='text-4xl   font-bold text-gray-800 dark:text-white' >Sizdən gələnlər</h4>

        <Swiper 
          modules={[Autoplay]}
          autoplay={{ delay: 1000, disableOnInteraction: false, }}
          loop={true}
          slidesPerView={1} spaceBetween={10} className=' max-w-lg'>
          {data.map((item) => (
            <SwiperSlide key={item.id}>
              <div key={item.id} className='p-8'>
                <h3 className='text-2xl  font-bold my-6 text-gray-800 dark:text-white'>
                  {item.title}
                </h3>
                <p className='text-gray-600   dark:text-gray-300'>
                  {item.content}
                </p>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

    </div>
  )
}

export default CameFromYou

const data = [
  {
    id: 1,
    title: 'The 27 Habits of Highly Effective People',
    content: 'The 27 Habits of Highly Effective People, first published in 1989, is a business and self-help book written by Stephen Covey. Covey presents an approach to being effective in attaining goals by aligning oneself to what he calls "true north" principles based on a character ethic that he presents as universal and timeless.',
  },
  {
    id: 2,
    title: 'The3 7 Habits of Highly Effective People',
    content: 'The 37 Habits of Highly Effective People, first published in 1989, is a business and self-help book written by Stephen Covey. Covey presents an approach to being effective in attaining goals by aligning oneself to what he calls "true north" principles based on a character ethic that he presents as universal and timeless.',

  },
  {
    id: 3,
    title: 'The fdsfsdctive People',
    content: 'The 7 Habits of Highly Effective People, first published in 1989, is a business and self-help book written by Stephen Covey. Covey presents an approach to being effective in attaining goals by aligning oneself to what he calls "true north" principles based on a character ethic that he presents as universal and timeless.',

  },
  {
    id: 4,
    title: 'The gergergw  ly Effective People',
    content: 'The  wwe erwe rwe People, first published in 1989, is a business and self-help book written by Stephen Covey. Covey presents an approach to being effective in attaining goals by aligning oneself to what he calls "true north" principles based on a character ethic that he presents as universal and timeless.',

  },
  {
    id: 5,
    title: 'The 7 Habits of Highly Effective People',
    content: 'The 7 Habits of Highly Effective People, first published in 1989, is a business and self-help book written by Stephen Covey. Covey presents an approach to being effective in attaining goals by aligning oneself to what he calls "true north" principles based on a character ethic that he presents as universal and timeless.',

  }
]