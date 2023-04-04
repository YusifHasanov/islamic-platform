import Image from "next/image"
import Link from "next/link"
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, EffectCoverflow, } from 'swiper';
import 'swiper/css';
import "swiper/css/effect-coverflow";

import moment from 'moment'
import Head from 'next/head'
import Header from "@/src/components/globals/Header";
const Index = () => {
  return (
   <>
  <Header title='Kitablar' description="kitablarımız səhifəsində kitablarımızla tanış ola bilərsiniz" />
    <section className="py-16" >
      <div className="container mx-auto md:px-20">
        <h3 className="font-bold text-4xl pb-12 text-center">Kitablar</h3>
        <Swiper
          effect={"coverflow"}
          grabCursor={true}
          centeredSlides={true}
          coverflowEffect={{
            rotate: 50,
            stretch: 0,
            depth: 100,
            modifier: 1,
            slideShadows: true,
          }}
          slidesPerView={"auto"}
          modules={[Autoplay, Pagination,EffectCoverflow]}
          pagination={{
            dynamicBullets: true,
          }}
          loop={false}
          autoplay={{
            delay: 2000
          }}
        >
          {
            books.map((book) => (
              <SwiperSlide key={book.id}>
                <Slide {...book} />
              </SwiperSlide>
            ))
          }
        </Swiper>


      </div>
    </section>
   </>
  )
}
interface SlideProps {
  id: number;
  title: string;
  description: string;
  publishedAt: string;
  author: string;
  cover: string;
}

const Slide = ({
  id,
  title,
  description,
  publishedAt,
  author,
  cover,
}: SlideProps) => {

  return (
    <div className="grid md:grid-cols-2">
      <div className="image">
        <div className="relative  w-full h-64 md:h-96 overflow-hidden rounded-lg  flex justify-center">
          <Image  loading="lazy" className="rounded-md  " src={cover} width={300} height={400} alt={""} />
        </div>
      </div>
      <div className="info flex justify-start flex-col">
        <div className="cat flex flex-col">
          <span className="text-orange-600  text-3xl hover:text-orange-800">{title}</span>
          <span className="text-gray-500">Published at: {moment(publishedAt).format("MMMM Do YYYY")}</span>
        </div>

        <p className="text-gray-500 py-3">
          {description}
        </p>
        <p className="
        text-gray-500   text-lg
        ">{author}</p>
      </div>
    </div>
  )
}

export default Index;
const books: SlideProps[] = [
  {
    id: 1,
    title: "The Hunger Games",
    description: "lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod.lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod.",
    publishedAt: "2021-01-01",
    author: "Suzanne Collins",
    cover: "https://images.unsplash.com/photo-1626618012641-bfbca5a31239?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8aGFycnklMjBwb3R0ZXIlMjBib29rfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60",
  },
  {
    id: 2,
    title: "Harry Potter and the Philosopher's Stone",
    author: "J.K. Rowling",
    description: "lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod.lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod.",
    publishedAt: "2021-01-01",
    cover: "https://images.unsplash.com/photo-1600189261867-30e5ffe7b8da?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8aGFycnklMjBwb3R0ZXIlMjBib29rfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60",
  },
  {
    id: 3,
    title: "Harry Potter and the Philosopher's Stone",
    author: "J.K. Rowling",
    description: "lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod.lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod.",
    publishedAt: "2021-01-01",
    cover: "https://images.unsplash.com/photo-1618666012174-83b441c0bc76?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8OHx8aGFycnklMjBwb3R0ZXIlMjBib29rfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60",
  }
]